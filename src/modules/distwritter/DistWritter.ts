import { getRepository } from 'typeorm';
import { OutputVoucher } from '../entities/output.voucher.entity';
import { ConstData } from '../dataprocessor/ConstData';
import { ConstOutData } from './ConstOutData';
import * as XLSX from 'XLSX';
import { VoucherBuilder } from './VoucherBuilder';
import { OutputFlowAnalyse } from '../entities/output.flow.analyse.entity';
import { FlowBuilder } from './FlowBuilder';
import * as path from 'path';
import nconf from '../../config/config';
import { greenBoldText } from '../../utils/chalkColors';

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

  public async getFlowRecords() {
    const flowResults: ConstOutData.IFlowData[] = await getRepository(OutputFlowAnalyse)
      .createQueryBuilder()
      .select(`record_counter, direction, analyse_currency, original_currency, org_domestic_currency,
      group_domestic_currency, overall_domestic_currency, inner_unit, currency_flow_name, currency_flow_code`)
      .where(`visibility = '${ ConstData.Visibility.show }'`)
      .execute();

    return flowResults;
  }

  public fileName = 'output.xlsx';

  public async voucherWritter() {
    const voucherResult = await this.getVoucherRecords();
    const flowResult = await this.getFlowRecords();
    const allVouchers = voucherResult.map((result) => {
      return new VoucherBuilder(result);
    });
    const allFlows = flowResult.map((result) => {
      return new FlowBuilder(result);
    });
    const outputWs = XLSX.utils.json_to_sheet(allVouchers,
      { header: ConstOutData.VHeadersArr, skipHeader: false });

    XLSX.utils.sheet_add_json(outputWs, allFlows,
      { header: ConstOutData.FHeadersArr, origin: allVouchers.length + 2 });

    const outWorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(outWorkBook, outputWs, 'final_output');

    const distPath = path.join(nconf.get('paths:src'), nconf.get('paths:dataDist'));
    XLSX.writeFile(outWorkBook, distPath + '/' + this.fileName);

    console.log(greenBoldText(`Output file generated, file name: ${this.fileName}`));
  }
}