<template>
  <div class="xtx-cart-page">
    <div class="container">
      <nmBread>
        <nmBreadItem to="/">首页</nmBreadItem>
        <nmBreadItem>购物车</nmBreadItem>
      </nmBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <nmCheck
                  @change="checkAll"
                  :modelValue="store.getters['cart/isCheckAll']"
                  >全选</nmCheck
                >
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <template v-if="$store.getters['cart/validList'].length === 0">
              <tr>
                <td colspan="6">
                  <CartEmpty />
                </td></tr
            ></template>
            <template v-else>
              <tr
                v-for="goods in store.getters['cart/validList']"
                :key="goods.skuId"
              >
                <td>
                  <nmCheck
                    :modelValue="goods.selected"
                    @change="updateCheck($event, goods)"
                  />
                </td>
                <td>
                  <div class="goods">
                    <RouterLink to="/"
                      ><img :src="goods.picture" alt=""
                    /></RouterLink>
                    <div>
                      <p class="name ellipsis">{{ goods.name }}}</p>
                      <!-- 选择规格组件 -->
                      <GoodsSku
                        :attrsText="goods.attrsText"
                        :skuId="goods.skuId"
                        @change="changeSku"
                        :goodsInfo="goods"
                      ></GoodsSku>
                    </div>
                  </div>
                </td>
                <td class="tc">
                  <p>&yen;{{ goods.nowPrice }}</p>
                  <p>
                    比加入时降价
                    <span class="red"
                      >&yen;{{ goods.nowPrice - goods.price }}</span
                    >
                  </p>
                </td>
                <td class="tc">
                  <nmNumber
                    :label="false"
                    :modelValue="goods.count"
                    @update:modelValue="updateNum($event, goods)"
                  />
                </td>
                <td class="tc">
                  <p class="f16 red">
                    &yen;{{
                      (goods.count * Math.round(goods.nowPrice * 100)) / 100
                    }}
                  </p>
                </td>
                <td class="tc">
                  <p><a href="javascript:;">移入收藏夹</a></p>
                  <p>
                    <a
                      class="green"
                      href="javascript:;"
                      @click="removeCartItem(goods.skuId)"
                      >删除</a
                    >
                  </p>
                  <p><a href="javascript:;">找相似</a></p>
                </td>
              </tr>
            </template>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="store.getters['cart/invalidList'].length">
            <tr>
              <td colspan="6"><h3 class="tit">失效商品</h3></td>
            </tr>
            <tr
              v-for="(goods, i) in store.getters['cart/invalidList']"
              :key="i + 'a'"
            >
              <td><nmCheckbox style="color: #eee" /></td>
              <td>
                <div class="goods">
                  <RouterLink to="/"
                    ><img :src="goods.picture" alt=""
                  /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ goods.name }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
              </td>
              <td class="tc">{{ goods.count }}</td>
              <td class="tc">
                <p>
                  &yen;{{
                    (Math.round(goods.nowPrice * 100) * goods.count) / 100
                  }}
                </p>
              </td>
              <td class="tc">
                <p>
                  <a
                    class="green"
                    href="javascript:;"
                    @click="removeCartItem(goods.skuId)"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <span :class="{ color: store.getters['cart/isCheckAll'] }">全选</span>
          <a href="javascript:;" @click="removeItems()">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="clearInvalid">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ store.getters["cart/validCounts"] }} 件商品，已选择
          {{ store.getters["cart/selectedTotal"] }} 件，商品合计：
          <span class="red">¥{{ store.getters["cart/selectedAmount"] }}</span>
          <nmButton type="primary" @click="settle">下单结算</nmButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <!-- <GoodRelevant /> -->
    </div>
  </div>
</template>
<script setup>
import GoodsSku from "./components/cart_sku.vue";
import GoodRelevant from "@/views/goods/components/goods-relevant";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CartEmpty from "./components/cart_empty.vue";
import Confirm from "@/components/library/Confirm";
const store = useStore();
const router = useRouter();

const settle = () => {
  // 1. 判断是否选择有效商品
  // 2. 判断是否已经登录，未登录 弹窗提示
  // 3. 进行跳转 （需要做访问权限控制）
  if (store.getters["cart/selectedTotal"] === 0)
    return Message({ text: "至少选中一件商品才能结算" });
  if (!store.state.user.profile.token) {
    Confirm({ title: "温馨提示", content: "下单结算需要登录，您是否去登录？" })
      .then(() => {
        // 点击确认
        router.push("/login");
      })
      .catch((e) => {});
  } else {
    router.push("/member/checkout");
  }
};
const removeCartItem = (skuId) => {
  Confirm({
    title: "删除商品",
    content: "是否要删除该商品",
  })
    .then((res) => {
      store.dispatch("cart/deleteCartItem", skuId);
    })
    .catch((err) => {});
};
// 是否选中
const updateCheck = ($event, goods) => {
  store.dispatch("cart/updateCartItem", {
    ...goods,
    selected: !goods.selected,
  });
};
// 批量删除
const removeItems = () => {
  store.getters["cart/selectedList"].forEach((v) => {
    store.dispatch("cart/deleteCartItem", v.skuId);
  });
};

const updateNum = (e, goods) => {
  // console.log(e);
  store.dispatch("cart/updateCartItem", {
    ...goods,
    count: e,
  });
};
const changeSku = (e) => {
  store.dispatch("cart/updateCartItem", {
    ...e,
  });
};
const checkAll = () => {
  store.dispatch("cart/updateAllCheck", !store.getters["cart/isCheckAll"]);
};
const clearInvalid = () => {
  store.getters["cart/invalidList"].forEach((v) => {
    store.dispatch("cart/deleteCartItem", v.skuId);
  });
};
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @nmColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
    .color {
      color: @nmColor;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
