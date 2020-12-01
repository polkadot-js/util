// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

import { u8aConcat } from '@polkadot/util';

export function schnorrkelKeypairToU8a ({ publicKey, secretKey }: Keypair): Uint8Array {
  return u8aConcat(secretKey, publicKey).slice();
}
