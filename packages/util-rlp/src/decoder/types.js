// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.
// @flow

export type DecodeOutput = {
  // flowlint-next-line unclear-type:off
  decoded: Uint8Array | Array<any>,
  remainder: Uint8Array
}

export type DecodeFunc = (input: Uint8Array) => DecodeOutput;
