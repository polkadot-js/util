// Copyright 2017-2021 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToHex } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import { createTestPairs } from './testingPairs';
import Keyring from '.';

describe('testingPairs', (): void => {
  beforeEach(async (): Promise<void> => {
    await cryptoWaitReady();
  });

  it('creates without failing', (): void => {
    expect(
      Object.keys(createTestPairs())
    ).toHaveLength(2 + 0 + 7); // stash, session, pairs
  });

  it('has the correct address for Alice (non-HDKD)', (): void => {
    expect(
      createTestPairs({ type: 'ed25519' }, false).alice.address
    ).toEqual('5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua');
  });

  it('has the correct address for Alice (HDKD)', (): void => {
    expect(
      createTestPairs({ type: 'ed25519' }).alice.address
    ).toEqual('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY');
  });

  it('has the correct address for Alith (Eth)', (): void => {
    expect(
      createTestPairs({ type: 'ethereum' }).Alith.address
    ).toEqual('0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac');
  });

  it('has the correct address for Alith (Eth), same as obtained by createFromUri', (): void => {
    const keyring = new Keyring({ type: 'ethereum' });
    const pair = keyring.createFromUri('0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133');

    expect(
      pair && pair.address
    ).toEqual('0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac');
  });

  it('checks eth test addresses', (): void => {
    const ring = createTestPairs({ type: 'ethereum' });
    const keyring = new Keyring({ type: 'ethereum' });
    // priv keys generated by  ganache-cli --mnemonic "bottom drive obey lake curtain smoke basket hold race lonely fit walk"
    const privKeys: string[] = ['0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133',
      '0x8075991ce870b93a8870eca0c0f91913d12f47948ca0fd25b49c6fa7cdbeee8b',
      '0x0b6e18cafb6ed99687ec547bd28139cafdd2bffe70e6b688025de6b445aa5c5b',
      '0x39539ab1876910bbf3a223d84a29e28f1cb4e2e456503e7e91ed39b2e7223d68',
      '0x7dce9bc8babb68fec1409be38c8e1a52650206a7ed90ff956ae8a6d15eeaaef4',
      '0xb9d2ea9a615f3165812e8d44de0d24da9bbd164b65c4f0573e1ce2c8dbd9c8df',
      '0x96b8a38e12e1a31dee1eab2fffdf9d9990045f5b37e44d8cc27766ef294acf18',
      '0x0d6dcaaef49272a5411896be8ad16c01c35d6f8c18873387b71fbc734759b0ab',
      '0x4c42532034540267bf568198ccec4cb822a025da542861fcb146a5fab6433ff8',
      '0x94c49300a58d576011096bcb006aa06f5a91b34b4383891e8029c21dc39fbb8b'];

    delete ring.nobody;

    Object.keys(ring).forEach((testKeyring, i) => {
      if (i < 5) { expect(u8aToHex(ring[testKeyring].publicKey)).toEqual(u8aToHex(keyring.createFromUri(privKeys[i]).publicKey)); }
    });
  });
});
