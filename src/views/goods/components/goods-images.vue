<template>
  <div class="goods-image">
    <div
      v-if="show"
      class="large"
      :style="[{ backgroundImage: `url(${images[curIndex]})` }, location]"
    ></div>
    <div class="middle">
      <img :src="images[curIndex]" ref="target" alt="" />
      <div v-if="show" class="layer" :style="[mask]"></div>
    </div>
    <ul class="small">
      <template v-for="(img, i) in images" :key="img">
        <li v-if="i < 8" :class="{ active: i === curIndex }">
          <img @mouseenter="curIndex = i" :src="img" alt="" />
        </li>
      </template>
    </ul>
  </div>
</template>
<script setup>
import { useMouseInElement } from "@vueuse/core";
import { ref, reactive, watch } from "vue";
const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
});
const show = ref(false);
const location = reactive({
  backgroundPositionX: "-400px",
  backgroundPositionY: "0px",
});
const mask = reactive({
  left: 0,
  top: 0,
});
const target = ref(null);
const { elementX, elementY, isOutside } = useMouseInElement(target);
watch([elementX, elementY, isOutside], () => {
  show.value = !isOutside.value;
  if (!show.value) return;
  let position = { x: elementX.value, y: elementY.value };
  if (position.x < 100) position.x = 0;
  else if (position.x > 300) position.x = 200;
  else position.x -= 100;
  if (position.y < 100) position.y = 0;
  else if (position.y > 300) position.y = 200;
  else position.y -= 100;

  mask.left = position.x + "px";
  mask.top = position.y + "px";
  location.backgroundPositionX = -2 * position.x + "px";
  location.backgroundPositionY = -2 * position.y + "px";
});
const curIndex = ref(0);
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @nmColor;
      }
    }
  }
}
</style>
