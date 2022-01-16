<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">同类商品推荐</span>
    </div>
    <div class="home-banner">
    <nm-swipe :sliders="relevantList"></nm-swipe>

    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { getRelevant } from "@/api/product";

const props = defineProps({
  goods: {
    type: Object,
    default: () => {},
  },
});
const relevantList = reactive([]);
getRelevant({ id: props.goods.id }).then(({ result }) => {
  for (let i = 0; i < 4; i++) {
    relevantList.push(result.slice(i * 4, (i + 1) * 4));
  }
});
</script>

<style scoped lang="less">

.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @nmColor;
      border-right: 4px solid @nmColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@nmColor, 40%);
      }
    }
  }
}
:deep(.nm-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @nmColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0,0,0,0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>
