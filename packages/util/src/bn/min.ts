// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

/**
 * @name min
 * @summary Finds and returns the smallest value in an array of BNs.
 * @example
 * <BR>
 *
 * ```javascript
 * import BN from 'bn.js';
 * import { min } from '@polkadot/util';
 *
 * min([new BN(1), new BN(3), new BN(2)]).toString(); // => '1'
 * ```
 */
export default function min (
  ...items: BN[]
): BN | null {
  if (!items || !items.length) {
    return null;
  }

  return items.reduce((acc: BN, val: BN) => {
    return (val.lt(acc) ? val : acc);
  }, new BN('1e500'));
}
