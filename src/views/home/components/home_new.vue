<template>
  <div ref="new_ref">
    <div class="home-new">
      <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
        <template #right><nmMore path="/" /></template>
        <!-- 面板内容 -->
        <transition name="fade">
          <ul class="goods-list" v-if="goods.value?.length">
            <li v-for="item in goods.value" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <homeSkelect v-else></homeSkelect>
        </transition>
      </HomePanel>
    </div>
  </div>
</template>
<script setup>
import { useLazyData } from "@/hook/index";
import { ref } from "vue";
import HomeSkelet from "./home-skelect.vue";
import HomePanel from "./home_panel.vue";
import { findNew } from "@/api/home";
const goods = ref([]);
const new_ref = ref(null);
// findNew().then((data) => {
//   goods.value = data.result;
// });
goods.value = useLazyData(new_ref, findNew);
</script>
<style scoped lang="less">
.fade {
  &-leave {
    &-active {
      position: absolute;
      width: 100%;
      transition: opacity 0.5s 0.2s;
      z-index: 1;
    }
    &-to {
      opacity: 0;
    }
  }
}
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
