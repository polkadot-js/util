// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringInstance, KeyringPair, KeyringPair$Json, KeyringPair$Meta, KeyringOptions, KeyringPairType } from './types';

import { assert, hexToU8a, isNumber, isHex, stringToU8a } from '@polkadot/util/index';
import { keyExtract, mnemonicToSeed , naclKeypairFromSeed as naclFromSeed, schnorrkelKeypairFromSeed as schnorrkelFromSeed, mnemonicToMiniSecret, keyFromPath } from '@polkadot/util-crypto/index';

import { decodeAddress, encodeAddress, setAddressPrefix } from './address';
import createPair from './pair';
import Pairs from './pairs';

/**
 * # @polkadot/keyring
 *
 * ## Overview
 *
 * @name Keyring
 * @summary Keyring management of user accounts
 * @description Allows generation of keyring pairs from a variety of input combinations, such as
 * json object containing account address or public key, account metadata, and account encoded using
 * `addFromJson`, or by providing those values as arguments separately to `addFromAddress`,
 * or by providing the mnemonic (seed phrase) and account metadata as arguments to `addFromMnemonic`.
 * Stores the keyring pairs in a keyring pair dictionary. Removal of the keyring pairs from the keyring pair
 * dictionary is achieved using `removePair`. Retrieval of all the stored pairs via `getPairs` or perform
 * lookup of a pair for a given account address or public key using `getPair`. JSON metadata associated with
 * an account may be obtained using `toJson` accompanied by the account passphrase.
 */
export default class Keyring implements KeyringInstance {
  private _pairs: Pairs;
  private _type: KeyringPairType;

  constructor (options: KeyringOptions = {}) {
    options.type = options.type || 'ed25519';

    assert(options && ['ed25519', 'sr25519'].includes(options.type || 'undefined'), `Expected a keyring type of either 'ed25519' or 'sr25519', found '${options.type}`);

    this._pairs = new Pairs();
    this._type = options.type;

    setAddressPrefix(isNumber(options.addressPrefix) ? options.addressPrefix : 42);
  }

  decodeAddress = decodeAddress;
  encodeAddress = encodeAddress;
  setAddressPrefix = setAddressPrefix;

  /**
   * @description True for Ed25519 keyring
   */
  get isEd25519 (): boolean {
    return this.type === 'ed25519';
  }

  /**
   * @description True for Ed25519 keyring
   */
  get isSr25519 (): boolean {
    return this.type === 'sr25519';
  }

  /**
   * @description retrieve the pairs (alias for getPairs)
   */
  get pairs (): Array<KeyringPair> {
    return this.getPairs();
  }

  /**
   * @description retrieve the publicKeys (alias for getPiblicKeys)
   */
  get publicKeys (): Array<Uint8Array> {
    return this.getPublicKeys();
  }

  /**
   * @description Returns the type of the keyring, either ed25519 of sr25519
   */
  get type (): KeyringPairType {
    return this._type;
  }

  /**
   * @name addPair
   * @summary Stores an account, given a keyring pair, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   */
  addPair (pair: KeyringPair): KeyringPair {
    return this._pairs.add(pair);
  }

  /**
   * @name addFromAddress
   * @summary Stores an account, given an account address, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Allows user to explicitely provide separate inputs including account address or public key, and optionally
   * the associated account metadata, and the default encoded value as arguments (that may be obtained from the json file
   * of an account backup), and then generates a keyring pair from them that it passes to
   * `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   */
  addFromAddress (address: string | Uint8Array, meta: KeyringPair$Meta = {}, encoded: Uint8Array | null = null, type: KeyringPairType = this.type): KeyringPair {
    return this.addPair(createPair(type, { publicKey: this.decodeAddress(address) }, meta, encoded));
  }

  /**
   * @name addFromJson
   * @summary Stores an account, given JSON data, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Allows user to provide a json object argument that contains account information (that may be obtained from the json file
   * of an account backup), and then generates a keyring pair from it that it passes to
   * `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   */
  addFromJson ({ address, encoded, encoding: { type, version }, meta }: KeyringPair$Json): KeyringPair {
    const keytype = version === '0' || !Array.isArray(type)
      ? this.type
      : type[1];
    return this.addFromAddress(address, meta, hexToU8a(encoded), keytype);
  }

