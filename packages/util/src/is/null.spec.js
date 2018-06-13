// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { isNull } = require('./index');

describe('isNull', () => {
  it('returns true when a null value', () => {
    expect(
      isNull(null)
    ).toEqual(true);
  });

  it('returns false on non-null values', () => {
    expect(
      isNull()
    ).toEqual(false);
  });
});
