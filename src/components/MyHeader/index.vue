<template>
    <!-- 头部 -->
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="whetherLogin">
                        <span>请</span>
                        <!-- 配置声明式路由跳转 -->
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                    </p>
                    <p v-else>
                        <a>{{ userName }}</a>
                        <a class="register" @click="outLog">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <a href="###">我的订单</a>
                    <a href="###">我的购物车</a>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <!-- 声明式路由 -->
                <router-link class="logo" to="/home">
                    <img src="./images/logo.png" alt="" />
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <!-- 双向数据绑定，ref / reactive 将其引用 -->
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="final" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import store from '@/store';
import { computed } from '@vue/runtime-core';
export default {
    name: 'MyHeader',
    setup() {
        let router = useRouter();
        let final = ref();
        // 编程式路由跳转，使用useRouter，需要提前引入
        let goSearch = () => {
            // params不能和path写法一起使用。若使用params传参，则必须指定name
            router.replace({ path: '/search', query: { sousuo: final.value } });
        };
        // 检查是否有token
        const whetherLogin = computed(() => {
            if (store.state.login.token) {
                return false;
            } else {
                return true;
            }
        });
        // 获取用户名
        const userName = computed(() => {
            if (store.state.login.data.name) {
                return store.state.login.data.name;
            }
        });
        // 退出登录
        async function outLog() {
            // 通知服务器退出登录，服务器要清除token
            // 清除本地存储的一些数据
            try {
                await store.dispatch('login/userOutLog');
                // 退出成功返回首页
                router.replace('/home');
            } catch (error) {
                alert('Failed!');
            }
        }
        return {
            final,
            goSearch,
            whetherLogin,
            userName,
            outLog,
        };
    },
};
</script>

<style lang="less" scoped>
.header {
    & > .top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    & + a {
                        border-left: 1px solid #b3aeae;
                    }
                }
            }
        }
    }

    & > .bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>
