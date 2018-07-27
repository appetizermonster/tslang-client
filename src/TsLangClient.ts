import cp, { ChildProcess } from 'child_process';
import fs from 'fs';
import { getTSServerPath } from 'utils';

class TsLangClient {
  private server: ChildProcess;

  public async connect() {
    const tsServerPath = getTSServerPath();
    if (!fs.existsSync(tsServerPath)) {
      throw new Error('Cannot find tsserver library');
    }
    this.server = cp.fork(tsServerPath, [], { silent: true });
  }

  public close() {
    this.server.kill();
    this.server = null;
  }
}

export default TsLangClient;
