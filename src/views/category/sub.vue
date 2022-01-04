<template>
  <div class="sub-categroy">
    <div class="container">
      <!-- 面包屑 -->
      <!-- <SubBread /> -->
      <!-- 筛选区 -->
      <!-- <SubFilter @filter-change="filterChange" /> -->
      <!-- 商品面板（排序+列表） -->
      <div class="goods-list">
        <!-- <SubSort @sort-change="sortChange" /> -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id" >
            <!-- <GoodsItem :goods="goods" /> -->
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <!-- <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" /> -->
      </div>
    </div>
  </div>
</template>
<script setup>
  import {useStore} from 'vuex'
  import {computed} from 'vue'
  const store = useStore()
  const goods = new computed(() => {
    return store.state.category.list
  })
</script>
<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
