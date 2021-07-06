// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import path from 'path';

import { createBundle } from '@polkadot/dev/config/rollup';

const pkgs = [
  '@polkadot/hw-ledger',
  '@polkadot/keyring',
  '@polkadot/networks',
  '@polkadot/util',
  '@polkadot/util-crypto',
  '@polkadot/x-fetch',
  '@polkadot/x-global',
  '@polkadot/x-randomvalues',
  '@polkadot/x-rxjs',
  '@polkadot/x-textdecoder',
  '@polkadot/x-textencoder',
  '@polkadot/x-ws'
];

const external = [
  ...pkgs,
  '@polkadot/wasm-crypto'
];

const overrides = {
  '@polkadot/hw-ledger': {
    entries: [
      ...['bip39', 'hash.js', 'bip32-ed25519', 'bs58', 'blakejs'].map((find) => ({
        find, replacement: path.resolve(process.cwd(), 'node_modules/empty/object.js')
      })),
      { find: '@polkadot/hw-ledger-transports', replacement: '../../hw-ledger-transports/build' }
    ]
  }
};

export default pkgs.map((pkg) =>
  createBundle({ external, pkg, ...(overrides[pkg] || {}) })
);
