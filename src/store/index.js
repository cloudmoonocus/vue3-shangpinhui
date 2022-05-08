import { createStore } from 'vuex';
import Home from './Home';
import Search from './Search';

export default createStore({
    modules: {
        Home,
        Search,
    },
});
