// Copyright 2017-2020 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringPair$JsonEncodingTypes } from '../types';
import { PairInfo } from './types';

import { assert, stringToU8a, u8aFixLength } from '@polkadot/util';
import { naclDecrypt, pbkdf2Encode } from '@polkadot/util-crypto';

import { NONCE_LENGTH, PKCS8_DIVIDER, PKCS8_HEADER, PUB_LENGTH, SALT_LENGTH, SEC_LENGTH, SEED_LENGTH } from './defaults';

const SEED_OFFSET = PKCS8_HEADER.length;

type DecodeResult = PairInfo & {
  secretKey: Uint8Array;
};

function decodePkcs8 (encoded: Uint8Array): DecodeResult {
  const header = encoded.subarray(0, PKCS8_HEADER.length);

  assert(header.toString() === PKCS8_HEADER.toString(), 'Invalid Pkcs8 header found in body');

  let secretKey = encoded.subarray(SEED_OFFSET, SEED_OFFSET + SEC_LENGTH);
  let divOffset = SEED_OFFSET + SEC_LENGTH;
  let divider = encoded.subarray(divOffset, divOffset + PKCS8_DIVIDER.length);

  // old-style, we have the seed here
  if (divider.toString() !== PKCS8_DIVIDER.toString()) {
    divOffset = SEED_OFFSET + SEED_LENGTH;
    secretKey = encoded.subarray(SEED_OFFSET, divOffset);
    divider = encoded.subarray(divOffset, divOffset + PKCS8_DIVIDER.length);
  }

  assert(divider.toString() === PKCS8_DIVIDER.toString(), 'Invalid Pkcs8 divider found in body');

  const pubOffset = divOffset + PKCS8_DIVIDER.length;
  const publicKey = encoded.subarray(pubOffset, pubOffset + PUB_LENGTH);

  return {
    publicKey,
    secretKey
  };
}

export default function decode (passphrase?: string, encrypted?: Uint8Array | null, encType: KeyringPair$JsonEncodingTypes[] = ['pbkdf2', 'xsalsa20-poly1305']): DecodeResult {
  assert(encrypted, 'No encrypted data available to decode');

  let encoded: Uint8Array | null = encrypted;

  if (passphrase) {
    if (encType.includes('pbkdf2')) {
      const salt = encrypted.subarray(0, SALT_LENGTH);
      const nonce = encrypted.subarray(SALT_LENGTH, SALT_LENGTH + NONCE_LENGTH);
      const data = encrypted.subarray(SALT_LENGTH + NONCE_LENGTH);
      const { password } = pbkdf2Encode(passphrase, salt);

      encoded = naclDecrypt(data, nonce, password.subarray(0, 32));
    } else {
      encoded = naclDecrypt(
        encrypted.subarray(NONCE_LENGTH),
        encrypted.subarray(0, NONCE_LENGTH),
        u8aFixLength(stringToU8a(passphrase), 256, true)
      );
    }
  }

  assert(encoded, 'Unable to unencrypt using the supplied passphrase');

  return decodePkcs8(encoded);
}
