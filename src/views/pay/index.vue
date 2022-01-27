<template>
  <div class="nm-pay-checkout-page">
    <div class="container">
      <nmBread>
        <nmBreadItem to="/">首页</nmBreadItem>
        <nmBreadItem to="/cart">购物车</nmBreadItem>
        <nmBreadItem>填写订单</nmBreadItem>
      </nmBread>
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <div class="none" v-if="!userAddresss">
                您需要先添加收货地址才可提交订单。
              </div>
              <ul v-else>
                <li>
                  <span>收<i />货<i />人：</span>{{ userAddress.username }}
                </li>
                <li><span>联系方式：</span>{{ userAddress.phone }}</li>
                <li><span>收货地址：</span>{{ userAddress.fullAddress }}</li>
              </ul>
              <a href="javascript:;">修改地址</a>
            </div>
            <div class="action">
              <nmButton class="btn">切换地址</nmButton>
              <nmButton class="btn">添加地址</nmButton>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="goods in store.getters['cart/selectedList']"
                :key="goods.skuId"
              >
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="goods.picture" alt="" />
                    <div class="right">
                      <p>{{ goods.name }}</p>
                      <p>{{ goods.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ goods.nowPrice }}</td>
                <td>{{ goods.count }}</td>
                <td>
                  &yen;{{
                    (Math.round(goods.nowPrice * 100) * goods.count) / 100
                  }}
                </td>
                <td>
                  &yen;{{
                    (Math.round(goods.nowPrice * 100) * goods.count) / 100
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;"
            >不限送货时间：周一至周日</a
          >
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color: #999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ store.getters["cart/selectedTotal"] }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ store.getters["cart/selectedAmount"] }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥8</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">
                ¥{{ store.getters["cart/selectedAmount"] + 8 }}
              </dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <nmButton type="primary">提交订单</nmButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { createOrder } from "@/api/pay";
import Message from "@/components/library/Message";
import { ref, reactive } from "vue";
const store = useStore();
createOrder()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    let e = err.response.data;
    Message({ type: "error", text: e?.Message ? e.Message : "创建订单失败" });
  });
const userAddress = reactive({
  username: "朱超",
  phone: "132****2222",
  fullAddress: "海南省三亚市解放路108号物质大厦1003室",
});
</script>
<style scoped lang="less">
.nm-pay-checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @nmColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,
  &:hover {
    border-color: @nmColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
</style>