  /**
   * @name addFromMnemonic
   * @summary Stores an account, given a mnemonic, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Allows user to provide a mnemonic (seed phrase that is provided when account is originally created)
   * argument and a metadata argument that contains account information (that may be obtained from the json file
   * of an account backup), and then generates a keyring pair from it that it passes to
   * `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   */
  addFromMnemonic (mnemonic: string, meta: KeyringPair$Meta = {}, type: KeyringPairType = this.type): KeyringPair {
    return this.addFromSeed(mnemonicToSeed(mnemonic), meta, type);
  }

  /**
   * @name addFromUri
   * @summary Creates an account via an suri
   * @description Extracts the phrase, path and password from a SURI format for specifying secret keys `<secret>/<soft-key>//<hard-key>///<password>` (the `///password` may be omitted, and `/<soft-key>` and `//<hard-key>` maybe repeated and mixed). The secret can be a hex string, mnemonic phrase or a string (to be padded)
   */
  addFromUri (suri: string, meta: KeyringPair$Meta = {}, type: KeyringPairType = this.type): KeyringPair {
    const { password, phrase, path } = keyExtract(suri);
    let seed;

    if (isHex(phrase, 256)) {
      seed = hexToU8a(phrase);
    } else {
      const str = phrase as string;
      const parts = str.split(' ');

      if ([12, 15, 18, 21, 24].includes(parts.length)) {
        seed = mnemonicToMiniSecret(phrase, password);
      } else {
        seed = stringToU8a(str.padEnd(32));
      }
    }

    return this.addFromSeed(keyFromPath(seed, path), meta, type);
  }

  /**
   * @name addFromSeed
   * @summary Stores an account, given seed data, as a Key/Value (public key, pair) in Keyring Pair Dictionary
   * @description Stores in a keyring pair dictionary the public key of the pair as a key and the pair as the associated value.
   * Allows user to provide the account seed as an argument, and then generates a keyring pair from it that it passes to
   * `addPair` to store in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.
   */
  addFromSeed (seed: Uint8Array, meta: KeyringPair$Meta = {}, type: KeyringPairType = this.type): KeyringPair {
    const keypair = this.isSr25519
      ? schnorrkelFromSeed(seed)
      : naclFromSeed(seed);

    return this.addPair(createPair(type, { ...keypair, seed }, meta, null));
  }

  /**
   * @name getPair
   * @summary Retrieves an account keyring pair from the Keyring Pair Dictionary, given an account address
   * @description Returns a keyring pair value from the keyring pair dictionary by performing
   * a key lookup using the provided account address or public key (after decoding it).
   */
  getPair (address: string | Uint8Array): KeyringPair {
    return this._pairs.get(address);
  }

  /**
   * @name getPairs
   * @summary Retrieves all account keyring pairs from the Keyring Pair Dictionary
   * @description Returns an array list of all the keyring pair values that are stored in the keyring pair dictionary.
   */
  getPairs (): Array<KeyringPair> {
    return this._pairs.all();
  }

  /**
   * @name getPublicKeys
   * @summary Retrieves Public Keys of all Keyring Pairs stored in the Keyring Pair Dictionary
   * @description Returns an array list of all the public keys associated with each of the keyring pair values that are stored in the keyring pair dictionary.
   */
  getPublicKeys (): Array<Uint8Array> {
    return this._pairs
      .all()
      .map(({ publicKey }) =>
        publicKey()
      );
  }

  /**
   * @name removePair
   * @description Deletes the provided input address or public key from the stored Keyring Pair Dictionary.
   */
  removePair (address: string | Uint8Array): void {
    this._pairs.remove(address);
  }

  /**
   * @name toJson
   * @summary Returns a JSON object associated with the input argument that contains metadata assocated with an account
   * @description Returns a JSON object containing the metadata associated with an account
   * when valid address or public key and when the account passphrase is provided if the account secret
   * is not already unlocked and available in memory. Note that in [Polkadot-JS Apps](https://github.com/polkadot-js/apps) the user
   * may backup their account to a JSON file that contains this information.
   */
  toJson (address: string | Uint8Array, passphrase?: string): KeyringPair$Json {
    return this._pairs.get(address).toJson(passphrase);
  }
}

export { Keyring, decodeAddress, encodeAddress, setAddressPrefix };
