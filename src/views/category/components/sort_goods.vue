<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        @click="changeSortInfo()"
        :class="{ active: sortParams.sortField === null }"
        href="javascript:;"
        >默认排序</a
      >
      <a
        @click="changeSortInfo('publishTime')"
        :class="{ active: sortParams.sortField === 'publishTime' }"
        href="javascript:;"
        >最新商品</a
      >
      <a
        @click="changeSortInfo('orderNum')"
        :class="{ active: sortParams.sortField === 'orderNum' }"
        href="javascript:;"
        >最高人气</a
      >
      <a
        @click="changeSortInfo('evaluateNum')"
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        href="javascript:;"
        >评论最多</a
      >
      <a @click="changeSortInfo('price')" href="javascript:;">
        价格排序
        <i
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'asc',
          }"
          class="arrow up"
        />
        <i
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'desc',
          }"
          class="arrow down"
        />
      </a>
    </div>
    <div class="check">
      <nmCheck @click="change_check()" v-model="sortParams.inventory"
        >仅显示有货商品</nmCheck
      >
      <nmCheck @click="change_check()" v-model="sortParams.onlyDiscount"
        >仅显示特惠商品</nmCheck
      >
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
const emits = defineEmits(["SortParams"]);
const sortParams = reactive({
  inventory: false,
  onlyDiscount: false,
  sortField: null,
  sortMethod: null,
});
const changeSortInfo = (params) => {
  sortParams.sortField = params;
  if (params === "price") {
    if (sortParams.sortMethod === null) {
      sortParams.sortMethod = "desc";
    } else {
      sortParams.sortMethod = "asc";
    }
  } else sortParams.sortMethod = null;
  emits("SortParams", sortParams);
};
const change_check = () => {
  emits("SortParams", sortParams);
};
</script>
<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @nmColor;
        border-color: @nmColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @nmColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @nmColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
