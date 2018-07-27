import cp from 'child_process';
import fs from 'fs';

import JsonProcess from './JsonProcess';
import { getTSServerPath } from './utils';
import { TsServerMessage } from './types';

export interface TsLangClientOptions {
  debugMode?: boolean;
}

class TsLangClient {
  private jsonProc: JsonProcess;

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
  }

  public close() {
    if (this.jsonProc) {
      this.jsonProc.close();
      this.jsonProc = null;
    }
  }

  public async invoke(command: string, args: {}): Promise<TsServerMessage> {
    return this.jsonProc.sendCommand(command, args, true);
  }

  public async invokeWithoutReply(command: string, args: {}) {
    await this.jsonProc.sendCommand(command, args, false);
  }
}

export default TsLangClient;
