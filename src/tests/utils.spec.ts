import { getTSServerPath } from '../utils';

describe('utils', () => {
  describe('#getTSServerPath', () => {
    it('should throw error if there is no typescript module', () => {
      const func = () => getTSServerPath('something');
      expect(func).toThrowError();
    });

    it('should return the tsserver path', () => {
      const tsServerPath = getTSServerPath();
      expect(tsServerPath.endsWith('tsserver.js')).toBeTruthy();
    });
  });
});
