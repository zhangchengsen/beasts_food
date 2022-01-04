<template>
  <div class="nm-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
    <i class="iconfont icon-angle-right"></i>
  </div>
</template>
<script setup>
const defineProps = {
  to: {
    type: [String, Object],
  },
};
</script>
