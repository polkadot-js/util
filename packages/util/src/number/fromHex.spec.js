// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isFunction = require('../is/function');

const { numberFromHex } = require('./index');

describe('numberFromHex', () => {
  it('exists as a function', () => {
    expect(
      isFunction(numberFromHex)
    ).toEqual(true);
  });
});
