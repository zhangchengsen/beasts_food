<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a
          @click="activeName = 'account'"
          :class="{ active: activeName === 'account' }"
          href="javascript:;"
          >账户登录</a
        >
        <a
          @click="activeName = 'qrcode'"
          :class="{ active: activeName === 'qrcode' }"
          href="javascript:;"
          >扫码登录</a
        >
      </nav>
      <!-- 表单 -->
      <div v-if="activeName === 'account'" class="account-box">
        <LoginForm />
      </div>
      <!-- 二维码 -->
      <div v-if="activeName === 'qrcode'" class="qrcode-box">
        <img src="@/assets/images/qrcode.jpg" alt="" />
        <p>打开 <a href="javascript:;">牛马生鲜App</a> 扫码登录</p>
      </div>
    </div>
  </section>
  <LoginFooter />
</template>

<script setup>
import LoginHeader from "./components/login_header.vue";
import LoginFooter from "./components/login_footer.vue";
import LoginForm from "./components/login_form.vue";
import { ref, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const activeName = ref("account");
const store = useStore();
const route = useRoute();
store.commit("user/setRedirectUrl", route.params.redirectUrl);

// zhousg 123456
</script>

<style scoped lang="less">
.login-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active {
          color: @nmColor;
          font-weight: bold;
        }
      }
    }
    .qrcode-box {
      text-align: center;
      padding-top: 40px;
      p {
        margin-top: 20px;
        a {
          color: @nmColor;
          font-size: 16px;
        }
      }
      img {
        width: 200px;
        object-fit: cover;
      }
    }
  }
}
</style>
