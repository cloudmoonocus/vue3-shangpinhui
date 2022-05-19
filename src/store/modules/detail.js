import { reqGetDetailList } from '@/Api';

const state = {
    detailList: {},
};

const actions = {
    async getDetailList({ commit }, id) {
        let result = await reqGetDetailList(id);
        if (result.code === 200) {
            commit('GETDETAILLIST', result.data);
        }
    },
};

const mutations = {
    GETDETAILLIST(state, detailList) {
        state.detailList = detailList;
    },
};

const getters = {
    goodsView(state) {
        return state.detailList.categoryView || {};
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
