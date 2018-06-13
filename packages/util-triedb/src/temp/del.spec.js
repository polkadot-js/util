// Copyright 2017-2018 @polkadot/util-triedb authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const memory = require('./index')();

describe('del', () => {
  it('removes a value', () => {
    memory.set(new Uint8Array([1]), new Uint8Array([2]));
    memory.del(new Uint8Array([1]));

    expect(
      memory.isEmpty()
    ).toEqual(true);
  });
});
