// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '../polyfill';

import { bip39ToEntropy, isReady } from '@polkadot/wasm-crypto';

import { mnemonicToEntropy } from './bip39';

export default function toEntropy (mnemonic: string): Uint8Array {
  return isReady()
    ? bip39ToEntropy(mnemonic)
    : mnemonicToEntropy(mnemonic);
}
