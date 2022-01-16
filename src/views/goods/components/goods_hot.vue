<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>

    <GoodsItem
      v-for="goods in hotList"
      :key="goods.id"
      :goods="goods"
    ></GoodsItem>
  </div>
</template>
<script setup>
import { getGoodsHot } from "@/api/product";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import GoodsItem from "@/views/category/components/goods_item.vue";

const props = defineProps({
  type: {
    type: Number,
    default: 1,
  },
});
const route = useRoute();

const titleObj = { 1: "24小时热销榜", 2: "周热销榜", 3: "总热销榜" };
const hotList = ref([]);
getGoodsHot({ id: route.params.id, type: props.type }).then(
  ({ result: res }) => {
    hotList.value = [...res];
  }
);
const title = computed(() => {
  return titleObj[props.type];
});
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
