// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isFunction = require('../is/function');

const { u8aFromBuffer } = require('./index');

describe('u8aFromBuffer', () => {
  it('exists as a function', () => {
    expect(
      isFunction(u8aFromBuffer)
    ).toEqual(true);
  });
});
