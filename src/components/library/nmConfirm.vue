<template>
  <div class="nm-confirm" :class="{ fade }">
    <div class="wrapper" :class="{ fade }">
      <div class="header">
        <h3>{{ title }}</h3>
        <a
          @click="cancelEvent()"
          href="JavaScript:;"
          class="iconfont icon-close-new"
        ></a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{ content }}</span>
      </div>
      <div class="footer">
        <nmButton @click="cancelEvent()" size="mini" type="gray">取消</nmButton>
        <nmButton
          style="margin-left: 5px"
          @click="confirmEvent()"
          size="mini"
          type="primary"
          >确认</nmButton
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import nmButton from "./nmButton.vue";
import { ref, onMounted } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "提示",
  },
  content: {
    type: String,
    default: "确定要操作吗",
  },
  confirmEvent: {
    type: Function,
  },
  cancelEvent: {
    type: Function,
  },
});

const fade = ref(false);
onMounted(() => {
  setTimeout(() => {
    fade.value = true;
    console.log(fade.value);
  }, 10);
});
const confirmEvent = () => {
  props.confirmEvent();
  fade.value = false;
};
const cancelEvent = () => {
  props.cancelEvent();
  fade.value = false;
};
</script>
<style scoped lang="less">
.nm-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0);
  &.fade {
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
  }
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;
    &.fade {
      transition: all 0.4s;
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: right;
      .xtx-button {
        margin-left: 20px;
      }
    }
    .header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
