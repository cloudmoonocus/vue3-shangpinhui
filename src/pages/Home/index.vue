<template>
    <TypeNav></TypeNav>
    <PublicNotice />
    <Recommend />
    <CommodityList />
    <GuessYouLike />
    <Floor />
    <Brand />
</template>

<script>
import PublicNotice from './PublicNotice';
import Recommend from './Recommend';
import CommodityList from './CommodityList';
import GuessYouLike from './GuessYouLike';
import Floor from './Floor';
import Brand from './Brand';
export default {
    name: 'Home',
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
