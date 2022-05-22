<template>
    <TypeNav></TypeNav>
    <PublicNotice />
    <Recommend />
    <CommodityList />
    <GuessYouLike />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
</template>

<script>
import PublicNotice from './PublicNotice';
import Recommend from './Recommend';
import CommodityList from './CommodityList';
import GuessYouLike from './GuessYouLike';
import Floor from './Floor';
import Brand from './Brand';
import { mapState } from 'vuex';
import { onMounted } from '@vue/runtime-core';
import store from '@/store';

export default {
    name: 'Home',
    setup() {
        onMounted(() => {
            store.dispatch('home/getFloorList');
            store.dispatch('login/userToken');
        });
    },
    computed: {
        ...mapState({
            floorList: (state) => state.home.floorList,
        }),
    },
    components: {
        PublicNotice,
        Recommend,
        CommodityList,
        GuessYouLike,
        Floor,
        Brand,
    },
};
</script>

<style></style>
