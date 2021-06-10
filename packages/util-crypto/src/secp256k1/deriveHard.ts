// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { compactAddLength, stringToU8a, u8aConcat } from '@polkadot/util';

import { blake2AsU8a } from '../blake2/asU8a';

export function secp256k1DeriveHard (seed: Uint8Array, chainCode: Uint8Array): Uint8Array {
  const HDKD = compactAddLength(stringToU8a('Secp256k1HDKD'));

  // NOTE This is specific to the Substrate HDD derivation, so always use the blake2 hasher
  return blake2AsU8a(u8aConcat(HDKD, seed, chainCode), 256);
}
