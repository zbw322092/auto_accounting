import { getRepository } from 'typeorm';
import { OutputVoucher } from '../entities/output.voucher.entity';
import { ConstData } from '../dataprocessor/ConstData';
import { ConstOutData } from './ConstOutData';
import * as XLSX from 'XLSX';
import { VoucherBuilder } from './VoucherBuilder';

export class DistWritter {

  public async getVoucherRecords() {
    const voucherResult: ConstOutData.IVoucherData[] = await getRepository(OutputVoucher)
      .createQueryBuilder()
      .select(`record_counter, account_book, voucher_type, voucher_code, attached_documents,
      document_maker_code, document_make_date, abstract, account_code, currency, original_currency_debit,
      domestic_currency_debit, business_unit_code, original_currency_credit, domestic_currency_credit,
      bussiness_date, org_domestic_currency_rate, assist_accounting`)
      .where(`visibility = '${ ConstData.Visibility.show }'`)
      .execute();

    return voucherResult;
  }

  public async voucherWritter() {
    const voucherResult = await this.getVoucherRecords();
    const allVouchers = voucherResult.map((result) => {
      return new VoucherBuilder(result);
    });
    const outVoucherWs = XLSX.utils.json_to_sheet(allVouchers,
      { header: ConstOutData.VHeadersArr, skipHeader: false });

    const outWorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(outWorkBook, outVoucherWs, 'final_output');

    XLSX.writeFile(outWorkBook, 'out.xlsx');
    console.log('file done');
  }
}