<template>
    <div class="register-container">
        <!-- 注册内容 -->
        <div class="register">
            <h3>
                注册新用户
                <span class="go">我有账号，去 <a href="login" target="_blank">登陆</a> </span>
            </h3>
            <form>
                <div class="content">
                    <label>手机号:</label>
                    <input type="text" placeholder="请输入你的手机号" v-model="infor.phone" />
                    <span class="error-msg">错误提示信息</span>
                </div>
                <div class="content">
                    <label>验证码:</label>
                    <input type="text" placeholder="请输入验证码" autocomplete="code" v-model="infor.code" />&nbsp;
                    <el-button type="danger" @click="getCode">获取验证码</el-button>
                    <span class="error-msg">错误提示信息</span>
                </div>
                <div class="content">
                    <label>登录密码:</label>
                    <input
                        type="password"
                        placeholder="请输入你的登录密码"
                        autocomplete="new-password"
                        v-model="infor.password1"
                    />
                    <span class="error-msg">错误提示信息</span>
                </div>
                <div class="content">
                    <label>确认密码:</label>
                    <input
                        type="password"
                        placeholder="请输入确认密码"
                        autocomplete="new-password"
                        v-model="infor.password2"
                    />
                    <span class="error-msg" v-show="show">您输入的密码与上方不一致！</span>
                </div>
                <div class="controls">
                    <input name="m1" type="checkbox" v-model="infor.agree" />
                    <span>同意协议并注册《尚品汇用户协议》</span>
                    <span class="error-msg">错误提示信息</span>
                </div>
                <div class="btn" @click="userRegister">
                    <button>完成注册</button>
                </div>
            </form>
        </div>

        <!-- 底部 -->
        <div class="copyright">
            <ul>
                <li>关于我们</li>
                <li>联系我们</li>
                <li>联系客服</li>
                <li>商家入驻</li>
                <li>营销中心</li>
                <li>手机尚品汇</li>
                <li>销售联盟</li>
                <li>尚品汇社区</li>
            </ul>
            <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
            <div class="beian">京ICP备19006430号</div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import store from '@/store';
import { watch } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
export default {
    name: 'Register',
    setup() {
        const router = useRouter();

        // 响应式数据
        let infor = reactive({
            phone: '',
            code: '',
            password1: '',
            password2: '',
            agree: true,
        });
        let show = ref();

        // 获取验证码
        async function getCode() {
            await store.dispatch('register/getRegisterCode', infor.phone);
            infor.code = store.state.register.code;
        }

        // 提交信息
        async function userRegister() {
            const userInfor = { phone: infor.phone, code: infor.code, password: infor.password1 };
            try {
                infor.phone &&
                    infor.code &&
                    infor.password1 &&
                    infor.password2 &&
                    !show.value &&
                    (await store.dispatch('register/getUserRegister', userInfor));
                router.push('/login');
            } catch (error) {
                alert('发生了错误！！');
            }
        }

        // 检测密码是否一致验证
        const verifyPassword = watch(
            // 监听响应式对象
            () => infor.password2,
            () => {
                if (infor.password2 === infor.password1) {
                    show.value = false;
                } else {
                    show.value = true;
                }
            }
        );

        return {
            show,
            infor,
            getCode,
            verifyPassword,
            userRegister,
        };
    },
};
</script>

<style lang="less" scoped>
.register-container {
    .register {
        width: 1200px;
        height: 445px;
        border: 1px solid rgb(223, 223, 223);
        margin: 0 auto;

        h3 {
            background: #ececec;
            margin: 0;
            padding: 6px 15px;
            color: #333;
            border-bottom: 1px solid #dfdfdf;
            font-size: 20.04px;
            line-height: 30.06px;

            span {
                font-size: 14px;
                float: right;

                a {
                    color: #e1251b;
                }
            }
        }

        div:nth-of-type(1) {
            margin-top: 40px;
        }

        .content {
            padding-left: 390px;
            margin-bottom: 18px;
            position: relative;

            label {
                font-size: 14px;
                width: 96px;
                text-align: right;
                display: inline-block;
            }

            input {
                width: 270px;
                height: 38px;
                padding-left: 8px;
                box-sizing: border-box;
                margin-left: 5px;
                outline: none;
                border: 1px solid #999;
            }

            img {
                vertical-align: sub;
            }

            .error-msg {
                position: absolute;
                top: 100%;
                left: 495px;
                color: red;
            }
        }

        .controls {
            text-align: center;
            position: relative;

            input {
                vertical-align: middle;
            }

            .error-msg {
                position: absolute;
                top: 100%;
                left: 495px;
                color: red;
            }
        }

        .btn {
            text-align: center;
            line-height: 36px;
            margin: 17px 0 0 55px;

            button {
                outline: none;
                width: 270px;
                height: 36px;
                background: #e1251b;
                color: #fff !important;
                display: inline-block;
                font-size: 16px;
            }
        }
    }

    .copyright {
        width: 1200px;
        margin: 0 auto;
        text-align: center;
        line-height: 24px;

        ul {
            li {
                display: inline-block;
                border-right: 1px solid #e4e4e4;
                padding: 0 20px;
                margin: 15px 0;
            }
        }
    }
}
</style>
