import { reqGetSearchInfo } from '@/Api';

const state = {
    searchList: {},
};

const actions = {
    // 获取Search模块的数据
    // params参数是在用户派发时候第二个参数传来的
    // 在这里必须至少传一个空对象
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params);
        if (result.data.code === 200) {
            commit('GETSEARCHLIST', result.data);
        }
    },
};

const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    },
};

// 计算属性：为了简化仓库中的数据
const getters = {};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
