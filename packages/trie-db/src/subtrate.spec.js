// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import testdata from '../../trie-root/test/data';

import Trie from './index';

describe('substrate tests', () => {
  let trie;

  const checkRoot = ({ root }) =>
    expect(trie.getRoot()).toEqual(root);

  const putValues = ({ input }) =>
    input.forEach(({ k, v }) => trie.put(k, v));

  beforeEach(() => {
    trie = new Trie();
  });

  Object.values(testdata).forEach((test) => {
    it(`hashes ${test.desc}`, () => {
      putValues(test);
      checkRoot(test);
    });
  });
});
