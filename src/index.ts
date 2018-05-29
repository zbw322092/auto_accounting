import { FileParser } from "./parser/FileParser";

const fileParser = new FileParser();

fileParser.readFileStream('data-source.xlsx', () => {});