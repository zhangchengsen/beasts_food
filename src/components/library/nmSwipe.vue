<template>
  <div class="nm-carousel">
    <ul class="carousel-body">
      <li
        class="carousel-item"
        v-for="(item, index) in sliderList"
        :key="item.id"
        :class="{ fade: cur === index }"
      >
        <RouterLink to="/" v-if="item.imgUrl">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
        <div v-else class="slider">
          <router-link
            v-for="goods in item"
            :key="goods.id"
            :to="`/product/${goods.id}`"
          >
            <img :src="goods.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </router-link>
        </div>
      </li>
    </ul>
    <a href="javascript:;" @click="toggle(-1)" class="carousel-btn prev"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a href="javascript:;" @click="toggle(1)" class="carousel-btn next"
      ><i class="iconfont icon-angle-right"></i
    ></a>

    <div class="carousel-indicator">
      <span
        v-for="(item, index) in sliderList.length"
        :key="index"
        :class="{ active: index === cur }"
        @click="cur = index"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, ref, watch, computed } from "vue";
const props = defineProps({
  sliders: {
    type: Array,
    default: () => [],
  },
  duration: {
    type: Number,
    default: 3000,
  },
  animated: {
    type: Boolean,
    default: () => false,
  },
});

const cur = ref(0);
let timer = null;
const sliderList = new computed(() => {
  return props.sliders.values?.length ? props.sliders.values : props.sliders;
});
const toggle = (num) => {
  let val = cur.value + num;
  let len = sliderList.length;
  if (val >= len) cur.value = 0;
  else if (val < 0) cur.value = len - 1;
  else cur.value = val;
};
//设置动画时间
const setTimer = () => {
  setInterval(() => {
    toggle(1);
  }, props.duration);
};
// 监听 是否开启动画
watch(
  () => props.duration,
  (newVal) => {
    if (newVal && props.animated) {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      setTimer();
    }
  },
  { immediate: true }
);
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>
<style scoped lang="less">
.nm-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
      .slider {
        display: flex;
        justify-content: space-around;
        padding: 0 40px;
        > a {
          width: 240px;
          text-align: center;
          img {
            padding: 20px;
            width: 230px !important;
            height: 230px !important;
          }
          .name {
            font-size: 16px;
            color: #666;
            padding: 0 40px;
          }
          .price {
            font-size: 16px;
            color: @priceColor;
            margin-top: 15px;
          }
        }
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
