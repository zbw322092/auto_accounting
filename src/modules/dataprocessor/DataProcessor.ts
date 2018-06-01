import { getRepository } from 'typeorm';
import { StockTrades } from '../entities/stock.trades.entity';
import { StockTerminalMarketValue } from '../entities/stock.terminal.market.value.entity';
import { NcStockBeginningPeriod } from '../entities/nc.stock.beginning.period.entity';
import { numAdd, numDiv, numMulti, numSub } from '../../utils/caculation';
import { NcStockCode } from '../entities/nc.stock.code.entity';

export class DataProcessor {

  public async getAllStockNames(): Promise<Array<{ stockName: string }>> {
    const allStockNames: Array<{ stockName: string }> = await getRepository(StockTrades)
      .createQueryBuilder()
      .select('stock_name AS stockName')
      .groupBy('stock_name')
      .execute();

    return allStockNames;
  }

  private leapYear(year: number): boolean {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  }

  private monthLastDay(month: number, year: number): number {
    const month31days = [1, 3, 5, 7, 8, 10, 12];
    const month30days = [4, 6, 9, 11];

    if (month === 2 && this.leapYear(year)) { // february of leap year
      return 29;
    } else if (month === 2 && !this.leapYear(year)) {
      return 28;
    } else if (month31days.includes(month)) {
      return 31;
    } else if (month30days.includes(month)) {
      return 30;
    }
  }

  // 制单日期 or 业务日期
  public async documentMakeDate(stockName: string): Promise<string> {
    const tradeDate: Array<{ trade_date: string }> = await getRepository(StockTrades)
      .createQueryBuilder()
      .select('trade_date')
      .where(`stock_name = '${stockName}'`)
      .limit(1)
      .execute();

    if (tradeDate.length) {
      const date = String(tradeDate[0].trade_date);
      const year = date.slice(0, 4);
      const month = date.slice(4, 6);
      const lastDay = this.monthLastDay(Number(month), Number(year));
      return `${year}-${month}-${lastDay}`;
    }
  }

  // 证券名称相同 + 买卖标志为买入 时的 成交金额总和
  public async buyDealAmtSum(stockName: string) {
    const buyDealAmtSumResult: Array<{ buyDealAmtSum: string }> = await getRepository(StockTrades)
      .createQueryBuilder()
      .select('SUM(trade_total_price) buyDealAmtSum')
      .where(`trade_type = '买入'`)
      .andWhere(`stock_name = '${stockName}'`)
      .execute();

    if (!buyDealAmtSumResult.length) { return 0; }

    return buyDealAmtSumResult[0].buyDealAmtSum;
  }

  // 证券名称相同 + 买卖标志为买入 时的 “券商佣金+印花税+交易所费用+过户费+其他费+委托费”合计的总和
  public async buyCommissionSum(stockName: string) {
    const buyCommissionSumResult: Array<{ buyCommissionSum: string }> = await getRepository(StockTrades)
      .createQueryBuilder()
      .select('SUM(broker_commission + stamp_duty + exchange_fee + transfer_ownership_fee + other_fee + delegate_fee) buyCommissionSum')
      .where(`trade_type = '买入'`)
      .andWhere(`stock_name = '${stockName}'`)
      .execute();

    if (!buyCommissionSumResult.length) { return 0; }

    return buyCommissionSumResult[0].buyCommissionSum;
  }

  // 证券名称相同 + 买卖标志为卖出 + 备注“证券卖出” 时的 成交数量的绝对值
  public async sellDealAmtSumAbs(stockName: string) {
    const sellDealAmtSumAbsResult: Array<{sellDealAmtSumAbs: string}> = await getRepository(StockTrades)
      .createQueryBuilder()
      .select('ABS(SUM(trade_amt)) sellDealAmtSumAbs')
      .where(`trade_type = '卖出'`)
      .andWhere(`remark = '证券卖出'`)
      .andWhere(`stock_name = '${stockName}'`)
      .execute();

    return sellDealAmtSumAbsResult[0].sellDealAmtSumAbs;
  }

  // 证券名称相同 + 买卖标志为卖出 + 备注为证券卖出 时的 “券商佣金+印花税+交易所费用+过户费+其他费+委托费”合计的总和
  public async sellCommissionSum(stockName: string) {
    const sellCommissionSumResult: Array<{ sellCommissionSum: string }> = await getRepository(StockTrades)
      .createQueryBuilder()
      .select('SUM(broker_commission + stamp_duty + exchange_fee + transfer_ownership_fee + other_fee + delegate_fee) sellCommissionSum')
      .where(`trade_type = '卖出'`)
      .andWhere(`remark = '证券卖出'`)
      .andWhere(`stock_name = '${stockName}'`)
      .execute();

    return -sellCommissionSumResult[0].sellCommissionSum;
  }

  // 证券名称相同 + 买卖标志为卖出 + 备注为证券卖出 时的 成交额的总和
  public async sellDealPriceSum(stockName: string) {
    const sellDealPriceSumResult: Array<{ tradeTotalPrice: string }> = await getRepository(StockTrades)
      .createQueryBuilder()
      .select('SUM(trade_total_price) tradeTotalPrice')
      .where(`trade_type = '卖出'`)
      .andWhere(`remark = '证券卖出'`)
      .andWhere(`stock_name = '${stockName}'`)
      .execute();

    return sellDealPriceSumResult[0].tradeTotalPrice;
  }

