<template>
  <div class="cart-sku">
    <div class="attrs" @click="getSkuInfo">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible" ref="target">
      <div v-if="!goods" class="loading"></div>
      <GoodsSku
        v-if="goods"
        :skuId="skuId"
        :goods="goods.specs"
        :skus="goods.skus"
        @change="changeSku"
      />
      <nmButton
        v-if="goods"
        type="primary"
        size="mini"
        style="margin-left: 60px"
        @click="confirm"
        >确认</nmButton
      >
    </div>
  </div>
</template>
<script setup>
import GoodsSku from "@/views/goods/components/goods_sku.vue";
import { getGoodsSku } from "@/api/product";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
const props = defineProps({
  attrsText: {
    type: String,
    default: "",
  },
  skuId: {
    type: String,
    default: "",
  },
  goodsInfo: {
    type: Object,
    default: () => {},
  },
});
const emits = defineEmits(["change"]);
const visible = ref(false);
const goods = ref(null);
const show = () => {
  visible.value = true;
};
const hide = () => {
  visible.value = false;
};
const toggle = () => {
  visible.value ? hide() : show();
};
let obj = {};
const changeSku = (e) => {
  obj = { ...props.goodsInfo, ...e, preSkuId: props.skuId };
};
const target = ref(null);
const getSkuInfo = () => {
  show();
  getGoodsSku(props.skuId).then(({ result: res }) => {
    goods.value = res;
  });
};
const confirm = () => {
  if (obj.skuId) emits("change", obj);
};
onClickOutside(target, () => {
  hide();
});
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @nmColor;
    box-shadow: 2px 2px 4px lighten(@nmColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @nmColor;
      border-top: 1px solid @nmColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
