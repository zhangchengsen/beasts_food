<template>
  <div class="nm-checkbox" @click="changeStatus">
    <i v-if="modelValue" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script setup>
import { useVModel } from "@vueuse/core";
import { ref } from "vue";
const props = defineProps({
  modelValue: {
    type: [Boolean, String],
    default: false,
  },
});
const emits = defineEmits(["update:modalValue"]);
const checked = useVModel(props, "modelValue", emits);
const changeStatus = () => {
  checked.value = !checked.value;
};
</script>
<style scoped lang="less">
.nm-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @nmColor;
    ~ span {
      color: @nmColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
