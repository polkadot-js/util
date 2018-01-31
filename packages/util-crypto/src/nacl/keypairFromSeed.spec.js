// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const u8aFromString = require('@polkadot/util/u8a/fromString');

const { naclKeypairFromSeed } = require('./index');

describe('naclKeypairFromSeed', () => {
  // NOTE: Aligned with Rust test, b"12345678901234567890123456789012"
  it('generates a valid publicKey/secretKey pair', () => {
    expect(
      naclKeypairFromSeed(
        u8aFromString('12345678901234567890123456789012')
      )
    ).toEqual({
      publicKey: new Uint8Array([
        0x2f, 0x8c, 0x61, 0x29, 0xd8, 0x16, 0xcf, 0x51,
        0xc3, 0x74, 0xbc, 0x7f, 0x08, 0xc3, 0xe6, 0x3e,
        0xd1, 0x56, 0xcf, 0x78, 0xae, 0xfb, 0x4a, 0x65,
        0x50, 0xd9, 0x7b, 0x87, 0x99, 0x79, 0x77, 0xee
      ]),
      secretKey: new Uint8Array([
        49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 49, 50, 47, 140, 97, 41, 216, 22, 207, 81, 195, 116, 188, 127, 8, 195, 230, 62, 209, 86, 207, 120, 174, 251, 74, 101, 80, 217, 123, 135, 153, 121, 119, 238
      ])
    });
  });
});
