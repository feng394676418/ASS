/**
 * 报告信息提交
 *
 * 20170726
 *
 * LIU
 *
 */

import fetch from 'utils/fetch';


export function checkReportUpdate(checkReportForm) {
    const data = {
        orderNumber: checkReportForm.orderNumber,
        productType: checkReportForm.productType,
        productTypeCfm: checkReportForm.productTypeCfm,
        imei: checkReportForm.imei,
        imeiCfm: checkReportForm.imeiCfm,
        causeInfo: checkReportForm.causeInfo,
        serviceType: checkReportForm.serviceType,
        repairLevel: checkReportForm.repairLevel.toString(),
        collectionCost: checkReportForm.collectionCost,
        partsCost: checkReportForm.partsCost,
        mailingCost: checkReportForm.mailingCost,
        repairCost: checkReportForm.repairCost,
        photoGrpurl: checkReportForm.photoGrpurl.toString(),
        createUser: checkReportForm.createUser,
        orderPartList: checkReportForm.orderPartList
    };
    return fetch({
        url: 'api/check/report/update',
        method: 'post',
        data
    });
}

// 统一报价进行维修
export function confirmQuotesUpdate(orderNumber, uid) {
    return fetch({
        url: 'api/check/report/confirm_quotes',
        method: 'patch',
        params: { orderNumber, uid }
    });
}

// 拒绝报价放弃维修
export function rejectQuotes(orderNumber) {
    return fetch({
        url: 'api/check/report/reject/quotes',
        method: 'patch',
        params: { orderNumber }
    });
}

export function testOrder(testReportForm) {
    const data = {
        orderNumber: testReportForm.orderNumber,
        repairOK: testReportForm.repairOK,
        confirmOK: testReportForm.confirmOK,
        confirmUser: testReportForm.confirmUser
    };
    return fetch({
        url: 'api/order/test/report',
        method: 'patch',
        data
    });
}

export function maintain(orderNumber, uid) {
    return fetch({
        url: 'api/check/report/maintain',
        method: 'patch',
        params: { orderNumber, uid }
    });
}