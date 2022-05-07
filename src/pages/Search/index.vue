<template>
    <h1>{{ k }}</h1>
    <!-- 更多使用$router.query.xxx $router.params.xxx来获取 -->
    <h1>{{ $route.query.k }}</h1>
</template>

<script>
export default {
    props: ['k'],
};
</script>

<style></style>
