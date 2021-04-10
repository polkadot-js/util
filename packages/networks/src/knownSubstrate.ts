// Copyright 2017-2021 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

// This contains exactly the same information as available in (with some extensions)
// https://raw.githubusercontent.com/paritytech/substrate/master/ss58-registry.json
//
// Once the above is published as a package, the duplication here can be removed

import type { KnownSubstrate } from './types';

const createReserved = (prefix: number, displayName: string, network: string | null = null): KnownSubstrate => ({
  decimals: null,
  displayName,
  network,
  prefix,
  standardAccount: null,
  symbols: null,
  website: null
});

export const knownSubstrate: KnownSubstrate[] = [
  {
    decimals: [10],
    displayName: 'Polkadot Relay Chain',
    network: 'polkadot',
    prefix: 0,
    standardAccount: '*25519',
    symbols: ['DOT'],
    website: 'https://polkadot.network'
  },
  createReserved(1, 'Bare 32-bit Schnorr/Ristretto (S/R 25519) public key.'),
  {
    decimals: [12],
    displayName: 'Kusama Relay Chain',
    network: 'kusama',
    prefix: 2,
    standardAccount: '*25519',
    symbols: ['KSM'],
    website: 'https://kusama.network'
  },
  createReserved(3, 'Bare 32-bit Ed25519 public key.'),
  {
    decimals: null,
    displayName: 'Katal Chain',
    network: 'katalchain',
    prefix: 4,
    standardAccount: '*25519',
    symbols: null,
    website: null
  },
  {
    decimals: [15],
    displayName: 'Plasm Network',
    network: 'plasm',
    prefix: 5,
    standardAccount: '*25519',
    symbols: ['PLM'],
    website: 'https://plasmnet.io'
  },
  {
    decimals: [12],
    displayName: 'Bifrost',
    network: 'bifrost',
    prefix: 6,
    standardAccount: '*25519',
    symbols: ['BNC'],
    website: 'https://bifrost.finance/'
  },
  {
    decimals: [18],
    displayName: 'Edgeware',
    network: 'edgeware',
    prefix: 7,
    standardAccount: '*25519',
    symbols: ['EDG'],
    website: 'https://edgewa.re'
  },
  {
    decimals: [18],
    displayName: 'Acala Karura Canary',
    network: 'karura',
    prefix: 8,
    standardAccount: '*25519',
    symbols: ['KAR'],
    website: 'https://acala.network/'
  },
  {
    decimals: [18],
    displayName: 'Laminar Reynolds Canary',
    network: 'reynolds',
    prefix: 9,
    standardAccount: '*25519',
    symbols: ['REY'],
    website: 'http://laminar.network/'
  },
  {
    decimals: [18],
    displayName: 'Acala',
    network: 'acala',
    prefix: 10,
    standardAccount: '*25519',
    symbols: ['ACA'],
    website: 'https://acala.network/'
  },
  {
    decimals: [18],
    displayName: 'Laminar',
    network: 'laminar',
    prefix: 11,
    standardAccount: '*25519',
    symbols: ['LAMI'],
    website: 'http://laminar.network/'
  },
  {
    decimals: [6],
    displayName: 'Polymesh',
    network: 'polymesh',
    prefix: 12,
    standardAccount: '*25519',
    symbols: ['POLYX'],
    website: 'https://polymath.network/'
  },
  {
    decimals: null,
    displayName: 'SubstraTEE',
    network: 'substratee',
    prefix: 13,
    standardAccount: '*25519',
    symbols: null,
    website: 'https://www.substratee.com'
  },
  {
    decimals: [0],
    displayName: 'Totem',
    network: 'totem',
    prefix: 14,
    standardAccount: '*25519',
    symbols: ['XTX'],
    website: 'https://totemaccounting.com'
  },
  {
    decimals: [12],
    displayName: 'Synesthesia',
    network: 'synesthesia',
    prefix: 15,
    standardAccount: '*25519',
    symbols: ['SYN'],
    website: 'https://synesthesia.network/'
  },
  {
    decimals: [12],
    displayName: 'Kulupu',
    network: 'kulupu',
    prefix: 16,
    standardAccount: '*25519',
    symbols: ['KLP'],
    website: 'https://kulupu.network/'
  },
  {
    decimals: null,
    displayName: 'Dark Mainnet',
    network: 'dark',
    prefix: 17,
    standardAccount: '*25519',
    symbols: null,
    website: null
  },
  {
    decimals: [9, 9],
    displayName: 'Darwinia Network',
    network: 'darwinia',
    prefix: 18,
    standardAccount: '*25519',
    symbols: ['RING', 'KTON'],
    website: 'https://darwinia.network/'
  },
  {
    decimals: [12],
    displayName: 'GeekCash',
    network: 'geek',
    prefix: 19,
    standardAccount: '*25519',
    symbols: ['GEEK'],
    website: 'https://geekcash.org'
  },
  {
    decimals: [12],
    displayName: 'Stafi',
    network: 'stafi',
    prefix: 20,
    standardAccount: '*25519',
    symbols: ['FIS'],
    website: 'https://stafi.io'
  },
  {
    decimals: [6],
    displayName: 'Dock Testnet',
    network: 'dock-testnet',
    prefix: 21,
    standardAccount: '*25519',
    symbols: ['DCK'],
    website: 'https://dock.io'
  },
  {
    decimals: [6],
    displayName: 'Dock Mainnet',
    network: 'dock-mainnet',
    prefix: 22,
    standardAccount: '*25519',
    symbols: ['DCK'],
    website: 'https://dock.io'
  },
  {
    decimals: null,
    displayName: 'ShiftNrg',
    network: 'shift',
    prefix: 23,
    standardAccount: '*25519',
    symbols: null,
    website: null
  },
  {
    decimals: [18],
    displayName: 'ZERO',
    network: 'zero',
    prefix: 24,
    standardAccount: '*25519',
    symbols: ['PLAY'],
    website: 'https://zero.io'
  },
  {
    decimals: [18],
    displayName: 'ZERO Alphaville',
    network: 'zero-alphaville',
    prefix: 25,
    standardAccount: '*25519',
    symbols: ['PLAY'],
    website: 'https://zero.io'
  },
  {
    decimals: [10],
    displayName: 'Jupiter',
    network: 'jupiter',
    prefix: 26,
    standardAccount: '*25519',
    symbols: ['jDOT'],
    website: 'https://jupiter.patract.io'
  },
  {
    decimals: [10, 12],
    displayName: 'Patract',
    network: 'patract',
    prefix: 27,
    standardAccount: '*25519',
    symbols: ['pDOT', 'pKSM'],
    website: 'https://patract.network'
  },
  {
    decimals: null,
    displayName: 'Subsocial',
    network: 'subsocial',
    prefix: 28,
    standardAccount: '*25519',
    symbols: null,
    website: null
  },
  {
    decimals: [18],
    displayName: 'Dhiway CORD Network',
    network: 'cord',
    prefix: 29,
    standardAccount: '*25519',
    symbols: ['DCU'],
    website: 'https://dhiway.com/'
  },
  {
    decimals: [12],
    displayName: 'Phala Network',
    network: 'phala',
    prefix: 30,
    standardAccount: '*25519',
    symbols: ['PHA'],
    website: 'https://phala.network'
  },
  {
    decimals: [12],
    displayName: 'Litentry Network',
    network: 'litentry',
    prefix: 31,
    standardAccount: '*25519',
    symbols: ['LIT'],
    website: 'https://litentry.com/'
  },
  {
    decimals: [9],
    displayName: 'Robonomics',
    network: 'robonomics',
    prefix: 32,
    standardAccount: '*25519',
    symbols: ['XRT'],
    website: 'https://robonomics.network'
  },
  {
    decimals: null,
    displayName: 'DataHighway',
    network: 'datahighway',
    prefix: 33,
    standardAccount: '*25519',
    symbols: null,
    website: null
  },
  {
    decimals: [12],
    displayName: 'Ares Protocol',
    network: 'ares',
    prefix: 34,
    standardAccount: '*25519',
    symbols: ['ARES'],
    website: 'https://www.aresprotocol.com/'
  },
  {
    decimals: [15],
    displayName: 'Valiu Liquidity Network',
    network: 'vln',
    prefix: 35,
    standardAccount: '*25519',
    symbols: ['USDv'],
    website: 'https://valiu.com/'
  },
  {
    decimals: [18],
    displayName: 'Centrifuge Chain',
    network: 'centrifuge',
    prefix: 36,
    standardAccount: '*25519',
    symbols: ['RAD'],
    website: 'https://centrifuge.io/'
  },
  {
    decimals: [18],
    displayName: 'Nodle Chain',
    network: 'nodle',
    prefix: 37,
    standardAccount: '*25519',
    symbols: ['NODL'],
    website: 'https://nodle.io/'
  },
  {
    decimals: [18],
    displayName: 'KILT Chain',
    network: 'kilt',
    prefix: 38,
    standardAccount: '*25519',
    symbols: ['KILT'],
    website: 'https://kilt.io/'
  },
  {
    decimals: [18],
    displayName: 'MathChain mainnet',
    network: 'mathchain',
    prefix: 39,
    standardAccount: '*25519',
    symbols: ['MATH'],
    website: 'https://mathwallet.org'
  },
  {
    decimals: [18],
    displayName: 'MathChain testnet',
    network: 'mathchain-testnet',
    prefix: 40,
    standardAccount: '*25519',
    symbols: ['MATH'],
    website: 'https://mathwallet.org'
  },
  {
    decimals: null,
    displayName: 'Polimec Chain',
    network: 'poli',
    prefix: 41,
    standardAccount: '*25519',
    symbols: null,
    website: 'https://polimec.io/'
  },
  {
    decimals: null,
    displayName: 'Substrate',
    network: 'substrate',
    prefix: 42,
    standardAccount: '*25519',
    symbols: null,
    website: 'https://substrate.dev/'
  },
  createReserved(43, 'Bare 32-bit ECDSA SECP-256k1 public key.'),
  {
    decimals: [8],
    displayName: 'ChainX',
    network: 'chainx',
    prefix: 44,
    standardAccount: '*25519',
    symbols: ['PCX'],
    website: 'https://chainx.org/'
  },
  {
    decimals: [12, 12],
    displayName: 'UniArts Network',
    network: 'uniarts',
    prefix: 45,
    standardAccount: '*25519',
    symbols: ['UART', 'UINK'],
    website: 'https://uniarts.me'
  },
  createReserved(46, 'This prefix is reserved.', 'reserved46'),
  createReserved(47, 'This prefix is reserved.', 'reserved47'),
  {
    decimals: [12],
    displayName: 'Neatcoin Mainnet',
    network: 'neatcoin',
    prefix: 48,
    standardAccount: '*25519',
    symbols: ['NEAT'],
    website: 'https://neatcoin.org'
  },
  {
    decimals: [12],
    displayName: 'HydraDX',
    network: 'hydradx',
    prefix: 63,
    standardAccount: '*25519',
    symbols: ['HDX'],
    website: 'https://hydradx.io'
  },
  {
    decimals: [18],
    displayName: 'AvN Mainnet',
    network: 'aventus',
    prefix: 65,
    standardAccount: '*25519',
    symbols: ['AVT'],
    website: 'https://aventus.io'
  },
  {
    decimals: [12],
    displayName: 'Crust Network',
    network: 'crust',
    prefix: 66,
    standardAccount: '*25519',
    symbols: ['CRU'],
    website: 'https://crust.network'
  },
  {
    decimals: [18],
    displayName: 'Social Network',
    network: 'social-network',
    prefix: 252,
    standardAccount: '*25519',
    symbols: ['NET'],
    website: 'https://social.network'
  }
];
