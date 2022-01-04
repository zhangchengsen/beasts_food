<template>
  <header class="app-header">
    <div class="container" style="padding-bottom:10px;" >
      <h1 class="logo"><RouterLink to="/">牛马生鲜</RouterLink></h1>
      <!-- 使用头部导航组件 -->
      <AppHeaderNav />
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜" />
      </div>
      <!-- 使用头部购物车组件 -->
      <AppHeaderCart />
    </div>
  </header>
</template>

<script setup>
import AppHeaderNav from './next_header_nav.vue'
import AppHeaderCart from './next_header_cart.vue'

</script>

<style scoped lang='less'>
.app-header {
  background: #fff;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 100px;
      width: 110%;
      text-indent: -9999px;
      background: url('../../assets/images/hema.png') no-repeat center 18px / contain;
    }
  }
  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;
    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }
    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }
}
</style>
