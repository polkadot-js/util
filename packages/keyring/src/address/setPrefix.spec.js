// Copyright 2017-2018 @polkadot/util-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import encode from './encode';
import setPrefix from './setPrefix';

describe('setPrefix', () => {
  beforeEach(() => {
    setPrefix(68);
  });

  it('sets and allows encoding using', () => {
    expect(
      encode(
        new Uint8Array([1])
      )
    ).toEqual('Pqt7');
  });
});
