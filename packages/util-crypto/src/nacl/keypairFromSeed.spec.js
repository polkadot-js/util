// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { naclKeypairFromSeed } = require('./index');

describe('naclKeypairFromSeed', () => {
  it('generates a valid publicKey/secretKey pair', () => {
    expect(
      naclKeypairFromSeed(
        new Uint8Array([
          0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56,
          0x78, 0x90, 0x12, 0x34, 0x56, 0x78, 0x90, 0x12,
          0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34, 0x56,
          0x78, 0x90, 0x12, 0x34, 0x56, 0x78, 0x90, 0x12
        ])
      )
    ).toEqual({
      publicKey: new Uint8Array([
        180, 114, 93, 155, 165, 255, 217, 82,
        16, 250, 209, 11, 193, 10, 88, 218,
        190, 190, 41, 193, 236, 252, 1, 152,
        216, 214, 0, 41, 45, 138, 13, 53
      ]),
      secretKey: new Uint8Array([
        18, 52, 86, 120, 144, 18, 52, 86,
        120, 144, 18, 52, 86, 120, 144, 18,
        18, 52, 86, 120, 144, 18, 52, 86,
        120, 144, 18, 52, 86, 120, 144, 18,
        180, 114, 93, 155, 165, 255, 217, 82,
        16, 250, 209, 11, 193, 10, 88, 218,
        190, 190, 41, 193, 236, 252, 1, 152,
        216, 214, 0, 41, 45, 138, 13, 53
      ])
    });
  });
});
