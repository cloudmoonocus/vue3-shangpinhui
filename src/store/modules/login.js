import { reqGetUserLogin, reqOutLog, reqUserToken } from '@/Api';

const state = {
    token: localStorage.getItem('TOKEN'),
    data: {},
};
const actions = {
    // 登录
    async userLogin({ commit }, infor) {
        let result = await reqGetUserLogin(infor);
        if (result.code === 200) {
            commit('USERLOGIN', result.data.token);
            // 本地存储token
            localStorage.setItem('TOKEN', result.data.token);
            return 'Successfull!';
        } else {
            return Promise.reject(new Error('Failed!'));
        }
    },
    // 携带token请求服务器信息
    async userToken({ commit }) {
        let result = await reqUserToken();
        if (result.code === 200) {
            commit('USERTOKEN', result.data);
            return 'Scuessfull!';
        } else {
            return Promise.reject(new Error('Failed!'));
        }
    },
    // 退出登录
    async userOutLog({ commit }) {
        let result = await reqOutLog();
        if (result.code === 200) {
            commit('CLEARUSERINFO');
            localStorage.removeItem('TOKEN');
            return 'Successfull!';
        } else {
            return Promise.reject(new Error('Failed!'));
        }
    },
};
const mutations = {
    USERLOGIN(state, token) {
        state.token = token;
    },
    USERTOKEN(state, data) {
        state.data = data;
    },
    CLEARUSERINFO(state) {
        state.token = null;
        state.data = null;
    },
};
const getters = {};
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
