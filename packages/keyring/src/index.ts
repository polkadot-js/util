// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assertSingletonPackage, decodeAddress, encodeAddress, setAddressPrefix } from '@polkadot/util';

import { default as Keyring } from './keyring';

assertSingletonPackage('@polkadot/keyring');

export default Keyring;

export {
  Keyring,
  decodeAddress,
  encodeAddress,
  setAddressPrefix
};
