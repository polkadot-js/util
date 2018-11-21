// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import toU8a from '@polkadot/util/u8a/toU8a';
import u8aToHex from '@polkadot/util/u8a/toHex';

import ethereumCodec from './ethereumCodec';
import Trie from './index';
import getTests from '../../util-rlp/test/getTests';

// const trietest = getTests('TrieTests/trietest.json');
const trieanyorder = getTests('TrieTests/trieanyorder.json');

// FIXME These are not working, the trie-root implementation is now substrate-specific
describe.skip('official tests', () => {
  let trie: Trie;

  beforeEach(() => {
    trie = new Trie(undefined, undefined, ethereumCodec);
  });

  // FIXME (maybe) These all have empty/null values, we don't allow those atm as a key nor value
  // describe.skip('ordered tests', () => {
  //   trietest.forEach(({ name, input, root }) => {
  //     it(name, () => {
  //       input.map((input) =>
  //         trie.put(toU8a(input[0]), toU8a(input[1]))
  //       );

  //       expect(
  //         u8aToHex(trie.getRoot())
  //       ).toEqual(
  //         root
  //       );
  //     });
  //   });
  // });

  describe('unordered tests', () => {
    trieanyorder.forEach(({ name, input, root }) => {
      const keys = Object.keys(input);

      it(name, () => {
        keys.map((key) =>
          trie.put(toU8a(key), toU8a((input as any)[key]))
        );

        expect(
          u8aToHex(trie.getRoot())
        ).toEqual(
          root
        );
      });
    });
  });
});
