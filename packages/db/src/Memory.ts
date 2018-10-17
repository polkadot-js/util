// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDbOptions } from './types';

import MemoryDb from './engines/MemoryDb';
import TransactionDb from './engines/TransactionDb';

/**
 * @name MemoryDb
 * @summary Creates a MemoryDb database extending TransactionDb
 * @description Create an instance of a Memory database using
 * MemoryDb and extending TransactionDb.
 * `options` argument (optional) used to specifies whether
 * to use compression.
 * - Enable compression when storing "blocks" since they compress well.
 * - Disable compression when storing "state" Transactions Trie
 * using @polkadot/trie-db or @polkadot/db/src/engines/TransactionDb.ts
 * (potentially LevelDb or RocksDb implementation of a Merkle Patricia Trie)
 * data structure serialised with Recursive Length Prefix (RLP) encoding
 * @example
 * <BR>
 *
 * ```javascript
 * import u8aFromString from '@polkadot/util/u8a/fromString';
 * import MemoryDb from '@polkadot/db/Memory';
 * import TransactionDb from '@polkadot/db/engines/TransactionDb';
 *
 * const memoryDb = new MemoryDb();
 * const txDb = new TransactionDb(memoryDb);
 *
 * // Open the memory database
 * memoryDb.open();
 *
 * // Declare key/value pair to allocate to store under a the key
 * const key = u8aFromString('key');
 * const value = u8aFromString('some value');
 *
 * // Store key/value pair in memory db
 * memoryDb.put(key, value);
 *
 * // Retrieve value for key from memory db
 * valueRetrieved = memoryDb.get(key);
 *
 * // Delete key/value pair from memory db
 * memoryDb.del(key);
 *
 * // Transaction to Store key/value pair in transaction db
 * const isTxSuccess = txDb.transaction(() => {
 *   txDb.put(key, value);
 *
 *   // Boolean to indicate whether transaction was successful or not
 *   return true;
 * });
 *
 * console.log(`Transaction successful?: ${isTxSuccess}`);
 *
 * // Retrieve transaction value from memory db
 * console.log(`Transfered value: ${memoryDb.get(key)}`);
 *
 * // Close the memory database
 * memoryDb.close();
 * ```
 */
export default class Memory extends TransactionDb {
  constructor (options?: BaseDbOptions) {
    super(new MemoryDb(options));
  }
}
