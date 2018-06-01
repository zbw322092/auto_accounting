import 'reflect-metadata';
import { createConnection } from 'typeorm';
import nconf from './config/config';
import { SourceReader } from './modules/sourcereader/SourceReader';
import { DataProcessor } from './modules/dataprocessor/DataProcessor';
import { ResultsAssembler } from './modules/dataprocessor/ResultsAssembler';

const bootstrape = async () => {
  try {
    await createConnection(nconf.get('database'));

    const resultsAssembler = new ResultsAssembler();
    resultsAssembler.generateStockVoucherResults('黑猫股份');

  } catch (e) { console.error(e); }
};

bootstrape();