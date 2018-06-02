import { ConstOutData } from './ConstOutData';

export class VoucherBuilder {
  constructor(voucherData: ConstOutData.IVoucherData) {
    const { record_counter, account_book, voucher_type, voucher_code, attached_documents,
      document_maker_code, document_make_date, abstract, account_code, currency, original_currency_debit,
      domestic_currency_debit, business_unit_code, original_currency_credit, domestic_currency_credit,
      bussiness_date, org_domestic_currency_rate, assist_accounting } = voucherData;

    this[ConstOutData.VHeaders.h1] = record_counter;
    this[ConstOutData.VHeaders.h2] = account_book;
    this[ConstOutData.VHeaders.h3] = voucher_type;
    this[ConstOutData.VHeaders.h4] = voucher_code;
    this[ConstOutData.VHeaders.h5] = attached_documents;
    this[ConstOutData.VHeaders.h6] = document_maker_code;
    this[ConstOutData.VHeaders.h7] = document_make_date;
    this[ConstOutData.VHeaders.h8] = abstract;
    this[ConstOutData.VHeaders.h9] = account_code;
    this[ConstOutData.VHeaders.h10] = currency;
    this[ConstOutData.VHeaders.h11] = original_currency_debit;
    this[ConstOutData.VHeaders.h12] = domestic_currency_debit;
    this[ConstOutData.VHeaders.h13] = null;
    this[ConstOutData.VHeaders.h14] = null;
    this[ConstOutData.VHeaders.h15] = business_unit_code;
    this[ConstOutData.VHeaders.h16] = null;
    this[ConstOutData.VHeaders.h17] = null;
    this[ConstOutData.VHeaders.h18] = null;
    this[ConstOutData.VHeaders.h19] = original_currency_credit;
    this[ConstOutData.VHeaders.h20] = domestic_currency_credit;
    this[ConstOutData.VHeaders.h21] = null;
    this[ConstOutData.VHeaders.h22] = null;
    this[ConstOutData.VHeaders.h23] = null;
    this[ConstOutData.VHeaders.h24] = null;
    this[ConstOutData.VHeaders.h25] = null;
    this[ConstOutData.VHeaders.h26] = bussiness_date;
    this[ConstOutData.VHeaders.h27] = null;
    this[ConstOutData.VHeaders.h28] = null;
    this[ConstOutData.VHeaders.h29] = null;
    this[ConstOutData.VHeaders.h30] = null;
    this[ConstOutData.VHeaders.h31] = null;
    this[ConstOutData.VHeaders.h32] = null;
    this[ConstOutData.VHeaders.h33] = null;
    this[ConstOutData.VHeaders.h34] = null;
    this[ConstOutData.VHeaders.h35] = null;
    this[ConstOutData.VHeaders.h36] = null;
    this[ConstOutData.VHeaders.h37] = null;
    this[ConstOutData.VHeaders.h38] = org_domestic_currency_rate;
    this[ConstOutData.VHeaders.h39] = null;
    this[ConstOutData.VHeaders.h40] = null;
    this[ConstOutData.VHeaders.h41] = assist_accounting;
    this[ConstOutData.VHeaders.h42] = null;
    this[ConstOutData.VHeaders.h43] = null;
    this[ConstOutData.VHeaders.h44] = null;
    this[ConstOutData.VHeaders.h45] = null;
    this[ConstOutData.VHeaders.h46] = null;
    this[ConstOutData.VHeaders.h47] = null;
    this[ConstOutData.VHeaders.h48] = null;
    this[ConstOutData.VHeaders.h49] = null;
  }
  public record_counter;
  public account_book;
  public voucher_type;
  public voucher_code;
  public attached_documents;
  public document_maker_code;
  public document_make_date;
  public abstract;
  public account_code;
  public currency;
  public original_currency_debit;
  public domestic_currency_debit;
  public business_unit_code;
  public original_currency_credit;
  public domestic_currency_credit;
  public bussiness_date;
  public assist_accounting;
}