// Copyright 2017-2019 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { compactStripLength, logger } from '@polkadot/util';

import NodeHeader, { BranchHeader, NibbleHeader } from './NodeHeader';
import { BITMAP, NodeEnum } from './constants';
import { addNibblesTerminator, encodeNibbles } from './nibbles';
import { toNibbles } from './util';

const EMPTY_BRANCH: Array<Uint8Array | null> = [
  null, null, null, null,
  null, null, null, null,
  null, null, null, null,
  null, null, null, null
];
const l = logger('trie/codec');

l.noop();

function _decodeBranch (header: NodeHeader, input: Uint8Array): Array<null | Uint8Array | [Uint8Array, Uint8Array]> {
  let offset = header.encodedLength;
  const branch = header.value as BranchHeader;
  const bitmap = input[offset] + (input[offset + 1] * 256);
  let value: null | Uint8Array = null;

  offset += 2;

  if (branch === true) {
    const [length, bytes] = compactStripLength(input.subarray(offset));

    value = bytes;
    offset += length;
  }

  return EMPTY_BRANCH.concat(value).map((value, index) => {
    let result: null | Uint8Array | [Uint8Array, Uint8Array] = value;

    if ((index < 16) && (bitmap & BITMAP[index])) {
      const [length, bytes] = compactStripLength(input.subarray(offset));

      result = bytes.length === 32
        ? bytes
        : decode(bytes) as any;
      offset += length;
    }

    return result;
  });
}

function _decodeKv (header: NodeHeader, input: Uint8Array): Array<null | Uint8Array | [Uint8Array, Uint8Array]> {
  let offset = header.encodedLength;
  const nibbleCount = (header.value as NibbleHeader);
  const nibbleLength = Math.floor((nibbleCount + 1) / 2);
  const nibbleData = input.subarray(offset, offset + nibbleLength);

  // for odd, ignore the first nibble, data starts at offset 1
  const nibbles = toNibbles(nibbleData).subarray(nibbleCount % 2);

  offset += nibbleData.length;

  const [, value] = compactStripLength(input.subarray(offset));

  return [
    encodeNibbles(
      header.nodeType === NodeEnum.LEAF
        ? addNibblesTerminator(nibbles)
        : nibbles
    ),
    value
  ];
}

export default function decode (input: null | Uint8Array): Uint8Array | null | Array<null | Uint8Array | [Uint8Array, Uint8Array]> {
  const header = new NodeHeader(input);
  const nodeType = header.nodeType;

  if (!input || nodeType === NodeEnum.NULL) {
    return input;
  } else if (nodeType === NodeEnum.BRANCH) {
    return _decodeBranch(header, input);
  } else if (nodeType === NodeEnum.EXT || nodeType === NodeEnum.LEAF) {
    return _decodeKv(header, input);
  }

  throw new Error('Unreachable');
}

// export default function decode (input: null | Uint8Array): Uint8Array | null | Array<null | Uint8Array | Array<null | Uint8Array>> {
//   const decoded = _decode(input);

//   // l.debug(() => ['decode', { input, decoded }]);

//   return decoded;
// }
