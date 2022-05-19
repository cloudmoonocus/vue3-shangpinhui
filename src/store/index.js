import { createStore } from 'vuex';
import home from './modules/home';
import search from './modules/search';
import detail from './modules/detail';

export default createStore({
    modules: {
        home,
        search,
        detail,
    },
});
