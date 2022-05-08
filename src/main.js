import { createApp } from 'vue';
import App from './App.vue';

import router from '@/routers';

// 三级导航
import TypeNav from '@/components/TypeNav';

// vuex
import store from './store';

const app = createApp(App);

// 创建三级导航的全局组件
app.component('TypeNav', TypeNav);

// 使用路由和Vuex插件并挂载
app.use(router).use(store).mount('#app');
