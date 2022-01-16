<template>
  <div class="nm-numbox">
    <div class="label">数量</div>
    <div class="numbox">
      <a href="javascript:;" @click="updateVal(-1)">-</a>
      <input type="text" readonly :value="modelValue" />
      <a @click="updateVal(1)" href="javascript:;">+</a>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
});
const emits = defineEmits(["update:modelValue", "change"]);
const updateVal = (num) => {
  if (props.modelValue + num === 0) return;
  emits("update:modelValue", props.modelValue + num);
  emits("change", props.modelValue);
};
</script>
<style scoped lang="less">
.nm-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
