// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringPair, KeyringOptions } from './types';

import createKeyring from './testing';
import nobody from './pair/nobody';

type TestKeyringMap = {
  [index: string]: KeyringPair
};

export default function testKeyringPairs (options?: KeyringOptions, isHdKd: boolean = false): TestKeyringMap {
  const keyring = createKeyring(options, isHdKd);
  const pairs = keyring.getPairs();

  return pairs.reduce((result, pair) => {
    const { name } = pair.getMeta();

    result[name as string] = pair;

    return result;
  }, { 'nobody': nobody() } as TestKeyringMap);
}
