// Copyright 2017-2024 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import avail from './avail.js';
import { applyDerives } from './derives.js';
import { typesBundle as typesOnlyBundle } from './typesBundle.js';

export * from './constants.js';
export * from './params/index.js';

const _typesBundle = /*#__PURE__*/ applyDerives(typesOnlyBundle);

export const typesBundle = {
  ..._typesBundle,
  spec: {
    ..._typesBundle.spec,
    avail
  }
};
