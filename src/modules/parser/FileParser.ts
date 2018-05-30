import * as fs from 'fs';
import * as path from 'path';
import { Readable } from 'stream';
import { Buffer } from 'buffer';
import * as XLSX from 'XLSX';
import nconf from '../../config/config';
import { TableNames, ITradesCols, ITerminalMarkertCols, IBeginningPeriodCols, IStockCode } from '../common/const/TableConst';
import { getRepository } from 'typeorm';
import { StockTrades } from '../entities/stock.trades.entity';
import { uniqid } from '../../utils/uniqid';
import { IdPrefix } from '../common/const/idPrefix';

export class FileParser {

  protected sourceData = [];

  private readonly dataRourcePath = path.join(nconf.get('paths:src'), nconf.get('paths:dataSource'));

  public readFileStream = (fileName: string): void => {
    const filePath: string = path.join(this.dataRourcePath, './', fileName);
    const readableStream: Readable = fs.createReadStream(filePath);
    const buffers = [];

    readableStream.on('data', (data) => { buffers.push(data); });
    readableStream.on('end', () => {
      const fileBuffer = Buffer.concat(buffers);

      const workBook = XLSX.read(fileBuffer, { type: 'buffer' });
      const workBookSheets = workBook.Sheets || {};

      const transformOptions = { defval: null, raw: true };
      // table 1 - 股票交易明细表
      const tradesData: ITradesCols[] = XLSX.utils.sheet_to_json(workBookSheets[TableNames.trades], transformOptions);
      // table 2 - 股票期末市值表
      const terminalMarketData: ITerminalMarkertCols[] = XLSX.utils.sheet_to_json(workBookSheets[TableNames.terminalMarket], transformOptions);
      // table 3 - NC股票期初数表
      const beginningPeriodData: IBeginningPeriodCols[] = XLSX.utils.sheet_to_json(workBookSheets[TableNames.beginningPeriod], transformOptions);
      // table 4 - NC股票代码表
      const stockCodeData: IStockCode[] = XLSX.utils.sheet_to_json(workBookSheets[TableNames.stockCode], transformOptions);

      this.handlerTradesData(tradesData);
    });
  }

  private handlerTradesData = (tradesData: ITradesCols[]) => {
    tradesData = tradesData || [];
    const stockTradesRepository = getRepository(StockTrades);
    console.log(stockTradesRepository);
    Promise.all(
      tradesData.map(async (record) => {
        return await stockTradesRepository.insert({
          id: uniqid(IdPrefix.Trades),
          trade_date: record.发生日期 !== null ? String(record.发生日期) : null,
          stock_code: record.证券代码 !== null ? String(record.证券代码) : null,
          stock_name: record.证券名称,
          trade_type: record.买卖标志,
          trade_amt: record.成交数量,
          trade_price: record.成交价格,
          trade_total_price: record.成交金额,
          happened_total_price: record.发生金额,
          rest_total_price: record.剩余金额,
          declare_code: record.申报序号 !== null ? String(record.申报序号) : null,
          shareholder_code: record.股东代码 !== null ? String(record.股东代码) : null,
          seat_code: record.席位代码 !== null ? String(record.席位代码) : null,
          delegate_code: record.委托编号 !== null ? String(record.委托编号) : null,
          deal_code: record.成交编号 !== null ? String(record.成交编号) : null,
          stock_amt: record.证券数量,
          broker_commission: record.券商佣金,
          stamp_duty: record.印花税,
          exchange_fee: record.交易所费用,
          transfer_ownership_fee: record.过户费,
          other_fee: record.其他费,
          delegate_fee: record.委托费,
          remark: record.备注
        });
      })
    ).then((results) => {
      console.log(`${results.length} records have been inserted successfully`);
    }).catch((e) => { console.error(`error happened: ${e}`); });
  }
}
