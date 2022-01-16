<template>
  <div class="goods-tabs">
    <nav>
      <a
        href="javascript:;"
        @click="changeActiveIdx(0)"
        :class="!activeIdx ? 'active' : ''"
        >商品详情</a
      >
      <a
        href="javascript:;"
        @click="changeActiveIdx(1)"
        :class="activeIdx ? 'active' : ''"
        >商品评价<span>{{
          goods?.commentCount ? goods.commentCount : "暂无"
        }}</span></a
      >
    </nav>
    <!-- 切换内容的地方 -->
    <component :is="activeIdx ? GoodsComments : GoodsDetail"></component>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import GoodsDetail from "./goods_detail.vue";
import GoodsComments from "./goods_comments.vue";
const activeIdx = ref(0);
const goods = inject("goods");

const changeActiveIdx = (idx) => {
  activeIdx.value = idx;
};
</script>

<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @nmColor;
        }
      }
    }
  }
}
</style>
