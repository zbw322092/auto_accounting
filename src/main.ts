import 'reflect-metadata';
import { createConnection } from 'typeorm';
import nconf from './config/config';
import { FileParser } from './modules/parser/FileParser';

const bootstrape = async () => {
  try {
    await createConnection(nconf.get('database'));
  } catch (e) { console.error(e); }

  const fileParser = new FileParser();

  fileParser.readFileStream('data-source.xlsx');
};

bootstrape();