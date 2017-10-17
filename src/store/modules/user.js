import { loginByEmail, logout, getInfo } from 'api/login';
import Cookies from 'js-cookie';

const user = {
    state: {
        user: '',
        status: '',
        email: '',
        code: '',
        uid: undefined,
        auth_type: '',
        oauth_js_id: '',
        token: Cookies.get('ASS_TOKEN'),
        name: '',
        avatar: '', // 个性图片
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        },
        providerCode: '', // 服务商系统CODE
        owner: [], // 用户管理货主信息 ownercode array
        authorize_code: '' // 授权码
    },

    mutations: {
        SET_AUTH_TYPE: (state, type) => {
            state.auth_type = type;
        },
        SET_OAUTH_JS_ID: (state, oauth_js_id) => {
            state.oauth_js_id = oauth_js_id;
        },
        SET_CODE: (state, code) => {
            state.code = code;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_UID: (state, uid) => {
            state.uid = uid;
        },
        SET_EMAIL: (state, email) => {
            state.email = email;
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction;
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting;
        },
        SET_STATUS: (state, status) => {
            state.status = status;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_OWNER: (state, owner) => {
            state.owner = owner;
        },
        SET_PROVIDERCODE: (state, providerCode) => {
            state.providerCode = providerCode;
        },
        SET_AUTHORIZE_CODE: (state, authorize_code) => {
            state.authorize_code = authorize_code;
        },
        LOGIN_SUCCESS: () => {
            console.log('login success')
        },
        LOGOUT_USER: state => {
            state.user = '';
        }
    },

    actions: {
        // 邮箱登录
        LoginByEmail({ commit }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                loginByEmail(username, userInfo.password).then(response => {
                    console.dir(response);
                    const data = response.data;

                    if (data.status === '0') {
                        // 授权码获取
                        const code = data.code;
                        console.log('授权码------->' + code);
                        const dest = data.set_cookie.toString().match(new RegExp('oauth_js_id=(\\w+\-\\w+\-\\w+\-\\w+-\\w+);', 'g'));
                        const jid = dest.toString().match(new RegExp('\\w+\-\\w+\-\\w+\-\\w+-\\w+', 'g'));

                        commit('SET_AUTHORIZE_CODE', code); // 授权码保存
                        commit('SET_OAUTH_JS_ID', jid);
                    } else {
                        // 授权失败
                        throw new Error(data.message);
                    }
                    Cookies.set('ASS_TOKEN', data.code); // 授权码作为前端token 注意
                    commit('SET_TOKEN', data.code);
                    commit('SET_EMAIL', username);

                    resolve();
                }).catch(error => {
                    console.dir(error);
                    reject(error);
                });
            });
        },



        // 获取用户信息 通过前端token（授权码）
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                // 授权登录 获取用户信息
                getInfo(state.authorize_code, state.oauth_js_id).then(response => {
                    let systemLoginFlg = false; // 系统权限
                    const rpData = response.data;
                    if (rpData.status === '0') {
                        // 系统登录权限判定
                        if (rpData.rsltData.systeminfolist !== null && rpData.rsltData.systeminfolist !== 'undefined') {
                            rpData.rsltData.systeminfolist.forEach(item => {
                                if (item.syscode === 'ASS001') { // 系统CODE判断
                                    systemLoginFlg = true;
                                    return;
                                }
                            });
                        }

                        if (!systemLoginFlg) {
                            throw new Error('你没有权限登录本系统!');
                        }

                        // 授权登录成功,获取用户信息
                        const rpRoles = [];
                        rpData.rsltData.rolelist.forEach(item => {
                            rpRoles.push(item.rolecode); // 角色设定
                        });

                        const ownerArray = [];
                        rpData.rsltData.ownerlist.forEach(item => {
                            ownerArray.push(item.owner);
                        });

                        console.dir(rpRoles);
                        commit('SET_ROLES', rpRoles);
                        commit('SET_OWNER', ownerArray); // 用户管理货主CODE存放
                        console.log('roles------------------->' + state.roles);
                        commit('SET_NAME', rpData.rsltData.user.username);
                        commit('SET_AVATAR', rpData.rsltData.user.imagesrc);
                        commit('SET_UID', '1');
                        commit('SET_INTRODUCTION', 'hello');
                        resolve(response);
                    } else {
                        // 授权登录失败
                        console.log('授权登录失败');
                        throw new Error('授权已过期!');
                    }
                }).catch(error => {
                    // 以防万一再次删除
                    console.log('前端token(授权码) 信息------>' + state.token);
                    Cookies.remove('ASS_TOKEN');
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    console.dir(error);
                    reject(error);
                });
            });
        },

        // // 获取用户信息
        // GetInfo({ commit, state }) {
        //     return new Promise((resolve, reject) => {
        //         getInfo(state.token).then(response => {
        //             const data = response.data;

        //             if (data.status === '1') {
        //                 // token被篡改 清除cookie
        //                 Cookies.remove('ASS_TOKEN');
        //                 commit('SET_TOKEN', '');
        //                 commit('SET_ROLES', []);
        //                 throw new Error(data.message);
        //             }
        //             commit('SET_PROVIDERCODE', data.providerCode);
        //             commit('SET_ROLES', data.role);
        //             commit('SET_NAME', data.name);
        //             commit('SET_AVATAR', data.avatar);
        //             commit('SET_UID', data.uid);
        //             commit('SET_INTRODUCTION', data.introduction);
        //             commit('SET_OWNER', data.owner);
        //             resolve(response);
        //         }).catch(error => {
        //             // 以防万一再次删除
        //             Cookies.remove('ASS_TOKEN');
        //             commit('SET_TOKEN', '');
        //             commit('SET_ROLES', []);
        //             reject(error);
        //         });
        //     });
        // },

        // 第三方验证登录
        LoginByThirdparty({ commit, state }, code) {
            return new Promise((resolve, reject) => {
                commit('SET_CODE', code);
                loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
                    commit('SET_TOKEN', response.data.token);
                    Cookies.set('ASS_TOKEN', response.data.token);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },


        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    Cookies.remove('ASS_TOKEN');
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                Cookies.remove('ASS_TOKEN');
                resolve();
            });
        },

        // 动态修改权限
        ChangeRole({ commit }, role) {
            return new Promise(resolve => {
                commit('SET_ROLES', [role]);
                commit('SET_TOKEN', role);
                Cookies.set('ASS_TOKEN', role);
                resolve();
            })
        }
    }
};

export default user;