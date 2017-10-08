/**
 * 备件申请用
 *
 * LIU
 */

import fetch from 'utils/fetch';

export function createApplyStockOrder(stockOrderForm) {
    const data = {
        owner: stockOrderForm.owner,
        providercode: stockOrderForm.providercode,
        warehousecode: '',
        logisticscode: '',
        createuser: stockOrderForm.createuser,
        stockDetailList: stockOrderForm.stockDetailList
    };
    return fetch({
        url: 'api/create/apply/stock/in/new',
        method: 'post',
        data
    });
}

// 货主内部CODE必要
// export function listApplyInStockOrder(pageNum, pageSize, createDateStart, createDateEnd, owner, review, status, sortName, sortOrder, providerCode) {
//     return fetch({
//         url: 'api/create/apply/stock/owner/in/list',
//         method: 'get',
//         params: { pageNum, pageSize, createDateStart, createDateEnd, owner, review, status, sortName, sortOrder, providerCode }
//     })
// }

export function listApplyInStockOrder(queryInfo) {
    return fetch({
        url: 'api/create/apply/stock/owner/in/list',
        method: 'get',
        params: queryInfo
    })
}

// 货主内部CODE必要
export function applyStockOrderListByOdrNumber(odrNumber, providerCode) {
    return fetch({
        url: 'api/create/apply/stock/owner/in/list/order',
        method: 'get',
        params: { odrNumber, providerCode }
    });
}

// 备件申请基础信息
export function getBaseInfo(stockOrderNumber) {
    return fetch({
        url: 'api/create/apply/stock/baseinfo',
        method: 'get',
        params: {
            stockOrderNumber
        }
    });
}

// 备件申请审核
export function verifyOrder(verifyForm) {
    const data = {
        stockOrderNumber: verifyForm.stockOrderNumber,
        rejectInfo: verifyForm.rejectInfo,
        warehouseCode: verifyForm.warehouseCode,
        reviewValue: verifyForm.reviewValue,
        uid: verifyForm.uid
    };
    return fetch({
        url: 'api/create/apply/stock/verify/order',
        method: 'patch',
        data
    });
}

// 确认发货
export function deliveryOrder(inStockOrder) {
    const data = {
        stockOrderNumber: inStockOrder.stockOrderNumber,
        uid: inStockOrder.uid
    };
    return fetch({
        url: 'api/create/apply/stock/delivery/order',
        method: 'patch',
        data
    });
}