import _cp from 'child_process';
import TsLangClient from 'TsLangClient';

jest.mock('child_process');

const cp = _cp as jest.Mocked<typeof _cp>;

describe('TsLangClient', () => {
  describe('connect', () => {
    it('should fork tsserver', async () => {
      const client = new TsLangClient();
      await client.connect();
      expect(cp.fork).toBeCalled();
    });

    it('should throw error if it failed to fork', async () => {
      cp.fork.mockImplementationOnce(() => {
        throw new Error();
      });
      const client = new TsLangClient();
      await expect(client.connect()).rejects.toBeDefined();
    });
  });

  describe('close', () => {
    it('should kill forked tsserver', async () => {
      const proc = { kill: jest.fn() };
      cp.fork.mockImplementationOnce(() => proc);

      const client = new TsLangClient();
      await client.connect();
      client.close();
      expect(proc.kill).toBeCalled();
    });
  });
});
