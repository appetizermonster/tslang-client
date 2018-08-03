import cp from 'child_process';
import fs from 'fs';

import JsonProcess from './JsonProcess';
import TsLangApi from './TsLangApi';
import { getTSServerPath } from './utils';

export interface TsLangClientOptions {
  debugMode?: boolean;
}

class TsLangClient {
  private jsonProc: JsonProcess;
  private __api: TsLangApi = null; // tslint:disable-line

  constructor(private readonly opts: TsLangClientOptions = {}) {}

  public connect() {
    const tsServerPath = getTSServerPath();
    if (!fs.existsSync(tsServerPath)) {
      throw new Error('Cannot find tsserver library');
    }

    const proc = cp.fork(tsServerPath, [], { silent: true });
    if (!proc) {
      throw new Error('Cannot fork tsserver library');
    }

    this.jsonProc = new JsonProcess(proc, this.opts.debugMode || false);
    this.__api = new TsLangApi(this.jsonProc);
  }

  public close() {
    if (this.jsonProc) {
      this.jsonProc.close();
      this.jsonProc = null;
    }
  }

  public get api() {
    if (!this.__api) {
      throw new Error('You should invoke connect first');
    }
    return this.__api;
  }
}

export default TsLangClient;
