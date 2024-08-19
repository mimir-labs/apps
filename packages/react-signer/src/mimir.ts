// Copyright 2017-2024 @polkadot/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ApiPromise } from '@polkadot/api';
import type { Call } from '@polkadot/types/interfaces';
import type { IMethod } from '@polkadot/types/types';

function findFinalCall (api: ApiPromise, call: Call | IMethod): Call | IMethod {
  if (api.tx.multisig.asMulti.is(call)) {
    const data = call.args[3].toU8a(true);

    return findFinalCall(api, api.registry.createType('Call', data));
  } else if (api.tx.proxy?.proxy?.is(call)) {
    return findFinalCall(api, call.args[2]);
  } else {
    return call;
  }
}

export function checkCall (api: ApiPromise, multisigCall: Call | IMethod, expectCall: Call | IMethod): boolean {
  const finalCall = findFinalCall(api, multisigCall);

  if (!finalCall.hash.eq(expectCall.hash)) {
    const meta = api.registry.findMetaCall(finalCall.callIndex);
    const expectMeta = api.registry.findMetaCall(finalCall.callIndex);

    console.warn(`the final call found in multisigCall is (${meta.section}.${meta.method}), which does not match the expected call(${expectMeta.section}.${expectMeta.method}).`);

    return false;
  } else {
    return true;
  }
}
