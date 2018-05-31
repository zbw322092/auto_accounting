import { DataProcessor } from './DataProcessor';

export class ResultsAssembler {
  constructor () {
    this.dataProcessor = new DataProcessor();
  }

  public dataProcessor: DataProcessor;

}