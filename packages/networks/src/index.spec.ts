// Copyright 2017-2021 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NetworkFromSubstrate } from './types';

import { knownGenesis, knownIcon, knownLedger, knownTestnet } from './defaults';
import filtered, { all, available } from '.';

describe('filtered', (): void => {
  it('has the correct starting order', (): void => {
    expect(filtered.slice(0, 3).map(({ prefix }) => prefix)).toEqual([0, 2, 42]);
  });

  it('has no ignored networks', (): void => {
    expect(available.some(({ isIgnored }) => isIgnored)).toEqual(false);
  });

  it('has no reserved networks', (): void => {
    expect(available.some(({ prefix }) => prefix === 47)).toEqual(false);
  });

  it('has all genesis information', (): void => {
    expect(
      knownGenesis.filter(({ genesisHash, network }) =>
        available.some((a) =>
          a.network === network &&
          genesisHash.some((g, index) => a.genesisHash[index] !== g)
        )
      )
    ).toEqual([]);
  });

  it('has all ledger details', (): void => {
    expect(
      knownLedger.filter(({ network, slip44 }) =>
        available.some((a) =>
          a.network === network && (
            a.slip44 !== slip44 ||
            !a.hasLedgerSupport ||
            !a.genesisHash.length
          )
        )
      )
    ).toEqual([]);
  });

  it('has no testnets exposed', (): void => {
    expect(
      knownTestnet.filter(({ network }) =>
        available.some((a) =>
          a.network === network
        )
      )
    ).toEqual([]);
  });

  it('has all icons, except for overrides', (): void => {
    expect(
      available.filter(({ icon, network }) =>
        icon !== 'substrate' &&
        knownIcon.some((i) =>
          i.network === network &&
          i.icon !== icon
        )
      )
    ).toEqual([]);
  });

  it('has no ss58 duplicates', (): void => {
    const dupes: NetworkFromSubstrate[] = [];
    const uniques: NetworkFromSubstrate[] = [];

    all.forEach((a): void => {
      if (uniques.some((u) => u.prefix === a.prefix)) {
        dupes.push(a);
      } else {
        uniques.push(a);
      }
    });

    expect(dupes).toEqual([]);
  });
});
