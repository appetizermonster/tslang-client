import cp, { ChildProcess } from 'child_process';

import JsonProcess from '../JsonProcess';

function toChildProcess(o: any) {
  return o as ChildProcess;
}

function createMockProcess() {
  return {
    stdout: { on: jest.fn(), removeAllListeners: jest.fn() },
    kill: jest.fn()
  };
}

describe('JsonProcess', () => {
  describe('#constructor', () => {
    it('should listen stdout from the forked process', async () => {
      const proc = createMockProcess();
      const jsonProc = new JsonProcess(toChildProcess(proc));

      const firstArg = proc.stdout.on.mock.calls[0][0];
      expect(firstArg).toBe('data');
    });
  });

  describe('#close', () => {
    it('should kill the forked process', () => {
      const proc = createMockProcess();
      jest.spyOn(cp, 'fork').mockImplementationOnce(() => proc);

      const client = new JsonProcess(toChildProcess(proc));
      client.close();
      expect(proc.kill).toBeCalled();
    });
  });
});
