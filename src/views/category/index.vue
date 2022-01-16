<template>
  <div class="top-category">
    <sticky-nav></sticky-nav>
    <div class="container">
      <!-- 面包屑 -->
      <nmBread>
        <nmBreadItem to="/">首页</nmBreadItem>
        <transition name="fade-right" mode="out-in">
          <nmBreadItem :key="topCategory.id">{{
            topCategory.name
          }}</nmBreadItem>
        </transition>
      </nmBread>

      <!-- 轮播图 -->
      <div style="height: 500px">
        <nmSwipe :sliders="sliders" animated></nmSwipe>
      </div>
      <!-- 所有二级分类 -->
      <div class="sub-list" v-if="topCategory?.children">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <div class="ref-goods" v-for="sub in subList.children" :key="sub.id">
        <div class="head">
          <h3>{{ sub.name }}</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <nmMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <goodsItem
            v-for="goods in sub.goods"
            :key="goods.id"
            :goods="goods"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import goodsItem from "./components/goods_item.vue";
import stickyNav from "@/components/layout/sticky_nav.vue";
import { findBanner } from "@/api/home";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, ref, reactive, watch } from "vue";
import { findTopCategory } from "@/api/category";
const store = useStore();
const route = useRoute();
const topCategory = computed(() => {
  let cate = {};
  const item = store.state.category.list.find((item) => {
    return item.id === route.params.id;
  });
  return item ? item : cate;
});
// 轮播图
const subList = ref([]);
const sliders = reactive([]);
findBanner().then((data) => {
  sliders.values = [...data.result];
});
const reqCategory = () => {
  findTopCategory(route.params.id)
    .then((res) => {
      subList.value = { ...res.result };
    })
    .catch((err) => {});
};
watch(
  () => route.params.id,
  (newVal) => {
    if (newVal && `/category/${newVal}` === route.path) reqCategory();
  },
  { immediate: true }
);
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      min-height: 160px;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @nmColor;
          }
        }
      }
    }
  }
  // 推荐商品
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
