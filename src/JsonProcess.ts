import { ChildProcess } from 'child_process';
import { filter, take, timeout } from 'rxjs/operators';
import * as protocol from 'typescript/lib/protocol';

import Event from './Event';
import JsonMessageBuffer from './JsonMessageBuffer';

class JsonProcess {
  private messageBuffer: JsonMessageBuffer = new JsonMessageBuffer();
  private messageEvent: Event<protocol.Response> = new Event();
  private nextSeq: number = 0;

  constructor(
    private readonly proc: ChildProcess,
    private readonly debugMode: boolean = false
  ) {
    this.proc.stdout.on('data', this.handleData.bind(this));
  }

  public close() {
    this.proc.kill();
    this.proc.stdout.removeAllListeners();
  }

  private handleData(buffer: Buffer) {
    const str = buffer.toString('utf8');
    this.messageBuffer.append(str);

    const msgs = this.messageBuffer.consume();
    for (const msg of msgs) {
      if (this.debugMode) {
        console.log('JSON Message: ' + msg);
      }
      this.messageEvent.emit(msg);
    }
  }

  public async sendCommand(command: string, args: {}, needsReply = true) {
    const seq = this.nextSeq++;
    const msg = { seq, type: 'request', command, arguments: args };
    const msgStr = JSON.stringify(msg);
    this.proc.stdin.write(msgStr + '\n');
    if (!needsReply) {
      return;
    }
    const serverMsg = await this.messageEvent
      .observable()
      .pipe(
        filter((m) => m.request_seq === seq),
        timeout(5000),
        take(1)
      )
      .toPromise();
    if (!serverMsg.success) {
      throw new Error(serverMsg.message);
    }
    return serverMsg as protocol.Response;
  }
}

export default JsonProcess;
