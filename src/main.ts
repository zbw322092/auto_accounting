import 'reflect-metadata';
import { createConnection } from 'typeorm';
import nconf from './config/config';
import { SourceReader } from './modules/sourcereader/SourceReader';
import { DataProcessor } from './modules/dataprocessor/DataProcessor';
import { ResultsAssembler } from './modules/dataprocessor/ResultsAssembler';
import { DistWritter } from './modules/distwritter/DistWritter';
import * as path from 'path';

const bootstrape = async () => {
  try {
    await createConnection(nconf.get('database'));

    // read file
    // const sourceReader = new SourceReader();
    // sourceReader.readFileStream('data-source.xlsx');

    // process data
    const resultsAssembler = new ResultsAssembler();
    await resultsAssembler.generateAllVoucherResults();
    await resultsAssembler.generateAllFlowResults();

    // // write data
    const distWritter = new DistWritter();
    await distWritter.voucherWritter();

  } catch (e) { console.error(e); }
};

bootstrape();