import path from 'path';

import TsLangClient from '../src/TsLangClient';

(async () => {
  // Create a client instance
  const tsClient = new TsLangClient();

  // Connect to tsserver
  await tsClient.connect();

  // Open the file in the tsserver
  const filename = path.join(__dirname, '../src/TsLangApi.ts');
  await tsClient.api.open({ file: filename });

  // Find references and print it
  const refs = await tsClient.api.references({ file: filename, line: 8, offset: 11 });
  console.log(refs.body);
})();
