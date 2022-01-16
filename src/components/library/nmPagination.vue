<template>
  <div class="xtx-pagination">
    <a href="javascript:;" class="disabled">上一页</a>
    <span v-if="curPage - offset > 1">...</span>
    <a
      @click="change(item)"
      href="javascript:;"
      v-for="item in pager"
      :key="item + 'p'"
      :class="{ active: curPage === item }"
      >{{ item }}</a
    >

    <span v-if="curPage + offset < pages">...</span>
    <a href="javascript:;">下一页</a>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  curPage: {
    type: Number,
    default: 1,
  },
  count: {
    type: Number,
    default: 5,
  },
  pageSize: {
    type: Number,
    default: 5,
  },
  totalNum: {
    type: Number,
    default: 100,
  },
});
// const curPage = ref(3);
// const count = ref(5);
// const pageSize = ref(5);
// const totalNum = ref(124);
const emits = defineEmits(["change"]);
const pages = ref(Math.ceil(props.totalNum / props.pageSize));
const offset = ref(Math.floor(props.count / 2));

const pager = new computed(() => {
  let start = props.curPage - offset.value;
  let end = props.curPage + offset.value;
  if (start < 1) {
    start = 1;
    let num = start + props.count - 1;
    end = num > pages.value ? pages.value : num;
  }
  if (end > pages.value) {
    end = pages.value;
    let num = end - props.count + 1;
    start = num > 0 ? num : 1;
  }
  let arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
});

const change = (page) => {
  emits("change", page);
};
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @nmColor;
    }
    &.active {
      background: @nmColor;
      color: #fff;
      border-color: @nmColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
