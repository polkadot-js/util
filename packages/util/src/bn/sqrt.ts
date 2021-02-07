// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import { assert } from '../assert';
import { BN_MAX_INTEGER, BN_ONE, BN_TWO, BN_ZERO } from '../bn';

// https://stackoverflow.com/questions/53683995/javascript-big-integer-square-root/
function newtonSqrt (n: BN): BN {
  // shortcut < 2^53 -1 to use the JS utils
  if (n.lte(BN_MAX_INTEGER)) {
    return new BN(Math.floor(Math.sqrt(n.toNumber())));
  }

  // Use sqrt(MAX_SAFE_INTEGER) as starting point. since we already know the
  // output will be larger than this, we expect this to be a safe start
  let x0 = new BN(94906265);

  while (true) {
    const x1 = n.div(x0).iadd(x0).ishrn(1);

    if (x0.eq(x1) || x0.eq(x1.sub(BN_ONE))) {
      return x0;
    }

    x0 = x1;
  }
}

/**
 * @name bnSqrt
 * @summary Calculates the integer square root of a BN
 * @example
 * <BR>
 *
 * ```javascript
 * import BN from 'bn.js';
 * import { bnSqrt } from '@polkadot/util';
 *
 * bnSqrt(new BN(16)).toString(); // => '4'
 * ```
 */
export function bnSqrt (value: BN): BN {
  assert(value.gte(BN_ZERO), 'square root of negative numbers is not supported');

  return value.lt(BN_TWO)
    ? value
    : newtonSqrt(value);
}
