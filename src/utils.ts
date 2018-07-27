import path from 'path';

export function getTSServerPath(moduleName = 'typescript') {
  const tsserver = require.resolve(moduleName);
  const dir = path.dirname(tsserver);
  return path.join(dir, 'tsserver.js');
}
