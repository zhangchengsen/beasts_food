<template>
  <div class="nm-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{ active }">
      <span class="placeholder" v-if="!areaInfo.fullCityName"
        >请选择配送地址</span
      >
      <span class="value" v-else>{{ areaInfo.fullCityName }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <span
        @click="changeArea(i)"
        class="ellipsis"
        v-for="i in curList"
        :key="i"
        >{{ i.name }}</span
      >
      <div class="loading" v-if="loading"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, reactive, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";
// 控制展开收起,默认收起
const active = ref(false);
const openDialog = () => {
  getCityData();
  active.value = true;
};
const closeDialog = () => {
  active.value = false;
};
const curList = computed(() => {
  const list = cityData.value;
  // TODO 根据点击的省份城市获取对应的列表
  return list;
});
// 切换展开收起
const toggleDialog = () => {
  if (active.value) closeDialog();
  else openDialog();
};
const loading = ref(false);
// 点击其他位置隐藏
const cityData = ref([]);
const target = ref(null);
const getCityData = () => {
  const baseUrl =
    "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json";
  return new Promise((resolve, reject) => {
    loading.value = true;
    if (window.city) {
      loading.value = false;
      cityData.value = window.city;
      resolve(window.city);
    } else {
      axios.get(baseUrl).then((res) => {
        window.city = res.data;
        cityData.value = res.data;
        loading.value = false;
        resolve(res.data);
      });
    }
  });
};
onClickOutside(target, () => {
  closeDialog();
});

// 选择区域
const props = defineProps({
  cityList: {
    type: String,
    default: () => "",
  },
});
watch(
  () => props.cityList,
  (newVal) => {
    if (newVal?.values?.length) console.log("props.cityList有值啦", newVal);
  },
  { deep: true, immediate: true }
);
const areaInfo = reactive({
  code0: "110000",
  name0: "北京市",
  code1: "119900",
  name1: "市辖区",
  code2: "110101",
  name2: "东城区",
  fullCityName: "",
});

const emits = defineEmits(["changeCity"]);
const changeArea = (area) => {
  areaInfo["name" + area.level] = area.name;
  areaInfo["code" + area.level] = area.code;
  if (area.level === 2) {
    closeDialog();
    areaInfo.fullCityName = `${areaInfo.name0} ${areaInfo.name1} ${areaInfo.name2}`;
    emits("changeCity", areaInfo);

    return;
  }
  cityData.value = [...area.areaList];
};
</script>
<style scoped lang="less">
.nm-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
