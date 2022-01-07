<template>
  <div class="nm-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>
<script setup>
const props = defineProps({
  to: {
    type: [String, Object],
  },
});
</script>

<style scoped>
.nm-bread-item {
  color: #666;
  font-size: 16px;
}
</style>