  // 期末剩余数量
  public async terminalRestAmt(stockName: string) {
    const terminalRestAmtResult: Array<{ rest_amt: string }> = await getRepository(StockTerminalMarketValue)
      .createQueryBuilder()
      .select('rest_amt')
      .where(`stock_name = '${stockName}'`)
      .execute();

    if (!terminalRestAmtResult.length) { return 0; }

    return terminalRestAmtResult[0].rest_amt;
  }

  // 期末市值
  public async terminalMarketValue(stockName: string) {
    const terminalMarketValueResult: Array<{rest_market_value: string}> = await getRepository(StockTerminalMarketValue)
      .createQueryBuilder()
      .select('rest_market_value')
      .where(`stock_name = '${stockName}'`)
      .execute();

    if (!terminalMarketValueResult.length) { return 0; }

    return terminalMarketValueResult[0].rest_market_value;
  }

  // 期初成本
  public async beginPeriodCost(stockName: string) {
    const beginPeriodCostResult: Array<{begin_period_cost: string}> = await getRepository(NcStockBeginningPeriod)
      .createQueryBuilder()
      .select('begin_period_cost')
      .where(`finance_product_name = '${stockName}'`)
      .execute();

    if (!beginPeriodCostResult.length) { return 0; }

    return beginPeriodCostResult[0].begin_period_cost;
  }

  // 期初公允
  public async beginPeriodDiff(stockName: string) {
    const beginPeriodDiffResult: Array<{ begin_period_diff: string }> = await getRepository(NcStockBeginningPeriod)
      .createQueryBuilder()
      .select('begin_period_diff')
      .where(`finance_product_name = '${stockName}'`)
      .execute();

    if (!beginPeriodDiffResult.length) { return 0; }

    return beginPeriodDiffResult[0].begin_period_diff;
  }

  // 卖出成本行(第3行) 原币贷方金额列 的数值
  public async sellCostOriginCredit(stockName: string) {
    const sellDealAmtSumAbs = await this.sellDealAmtSumAbs(stockName);
    // 期末剩余数量
    const terminalRestAmt = await this.terminalRestAmt(stockName);
    // 期初成本
    const beginPeriodCost = await this.beginPeriodCost(stockName);
    const buyDealAmtSum = await this.buyDealAmtSum(stockName);

    return numMulti(
      numDiv(sellDealAmtSumAbs, numAdd(terminalRestAmt, sellDealAmtSumAbs)),
      numAdd(beginPeriodCost, buyDealAmtSum)
    );
  }

  // 盈亏行(第5行) 原币贷方金额列 的数值
  public async profitLossOriginCredit(stockName: string) {
    const sellDealPriceSum = await this.sellDealPriceSum(stockName);
    const sellCostOriginCredit = await this.sellCostOriginCredit(stockName);

    return numSub(sellDealPriceSum, sellCostOriginCredit);
  }

  // 资金变动行(第6行) 原币借方金额列 or 原币贷方金额列(由最终计算金额的正负值来决定)
  public async debitCreditDiff(stockName: string) {
    // 借方各项数据总和
    const debitSum = numAdd(await this.buyDealAmtSum(stockName), await this.buyCommissionSum(stockName));
    // 贷方各项数据总和
    const creditSum = numAdd(
      numAdd(await this.sellCostOriginCredit(stockName), await this.sellCommissionSum(stockName)),
      await this.profitLossOriginCredit(stockName));

    return numSub(debitSum, creditSum);
  }

  // 市值1行(第7行) 原币借方金额列
  public async marketValueOneOriginCredit(stockName: string) {
    // 期末市值
    const terminalMarketValue = await this.terminalMarketValue(stockName);
    // 期初成本
    const beginPeriodCost = await this.beginPeriodCost(stockName);
    // 期初公允
    const beginPeriodDiff = await this.beginPeriodDiff(stockName);
    const buyDealAmtSum = await this.buyDealAmtSum(stockName);
    const sellCostOriginCredit = await this.sellCostOriginCredit(stockName);

    return numSub(terminalMarketValue,
      numSub(
        numAdd(beginPeriodCost, numAdd(beginPeriodDiff, buyDealAmtSum)),
        sellCostOriginCredit
      )
    );
  }

  private async getArchiveCode(stockName: string): Promise<string> {
    const archiveCode: Array<{ archive_code: string }> = await getRepository(NcStockCode)
      .createQueryBuilder()
      .select('archive_code')
      .where(`archive_name = '${stockName}'`)
      .execute();

    if (!archiveCode.length) { return ''; }

    return archiveCode[0].archive_code;
  }

  // 辅助核算
  public async assistAccounting(stockName: string) {
    const archiveCode = await this.getArchiveCode(stockName);

    return `${archiveCode}:理财产品`;
  }

  // 买卖标志为“卖出” + 备注不是“证券卖出” 的对应的 成交额
  public async specialRecords(stockName: string) {
    const specialRecordsResult: Array<{ tradeTotalPrice: string }> = await getRepository(StockTrades)
      .createQueryBuilder()
      .select('trade_total_price AS tradeTotalPrice')
      .where(`trade_type = '卖出'`)
      .andWhere(`remark != '证券卖出'`)
      .execute();

    return specialRecordsResult;
  }

  public async specialRecordsSum(stockName: string) {
    const specialRecordsResult = await this.specialRecords(stockName);
    let recordsSum: number = 0;
    specialRecordsResult.forEach((record) => {
      recordsSum = numAdd(recordsSum, record.tradeTotalPrice);
    });

    return recordsSum;
  }
}