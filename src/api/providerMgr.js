/**
 * 维修工单
 *
 * LIU
 *
 * 20170717
 */

import fetch from 'utils/fetch';

export function getProviderList(ownerProviderCode) {
    return fetch({
        url: 'api/provider/owner/provider/list',
        method: 'get',
        params: { ownerProviderCode }
    });
}