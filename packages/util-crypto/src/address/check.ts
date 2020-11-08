// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Prefix } from './types';

import { base58Decode } from '../base58/decode';
import { checkAddressChecksum } from './checksum';
import { defaults } from './defaults';

/**
 * @name checkAddress
 * @summary Validates an ss58 address.
 * @description
 * From the provided input, validate that the address is a valid input.
 */
export function checkAddress (address: string, prefix: Prefix): [boolean, string | null] {
  let decoded;

  try {
    decoded = base58Decode(address);
  } catch (error) {
    return [false, (error as Error).message];
  }

  if (decoded[0] !== prefix) {
    return [false, `Prefix mismatch, expected ${prefix}, found ${decoded[0]}`];
  } else if (!defaults.allowedDecodedLengths.includes(decoded.length)) {
    return [false, 'Invalid decoded address length'];
  }

  const [isValid] = checkAddressChecksum(decoded);

  return [isValid, isValid ? null : 'Invalid decoded address checksum'];
}
