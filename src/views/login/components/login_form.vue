<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form
      ref="formCom"
      class="form"
      :validation-schema="schema"
      v-slot="{ errors }"
      autocomplete="off"
    >
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.account }"
              v-model="form.account"
              name="account"
              type="text"
              placeholder="请输入用户名"
            />
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />
            {{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              :class="{ error: errors.password }"
              v-model="form.password"
              name="password"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />
            {{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.mobile }"
              v-model="form.mobile"
              name="mobile"
              type="text"
              placeholder="请输入手机号"
            />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />
            {{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              :class="{ error: errors.code }"
              v-model="form.code"
              name="code"
              type="text"
              placeholder="请输入验证码"
            />
            <span @click="send()" class="code">
              {{ time === 0 ? "发送验证码" : `${time}秒后发送` }}
            </span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />
            {{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning" />
          {{ errors.isAgree }}
        </div>
      </div>
      <a @click="login()" href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
      >
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt=""
        />
      </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { userLogin, userCode, userCodeLogin } from "@/api/login";
import { onUnmounted, reactive, ref, watch, onMounted } from "vue";
import { Form, Field } from "vee-validate";
import { useIntervalFn } from "@vueuse/core";
import schema from "@/utils/validate";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import Message from "@/components/library/Message";
import QC from "qc";
// onMounted(() => {
//   QC.Login({ btnId: "btn" });
// });
// 切换短信登录
const isMsgLogin = ref(false);
// 表单数据对象

const form = reactive({
  isAgree: true,
  account: null,
  password: null,
  mobile: null,
  code: null,
});

const mySchema = {
  ...schema,
};
const time = ref(0);
const { resume, pause } = useIntervalFn(
  () => {
    time.value--;
    if (time.value === 0) pause();
  },
  1000,
  false
);
pause();
const formCom = ref(null);
watch(isMsgLogin, () => {
  // 重置数据
  form.isAgree = true;
  form.account = null;
  form.password = null;
  form.mobile = null;
  form.code = null;
  // 如果是没有销毁Field组件，之前的校验结果是不会清除  例如：v-show切换的
  // Form组件提供了一个 resetForm 函数清除校验结果
  formCom.value.resetForm();
});

// 需要在点击登录的时候对整体表单进行校验
const store = useStore();
const router = useRouter();
const route = useRoute();
onUnmounted(() => {
  pause();
});

const send = async () => {
  if (time.value) return;
  let valid = mySchema.mobile(form.mobile);
  if (valid !== true) return formCom.value.setFieldError("mobile", valid);
  time.value = 60;
  resume();
  userCode(form.mobile)
    .then(({ result: res }) => {
      Message({ type: "success", text: "验证码发送成功,请注意查收" });
    })
    .catch((err) => {
      if (err.response.data?.message)
        Message({ type: "error", text: err.response.data?.message });
      else Message({ type: "error", text: "发生未知错误" });
    });
};
const login = async () => {
  // Form组件提供了一个 validate 函数作为整体表单校验，当是返回的是一个promise
  const valid = await formCom.value.validate();
  if (!valid) return Message({ type: "error", text: "请按照提示填写完整哦" });

  // 用户名密码登录 zhousg 123456
  try {
    let params;
    let res;
    if (!isMsgLogin.value) {
      params = { account: form.account, password: form.password };
      res = await userLogin(params);
    } else {
      params = { mobile: form.mobile, code: form.code };
      res = await userCodeLogin(params);
    }
    res = res.result;
    store.commit("user/setUser", res);
    store.dispatch("cart/mergeCart").then(() => {
      router.push(route.params.redirectUrl || "/");
      Message({ text: "登录成功", type: "success" });
    });
  } catch (e) {
    console.log(e);
    if (e.response.data?.message) {
      Message({ type: "error", text: e.response.data.message });
    }
  }
};
</script>
<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @nmColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @nmColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @nmColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
