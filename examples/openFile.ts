import path from 'path';

import TsLangClient from '../src/TsLangClient';

(async () => {
  const tsClient = new TsLangClient({ debugMode: true });
  await tsClient.connect();

  const filename = path.join(__dirname, '../src/index.ts');
  tsClient.invokeWithoutReply('open', { file: filename });
})();
