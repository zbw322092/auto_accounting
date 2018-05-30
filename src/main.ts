import 'reflect-metadata';
import { createConnection } from 'typeorm';
import nconf from './config/config';
import { SourceReader } from './modules/sourcereader/SourceReader';

const bootstrape = async () => {
  try {
    await createConnection(nconf.get('database'));
  } catch (e) { console.error(e); }

  const sourceReader = new SourceReader();

  sourceReader.readFileStream('data-sourcesss.xlsx');
};

bootstrape();