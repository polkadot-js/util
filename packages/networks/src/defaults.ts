// Copyright 2017-2021 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KnownGenesis, KnownIcon, KnownLedger, KnownTestnet } from './types';

// NOTE: In the case where the network was hard-spooned and multiple genesisHashes
// are provided, it needs to be in reverse order, i.e. most-recent first, oldest
// last. This make lookups for the current a simple genesisHash[0]
// (See Kusama as an example)
export const knownGenesis: KnownGenesis = {
  'dock-mainnet': [
    '0xf73467c6544aa68df2ee546b135f955c46b90fa627e9b5d7935f41061bb8a5a9'
  ],
  edgeware: [
    '0x742a2ca70c2fda6cee4f8df98d64c4c670a052d9568058982dad9d5a7a135c5b'
  ],
  equilibrium: [
    '0x6f1a800de3daff7f5e037ddf66ab22ce03ab91874debeddb1086f5f7dbd48925'
  ],
  hydradx: [
    '0xd2a620c27ec5cbc5621ff9a522689895074f7cca0d08e7134a7804e1a3ba86fc', // Snakenet Gen3-1
    '0x10af6e84234477d84dc572bac0789813b254aa490767ed06fb9591191d1073f9', // Snakenet Gen3
    '0x3d75507dd46301767e601265791da1d9cb47b6ebc94e87347b635e5bf58bd047', // Snakenet Gen2
    '0x0ed32bfcab4a83517fac88f2aa7cbc2f88d3ab93be9a12b6188a036bf8a943c2' // Snakenet Gen1
  ],
  karura: [
    '0xbaf5aabe40646d11f0ee8abbdc64f4a4b7674925cba08e4a05ff9ebed6e2126b'
  ],
  kulupu: [
    '0xf7a99d3cb92853d00d5275c971c132c074636256583fee53b3bbe60d7b8769ba'
  ],
  kusama: [
    '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe', // Kusama CC3,
    '0xe3777fa922cafbff200cadeaea1a76bd7898ad5b89f7848999058b50e715f636', // Kusama CC2
    '0x3fd7b9eb6a00376e5be61f01abb429ffb0b104be05eaff4d458da48fcd425baf' // Kusama CC1
  ],
  plasm: [
    '0x3e86364d4b4894021cb2a0390bcf2feb5517d5292f2de2bb9404227e908b0b8b'
  ],
  polkadot: [
    '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'
  ],
  polymesh: [
    '0x9deeb940c92ae02111c3bd5baca89970384f4c9849f02a1b2e53e66414d30f9f'
  ],
  stafi: [
    '0x290a4149f09ea0e402c74c1c7e96ae4239588577fe78932f94f5404c68243d80'
  ],
  subsocial: [
    '0x0bd72c1c305172e1275278aaeb3f161e02eccb7a819e63f62d47bd53a28189f8'
  ]
};

// these are icon overrides
export const knownIcon: KnownIcon = {
  kusama: 'polkadot',
  polkadot: 'polkadot'
};

// support for ledger
export const knownLedger: KnownLedger = {
  'dock-mainnet': 0x00000252,
  edgeware: 0x0000020b,
  equilibrium: 0x05f5e0fd,
  kusama: 0x000001b2,
  polkadot: 0x00000162,
  polymesh: 0x00000253
};

// testnets should not allow selection
export const knownTestnet: KnownTestnet = {
  'dock-testnet': true,
  jupiter: true,
  'mathchain-testnet': true,
  'zero-alphaville': true
};
