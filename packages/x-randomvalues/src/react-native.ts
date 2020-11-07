// Copyright 2017-2020 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Adapted from https://github.com/LinusU/react-native-get-random-values/blob/85f48393821c23b83b89a8177f56d3a81dc8b733/index.js
// Copyright (c) 2018, 2020 Linus Unnebäck
// SPDX-License-Identifier: MIT

import { NativeModules } from 'react-native';

import insecureRandomValues from './fallback';

interface RNExt {
  RNGetRandomValues: {
    getRandomBase64: (length: number) => string;
  }
}

function getRandomValuesNative <T extends Uint8Array> (arr: T): T {
  // We may want to use a base64 decoder here, but we certainly have an issue where we
  // want/need this part as lean as possible. Since Buffer is already needed elsewhere
  // (an generally prevalent in JS), we rather use it as-is.
  return Buffer
    .from((NativeModules as RNExt).RNGetRandomValues.getRandomBase64(arr.length), 'base64')
    .reduce((arr, byte, index): T => {
      arr[index] = byte;

      return arr;
    }, arr);
}

function getRandomValuesGlobal <T extends Uint8Array> (arr: T): T {
  return crypto.getRandomValues(arr);
}

const getRandomValues = typeof global.crypto !== 'undefined' && typeof global.crypto.getRandomValues === 'function'
  ? getRandomValuesGlobal
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-explicit-any
  : (typeof (global as any).nativeCallSyncHook === 'undefined' || !NativeModules.ExpoRandom)
    ? insecureRandomValues
    : getRandomValuesNative;

export function polyfill (): void {
  if (typeof global.crypto !== 'object') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.crypto = {};
  }

  if (typeof global.crypto.getRandomValues !== 'function') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    global.crypto.getRandomValues = getRandomValues;
  }
}

export default getRandomValues;
