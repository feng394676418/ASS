import fetch from 'utils/fetch';

export function loginByEmail(username, password) {
    const data = {
        username,
        password,
        clientid: '4afddd82-846b-4436-9380-46df7db78c90', // 客户端ID
        authorizationuri: 'http://192.168.81.250:9966/authorize', // 校验授权码获取uri
        // authorizationuri: 'http://localhost:9966/authorize', // 本地授权码获取uri
        // authorizationuri: 'http://47.91.78.238:9966/authorize', // 生产授权码获取uri
        redirecturi: 'http://localhost:9901/' // 保留 暂未利用
    };
    return fetch({
        url: 'api/user/login/loginbyemail',
        // url: 'http://localhost:9966/authorize',
        // url: '/login/loginbyemail',
        // url: 'http://localhost:9966/authorize?username=aaa&password=bbb&client_id=c1ebe466-1cdc-4bd3-ab69-77c3561b9dee&response_type=code&redirect_uri=http://localhost:9901/user/login',
        method: 'post',
        data
    });
}

export function logout() {
    return fetch({
        url: 'api/user/login/logout',
        method: 'post'
    });
}

export function getInfo(code, oauth_js_id, name) {
    const oauth2AuthcInfo = { // oauth2配置
        username: name,
        clientId: '4afddd82-846b-4436-9380-46df7db78c90',
        clientSecret: '2773dbe57917b942f740630b230014c4',
        accessTokenUri: 'http://192.168.81.250:9966/accessToken', // 校验环境URL
        userInfoUri: 'http://192.168.81.250:9966/userInfo', // 校验环境URL
        // accessTokenUri: 'http://localhost:9966/accessToken', // 本地URL
        // userInfoUri: 'http://localhost:9966/userInfo', // 本地URL
        // accessTokenUri: 'http://47.91.78.238:9966/accessToken', /生产URL
        // userInfoUri: 'http://47.91.78.238:9966/userInfo', // 生产URL
        redirectUri: 'http://localhost:9902/', // 保留 暂时未用
        no_redirect: 'true' // VUE 利用特别配置
    }

    return fetch({
        // url: 'api/user/getInfo',
        url: 'api/oauth2Authc',
        method: 'get',
        params: {
            code,
            username: oauth2AuthcInfo.username,
            client_id: oauth2AuthcInfo.clientId,
            client_secret: oauth2AuthcInfo.clientSecret,
            access_token_uri: oauth2AuthcInfo.accessTokenUri,
            user_info_uri: oauth2AuthcInfo.userInfoUri,
            redirect_uri: oauth2AuthcInfo.redirectUri,
            no_redirect: oauth2AuthcInfo.no_redirect,
            oauth_js_id: oauth_js_id.toString()
        }
    });
}