import { createApp } from 'vue';
import App from './App.vue';
import router from '@/routers';
// 三级导航
import TypeNav from '@/components/TypeNav';
// 接口
import { reqCategoryList } from '@/Api/index';
reqCategoryList();

// 注册全局组件的官方文档
// https://v3.cn.vuejs.org/guide/component-registration.html#%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C
// createApp(App).use(router).mount('#app');
// 换个方式写

// 通过app实现，上方其实是简化形式
const app = createApp(App);

// 创建三级导航的全局组件
app.component('TypeNav', TypeNav);

// 使用路由插件并挂载
app.use(router).mount('#app');
