<script>
import { h } from "vue";

export default {
  render() {
    const items = this.$slots.default();
    const dynamicItems = [];
    items.forEach((item, i) => {
      dynamicItems.push(item);
      if (i < items.length - 1) {
        dynamicItems.push(h("i", { class: "iconfont icon-angle-right" }));
      }
    });
    return h("div", { class: "nm-bread" }, dynamicItems);
  },
};
</script>

<style lang="less">
.nm-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @nmColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
