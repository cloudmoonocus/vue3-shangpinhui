import { createStore } from 'vuex';
import Home from './Home';
import Search from './Search';

const store = createStore({
    modules: {
        Home,
        Search,
    },
});

export { store };
