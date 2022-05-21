import { createStore } from 'vuex';
import home from './modules/home';
import search from './modules/search';
import detail from './modules/detail';
import register from './modules/register';

export default createStore({
    modules: {
        home,
        search,
        detail,
        register,
    },
});
