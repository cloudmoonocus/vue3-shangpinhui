import { reqCategoryList } from '@/Api';

const state = {
    // 服务器返回什么类型,state的默认初始值就设置什么类型
    categoryList: [],
};

const actions = {
    // 通过API调用，向服务器发送请求
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data);
        }
    },
};

const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
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
