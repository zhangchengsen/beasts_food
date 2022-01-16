<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubList />
      <SubFilter @handle_filter="handle_filter" />
      <div class="goods-list">
        <SortGoods @SortParams="sortParams" />
        <ul>
          <li v-for="goods in goods_list" :key="goods.id">
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <Infinite @infinite="loadMore" :finished="finished"></Infinite>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import SortGoods from "./components/sort_goods.vue";
import SubList from "./components/sub_list.vue";
import SubFilter from "./components/sub_filter.vue";
import GoodsItem from "./components/goods_item.vue";
import Infinite from "./components/infinite.vue";
import { useRoute } from "vue-router";
import { findSubCategoryGoods } from "@/api/category";
const show = ref(true);
const route = useRoute();
const loading = ref(false);
const finished = ref(false);
let pageInfo = {
  page: 1,
  pageSize: 20,
};
const goods_list = ref([]);
const loadMore = () => {
  if (loading.value || finished.value) return;
  findSubCategoryGoods({ ...params, ...pageInfo, ...filter }).then(
    ({ result }) => {
      goods_list.value = [...goods_list.value, ...result.items];
      if (result.items.length < 20) finished.value = true;
      pageInfo.page++;
    }
  );
};
let params = {};
let filter = {};
const handle_filter = (e) => {
  filter = { ...e };
  if (!filter.attrs.length) filter.attrs = null;

  init();
};
const sortParams = (e) => {
  params = e;
  init();
};
const init = () => {
  loading.value = false;
  pageInfo.page = 1;
  goods_list.value = [];
  finished.value = false;
};
watch(
  () => route.params.id,
  (newVal) => {
    if (`/category/sub/${newVal}` === route.path) {
      init();
    }
  }
);
</script>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
