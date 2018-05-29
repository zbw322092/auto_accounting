import * as fs from 'fs';
import * as path from 'path';
import { Readable } from 'stream';
import { Buffer } from 'buffer';
import * as XLSX from 'XLSX';
import nconf from '../../config/config';

export class FileParser {

  private readonly dataRourcePath = path.join(nconf.get('paths:root'), nconf.get('paths:dataSource'));

  public readFileStream = (fileName: string, callback: (any) => any) => {
    const filePath: string = path.join(this.dataRourcePath, './', fileName);
    const readableStream: Readable = fs.createReadStream(filePath);
    const buffers = [];
  
    readableStream.on('data', (data) => { buffers.push(data); })
    readableStream.on('end', () => {
        const fileBuffer = Buffer.concat(buffers);
  
        const workBook = XLSX.read(fileBuffer, { type: 'buffer' });

        console.log('data: ', workBook);
      });
  }
}
