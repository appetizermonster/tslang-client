import cp from 'child_process';
import fs from 'fs';

import TsLangClient from '../TsLangClient';

describe('TsLangClient', () => {
  describe('connect', () => {
    it('should fork tsserver', async () => {
      const fork = jest.spyOn(cp, 'fork');
      const client = new TsLangClient();
      await client.connect();
      expect(fork).toBeCalled();
    });

    it('should throw error if tsserver not found', async () => {
      jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => false);
      const client = new TsLangClient();
      await expect(client.connect()).rejects.toBeDefined();
    });

    it('should throw error if fork fails', async () => {
      jest.spyOn(cp, 'fork').mockImplementationOnce(() => {
        throw new Error();
      });
      const client = new TsLangClient();
      await expect(client.connect()).rejects.toBeDefined();
    });
  });

  describe('close', () => {
    it('should kill forked tsserver', async () => {
      const proc = { kill: jest.fn() };
      jest.spyOn(cp, 'fork').mockImplementationOnce(() => proc);

      const client = new TsLangClient();
      await client.connect();
      client.close();
      expect(proc.kill).toBeCalled();
    });
  });
});
