import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';

import store from '@/store';

// 引入element plus提示框
import { ElMessage } from 'element-plus';
import { ElNotification } from 'element-plus';

// 创建路由实例
const router = createRouter({
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
            component: () => import('@/pages/Home'),
            meta: { show: true },
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/pages/Login'),
            meta: { show: false },
        },
        {
            name: 'register',
            path: '/register',
            component: () => import('@/pages/Register'),
            meta: { show: false },
        },
        {
            name: 'search',
            path: '/search',
            component: () => import('@/pages/Search'),
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
            component: () => import('@/pages/Detail'),
            meta: { show: true },
        },
        // 当进入主页，自动重定向到home页面
        {
            path: '/',
            redirect: '/home',
        },
    ],
});

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
    if (to.path == '/login') {
        if (store.state.login.token) {
            next('/home');
            // 使用element plus 弹出警视窗
            ElMessage.error({
                showClose: true,
                message: '您已经登陆过了，请勿重复登录!',
                center: true,
            });
        } else {
            next();
        }
    } else {
        if (store.state.login.name || to.path == '/register') {
            next();
        } else {
            try {
                await store.dispatch('login/userToken');
                next();
            } catch (error) {
                if (to.path == '/home') {
                    next();
                } else {
                    // token失效了，虽然token还在，但是无法正常获取信息
                    // 清除token，退出登录，返回登录界面
                    // *通知服务器退出登录，服务器要清除token
                    // *清除本地存储的一些数据
                    await store.dispatch('login/userOutLog');
                    // *退出成功返回登录界面
                    next('/login');
                    // 使用element plus 弹出警视窗
                    ElNotification({
                        title: '使用失败！',
                        type: 'error',
                        message: '您还未登录，请先登录！',
                        duration: 5000,
                    });
                }
            }
        }
    }
});

export default router;
