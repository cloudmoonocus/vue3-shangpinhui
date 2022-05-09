import { reqCategoryList } from '@/Api';
import { createStore } from 'vuex';
import home from './modules/home';
import search from './modules/search';

export default createStore({
    actions: {
        // 请求数据函数
        // categoryList() {
        //     console.log(reqCategoryList);
        // },
    },
    modules: {
        home,
        search,
    },
});
