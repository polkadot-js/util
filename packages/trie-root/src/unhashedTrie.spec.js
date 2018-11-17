// Copyright 2017-2018 @polkadot/trie-root authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import unhashedTrie from './unhashedTrie';
import tests from './testdata';

describe('unhashedTrie', () => {
  tests.forEach(({ name, input, output }) => {
    it(`encodes ${name}`, () => {
      expect(unhashedTrie(input)).toEqual(output);
    });
  });
});
