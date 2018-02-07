// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const trieRoot = require('./root');
const trieRootOrdered = require('./rootOrdered');

/**
  @summary Utility methods to create [Ethereum Trie hashes](https://github.com/ethereum/wiki/wiki/Patricia-Tree)
*/
module.exports = {
  trieRoot,
  trieRootOrdered
};
