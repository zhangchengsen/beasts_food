<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <sticky></sticky>
    <div class="container">
      <!-- 左侧分类  -->
      <home-category></home-category>
      <!-- 轮播图 -->
      <!-- https://gtms03.alicdn.com/tps/i3/TB1gXd1JXXXXXapXpXXvKyzTVXX-520-280.jpg -->
      <div class="home-banner">
        <nm-swipe :sliders="banner" animated></nm-swipe>
      </div>
    </div>
    <home-new></home-new>
    <home-hot></home-hot>
    <home-brand></home-brand>
    <home-product></home-product>
    <homeSpecial></homeSpecial>
    <!-- <Transition>
      <div v-if="show" style="background-color: pink; height: 100px"></div>
      <div v-else style="height: 50px; background-color: skyblue"></div>
    </Transition>
    <button @click="show = true">加</button>
    <button @click="show = false">减</button> -->
  </div>
</template>

<script setup>
import HomeBrand from "./components/home_brand.vue";
import sticky from "@/components/layout/sticky_nav.vue";
import homeCategory from "./components/home_category.vue";
import homeNew from "./components/home_new.vue";
import homeHot from "./components/home_hot.vue";
import homeProduct from "./components/home_product.vue";
import homeSpecial from "./components/home_special.vue";
import { findBanner } from "@/api/home";
import { reactive, ref } from "vue";
const banner = reactive([]);
const show = ref(false);

findBanner()
  .then((res) => {
    banner.values = [...res.result];
  })
  .catch((err) => {
    console.log("findBanner ", err);
  });
</script>
<style lang="less" scoped>
.v-enter-from {
  opacity: 0;
}
.v-enter-active {
  transition: all 0.5s;
}
.v-enter-to {
  opacity: 1;
}
.v-leave-from {
  opacity: 1;
}
.v-leave-active {
  transition: all 0.5s;
}
.v-leave-to {
  opacity: 0;
}
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
.nm-carousel {
  :deep(.carousel-btn.prev) {
    left: 270px;
  }
  :deep(carousel-indicator) {
    padding-left: 250px;
  }
}
</style>
