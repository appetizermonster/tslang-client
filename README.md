# tslang-client &middot; [![Travis (.org) branch](https://img.shields.io/travis/appetizermonster/tslang-client/master.svg?style=flat-square)](https://travis-ci.org/appetizermonster/tslang-client)

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

## Installation
```bash
npm install --save-dev tslang-client
```

## Usage
```typescript
import { TsLangClient } from 'tslang-client';

// Create a client instance
const client = new TsLangClient();

// Connect to installed tsserver
await client.connect();

// Call open(file) api
await client.api.open({ file: 'filename.ts' });

// Close the connection
client.close();
```

### Import with CommonJS
`tslang-client` supports CommonJS-style module along with the ES2015-style.
```javascript
const { TsLangClient } = require('tslang-client');
```

## EOF
