// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const bufferToNumber = require('../buffer/toNumber');
const hexToBuffer = require('../hex/toBuffer');

/**
  @name hexToNumber
  @signature hexToNumber (value?: string): number
  @summary Creates a Number value from a Buffer object.
  @description
    `null` inputs returns an NaN result, `hex` values return the actual value as a `Number`.
  @example
    import { hexToNumber } from '@polkadot/util';

    hexToNumber('0x1234'); // => 0x1234
*/
module.exports = function hexToNumber (value?: string): number {
  // flowlint-next-line sketchy-null-string:off
  if (!value) {
    return NaN;
  }

  return bufferToNumber(
    hexToBuffer(value)
  );
};
