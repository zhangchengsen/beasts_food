<template>
  <Form
    class="xtx-form"
    :validation-schema="mySchema"
    v-slot="{ errors }"
    ref="formCom"
  >
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field
          v-model="form.account"
          name="account"
          class="input"
          type="text"
          placeholder="请输入用户名"
        />
      </div>
      <div class="error" v-if="errors?.account">{{ errors.account }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          v-model="form.mobile"
          name="mobile"
          class="input"
          type="text"
          placeholder="请输入手机号"
        />
      </div>
      <div class="error" v-if="errors?.mobile">{{ errors?.mobile }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field
          :class="{ err: errors.code }"
          v-model="form.code"
          name="code"
          class="input"
          type="text"
          placeholder="请输入验证码"
        />
        <span @click="send()" class="code">
          {{ time === 0 ? "发送验证码" : `${time}秒后发送` }}
        </span>
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          v-model="form.password"
          name="password"
          class="input"
          type="password"
          placeholder="请输入密码"
        />
      </div>
      <div class="error" v-if="errors?.password">{{ errors?.password }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          v-model="form.repassword"
          name="repassword"
          class="input"
          type="password"
          placeholder="请确认密码"
        />
      </div>
      <div class="error" v-if="errors?.repassword">
        {{ errors?.repassword }}
      </div>
    </div>
    <a href="javascript:;" class="submit" @click="submit">立即提交</a>
  </Form>
</template>

<script setup>
import { ref, reactive, onUnmounted, computed } from "vue";
import { Field, Form } from "vee-validate";
import { useIntervalFn } from "@vueuse/core";
import { userCode, userQQPatchLogin } from "@/api/login";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Message from "@/components/library/Message";
import schema from "@/utils/validate";
import { checkUsername } from "@/api/login";
const props = defineProps({
  unionId: {
    type: String,
    default: "",
  },
});
const time = ref(0);
const router = useRouter();
const store = useStore();
const formCom = ref("");
const redirectUrl = new computed(() => {
  return store.user.state.redirectUrl;
});
const { resume, pause } = useIntervalFn(
  () => {
    time.value--;
    if (time.value === 0) pause();
  },
  1000,
  false
);
pause();
onUnmounted(() => {
  pause();
});
console.log("unionId", props.unionId);
// 发送验证码
const send = async () => {
  console.log(redirectUrl);
  if (time.value) return;
  let valid = mySchema.mobile(form.mobile);
  if (valid !== true) return formCom.value.setFieldError("mobile", valid);
  time.value = 60;
  resume();
  // userCode(form.mobile)
  //   .then(({ result: res }) => {
  //     Message({ type: "success", text: "验证码发送成功,请注意查收" });
  //   })
  //   .catch((err) => {
  //     if (err.response.data?.message)
  //       Message({ type: "error", text: err.response.data?.message });
  //     else Message({ type: "error", text: "发生未知错误" });
  //   });
};
const mySchema = {
  ...schema,
  repassword(value) {
    if (form.repassword === form.password) return true;
    return "与密码不一致";
  },
  async account(value) {
    if (!value) return "请输入用户名";
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return "字母开头且6-20个字符";
    let res = await checkUsername(value);
    if (res.result?.valid) return "用户名已存在";
    return true;
  },
};
const form = reactive({
  account: null,
  password: null,
  mobile: null,
  code: null,
  repassword: null,
});
// 提交表单
const submit = async () => {
  let res = await formCom.value.validate();
  if (res) {
    userQQPatchLogin({ ...form, unionId: props.unionId })
      .then(({ result: res }) => {
        store.commit("user/setUser", res);
        store.dispatch("cart/mergeCart").then(() => {
          router.push(store.user.state.redirectUrl || "/");
          Message({ text: "登录成功", type: "success" });
        });
      })
      .catch((err) => {
        let mes = err.message.data;
        console.dir(err);
        Message({
          type: "error",
          text: mes?.message ? mes.message : "第三方绑定失败",
        });
      });
  }
};
</script>

<style scoped lang="less">
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
