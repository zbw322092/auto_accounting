export namespace ConstOutData {

  export enum VHeaders {
    'h1' = '"null_$head,main_m_pk_accountingbook,main_m_pk_vouchertype,main_m_num,main_m_attachment,main_pk_prepared,main_m_prepareddate,m_explanation,m_accsubjcode,m_pk_currtype,m_debitamount,m_localdebitamount,m_groupdebitamount,m_globaldebitamount,unitname,m_price,m_debitquantity,m_creditquantity,m_creditamount,m_localcreditamount,m_groupcreditamount,m_globalcreditamount,m_checkno,m_checkdate,verifyno,verifydate,m_bankaccount,billtype,m_checkstyle,vat_pk_vatcountry,vat_pk_receivecountry,vat_businesscode,vat_pk_clientvatcode,vat_pk_suppliervatcode,vat_pk_taxcode,vat_direction,vat_moneyamount,m_excrate2,excrate3,excrate4,ass_1,ass_2,ass_3,ass_4,ass_5,ass_6,ass_7,ass_8,ass_9"',
    'h2' = '* 核算账簿',
    'h3' = '* 凭证类别编码',
    'h4' = '* 凭证号',
    'h5' = '附单据数',
    'h6' = '* 制单人编码',
    'h7' = '* 制单日期',
    'h8' = '* 摘要',
    'h9' = '* 科目编码',
    'h10' = '* 币种',
    'h11' = '* 原币借方金额',
    'h12' = '* 本币借方金额',
    'h13' = '集团本币借方金额',
    'h14' = '全局本币借方金额',
    'h15' = '业务单元编码',
    'h16' = '单价',
    'h17' = '借方数量',
    'h18' = '贷方数量',
    'h19' = '* 原币贷方金额',
    'h20' = '* 本币贷方金额',
    'h21' = '集团本币贷方金额',
    'h22' = '全局本币贷方金额',
    'h23' = '结算号',
    'h24' = '结算日期',
    'h25' = '核销号',
    'h26' = '业务日期',
    'h27' = '银行账户',
    'h28' = '票据类型',
    'h29' = '结算方式',
    'h30' = '报税国家',
    'h31' = '收货国',
    'h32' = '交易代码',
    'h33' = '客户VAT注册码',
    'h34' = '供应商VAT注册码',
    'h35' = '税码',
    'h36' = 'VAT方向',
    'h37' = '计税金额',
    'h38' = '组织本币汇率',
    'h39' = '集团本币汇率',
    'h40' = '全局本币汇率',
    'h41' = '辅助核算1',
    'h42' = '辅助核算2',
    'h43' = '辅助核算3',
    'h44' = '辅助核算4',
    'h45' = '辅助核算5',
    'h46' = '辅助核算6',
    'h47' = '辅助核算7',
    'h48' = '辅助核算8',
    'h49' = '辅助核算9'
  }

  export const VHeadersArr = [VHeaders.h1, VHeaders.h2, VHeaders.h3, VHeaders.h4, VHeaders.h5, VHeaders.h6, VHeaders.h7, VHeaders.h8, VHeaders.h9, VHeaders.h10,
  VHeaders.h11, VHeaders.h12, VHeaders.h13, VHeaders.h14, VHeaders.h15, VHeaders.h16, VHeaders.h17, VHeaders.h18, VHeaders.h19, VHeaders.h20,
  VHeaders.h21, VHeaders.h22, VHeaders.h23, VHeaders.h24, VHeaders.h25, VHeaders.h26, VHeaders.h27, VHeaders.h28, VHeaders.h29, VHeaders.h30,
  VHeaders.h31, VHeaders.h32, VHeaders.h33, VHeaders.h34, VHeaders.h35, VHeaders.h36, VHeaders.h37, VHeaders.h38, VHeaders.h39, VHeaders.h40,
  VHeaders.h41, VHeaders.h42, VHeaders.h43, VHeaders.h44, VHeaders.h45, VHeaders.h46, VHeaders.h47, VHeaders.h48, VHeaders.h49];

  export interface IVoucherData {
    record_counter: string;
    account_book: string;
    voucher_type: string;
    voucher_code: string;
    attached_documents: string;
    document_maker_code: string;
    document_make_date: string;
    abstract: string;
    account_code: string;
    currency: string;
    original_currency_debit: string;
    domestic_currency_debit: string;
    business_unit_code: string;
    original_currency_credit: string;
    domestic_currency_credit: string;
    bussiness_date: string;
    org_domestic_currency_rate: string;
    assist_accounting: string;
  }

  export enum FHeaders {
    'h1' = '"cashflow,m_flag,cashflowcurr,m_money,m_moneymain,m_moneygroup,m_moneyglobal,cashflowinnercorp,cashflowName,cashflowCode"',
    'h2' = '方向',
    'h3' = '分析币种',
    'h4' = '原币',
    'h5' = '组织本币',
    'h6' = '集团本币',
    'h7' = '全局本币',
    'h8' = '内部单位',
    'h9' = '现金流量名称',
    'h10' = '现金流量编码'
  }

  export const FHeadersArr = [
    FHeaders.h1, FHeaders.h2, FHeaders.h3, FHeaders.h4, FHeaders.h5,
    FHeaders.h6, FHeaders.h7, FHeaders.h8, FHeaders.h9, FHeaders.h10
  ];

  export interface IFlowData {
    record_counter: string;
    direction: string;
    analyse_currency: string;
    original_currency: string;
    org_domestic_currency: string;
    group_domestic_currency: string;
    overall_domestic_currency: string;
    inner_unit: string;
    currency_flow_name: string;
    currency_flow_code: string;
  }
}