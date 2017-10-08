/**
 * 机型管理
 */
import fetch from 'utils/fetch';

export function getModelList(query) {
    return fetch({
        url: 'api/model/queryModelList',
        method: 'post',
        params: query
    });
}

export function queryOwner() {
    return fetch({
        url: 'api/model/queryOwner',
        method: 'get'
    });
}

export function queryModelByCode(code) {
    return fetch({
        url: 'api/model/queryModelByCode',
        method: 'get',
        params: { code }
    });
}

export function addModel(params) {
    return fetch({
        url: 'api/model/addModel',
        method: 'post',
        data: params
    });
}

export function updateModel(params) {
    return fetch({
        url: 'api/model/updateModel',
        method: 'post',
        data: params
    });
}

export function modelEffect(param) {
    return fetch({
        url: 'api/model/modelEffect',
        method: 'post',
        data: param
    });
}

export function modelInvalid(param) {
    return fetch({
        url: 'api/model/modelInvalid',
        method: 'post',
        data: param
    });
}


