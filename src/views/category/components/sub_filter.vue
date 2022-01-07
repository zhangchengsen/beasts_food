<template>
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌:</div>
      <div class="body">
        <a
          :class="{ active: filterData.selectedBrand == brand.id }"
          v-for="brand in filterData.brands"
          :key="brand.id"
          @click="change_brand(brand.id)"
          >{{ brand.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
      <div class="head">{{ p.name }}：</div>
      <div class="body">
        <a
          :class="{ active: p.selectedProp === attr.id }"
          v-for="attr in p.properties"
          :key="attr.id"
          @click="change_properties(p, attr)"
          >{{ attr.name }}</a
        >
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <nmSkelect class="item" width="800px" height="40px" animated />
    <nmSkelect class="item" width="800px" height="40px" animated />
    <nmSkelect class="item" width="600px" height="40px" animated />
    <nmSkelect class="item" width="600px" height="40px" animated />
    <nmSkelect class="item" width="600px" height="40px" animated />
  </div>
</template>
<script setup>
import { findSubCategoryFilter } from "@/api/category";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
// 1. 获取数据
// 2. 数据中需要全部选中，需要预览将来点击激活功能。默认选中全部
// 3. 完成渲染
const route = useRoute();
const filterData = ref(null);
const filterLoading = ref(false);
const emits = defineEmits(["handle_filter"]);
const params = { brandId: null, attrs: [] };
const change_brand = (id) => {
  if (filterData.value.selectedBrand === id) return;

  filterData.value.selectedBrand = id;
  params.brandId = id;
  emits("handle_filter", params);
};
const change_properties = (p, item) => {
  if (p.selectedProp === item.id) return;
  console.log(111);
  p.selectedProp = item.id;
  let index = params.attrs.findIndex((attr) => attr.groupName === p.name);
  console.log(index);
  if (item.id === null) {
    if (index !== -1) params.attrs.splice(index, 1);
  } else {
    //groupName  propertyName
    if (index !== -1) {
      params.attrs[index].propertyName = item.name;
    } else {
      params.attrs.push({ groupName: p.name, propertyName: item.name });
    }
  }

  emits("handle_filter", params);
};
// 4. 分类发生变化的时候需要重新获取筛选数据，需要使用侦听器
watch(
  () => route.params.id,
  (newVal, oldVal) => {
    // 当你从二级分类去顶级分类也会拿到ID，不能去加载数据因为它不是二级分类的ID
    if (newVal && route.path === "/category/sub/" + newVal) {
      filterLoading.value = true;
      newVal &&
        findSubCategoryFilter(route.params.id).then(({ result }) => {
          // 品牌全部
          console.log(result);
          result.selectedBrand = null;
          result.brands.unshift({ id: null, name: "全部" });
          // 销售属性全部
          result.saleProperties.forEach((p) => {
            p.selectedProp = null;
            p.properties.unshift({ id: null, name: "全部" });
          });
          filterData.value = result;
          filterLoading.value = false;
        });
    }
  },
  { immediate: true }
);
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    padding: 10px;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @nmColor;
        }
      }
    }
  }
}
</style>
