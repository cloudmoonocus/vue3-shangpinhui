<template>
    <!-- 三级导航 -->
    <div class="type-nav">
        <!-- 事件委派 -->
        <!-- 鼠标离开去除类名 -->
        <div class="container">
            <div @mouseleave="changeIndexLeave(index)" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 一级导航及以后 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <!-- 一级分类 -->
                            <!-- 判断当前的index是否为用于判断的值，是->true，赋予标签cur -->
                            <div
                                class="item"
                                v-for="(c1, index) in categoryList"
                                :key="c1.categoryId"
                                :class="{ cur: currentIndex === index }"
                            >
                                <!-- 鼠标进入 -->
                                <h3 @mouseenter="changeIndex(index)">
                                    <!-- 加上自定义标签来判断是否是a标签 -->
                                    <a :data-categoryname="c1.categoryName" :data-category1id="c1.categoryId">{{
                                        c1.categoryName
                                    }}</a>
                                </h3>
                                <!-- 二级分类 -->
                                <!-- 鼠标移入显示二三级分类 -->
                                <div
                                    class="item-list clearfix"
                                    :style="{ display: currentIndex === index ? 'block' : 'none' }"
                                >
                                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a
                                                    :data-categoryname="c2.categoryName"
                                                    :data-category2id="c2.categoryId"
                                                    >{{ c2.categoryName }}</a
                                                >
                                            </dt>
                                            <!-- 三级分类 -->
                                            <dd>
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <a
                                                        :data-categoryname="c3.categoryName"
                                                        :data-category3id="c3.categoryId"
                                                        >{{ c3.categoryName }}</a
                                                    >
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <!-- 导航 -->
            <nav class="nav">
                <a href="###" @click="categoryList">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core';
import { mapState, useStore } from 'vuex';
import throttle from 'lodash/throttle';
import { useRoute } from 'vue-router';

export default {
    name: 'TypeNav',
    data() {
        // 初始化用来判断的值
        return {
            currentIndex: -1,
        };
    },
    setup() {
        let show = ref(true);
        const route = useRoute();
        // 这里与引入的store/index.js的store相同
        const store = useStore();
        // 挂载完毕，向服务器发送请求
        onMounted(() => {
            // 因为开启了命名空间，所以必须带"home/"
            store.dispatch('home/categoryList');
            // 当路由跳转时，是一个新的三级导航组件
            // 判断是否在主页，不在主页，一级导航隐藏
            if (route.path != '/home') {
                show.value = false;
            }
        });
        return {
            show,
        };
    },
    computed: {
        ...mapState({
            // 右侧需要一个函数，当使用计算属性时，右侧函数会立即调用
            // 注入一个参数state（大仓库的数据）
            categoryList: (state) => state.home.categoryList,
        }),
    },
    methods: {
        // 鼠标进入，将鼠标所在区域的index值给this的currentIndex
        // 利用lodash模块实现防抖
        // throttle回调函数不要使用箭头函数，否则会出现上下文this的指向问题
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
        }, 50),
        // 鼠标离开，将用于判断的值还原为-1
        changeIndexLeave() {
            this.currentIndex = -1;
            if (this.$route.path != '/home') {
                this.show = false;
            }
        },
        goSearch(event) {
            // this.$router.push({ name: '/search', query: {fenlei} });
            // 获取带有自定义属性的标签（a标签）
            // 标签的dataset属性能够获取到当前元素的所有自定义属性
            let { categoryname, category1id, category2id, category3id } = event.target.dataset;
            // 存在自定义属性categoryname就是a标签
            // 1.判读是否为a标签
            if (categoryname) {
                // 2.整理路由跳转的参数
                let location = { name: 'search' };
                let query = { categoryName: categoryname };
                // 3.判读是哪层导航
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else if (category3id) {
                    query.category3Id = category3id;
                }
                // 4.整合到location
                location.query = query;
                // 5.路由跳转
                this.$router.push(location);
            }
            // !总结：
            // *1.1.若给每个a标签给声明式导航，那么每个a标签就是一个组件，耗费内存较大
            // 1.2.若给每个a标签都单独添加编程式导航，那么每个a标签身上都会有一个回调函数，耗费内存也大
            // 1.3.解决方法：事件委派 + 编程式导航，事件委派让父元素承担点击事件，编程式导航用来路由跳转并传参

            // *2.1.事件委派出现的问题：
            // 2.2.无法判断点击的是那个标签，点击标签的信息是什么
            // 2.3.解决方法：利用自定义属性来判断是否是a标签。本组件中利用两个自定义属性，一个用来判断是否为a标签，另一个用来判断跳转时点击的是第几级导航

            // *3.1.点击事件可以传递event参数，此参数上的target属性可以获取到点击的元素。另外，target属性上的dataset可以用来解构，从而获取到元素的自定义属性
            // 3.2.最后利用编程式导航进行路由跳转并传参
        },
        // 鼠标进入，显示一级导航
        enterShow() {
            this.show = true;
        },
    },
};
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }
                .cur {
                    background-color: skyblue;
                }
            }
        }

        // 动画 透明度变化
        .sort-enter-from {
            opacity: 0;
        }
        .sort-enter-to {
            opacity: 1;
        }
        .sort-enter-active {
            transition: all 0.4s linear;
        }
    }
}
</style>
