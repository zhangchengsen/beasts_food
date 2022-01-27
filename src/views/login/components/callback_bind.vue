<template>
  <div class="xtx-form">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来牛马生鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <Form :validation-schema="mySchema" v-slot="{ errors }" ref="formCom">
      <div div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-phone"></i>
          <Field
            name="mobile"
            class="input"
            v-model="form.mobile"
            type="text"
            placeholder="绑定的手机号"
          />
        </div>
        <div class="error" v-if="errors?.mobile">{{ errors.mobile }}</div>
      </div>
      <div div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-code"></i>
          <Field
            name="code"
            class="input"
            type="text"
            v-model="form.code"
            placeholder="短信验证码"
          />
          <span class="code" @click="send">{{
            time === 0 ? "发送验证码" : time + " s"
          }}</span>
        </div>
        <div class="error" v-if="errors?.code">{{ errors.code }}</div>
      </div>
    </Form>
    <a href="javascript:;" class="submit" @click="bind">立即绑定</a>
  </div>
</template>

<script setup>
import { Field, Form } from "vee-validate";
import validation from "@/utils/validate";
import { useIntervalFn } from "@vueuse/core";
import { reactive, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { userBindCode, userBindQQLogin, userQQPatchCode } from "@/api/login";
import { useStore } from "vuex";
import Message from "@/components/library/Message";

const mySchema = { ...validation };
const props = defineProps({
  unionId: {
    type: String,
    default: "",
  },
  nickname: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
});
const form = reactive({
  mobile: null,
  code: null,
});
const formCom = ref(null);
const time = ref(0);
const store = useStore();
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

const send = async () => {
  if (time.value) return;
  let valid = mySchema.mobile(form.mobile);
  if (valid !== true) return formCom.value.setFieldError("mobile", valid);
  time.value = 60;
  resume();
  userQQPatchCode(form.mobile)
    .then(({ result: res }) => {
      Message({ type: "success", text: "验证码发送成功,请注意查收" });
    })
    .catch((err) => {
      if (err.response.data?.message)
        Message({ type: "error", text: err.response.data?.message });
      else Message({ type: "error", text: "发生未知错误" });
    });
};

const router = useRouter();
// qq绑定手机
const bind = async () => {
  let res = await formCom.value.validate();
  if (res) {
    userBindQQLogin({
      unionId: props.unionId,
      mobile: form.mobile,
      code: form.code,
    })
      .then(({ result: res }) => {
        store.commit("user/setUser", res);
        store.dispatch("cart/mergeCart").then(() => {
          router.push(store.state.user.redirectUrl || "/");

          Message({ type: "success", text: "绑定成功" });
        });
      })
      .catch((err) => {
        Message({
          type: "error",
          text: err.response.data?.message
            ? err.response.data.message
            : "第三方绑定失败",
        });
      });
  }
};
</script>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
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
