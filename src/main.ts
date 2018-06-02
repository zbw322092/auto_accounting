import 'reflect-metadata';
import { createConnection } from 'typeorm';
import nconf from './config/config';
import { SourceReader } from './modules/sourcereader/SourceReader';
import { DataProcessor } from './modules/dataprocessor/DataProcessor';
import { ResultsAssembler } from './modules/dataprocessor/ResultsAssembler';

const bootstrape = async () => {
  try {
    await createConnection(nconf.get('database'));

    // const sourceReader = new SourceReader();
    // sourceReader.readFileStream('data-source.xlsx');

    const resultsAssembler = new ResultsAssembler();
    await resultsAssembler.generateAllVoucherResults();
    await resultsAssembler.generateAllFlowResults();

  } catch (e) { console.error(e); }
};

bootstrape();