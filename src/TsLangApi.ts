import * as p from 'typescript/lib/protocol';

import JsonProcess from './JsonProcess';

class TsLangApi {
  constructor(private readonly proc: JsonProcess) {}

  private defineApi<TArgs, TRes = void>(command: string, needsReply = true) {
    return async (args: TArgs): Promise<TRes> => {
      return this.proc.sendCommand(command, args, needsReply) as any;
    };
  }

  // TODO add more apis
  public readonly open = this.defineApi<p.OpenRequestArgs>('open', false);
  public readonly quickInfo = this.defineApi<
    p.FileLocationRequestArgs,
    p.QuickInfoResponse
  >('quickinfo');
  public readonly references = this.defineApi<
    p.FileLocationRequestArgs,
    p.ReferencesResponse
  >('references');
}

export default TsLangApi;
