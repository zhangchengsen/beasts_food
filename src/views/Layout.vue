<template>
  <template v-if="showHeader">
    <Top></Top>
    <Header></Header>
  </template>

  <!-- 顶部 -->

  <!-- 头部 -->
  <div class="main">
    <!-- 二级路由 -->
    <router-view />
  </div>

  <Footer></Footer>
  <!-- 底部 -->
</template>
<script setup>
import Top from "@/components/layout/header.vue";
import Header from "@/components/layout/next_header.vue";
import Footer from "@/components/layout/footer.vue";
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const showHeader = ref(true);
watch(
  () => route.path,
  (newVal) => {
    showHeader.value =
      newVal === "/login" || newVal === "/login/callback" ? false : true;
  },
  { immediate: true }
);
</script>
