// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const BN = require('bn.js');

const toU8a = require('./toU8a');

describe('toU8a', () => {
  it('returns a Uint8Array input as-is', () => {
    expect(
      toU8a(new Uint8Array([1, 2, 3]))
    ).toEqual(
      new Uint8Array([1, 2, 3])
    );
  });

  it('returns undefined as empty', () => {
    expect(
      toU8a()
    ).toEqual(
      new Uint8Array([])
    );
  });

  it('returns null as empty', () => {
    expect(
      toU8a(null)
    ).toEqual(
      new Uint8Array([])
    );
  });

  it('converts hex strings', () => {
    expect(
      toU8a('0x123456')
    ).toEqual(
      new Uint8Array([0x12, 0x34, 0x56])
    );
  });

  it('converts UTF-8 strings', () => {
    expect(
      toU8a('Привет, мир!')
    ).toEqual(
      new Uint8Array([208, 159, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130, 44, 32, 208, 188, 208, 184, 209, 128, 33])
    );
  });

  it('converts numbers', () => {
    expect(
      toU8a(0x123456)
    ).toEqual(
      new Uint8Array([0x12, 0x34, 0x56])
    );
  });

  it('converts BN', () => {
    expect(
      toU8a(new BN(0x123456))
    ).toEqual(
      new Uint8Array([0x12, 0x34, 0x56])
    );
  });

  it('converts Buffers', () => {
    expect(
      toU8a(Buffer.from([0x12, 0x34, 0x56]))
    ).toEqual(
      new Uint8Array([0x12, 0x34, 0x56])
    );
  });

  it('throws on unknown type', () => {
    expect(
      () => toU8a(true)
    ).toThrow(/invalid type/);
  });
});
