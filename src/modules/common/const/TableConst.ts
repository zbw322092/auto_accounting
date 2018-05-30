export enum TableNames {
  'trades' = 'stock_trades',
  'terminalMarket' = 'stock_terminal_market_value',
  'beginningPeriod' = 'nc_stock_ beginning_period',
  'stockCode' = 'nc_stock_code'
}

export interface ITradesCols {
  '发生日期': string;
  '证券代码': string;
  '证券名称': string;
  '买卖标志': string;
  '成交数量': number;
  '成交价格': number;
  '成交金额': number;
  '发生金额': number;
  '剩余金额': number;
  '申报序号': string;
  '股东代码': string;
  '席位代码': string;
  '委托编号': string;
  '成交编号': string;
  '证券数量': number;
  '券商佣金': number;
  '印花税': number;
  '交易所费用': number;
  '过户费': number;
  '其他费': number;
  '委托费': number;
  '备注': string;
}

export interface ITerminalMarkertCols {
  '证券名称': string;
  '期末剩余数量': number;
  '期末市值': string;
}

export interface IBeginningPeriodCols {
  '理财产品名称': string;
  '方向': string;
  '期初成本': number;
  '期初公允': number;
}

export interface IStockCode {
  '所属组织': string;
  '档案编码': string;
  '档案名称': string;
  '简称': string;
  '助记码': string;
  '上级档案': string;
  '备注': string;
}