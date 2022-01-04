<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a
        @click="toggle(-1)"
        href="javascript:;"
        class="iconfont icon-angle-left prev"
        :class="{ disabled: index === 0 }"
      ></a>
      <a
        @click="toggle(1)"
        href="javascript:;"
        class="iconfont icon-angle-right next"
        :class="{ disabled: index === 1 }"
      ></a>
    </template>

    <div class="box" ref="box">
      <Transition name="fade">
        <ul
          class="list"
          v-if="list.value?.length"
          :style="{ transform: `translateX(${-index * 1240}px)` }"
        >
          <li v-for="item in list.value" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skelection">
          <nm-skelect
            v-for="item in 5"
            :key="item"
            width="240px"
            height="305px"
            animated
            bg="#eee"
          ></nm-skelect>
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script setup>
import HomePanel from "./home_panel.vue";
import { getPopular } from "@/api/home";
import { useLazyData } from "@/hook/index";
import { ref } from "vue";
const box = ref(null);
const index = ref(0);
const st = ref("123");
const arr = ref([1]);
const list = ref([]);
list.value = useLazyData(box, () => getPopular(10));
const toggle = (val) => {
  let num = index.value + val;
  if (num < 0 || num > 1) return;
  index.value = num;
};
</script>

<style scoped lang="less">
.v-enter-from {
  opacity: 0;
  background-color: pink;
}
.v-enter-active {
  transition: all 2s;
}
.v-enter-to {
  opacity: 1;
  background-color: blue;
}
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @nmColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
