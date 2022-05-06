<template>
    <MyHeader />
    <router-view></router-view>
    <!-- Vue3中自定义属性不允许放置在这里，所以我放在了MyFooter内-->
    <!-- <MyFooter v-show="$route.meta.show" /> -->
    <MyFooter />
</template>

<script>
import MyHeader from '@/components/MyHeader';
import MyFooter from '@/components/MyFooter';
export default {
    name: 'App',
    components: {
        MyHeader,
        MyFooter,
    },
};
</script>

<style lang="less" scoped></style>
