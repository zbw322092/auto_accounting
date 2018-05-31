import 'reflect-metadata';
import { createConnection } from 'typeorm';
import nconf from './config/config';
import { SourceReader } from './modules/sourcereader/SourceReader';
import { DataProcessor } from './modules/dataprocessor/DataProcessor';

const bootstrape = async () => {
  try {
    await createConnection(nconf.get('database'));
  } catch (e) { console.error(e); }

  // const sourceReader = new SourceReader();

  // sourceReader.readFileStream('data-source.xlsx');

  const dataProcessor = new DataProcessor();
  const result = await dataProcessor.documentMakeDate('黑猫股份');
  // const result = await dataProcessor.marketValueOneOriginCredit('黑猫股份');

  console.log(result);
};

bootstrape();