<template>
    <div class="center">
        <!--轮播图-->
        <div class="swiper-container" id="mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="./images/home/banner1.jpg" />
                </div>
                <div class="swiper-slide">
                    <img src="./images/home/banner2.jpg" />
                </div>
                <div class="swiper-slide">
                    <img src="./images/home/banner3.jpg" />
                </div>
                <div class="swiper-slide">
                    <img src="./images/home/banner4.jpg" />
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>

            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.center {
    box-sizing: border-box;
    width: 740px;
    height: 100%;
    padding: 5px;
    float: left;
}
</style>
