import { createConnection } from "typeorm";
import nconf from "./config/config";

createConnection(nconf.get('database')).then((connection) => {
  console.log('db connected');
}).catch((e) => { console.error(e); })