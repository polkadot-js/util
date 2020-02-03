// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import assert from './assert';

// eslint-disable-next-line no-undef
type This = typeof globalThis;

interface PjsChecks extends This {
  __polkadotjs: Record<string, string[]>;
}

interface PackageJson {
  name: string;
  version: string;
}

type PjsGlobal = NodeJS.Global & PjsChecks;
type PjsWindow = Window & PjsChecks;

/**
 * @name detectPackage
 * @summary Checks that a specific package is only imported once
 */
export default function detectPackage (from: string, { name, version }: PackageJson): void {
  const _global = typeof window !== 'undefined'
    ? window as PjsWindow
    : global as PjsGlobal;

  if (!_global.__polkadotjs) {
    _global.__polkadotjs = {};
  }

  assert(name.startsWith('@polkadot'), `Invalid package descriptor ${name}`);

  _global.__polkadotjs[name] = [...(_global.__polkadotjs[name] || []), version];

  if (_global.__polkadotjs[name].length !== 1) {
    const versions = _global.__polkadotjs[name].reduce((versions: string[], version): string[] => {
      return versions.includes(version)
        ? versions
        : versions.concat(version);
    }, []).join(', ');

    console.warn(`${from}: Multiple instances of ${name} detected: ${versions}. Ensure that there is only one package in your dependency tree`);
  }
}
