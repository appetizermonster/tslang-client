import cp from 'child_process';
import fs from 'fs';

import JsonProcess from '../JsonProcess';
import TsLangClient from '../TsLangClient';

describe('TsLangClient', () => {
  describe('#connect', () => {
    it('should fork tsserver', async () => {
      const fork = jest.spyOn(cp, 'fork');

      const client = new TsLangClient();
      await client.connect();
      expect(fork).toBeCalled();
    });

    it('should throw error if tsserver not found', async () => {
      jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => false);

      const client = new TsLangClient();
      expect(() => client.connect()).toThrowError();
    });

    it('should throw error if fork fails', async () => {
      jest.spyOn(cp, 'fork').mockImplementationOnce(() => {
        throw new Error();
      });

      const client = new TsLangClient();
      expect(() => client.connect()).toThrowError();
    });
  });

  describe('#close', () => {
    it('should kill the jsonProcess', async () => {
      const closeFn = jest.spyOn(JsonProcess.prototype, 'close');

      const client = new TsLangClient();
      await client.connect();
      client.close();

      expect(closeFn).toBeCalled();
    });
  });
});
