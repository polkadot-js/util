// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert, isNull } from '@polkadot/util/index';

import DeriveJunction from './DeriveJunction';

type DeriveResult = {
  password?: string,
  path: Array<DeriveJunction>,
  phrase: string
};

const RE_CAPTURE = /^(\w+( \w+)*)((\/\/?[^\/]+)*)(\/\/\/(.*))?$/;
const RE_JUNCTION = /\/(\/?)([^/]+)/g;

/**
 * @description Manages a suri format for specifying secret keys `<secret>/<soft-key>//<hard-key>///<password>` (the `///password` may be omitted, and `/<soft-key>` and `//<hard-key>` maybe repeated and mixed).
 */
export default function keyDerive (suri: string): DeriveResult {
  const matches = suri.match(RE_CAPTURE);

  assert(!isNull(matches), `Unable to match '${suri}' to a secret URI`);

  const [, phrase, , junctions, , , password] = matches as Array<any>;
  const path: Array<DeriveJunction> = [];

  let parts = junctions.match(RE_JUNCTION);

  if (parts) {
    parts.forEach((value: string) => {
      path.push(DeriveJunction.from(value.substr(1)));
    });
  }

  return {
    password,
    path,
    phrase
  };
}
