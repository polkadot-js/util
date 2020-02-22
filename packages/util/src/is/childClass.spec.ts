// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

import { isChildClass } from '.';

describe('isChildClass', (): void => {
  it('returns true when a Child value', (): void => {
    expect(
      isChildClass(BN, class Test extends BN {})
    ).toEqual(true);
  });

  it('returns false on non-Child values', (): void => {
    expect(
      isChildClass(BN, Uint8Array)
    ).toEqual(false);
  });

  it('returns false on undefined', (): void => {
    expect(
      isChildClass(BN)
    ).toEqual(false);
  });
});
