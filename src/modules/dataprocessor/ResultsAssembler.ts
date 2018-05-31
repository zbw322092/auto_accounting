import { DataProcessor } from './DataProcessor';
import { ConstData } from './ConstData';
import { uniqid } from '../../utils/uniqid';
import { IdPrefix } from '../common/const/idPrefix';

export class ResultsAssembler {
  constructor () {
    this.dataProcessor = new DataProcessor();
  }

  public dataProcessor: DataProcessor;

  public async generateStockVoucherResults(stockName: string) {
    const documentMakeDate = await this.dataProcessor.documentMakeDate(stockName);
    const assistAccounting = await this.dataProcessor.assistAccounting(stockName);
    const commonTpl = {
      account_book: ConstData.AccountBookCode,
      voucher_type: ConstData.VoucherTypeCode,
      voucher_code: ConstData.voucherCode,
      attached_documents: ConstData.AttachedDocNum,
      document_maker_code: ConstData.DocMakerCode,
      document_make_date: documentMakeDate,
      currency: ConstData.Currency,
      business_unit_code: ConstData.BizUnitCode,
      bussiness_date: documentMakeDate,
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
      record_name: ConstData.RecordName['1-buyCost'],
      abstract: `买入${stockName}`,
      account_code: ConstData.AccountCode['1-buyCost'],
      original_currency_debit: buyDealAmtSum,
      domestic_currency_debit: buyDealAmtSum,
      original_currency_credit: null,
      domestic_currency_credit: null
    });

    // 2. 买入手续费
    const buyCommissionSum = await this.dataProcessor.buyCommissionSum(stockName);
    const result2 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Voucher),
      record_name: ConstData.RecordName['2-buyCommission'],
      abstract: `买入${stockName}手续费`,
      account_code: ConstData.AccountCode['2-buyCommission'],
      original_currency_debit: buyCommissionSum,
      domestic_currency_debit: buyCommissionSum,
      original_currency_credit: null,
      domestic_currency_credit: null
    });

    // 3. 卖出成本
    const sellCostOriginCredit = await this.dataProcessor.sellCostOriginCredit(stockName);
    const result3 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Voucher),
      record_name: ConstData.RecordName['3-sellCost'],
      abstract: `卖出${stockName}`,
      account_code: ConstData.AccountCode['3-sellCost'],
      original_currency_debit: null,
      domestic_currency_debit: null,
      original_currency_credit: sellCostOriginCredit,
      domestic_currency_credit: sellCostOriginCredit
    });

    // 4. 卖出手续费
    const sellCommissionSum = await this.dataProcessor.sellCommissionSum(stockName);
    const result4 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Voucher),
      record_name: ConstData.RecordName['4-sellCommission'],
      abstract: `卖出${stockName}手续费`,
      account_code: ConstData.AccountCode['4-sellCommission'],
      original_currency_debit: null,
      domestic_currency_debit: null,
      original_currency_credit: sellCommissionSum,
      domestic_currency_credit: sellCommissionSum
    });

    // 5. 盈亏
    const profitLossOriginCredit = await this.dataProcessor.profitLossOriginCredit(stockName);
    const result5 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Voucher),
      record_name: ConstData.RecordName['5-profitLoss'],
      abstract: `卖出${stockName}盈亏`,
      account_code: ConstData.AccountCode['5-profitLoss'],
      original_currency_debit: null,
      domestic_currency_debit: null,
      original_currency_credit: profitLossOriginCredit,
      domestic_currency_credit: profitLossOriginCredit
    });

    // 6. 资金变动
    const debitCreditDiff = await this.dataProcessor.debitCreditDiff(stockName);
    const result6 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Voucher),
      record_name: ConstData.RecordName['6-fundingDiff'],
      abstract: '东证账户变动',
      account_code: ConstData.AccountCode['6-fundingDiff'],
      original_currency_debit: debitCreditDiff > 0 ? null : debitCreditDiff,
      domestic_currency_debit: debitCreditDiff > 0 ? null : debitCreditDiff,
      original_currency_credit: debitCreditDiff > 0 ? debitCreditDiff : null,
      domestic_currency_credit: debitCreditDiff > 0 ? debitCreditDiff : null
    });

    // 7. 市值1
    const marketValueOneOriginCredit = await this.dataProcessor.marketValueOneOriginCredit(stockName);
    const result7 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Voucher),
      record_name: ConstData.RecordName['7-marketValue1'],
      abstract: `${stockName}公允变动`,
      account_code: ConstData.AccountCode['7-marketValue1'],
      original_currency_debit: null,
      domestic_currency_debit: null,
      original_currency_credit: marketValueOneOriginCredit,
      domestic_currency_credit: marketValueOneOriginCredit
    });

    // 8. 市值2
    const result8 = Object.assign({}, commonTpl, {
      id: uniqid(IdPrefix.Voucher),
      record_name: ConstData.RecordName['8-marketValue2'],
      abstract: `${stockName}公允变动`,
      account_code: ConstData.AccountCode['8-marketValue2'],
      original_currency_debit: marketValueOneOriginCredit > 0 ? marketValueOneOriginCredit : null,
      domestic_currency_debit: marketValueOneOriginCredit > 0 ? marketValueOneOriginCredit : null,
      original_currency_credit: marketValueOneOriginCredit > 0 ? null : Math.abs(marketValueOneOriginCredit),
      domestic_currency_credit: marketValueOneOriginCredit > 0 ? null : Math.abs(marketValueOneOriginCredit)
    });
  }
}