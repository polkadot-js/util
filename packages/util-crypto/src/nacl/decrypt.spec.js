// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { naclDecrypt, naclEncrypt, naclKeypairFromString } = require('./index');

describe('naclDecrypt', () => {
  let secretKey;

  beforeEach(() => {
    secretKey = naclKeypairFromString('test').secretKey;
  });

  it('decrypts a encrypted message', () => {
    const message = new Uint8Array([1, 2, 3, 4, 5, 4, 3, 2, 1]);
    const { encrypted, nonce } = naclEncrypt(message, secretKey);

    expect(
      naclDecrypt(encrypted, secretKey, nonce)
    ).toEqual(
      message
    );
  });
});
