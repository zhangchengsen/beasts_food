<template>
  <div class="goods-sku" v-for="specs in goods" :key="specs.id">
    <dl>
      <dt>{{ specs.name }}</dt>
      <dd>
        <template v-for="item in specs.values" :key="item.name">
          <img
            @click="changeSelected(specs, item)"
            v-if="item.picture"
            :class="{ selected: item.selected, disabled: item.disabled }"
            :src="item.picture"
            :title="item.name"
          />
          <span
            @click="changeSelected(specs, item)"
            v-else
            :class="{ selected: item.selected, disabled: item.disabled }"
            >{{ item.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script setup>
import powerSet from "@/vender/power_set";
const props = defineProps({
  goods: {
    type: Object,
    default: () => ({}),
  },
  skus: {
    type: Array,
    default: () => [],
  },
  skuId: {
    type: String,
    default: "",
  },
});
const map = {};
const getSkusSet = () => {
  let list = [...props.skus];
  list.forEach((sku) => {
    if (sku.inventory) {
      let valueArr = sku.specs.map((val) => val.valueName);
      let setArr = powerSet(valueArr);
      setArr.forEach((v) => {
        let tag = v.join("$");
        if (map[tag]) {
          map[tag].push(sku.id);
        } else {
          map[tag] = [sku.id];
        }
      });
    }
  });
};
getSkusSet();

const getSkuList = () => {
  let arr = [];
  props.goods.forEach((item) => {
    const selectedVal = item.values.find((val) => val.selected);
    arr.push(selectedVal ? selectedVal.name : undefined);
  });
  return arr;
};
const init = () => {
  if (!props.skuId) return;
  console.log(props.goods);
  props.goods.forEach((v) => {
    v.values.forEach((item) => {
      let index = map[item.name].findIndex((i) => i === props.skuId);
      if (index > -1) item.selected = true;
    });
  });
};
init();
const updateButtonStatus = () => {
  props.goods.forEach((item, i) => {
    const selectedValues = getSkuList();
    item.values.forEach((v) => {
      if (item.selected) return;
      selectedValues[i] = v.name;
      const key = selectedValues.filter((vv) => vv).join("$");
      v.disabled = !map[key];
    });
  });
};

const emits = defineEmits(["change"]);
const changeSelected = (specs, item) => {
  if (item.disabled) return;
  if (item.selected) {
    item.selected = false;
  } else {
    specs.values.forEach((v) => {
      v.selected = false;
    });
    item.selected = true;
  }
  updateButtonStatus();
  const selectedValues = getSkuList();

  let index = selectedValues.findIndex((v) => v == null);
  if (index === -1) {
    let id = map[selectedValues.join("$")];
    let target = props.skus.find((item) => item.id == id[0]);
    emits("change", {
      skuId: target.id,
      nowPrice: target.price,
      price: target.oldPrice,
      stock: target.inventory,
      attrsText: target.specs
        .reduce((p, c) => `${p} ${c.name}: ${c.valueName}`, "")
        .trim(),
    });
  } else {
    emits("change", false);
  }
};
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @nmColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 10px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        margin: 5px 0;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
