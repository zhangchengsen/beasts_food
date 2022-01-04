<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证" v-lazy>
    <template v-slot:right>
      <a href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box" ref="box">
      <Transition name="fade">
        <ul ref="pannel" class="goods-list" v-if="list.value?.length">
          <li v-for="item in list.value" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" :alt="item.alt" />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <ul class="goods-list" v-else>
          <li v-for="item in 4" :key="item">
            <nm-skelect
              width="306px"
              height="406px"
              animated
              bg="#eee"
            ></nm-skelect>
          </li>
        </ul>
      </Transition>
    </div>
  </HomePanel>
</template>

<script setup>
import { useLazyData } from "@/hook/index";
import HomePanel from "./home_panel.vue";
import { findHot } from "@/api/home";
import { ref } from "vue";
const list = ref([]);
const box = ref(null);
list.value = useLazyData(box, findHot);
// const { rf } = tryRef();
// rf.value = 200;
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
