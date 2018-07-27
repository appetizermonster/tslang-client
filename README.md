# tslang-client

A client implementation for `tsserver` for TypeScript.
Currently, it's just working but not completely tested.

You can see the details about `tsserver` in [the TypeScript wiki](https://github.com/Microsoft/TypeScript/wiki/Standalone-Server-%28tsserver%29)

## Rationale
TypeScript provides a powerful Type System. So I was trying to leverage the Type System to make good tooling environment for TypeScript based projects.
and I found some facts: 
- TypeScript provides full-featured Compiler API but slow and complicated.
- [ts-simple-ast](https://github.com/dsherret/ts-simple-ast) provides well-designed wrapper API around the Compiler API but slow for my needs.
- `tsserver` is fast but there is no library for communication with `tsserver`.

So I made this.

## Requirements
- TypeScript 2.8 or above

## Usage
```typescript
import TsLangClient from 'tslang-client';

(async () => {
  const tslangClient = new TsLangClient();
  await tslangClient.connect();
  
  // Invoke a function without reply
  await tslangClient.invokeWithoutReply('open', { file: 'file.ts' });

  // Invoke a function with reply
  const result = await tslangClient.invoke('references', { file: 'file.ts', line: 1, offset: 15 });
})();
```
