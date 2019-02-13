// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import testingPairs from '../testingPairs';
import { PKCS8_DIVIDER, PKCS8_HEADER } from './defaults';

const PKCS8_LENGTH = PKCS8_DIVIDER.length + PKCS8_HEADER.length + 64;
const ENCODED_LENGTH = 125;

const keyring = testingPairs({ type: 'ed25519' });

describe('encode', () => {
  it('returns PKCS8 when no passphrase supplied', () => {
    expect(
      keyring.alice.encodePkcs8()
    ).toHaveLength(PKCS8_LENGTH);
  });

  it('returns encoded PKCS8 when passphrase supplied', () => {
    expect(
      keyring.alice.encodePkcs8('testing')
    ).toHaveLength(ENCODED_LENGTH);
  });
});
