// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// adapted from https://github.com/multiformats/js-multibase/blob/424709195b46ffb1d6f2f69a7707598ebe751e5e/src/rfc4648.js

import { u8aToU8a } from '@polkadot/util';

import { BASE32_ALPHABET, BITS_PER_CHAR } from './bs32';

// 5 bits per char
const MASK = (1 << BITS_PER_CHAR) - 1;

/**
 * @name base32Encode
 * @summary Creates a base32 value.
 * @description
 * From the provided input, create the base32 and return the result as a string.
 */
export default function base32Encode (value: Uint8Array | string | Buffer | number[], ipfsCompat = false): string {
  const u8a = u8aToU8a(value);
  let out = '';
  let bits = 0;
  let buffer = 0;

  for (let i = 0; i < u8a.length; ++i) {
    buffer = (buffer << 8) | u8a[i];
    bits += 8;

    while (bits > BITS_PER_CHAR) {
      bits -= BITS_PER_CHAR;
      out += BASE32_ALPHABET[MASK & (buffer >> bits)];
    }
  }

  if (bits) {
    out += BASE32_ALPHABET[MASK & (buffer << (BITS_PER_CHAR - bits))];
  }

  return ipfsCompat
    ? `b${out}`
    : out;
}
