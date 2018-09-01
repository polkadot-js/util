// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import toU8a from '@polkadot/util/u8a/toU8a';
import u8aToHex from '@polkadot/util/u8a/toHex';

import Trie from '../src/index';
import getTests from '../../../test/getTests';

const trietest = getTests('TrieTests/trietest.json');
const trieanyorder = getTests('TrieTests/trieanyorder.json');

describe.skip'official tests', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  describe.skip'ordered tests', () => {
    const testNames = Object.keys(trietest);

    trietest.forEach(({ name, input, root }) => {
      it(name, async () => {
        await Promise.all(
          input.map((input) =>
            trie.put(toU8a(input[0]), toU8a(input[1]))
          )
        );

        expect(
          u8aToHex(trie.root)
        ).toEqual(
          root
        );
      });
    });
  });

  describe.skip'unordered tests', () => {
    const testNames = Object.keys(trieanyorder);

    trieanyorder.forEach(({ name, input, root }) => {
      const keys = Object.keys(input);

      it(name, async () => {
        await Promise.all(
          keys.map((key) =>
            trie.put(toU8a(key), toU8a(input[key]))
          )
        );

        expect(
          u8aToHex(trie.root)
        ).toEqual(
          root
        );
      });
    });
  });
});
