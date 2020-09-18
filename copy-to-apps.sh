#!/bin/bash
# Copyright 2017-2020 @polkadot/util authors & contributors
# SPDX-License-Identifier: Apache-2.0

function copy_folder () {
  SRC="packages/$1/build"
  DST="../apps/node_modules/@polkadot/$1"

  echo "** Copying $SRC to $DST"

  rm -rf $DST
  cp -r $SRC $DST
}

yarn polkadot-dev-build-ts

copy_folder "keyring"
copy_folder "util"
copy_folder "util-crypto"
