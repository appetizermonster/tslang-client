import { TsServerMessage } from './types';

class JsonMessageBuffer {
  private bufferedString = '';

  public append(str: string) {
    this.bufferedString += str;
  }

  public consume(): TsServerMessage[] {
    const HEADER_PREFIX = 'Content-Length: ';
    const arr: TsServerMessage[] = [];
    const lines = this.bufferedString.split(/\r?\n/);
    while (lines.length >= 3) {
      const header = lines[0];
      const isHeaderOkay = header.startsWith(HEADER_PREFIX);
      if (!isHeaderOkay) {
        break;
      }

      const contentLengthStr = header.substring(HEADER_PREFIX.length);
      const contentLength = parseInt(contentLengthStr, 10);
      const body = lines[2];
      const bodyLength = body.length + 1;
      if (bodyLength !== contentLength) {
        throw new Error('Content-Length mismatched');
      }

      const obj = JSON.parse(body) as TsServerMessage;
      arr.push(obj);
      lines.splice(0, 3);
    }
    this.bufferedString = lines.join('\n');
    return arr;
  }
}

export default JsonMessageBuffer;
