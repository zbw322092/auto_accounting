// 结果中记录对应的名字
const enum RecordName {
  '1-buyCost' = '1-buyCost',
  '2-buyCommission' = '2-buyCommission',
  '3-sellCost' = '3-sellCost',
  '4-sellCommission' = '4-sellCommission',
  '5-profitLoss' = '5-profitLoss',
  '6-fundingDiff' = '6-fundingDiff',
  '7-marketValue1' = '7-marketValue1',
  '8-marketValue2' = '8-marketValue2',
  'specialRecord' = 'specialRecord',
  'specialRecordSum' = 'specialRecordSum'
}

// 科目编码
export enum AccountCode {
  '1-buyCost' = '11010101',
  '2-buyCommission' = '61110101',
  '3-sellCost' = '11010101',
  '4-sellCommission' = '61110101',
  '5-profitLoss' = '61110101',
  '6-fundingDiff' = '10310101',
  '7-marketValue1' = '61010101',
  '8-marketValue2' = '11010102',
  'specialRecord' = '601101',
  'specialRecordSum' = '10310101'
}

// 现金流量名称
export enum CurrencyFlowName {
  '1-buyCost' = '投资支付的现金',
  '2-buyCommission' = '取得投资收益收到的现金',
  '3-sellCost' = '收回投资收到的现金',
  '4-sellCommission' = '取得投资收益收到的现金',
  '5-profitLoss' = '取得投资收益收到的现金',
  'specialRecord' = '取得投资收益收到的现金'
}

// 现金流量编号
export enum CurrencyFlowCode {
  '1-buyCost' = '1222',
  '2-buyCommission' = '1212',
  '3-sellCost' = '1211',
  '4-sellCommission' = '1212',
  '5-profitLoss' = '1212',
  'specialRecord' = '1212'
}

// 核算账簿
export const AccountBookCode = '49-0002';

// 凭证类别编码
export const VoucherTypeCode = '01';

// 凭证号
export const voucherCode = '300';

// 附单据数
export const AttachedDocNum = '0';

// 制单人编码
export const DocMakerCode = '49161102';

// 币种
export const Currency = '人民币';

// 业务单元编码
export const BizUnitCode = '49';