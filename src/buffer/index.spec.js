// ISC, Copyright 2017 Jaco Greeff

const { bufferFromHex, bufferToHex } = require('./');

describe('buffer', () => {
  describe('bufferFromHex', () => {
    it('returns an empty buffer when null provided', () => {
      expect(
        bufferFromHex(null).length
      ).toEqual(0);
    });

    it('returns a buffer with the correct values', () => {
      expect(
        Buffer.from([128, 0, 10]).equals(
          bufferFromHex('0x80000a')
        )
      ).toEqual(true);
    });

    it('throws error on non-hex inputs', () => {
      expect(
        () => bufferFromHex('notAHex')
      ).toThrow(/Cannot convert non-hex value/);
    });
  });

  describe('bufferToHex', () => {
    it('returns 0x when the buffer is null', () => {
      expect(
        bufferToHex(null)
      ).toEqual('0x');
    });

    it('returns the hex value for the buffer', () => {
      expect(
        bufferToHex(Buffer.from([128, 0, 10]))
      ).toEqual('0x80000a');
    });

    it('throws when non-buffer value is supplied', () => {
      expect(
        () => bufferToHex('noABuffer')
      ).toThrow(/Cannot convert non-buffer/);
    });
  });
});
