// Copyright 2017-2019 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { compactAddLength, u8aConcat, isU8a, logger } from '@polkadot/util';

import NodeHeader from './NodeHeader';
import { BITMAP, NodeEnum } from './constants';
import { extractKey } from './nibbles';
import { fromNibbles } from './util';

const BRANCH_VALUE_INDEX = 16;
const EMPTY = new Uint8Array();

const l = logger('trie/codec');

l.noop();

// in the case of odd nibbles, the first byte is encoded as a single
// byte from the nibble, with the remainder of the nibbles is converted
// as nomral nibble combined bytes
function encodeKey (input: null | Uint8Array): Uint8Array {
  const nibbles = extractKey(input);

  // l.debug(() => ['encodeKey', { input, nibbles }]);

  return nibbles.length % 2
    ? u8aConcat(Uint8Array.from([nibbles[0]]), fromNibbles(nibbles.subarray(1)))
    : fromNibbles(nibbles);
}

function encodeValue (input: null | Uint8Array | Array<null | Uint8Array>): Uint8Array {
  if (!input) {
    return EMPTY;
  }

  // l.debug(() => ['encodeValue', { input, encoded }]);

  return compactAddLength(encode(input));
}

function _encodeBranch (header: NodeHeader, input: Array<null | Uint8Array>): Uint8Array {
  let valuesU8a = EMPTY;
  let bitmap = 0;

  for (let index = 0; index < BRANCH_VALUE_INDEX; index++) {
    const value = input[index];

    if (value) {
      bitmap = bitmap | BITMAP[index];

      valuesU8a = u8aConcat(valuesU8a, encodeValue(value));
    }
  }

  return u8aConcat(
    header.toU8a(),
    new Uint8Array([(bitmap % 256), Math.floor(bitmap / 256)]),
    encodeValue(input[BRANCH_VALUE_INDEX]),
    valuesU8a
  );
}

function _encodeKv (header: NodeHeader, input: Array<null | Uint8Array>): Uint8Array {
  const [key, value] = input;

  return u8aConcat(
    header.toU8a(),
    encodeKey(key),
    encodeValue(value)
  );
}

export default function encode (input?: null | Uint8Array | Array<null | Uint8Array>): Uint8Array {
  if (isU8a(input)) {
    return input;
  }

  const header = new NodeHeader(input);
  const nodeType = header.nodeType;

  if (!input || nodeType === NodeEnum.NULL) {
    return header.toU8a();
  } else if (nodeType === NodeEnum.BRANCH) {
    return _encodeBranch(header, input);
  } else if (nodeType === NodeEnum.EXT || nodeType === NodeEnum.LEAF) {
    return _encodeKv(header, input);
  }

  throw new Error('Unreachable');
}

// export default function encode (input?: null | Uint8Array | Array<null | Uint8Array>): Uint8Array {
//   const encoded = _encode(input);

//   // l.debug(() => ['encode', { input, encoded }]);

//   return encoded;
// }
