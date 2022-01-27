<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="loading">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
    <nav class="tab">
      <a
        @click="hasAccount = true"
        :class="{ active: hasAccount }"
        href="javascript:;"
      >
        <i class="iconfont icon-bind" />
        <span>已有牛马生鲜账号，请绑定手机</span>
      </a>
      <a
        @click="hasAccount = false"
        :class="{ active: !hasAccount }"
        href="javascript:;"
      >
        <i class="iconfont icon-edit" />
        <span>没有牛马生鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :unionId="unionId" :nickname="nickname" :avatar="avatar" />
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch :unionId="unionId" />
    </div>
  </section>
  <LoginFooter />
</template>

<script setup>
import { computed, ref } from "vue";
import { userQQLogin } from "@/api/login";
import LoginHeader from "./components/login_header.vue";
import LoginFooter from "./components/login_footer.vue";
import CallbackBind from "./components/callback_bind.vue";
import CallbackPatch from "./components/callback_patch.vue";
import { useRouter } from "vue-router";
import Message from "@/components/library/Message";
import { useStore } from "vuex";
import QC from "qc";
const unionId = ref("");
const hasAccount = ref(true);
const nickname = ref(null);
const avatar = ref(null);
const loading = ref(true);
const store = useStore();
const redirectUrl = new computed(() => {
  return store.state.user.redirectUrl;
});

if (QC.Login.check()) {
  QC.api("get_user_info").success((res) => {
    avatar.value = res.data.figureurl_1;
    nickname.value = res.data.nickname;
  });
  QC.Login.getMe((openId) => {
    unionId.value = openId;
    userQQLogin(openId)
      .then(({ result: res }) => {
        // 登录成功
        store.commit("user/setUser", res);
        router.push(redirectUrl || "/");

        Message({ type: "success", text: "QQ登录成功" });
      })
      .catch((err) => {
        // 未绑定
        loading.value = false;
      });
  });
} else {
  Message({ type: "error", text: "第三方登录失败" });
}
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center /
        100px 100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @nmColor;
      border-color: @nmColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
