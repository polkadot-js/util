// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

type Encrypted = {
  encrypted: Uint8Array,
  nonce: Uint8Array
};

const nacl = require('tweetnacl');

const randomAsU8a = require('../random/asU8a');

/**
  @name naclEncrypt
  @signature naclEncrypt (message: Uint8Array, secretKey: Uint8Array, nonce?: Uint8Array): { encrypted: Uint8Array, nonce: Uint8Array }
  @summary Encrypts a message using the supplied secretKey and nonce
  @description
    Returns an encrypted message, using the `secretKey` and `nonce`. If the `nonce` was not supplied, a random value is generated.
  @example
    import { naclEncrypt } from '@polkadot/util-crypto';

    naclSign([...], [...]) // => [...]
*/
module.exports = function naclEncrypt (message: Uint8Array, secretKey: Uint8Array, nonce: Uint8Array = randomAsU8a(24)): Encrypted {
  const encrypted = nacl.secretbox(message, nonce, secretKey.subarray(0, 32));

  return {
    encrypted,
    nonce
  };
};
