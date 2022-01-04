<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <nmBread parentPath="/category/1005000">
        <nmBreadItem to="/category/1004000">空调</nmBreadItem>
      </nmBread>
      <!-- 轮播图 -->
      <!-- <XtxCarousel :sliders="sliders" style="height:500px" /> -->
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" />
              <p>{{ sub.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各个分类推荐商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <!-- <XtxMore :path="`/category/sub/${sub.id}`" /> -->
        </div>
        <div class="body">
          <!-- <GoodsItem v-for="goods in sub.goods" :key="goods.id" :goods="goods" /> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const topCategory = new computed(() => {
  return store.state.category.list;
});
</script>
<style lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      min-height: 160px;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @nmColor;
          }
        }
      }
    }
  }
  // 推荐商品
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .nm-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
