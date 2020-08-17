// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert, u8aToHex, u8aToU8a } from '@polkadot/util';

import { keccakAsU8a } from '../keccak';
import { secp256k1Expand } from '../secp256k1';

export default function ethereumEncode (addressOrPublic?: string | Uint8Array): string {
  if (!addressOrPublic) {
    return '0x';
  }

  let u8aAddress = u8aToU8a(addressOrPublic);

  assert([20, 32, 33, 64, 65].includes(u8aAddress.length), 'Invalid address or publicKey passed');

  if (u8aAddress.length > 20) {
    u8aAddress = keccakAsU8a(secp256k1Expand(u8aAddress)).slice(-20);
  }

  const address = u8aToHex(u8aAddress, -1, false);
  const hash = u8aToHex(keccakAsU8a(address), -1, false);
  let result = '';

  for (let index = 0; index < 40; index++) {
    result = `${result}${parseInt(hash[index], 16) > 7 ? address[index].toUpperCase() : address[index]}`;
  }

  return `0x${result}`;
}
