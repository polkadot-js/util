// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { keccak256 as keccak256Js } from 'js-sha3';
import { u8aToU8a } from '@polkadot/util';
import { isReady, keccak256 } from '@polkadot/wasm-crypto';

/**
 * @name keccakAsU8a
 * @summary Creates a keccak Uint8Array from the input.
 * @description
 * From either a `string` or a `Buffer` input, create the keccak and return the result as a `Uint8Array`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { keccakAsU8a } from '@polkadot/util-crypto';
 *
 * keccakAsU8a('123'); // => Uint8Array
 * ```
 */
export function keccakAsU8a (value: Buffer | Uint8Array | string, onlyJs = false): Uint8Array {
  return isReady() && !onlyJs
    ? keccak256(u8aToU8a(value))
    : new Uint8Array(
      keccak256Js.update(u8aToU8a(value)).arrayBuffer()
    );
}
