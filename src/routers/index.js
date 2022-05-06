import { createRouter } from 'vue-router';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import { createWebHistory } from 'vue-router';

// 创建路由实例
export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'home',
            path: '/home',
            component: Home,
            meta: { show: true },
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
            meta: { show: false },
        },
        {
            name: 'register',
            path: '/register',
            component: Register,
            meta: { show: false },
        },
        {
            name: 'search',
            path: '/search',
            component: Search,
            meta: { show: true },
        },
        // 当进入主页，自动重定向到home页面
        {
            path: '/',
            redirect: '/home',
        },
    ],
});
