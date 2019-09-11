/* eslint-disable @typescript-eslint/class-name-casing */
// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Prefix } from '@polkadot/util-crypto/address/types';
import { KeypairType } from '@polkadot/util-crypto/types';

export interface KeyringOptions {
  addressPrefix?: Prefix;
  defaultType?: KeypairType;
}

export interface KeyringPair$Meta {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
}

export type KeyringPair$JsonVersion = '0' | '1' | '2';

export interface KeyringPair$JsonEncoding {
  content: ['pkcs8', KeypairType];
  type: 'xsalsa20-poly1305' | 'none';
  version: KeyringPair$JsonVersion;
}

export interface KeyringPair$Json {
  address: string;
  encoded: string;
  encoding: KeyringPair$JsonEncoding;
  meta: KeyringPair$Meta;
}

export interface KeyringPair {
  readonly type: KeypairType;

  address: string;
  decodePkcs8: (passphrase?: string, encoded?: Uint8Array) => void;
  encodePkcs8: (passphrase?: string) => Uint8Array;
  meta: KeyringPair$Meta;
  isLocked: boolean;
  lock: () => void;
  publicKey: Uint8Array;
  setMeta: (meta: KeyringPair$Meta) => void;
  sign (message: Uint8Array): Uint8Array;
  toJson (passphrase?: string): KeyringPair$Json;
  verify (message: Uint8Array, signature: Uint8Array): boolean;
}

export interface KeyringPairs {
  add: (pair: KeyringPair) => KeyringPair;
  all: () => KeyringPair[];
  get: (address: string | Uint8Array) => KeyringPair;
  remove: (address: string | Uint8Array) => void;
}

export interface KeyringInstance {
  readonly pairs: KeyringPair[];
  readonly publicKeys: Uint8Array[];
  readonly defaultType: KeypairType;

  decodeAddress (encoded: string | Uint8Array, ignoreChecksum?: boolean): Uint8Array;
  encodeAddress (key: Uint8Array | string): string;
  setAddressPrefix (prefix: Prefix): void;

  addPair (pair: KeyringPair): KeyringPair;
  addFromAddress (address: string | Uint8Array, meta?: KeyringPair$Meta, encoded?: Uint8Array | null, type?: KeypairType, ignoreChecksum?: boolean): KeyringPair;
  addFromJson (pair: KeyringPair$Json, ignoreChecksum?: boolean): KeyringPair;
  addFromMnemonic (mnemonic: string, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
  addFromSeed (seed: Uint8Array, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
  addFromUri (suri: string, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
  createFromUri (suri: string, meta?: KeyringPair$Meta, type?: KeypairType): KeyringPair;
  getPair (address: string | Uint8Array): KeyringPair;
  getPairs (): KeyringPair[];
  getPublicKeys (): Uint8Array[];
  removePair (address: string | Uint8Array): void;
  toJson (address: string | Uint8Array, passphrase?: string): KeyringPair$Json;
}
