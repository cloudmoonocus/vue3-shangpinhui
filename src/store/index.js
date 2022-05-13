import { createStore } from 'vuex';
import home from './modules/home';
import search from './modules/search';

export default createStore({
    modules: {
        home,
        search,
    },
});
