import cp, { ChildProcess } from 'child_process';
import { getTSServerPath } from 'utils';

class TsLangClient {
  private server: ChildProcess;

  public async connect() {
    const tsServerPath = getTSServerPath();
    this.server = cp.fork(tsServerPath, [], { silent: true });
  }

  public close() {
    this.server.kill();
    this.server = null;
  }
}

export default TsLangClient;
