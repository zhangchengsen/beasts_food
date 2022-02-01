<template>
  <div class="member-home">
    <!-- 概览 -->
    <HomeOverview />
    <!-- 收藏 -->
    <HomePanel title="我的收藏">
      <GoodsItem v-for="good in goods" :key="good.id" :goods="good"></GoodsItem>
    </HomePanel>
    <!-- 足迹 -->
    <HomePanel title="我的足迹">
      <GoodsItem
        v-for="good in goods"
        :key="good.id"
        :goods="goods"
      ></GoodsItem>
    </HomePanel>
    <!-- 猜你 -->
    <!-- <GoodsRelevant :id="null" /> -->
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import GoodsItem from "@/views/category/components/goods_item.vue";
import HomeOverview from "./home_overview";
import HomePanel from "./home_panel";
import GoodsRelevant from "@/views/goods/components/goods-relevant";
import { findCollect } from "@/mock.js/index";
const goods = ref({
  id: "1",
  name: "自煮火锅不排队 麦饭石不粘鸳鸯火锅",
  picture:
    "https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg",
  desc: "清汤鲜香 红汤劲爽",
  price: "159.00",
});
findCollect({ page: 1, pageSize: 4 })
  .then(({ result: res }) => {
    goods.value = [...res.items];
  })
  .catch((err) => {
    console.log(err);
  });
</script>
<style scoped lang="less">
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
:deep(.goods-list) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
