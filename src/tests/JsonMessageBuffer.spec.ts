import JsonMessageBuffer from '../JsonMessageBuffer';

describe('JsonMessageBuffer', () => {
  describe('#consume', () => {
    it('should return JSON Objects as an array from buffered string', () => {
      const buffer = new JsonMessageBuffer();
      const obj0 = { seq: 0, type: 'response' };
      const str0 = JSON.stringify(obj0);
      buffer.append(`Content-Length: ${str0.length + 1}\n\n`);
      buffer.append(str0 + '\n');

      const obj1 = { seq: 100, type: 'test' };
      const str1 = JSON.stringify(obj1);
      buffer.append(`Content-Length: ${str1.length + 1}\n\n`);
      buffer.append(str1 + '\n');

      const arr = buffer.consume();
      expect(Array.isArray(arr)).toBeTruthy();
      expect(arr[0]).toEqual(obj0);
      expect(arr[1]).toEqual(obj1);
    });

    it('should process any newline charcaters', () => {
      const buffer = new JsonMessageBuffer();
      const obj0 = { seq: 0, type: 'response' };
      const str0 = JSON.stringify(obj0);
      buffer.append(`Content-Length: ${str0.length + 1}\r\n\n`);
      buffer.append(str0 + '\n');

      expect(buffer.consume()).toEqual([obj0]);
    });

    it('should throw error if content-length is mismatched', () => {
      const buffer = new JsonMessageBuffer();
      const obj0 = { seq: 0, type: 'response' };
      const str0 = JSON.stringify(obj0);
      buffer.append(`Content-Length: 11\r\n\n`);
      buffer.append(str0 + '\n');

      expect(() => buffer.consume()).toThrowError();
    });

    it('should be able to read multiple times', () => {
      const buffer = new JsonMessageBuffer();
      const obj0 = { seq: 0, type: 'response' };
      const str0 = JSON.stringify(obj0);
      buffer.append(`Content-Length: ${str0.length + 1}\n\n`);
      buffer.append(str0 + '\n');

      expect(buffer.consume()).toEqual([obj0]);

      const obj1 = { seq: 100, type: 'test' };
      const str1 = JSON.stringify(obj1);
      buffer.append(`Content-Length: ${str1.length + 1}\n\n`);
      buffer.append(str1 + '\n');

      expect(buffer.consume()).toEqual([obj1]);
    });
  });
});
