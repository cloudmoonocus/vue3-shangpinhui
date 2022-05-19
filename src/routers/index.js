import { createRouter } from 'vue-router';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import { createWebHistory } from 'vue-router';

// 创建路由实例
export default createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
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
            // props传参，布尔值写法
            // props:true,
            // props传参若使用对象式写法，只能用params传参
            // props传参，函数式写法
            props: ($route) => {
                return {
                    k: $route.query.k,
                };
            },
        },
        {
            name: 'detail',
            path: '/detail/:id',
            component: Detail,
            meta: { show: true },
        },
        // 当进入主页，自动重定向到home页面
        {
            path: '/',
            redirect: '/home',
        },
    ],
});
