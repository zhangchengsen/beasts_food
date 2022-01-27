<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <nmBread>
        <nmBreadItem to="/">首页</nmBreadItem>
        <nmBreadItem
          to="/category"
          v-if="productInfo?.categories && productInfo.categories.length > 1"
          >{{ productInfo.categories[1].name }}</nmBreadItem
        >
        <nmBreadItem
          to="/"
          v-if="productInfo?.categories && productInfo.categories.length > 0"
          >{{ productInfo.categories[0].name }}</nmBreadItem
        >
        <nmBreadItem v-if="productInfo">{{ productInfo.name }}</nmBreadItem>
      </nmBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <goods-images
            v-if="productInfo"
            :images="productInfo.mainPictures"
          ></goods-images>
          <goods-info v-if="productInfo" :goods="productInfo"></goods-info>
        </div>
        <div class="spec">
          <goods-name v-if="productInfo" :goods="productInfo"></goods-name>
          <goods-sku
            v-if="productInfo?.specs"
            :goods="productInfo.specs"
            :skus="productInfo.skus"
            @change="changeSku"
          ></goods-sku>
          <nm-number v-model="goodsNum"></nm-number>
          <nm-button
            @click="insertCart"
            style="margin-top: 10px"
            type="primary"
            size="small"
            >购买</nm-button
          >
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant v-if="productInfo" :goods="productInfo" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs></GoodsTabs>
          <!-- 注意事项 -->
          <div class="goods-warn">
            <GoodsWarn></GoodsWarn>
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot></GoodsHot>
          <GoodsHot :type="2"></GoodsHot>
          <GoodsHot :type="3"></GoodsHot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GoodsTabs from "./components/good_tabs.vue";
import GoodsRelevant from "./components/goods-relevant.vue";
import GoodsImages from "./components/goods-images.vue";
import GoodsInfo from "./components/goods_sale.vue";
import GoodsName from "./components/goods_name.vue";
import GoodsSku from "./components/goods_sku.vue";
import GoodsHot from "./components/goods_hot.vue";
import GoodsWarn from "./components/goods_warn.vue";
import { getProductInfo } from "@/api/product";
import { nextTick, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { provide } from "vue";
import Message from "@/components/library/Message";

const route = useRoute();
const productInfo = ref({});
watch(
  () => route.params.id,
  (newVal) => {
    if (newVal && route.path === `/product/${route.params.id}`) {
      getProductInfo(route.params.id).then((res) => {
        productInfo.value = null;
        nextTick(() => {
          productInfo.value = { ...res.result };
          console.log(productInfo.value);
        });
      });
    }
  },
  { immediate: true }
);
provide("goods", productInfo);
const store = useStore();
const goodsInfo = ref({});
const changeSku = (e) => {
  goodsInfo.value = {
    ...e,
  };
};
const goodsNum = ref(1);
const insertCart = () => {
  if (!goodsInfo.value.skuId) return Message({ text: "请选择完整的商品规格" });
  store
    .dispatch("cart/insertCart", {
      ...goodsInfo.value,
      picture: productInfo.value.mainPictures[0],
      selected: true,
      count: goodsNum.value,
      id: productInfo.value.id,
      name: productInfo.value.name,
      isEffective: true,
    })
    .then((res) => {
      Message({ text: "插入成功", type: "success" });
    });
};
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
