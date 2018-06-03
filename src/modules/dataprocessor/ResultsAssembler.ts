import { DataProcessor } from './DataProcessor';
import { ConstData } from './ConstData';
import { uniqid } from '../../utils/uniqid';
import { IdPrefix } from '../common/const/idPrefix';
import { numAdd } from '../../utils/caculation';
import { getRepository } from 'typeorm';
import { OutputVoucher } from '../entities/output.voucher.entity';
import { warningText, greenBoldText } from '../../utils/chalkColors';
import { OutputFlowAnalyse } from '../entities/output.flow.analyse.entity';

export class ResultsAssembler {
  constructor() {
    this.dataProcessor = new DataProcessor();
  }

  public dataProcessor: DataProcessor;

  private startPointer = 0;

  private indexCounter(): string {
    return String(++this.startPointer);
  }

  public async generateSingleVoucherResult(stockName: string) {
    const documentMakeDate = await this.dataProcessor.documentMakeDate(stockName);
    const assistAccounting = await this.dataProcessor.assistAccounting(stockName);
    const commonTpl = {
      account_book: ConstData.AccountBookCode,
      voucher_type: ConstData.VoucherTypeCode,
      voucher_code: ConstData.voucherCode,
      attached_documents: Number(ConstData.AttachedDocNum),
      document_maker_code: ConstData.DocMakerCode,
      document_make_date: documentMakeDate,
      currency: ConstData.Currency,
      business_unit_code: ConstData.BizUnitCode,
      bussiness_date: documentMakeDate,
      org_domestic_currency_rate: ConstData.OrgDomesticCurrencyRate,
      assist_accounting: assistAccounting
    };

    /**
     * 生成8条数据，依次为:
     * 买入成本, 买入手续费, 卖出成本, 卖出手续费, 盈亏, 资金变动, 市值1, 市值2
     */
    // 1. 买入成本
    const buyDealAmtSum = await this.dataProcessor.buyDealAmtSum(stockName);
    const result1 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Voucher),
      record_counter: this.indexCounter(),
      record_name: ConstData.RecordName['1-buyCost'],
      stock_name: stockName,
      abstract: `买入${stockName}`,
      account_code: ConstData.AccountCode['1-buyCost'],
      original_currency_debit: buyDealAmtSum,
      domestic_currency_debit: buyDealAmtSum,
      original_currency_credit: null,
      domestic_currency_credit: null
    });
    if (Number(buyDealAmtSum) === 0) {
      Object.assign(result1, { visibility: ConstData.Visibility.hidden });
    }

    console.log(result1);
    // 2. 买入手续费
    const buyCommissionSum = await this.dataProcessor.buyCommissionSum(stockName);
    const result2 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Voucher),
      record_counter: this.indexCounter(),
      record_name: ConstData.RecordName['2-buyCommission'],
      stock_name: stockName,
      abstract: `买入${stockName}手续费`,
      account_code: ConstData.AccountCode['2-buyCommission'],
      original_currency_debit: buyCommissionSum,
      domestic_currency_debit: buyCommissionSum,
      original_currency_credit: null,
      domestic_currency_credit: null
    });
    if (Number(buyCommissionSum) === 0) {
      Object.assign(result2, { visibility: ConstData.Visibility.hidden });
    }

    // 3. 卖出成本
    const sellCostOriginCredit = await this.dataProcessor.sellCostOriginCredit(stockName);
    const result3 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Voucher),
      record_counter: this.indexCounter(),
      record_name: ConstData.RecordName['3-sellCost'],
      stock_name: stockName,
      abstract: `卖出${stockName}`,
      account_code: ConstData.AccountCode['3-sellCost'],
      original_currency_debit: null,
      domestic_currency_debit: null,
      original_currency_credit: sellCostOriginCredit,
      domestic_currency_credit: sellCostOriginCredit
    });
    if (Number(sellCostOriginCredit) === 0) {
      Object.assign(result3, { visibility: ConstData.Visibility.hidden });
    }

    // 4. 卖出手续费
    const sellCommissionSum = await this.dataProcessor.sellCommissionSum(stockName);
    const result4 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Voucher),
      record_counter: this.indexCounter(),
      record_name: ConstData.RecordName['4-sellCommission'],
      stock_name: stockName,
      abstract: `卖出${stockName}手续费`,
      account_code: ConstData.AccountCode['4-sellCommission'],
      original_currency_debit: null,
      domestic_currency_debit: null,
      original_currency_credit: sellCommissionSum,
      domestic_currency_credit: sellCommissionSum
    });
    if (Number(sellCommissionSum) === 0) {
      Object.assign(result4, { visibility: ConstData.Visibility.hidden });
    }

    // 5. 盈亏
    const profitLossOriginCredit = await this.dataProcessor.profitLossOriginCredit(stockName);
    const result5 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Voucher),
      record_counter: this.indexCounter(),
      record_name: ConstData.RecordName['5-profitLoss'],
      stock_name: stockName,
      abstract: `卖出${stockName}盈亏`,
      account_code: ConstData.AccountCode['5-profitLoss'],
      original_currency_debit: null,
      domestic_currency_debit: null,
      original_currency_credit: profitLossOriginCredit,
      domestic_currency_credit: profitLossOriginCredit
    });
    if (Number(profitLossOriginCredit) === 0) {
      Object.assign(result5, { visibility: ConstData.Visibility.hidden });
    }

    // 6. 资金变动
    const debitCreditDiff = await this.dataProcessor.debitCreditDiff(stockName);
    const result6 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Voucher),
      record_counter: this.indexCounter(),
      record_name: ConstData.RecordName['6-fundingDiff'],
      stock_name: stockName,
      abstract: '东证账户变动',
      account_code: ConstData.AccountCode['6-fundingDiff'],
      original_currency_debit: null,
      domestic_currency_debit: null,
      original_currency_credit: debitCreditDiff,
      domestic_currency_credit: debitCreditDiff,
      assist_accounting: null
    });
    if (Number(debitCreditDiff) === 0) {
      Object.assign(result6, { visibility: ConstData.Visibility.hidden });
    }

    // 7. 市值1
    const marketValueOneOriginCredit = await this.dataProcessor.marketValueOneOriginCredit(stockName);
    const result7 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Voucher),
      record_counter: this.indexCounter(),
      record_name: ConstData.RecordName['7-marketValue1'],
      stock_name: stockName,
      abstract: `${stockName}公允变动`,
      account_code: ConstData.AccountCode['7-marketValue1'],
      original_currency_debit: null,
      domestic_currency_debit: null,
      original_currency_credit: marketValueOneOriginCredit,
      domestic_currency_credit: marketValueOneOriginCredit
    });
    if (Number(marketValueOneOriginCredit) === 0) {
      Object.assign(result7, { visibility: ConstData.Visibility.hidden });
    }

    // 8. 市值2
    const result8 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Voucher),
      record_counter: this.indexCounter(),
      record_name: ConstData.RecordName['8-marketValue2'],
      stock_name: stockName,
      abstract: `${stockName}公允变动`,
      account_code: ConstData.AccountCode['8-marketValue2'],
      original_currency_debit: marketValueOneOriginCredit > 0 ? marketValueOneOriginCredit : null,
      domestic_currency_debit: marketValueOneOriginCredit > 0 ? marketValueOneOriginCredit : null,
      original_currency_credit: marketValueOneOriginCredit > 0 ? null : Math.abs(marketValueOneOriginCredit),
      domestic_currency_credit: marketValueOneOriginCredit > 0 ? null : Math.abs(marketValueOneOriginCredit)
    });
    if (Number(marketValueOneOriginCredit) === 0) {
      Object.assign(result8, { visibility: ConstData.Visibility.hidden });
    }

    const allRecordsArr = [result1, result2, result3, result4, result5, result6, result7, result8];
    try {
      await getRepository(OutputVoucher).insert(allRecordsArr);
      console.log(greenBoldText(`${stockName} voucher result insert successfully`));
    } catch (e) { console.log(warningText('output voucher insert error happened: '), e); }
  }

  public async generateSpecialResults() {
    const specialRecords = await this.dataProcessor.specialRecords();

    if (!specialRecords.length) { return; }

    const date = String(specialRecords[0].tradeDate);
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const lastDay = this.dataProcessor.monthLastDay(Number(month), Number(year));
    const documentMakeDate = `${year}-${month}-${lastDay}`;

    const commonTpl = {
      account_book: ConstData.AccountBookCode,
      voucher_type: ConstData.VoucherTypeCode,
      voucher_code: ConstData.voucherCode,
      attached_documents: Number(ConstData.AttachedDocNum),
      document_maker_code: ConstData.DocMakerCode,
      document_make_date: documentMakeDate,
      currency: ConstData.Currency,
      business_unit_code: ConstData.BizUnitCode,
      bussiness_date: documentMakeDate,
      assist_accounting: null,
      org_domestic_currency_rate: ConstData.OrgDomesticCurrencyRate,
      visibility: 'show'
    };
    // 买卖标志为“卖出” + 备注不是“证券卖出” 的对应的 成交额数据
    // const specialRecords = await this.dataProcessor.specialRecords(stockName);
    const specialResults = specialRecords.map((record) => {
      return Object.assign({}, commonTpl, {
        id: uniqid(IdPrefix.Voucher),
        record_counter: this.indexCounter(),
        record_name: ConstData.RecordName.specialRecord,
        stock_name: record.stockName,
        abstract: '东证账户结息',
        account_code: ConstData.AccountCode.specialRecord,
        original_currency_debit: null,
        domestic_currency_debit: null,
        original_currency_credit: record.tradeTotalPrice,
        domestic_currency_credit: record.tradeTotalPrice
      });
    });

    // 买卖标志为“卖出” + 备注不是“证券卖出” 的对应的 成交额数据 的 总和
    let sumValue: number = 0;
    specialRecords.forEach((record) => {
      sumValue = numAdd(sumValue, record.tradeTotalPrice);
    });
    let specialResultsSum;
    if (specialRecords.length) {
      specialResultsSum = Object.assign({}, commonTpl, {
        id: uniqid(IdPrefix.Voucher),
        record_counter: this.indexCounter(),
        record_name: ConstData.RecordName.specialRecordSum,
        stock_name: '',
        abstract: '东证账户结息',
        account_code: ConstData.AccountCode.specialRecordSum,
        original_currency_debit: sumValue,
        domestic_currency_debit: sumValue,
        original_currency_credit: null,
        domestic_currency_credit: null
      });
    }

    const allSpecialRecords = specialResults.concat(specialResultsSum);

    try {
      await getRepository(OutputVoucher).insert(allSpecialRecords);
      console.log(greenBoldText(`special voucher result insert successfully`));
    } catch (e) { console.log(warningText('special output voucher insert error happened: '), e); }
  }

  public async generateAllVoucherResults() {
    const allStockNames = await this.dataProcessor.getAllStockNames();

    for (let i = 0, len = allStockNames.length; i < len; i++) {
      await this.generateSingleVoucherResult(allStockNames[i].stockName);
    }
    await this.generateSpecialResults();

    console.log(greenBoldText('all stock voucher results inserted'));
  }

  public async generateSingleFlowResult(stockName: string) {
    const commonTpl = {
      direction: '0',
      analyse_currency: ConstData.Currency,
      group_domestic_currency: null,
      overall_domestic_currency: null,
      inner_unit: null
    };

    const result1Data: Array<{ recordCounter: number, originalCurrencyDebit: string, visibility: string }> = await getRepository(OutputVoucher)
      .createQueryBuilder()
      .select('record_counter AS recordCounter, original_currency_debit AS originalCurrencyDebit, visibility AS visibility')
      .where(`record_name = "${ConstData.RecordName['1-buyCost']}"`)
      .andWhere(`stock_name = "${stockName}"`)
      .execute();

    const result2Data: Array<{ recordCounter: number, originalCurrencyDebit: string, visibility: string }> = await getRepository(OutputVoucher)
      .createQueryBuilder()
      .select('record_counter AS recordCounter, original_currency_debit AS originalCurrencyDebit, visibility AS visibility')
      .where(`record_name = "${ConstData.RecordName['2-buyCommission']}"`)
      .andWhere(`stock_name = "${stockName}"`)
      .execute();

    const result3Data: Array<{ recordCounter: number, originalCurrencyCredit: string, visibility: string }> = await getRepository(OutputVoucher)
      .createQueryBuilder()
      .select('record_counter AS recordCounter, original_currency_credit AS originalCurrencyCredit, visibility AS visibility')
      .where(`record_name = "${ConstData.RecordName['3-sellCost']}"`)
      .andWhere(`stock_name = "${stockName}"`)
      .execute();

    const result4Data: Array<{ recordCounter: number, originalCurrencyCredit: string, visibility: string }> = await getRepository(OutputVoucher)
      .createQueryBuilder()
      .select('record_counter AS recordCounter, original_currency_credit AS originalCurrencyCredit, visibility AS visibility')
      .where(`record_name = "${ConstData.RecordName['4-sellCommission']}"`)
      .andWhere(`stock_name = "${stockName}"`)
      .execute();

    const result5Data: Array<{ recordCounter: number, originalCurrencyCredit: string, visibility: string }> = await getRepository(OutputVoucher)
      .createQueryBuilder()
      .select('record_counter AS recordCounter, original_currency_credit AS originalCurrencyCredit, visibility AS visibility')
      .where(`record_name = "${ConstData.RecordName['5-profitLoss']}"`)
      .andWhere(`stock_name = "${stockName}"`)
      .execute();

    const resultSpecial: Array<{ recordCounter: number, originalCurrencyCredit: string, visibility: string }> = await getRepository(OutputVoucher)
      .createQueryBuilder()
      .select('record_counter AS recordCounter, original_currency_credit AS originalCurrencyCredit, visibility AS visibility')
      .where(`record_name = "${ConstData.RecordName.specialRecord}"`)
      .andWhere(`stock_name = "${stockName}"`)
      .execute();

    const flowResult1 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Flow),
      record_counter: result1Data[0].recordCounter,
      record_name: ConstData.RecordName['1-buyCost'],
      stock_name: stockName,
      original_currency: result1Data[0].originalCurrencyDebit,
      org_domestic_currency: result1Data[0].originalCurrencyDebit,
      currency_flow_name: ConstData.CurrencyFlowName['1-buyCost'],
      currency_flow_code: ConstData.CurrencyFlowCode['1-buyCost'],
      visibility: result1Data[0].visibility
    });

    const flowResult2 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Flow),
      record_counter: result2Data[0].recordCounter,
      record_name: ConstData.RecordName['2-buyCommission'],
      stock_name: stockName,
      original_currency: -result2Data[0].originalCurrencyDebit,
      org_domestic_currency: -result2Data[0].originalCurrencyDebit,
      currency_flow_name: ConstData.CurrencyFlowName['2-buyCommission'],
      currency_flow_code: ConstData.CurrencyFlowCode['2-buyCommission'],
      visibility: result2Data[0].visibility
    });

    const flowResult3 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Flow),
      record_counter: result3Data[0].recordCounter,
      record_name: ConstData.RecordName['3-sellCost'],
      stock_name: stockName,
      original_currency: result3Data[0].originalCurrencyCredit,
      org_domestic_currency: result3Data[0].originalCurrencyCredit,
      currency_flow_name: ConstData.CurrencyFlowName['3-sellCost'],
      currency_flow_code: ConstData.CurrencyFlowCode['3-sellCost'],
      visibility: result3Data[0].visibility
    });

    const flowResult4 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Flow),
      record_counter: result4Data[0].recordCounter,
      record_name: ConstData.RecordName['4-sellCommission'],
      stock_name: stockName,
      original_currency: result4Data[0].originalCurrencyCredit,
      org_domestic_currency: result4Data[0].originalCurrencyCredit,
      currency_flow_name: ConstData.CurrencyFlowName['4-sellCommission'],
      currency_flow_code: ConstData.CurrencyFlowCode['4-sellCommission'],
      visibility: result4Data[0].visibility
    });

    const flowResult5 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Flow),
      record_counter: result5Data[0].recordCounter,
      record_name: ConstData.RecordName['5-profitLoss'],
      stock_name: stockName,
      original_currency: result5Data[0].originalCurrencyCredit,
      org_domestic_currency: result5Data[0].originalCurrencyCredit,
      currency_flow_name: ConstData.CurrencyFlowName['5-profitLoss'],
      currency_flow_code: ConstData.CurrencyFlowCode['5-profitLoss'],
      visibility: result5Data[0].visibility
    });

    const flowSpecialResults = resultSpecial.map((result) => {
      return Object.assign({}, commonTpl, {
        id: uniqid(IdPrefix.Flow),
        record_counter: result.recordCounter,
        record_name: ConstData.RecordName.specialRecord,
        stock_name: stockName,
        original_currency: result.originalCurrencyCredit,
        org_domestic_currency: result.originalCurrencyCredit,
        currency_flow_name: ConstData.CurrencyFlowName.specialRecord,
        currency_flow_code: ConstData.CurrencyFlowCode.specialRecord,
        visibility: result.visibility
      });
    });

    let allRecordsArr = [flowResult1, flowResult2, flowResult3, flowResult4, flowResult5];
    if (resultSpecial.length) {
      allRecordsArr = allRecordsArr.concat(flowSpecialResults);
    }

    try {
      await getRepository(OutputFlowAnalyse).insert(allRecordsArr);
      console.log(greenBoldText(`${stockName} flow result insert successfully`));
    } catch (e) { console.log(warningText('output flow insert error happened: '), e); }
  }

  public async generateAllFlowResults() {
    const allStockNames = await this.dataProcessor.getAllStockNames();

    for (let i = 0, len = allStockNames.length; i < len; i++) {
      await this.generateSingleFlowResult(allStockNames[i].stockName);
    }
    console.log(greenBoldText('all stock flow results inserted'));
  }

}