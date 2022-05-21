import { reqGetRegisterCode, reqGetUserRegister } from '@/Api';

const state = {
    code: '',
};

const actions = {
    async getRegisterCode({ commit }, phone) {
        let result = await reqGetRegisterCode(phone);
        if (result.code === 200) {
            commit('GETREGISTERCODE', result.data);
        } else {
            return Promise.reject(new Error('faile!'));
        }
    },
    async getUserRegister({ commit }, infor) {
        let result = await reqGetUserRegister(infor);
        if (result.code === 200) {
            return 'Successful!';
        } else {
            return Promise.reject(new Error('faile!'));
        }
    },
};

const mutations = {
    GETREGISTERCODE(state, data) {
        state.code = data;
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
