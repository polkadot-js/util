// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { isBuffer } = require('./index');

describe('isBuffer', () => {
  it('returns true when a Buffer value', () => {
    expect(
      isBuffer(Buffer.from([]))
    ).toEqual(true);
  });

  it('returns false on non-Buffer values', () => {
    expect(
      isBuffer(0)
    ).toEqual(false);
  });
});
