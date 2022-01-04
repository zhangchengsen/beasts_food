<template>
  <div class="nm-bread">
    <div class="nm-bread-item">
      <RouterLink to="/">首页</RouterLink>
    </div>
    <i class="iconfont icon-angle-right"></i>
    <div class="nm-bread-item" v-if="parentName">
      <RouterLink v-if="parentName" :to="parentPath">{{
        parentName
      }}</RouterLink>
      <span v-else>{{ parentName }}</span>
    </div>
    <i v-if="parentName" class="iconfont icon-angle-right"></i>
    <div class="nm-bread-item">
      <span><slot /></span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  parentPath: {
    type: [String, Object],
    default: "/",
  },
  parentName: {
    type: String,
    default: "",
  },
});
</script>

<style lang="less">
.nm-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @nmColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
