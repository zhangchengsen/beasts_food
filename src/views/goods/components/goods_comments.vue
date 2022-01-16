<template>
  <div class="goods-comment">
    <div class="head">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            v-for="(item, idx) in commentList"
            href="javascript:;"
            :key="item.title"
            :class="{ active: activeIdx === idx }"
            @click="changeActive(item, idx)"
            >{{ `${item.title}（${item.tagCount}）` }}</a
          >
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;" @click="changeSort(null)" class="active">默认</a>
      <a href="javascript:;" @click="changeSort('praiseCount')">最新</a>
      <a href="javascript:;" @click="changeSort('createTime')">最热</a>
    </div>

    <!-- 列表 -->
    <div class="list" v-for="item in comments" :key="item.id">
      <div class="item">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ formatNickName(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i
              class="iconfont icon-wjx01"
              v-for="num in item.score"
              :key="num + 'a'"
            ></i>
            <i
              class="iconfont icon-wjx02"
              v-for="num in 5 - item.score"
              :key="num + 'a—'"
            ></i>

            <span class="attr">{{
              formatGoodsInfo(item.orderInfo.specs)
            }}</span>
          </div>
          <div class="text">
            {{ item.content }}
          </div>
          <goods-preview :pictures="item.pictures"></goods-preview>
          <div class="time">
            <span>{{ item.orderInfo.createInfo }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <nm-pagination
      @change="change"
      :curPage="reqParams.page"
      :count="7"
      :totalNum="counts"
    ></nm-pagination>
  </div>
</template>
<script setup>
import GoodsPreview from "./goods_preview.vue";
import { getComments, getCommentsList } from "@/api/product";
import { useRoute } from "vue-router";
import { ref, reactive, watch } from "vue";
const route = useRoute();
const commentInfo = ref({});
const commentList = ref([]);
const activeIdx = ref(0);
getComments(route.params.id).then(({ result: res }) => {
  console.log(res);
  commentInfo.value = { ...res };
  let list = [];
  list.push({ title: "全部评价", tagCount: res.evaluateCount, type: "all" });

  list.push({ title: "有图", tagCount: res.hasPictureCount, type: "image" });
  commentList.value = [...list, ...res.tags];
});

const reqParams = reactive({
  page: 1,
  pageSize: 10,
  hasPicture: null,
  tag: null,
  sortField: null,
});

// 当前页码
// 改变当前页码
const change = (num) => {
  reqParams.page = num;
};

const changeSort = (params) => {
  if (reqParams.sortField === params) return;
  reqParams.page = 1;
  reqParams.sortField = params;
};
const changeActive = (item, idx) => {
  if (activeIdx.value === idx) return;
  activeIdx.value = idx;
  reqParams.page = 1;

  if (item.type === "image") {
    reqParams.hasPicture = true;
    reqParams.tag = null;
  } else if (item.type === "all") {
    reqParams.hasPicture = null;
    reqParams.tag = null;
  } else {
    reqParams.hasPicture = null;
    reqParams.tag = item.title;
  }
};
const comments = ref([]);

// 获取用户昵称
const formatNickName = (name) => {
  return name[0] + "****" + name.substr(-1);
};

// 获取购买商品属性
const formatGoodsInfo = (obj) => {
  obj.reduce((p, c) => `${p} ${c} `, "");
};
const counts = ref(100);
watch(
  reqParams,
  () => {
    getCommentsList(route.params.id, reqParams).then(({ result: res }) => {
      counts.value = res.counts;
      comments.value = [...res.items];
    });
  },
  { immediate: true }
);
</script>
<style scoped lang="less">
.goods-comment {
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @nmColor;
            background: lighten(@nmColor, 50%);
            color: @nmColor;
          }
          &.active {
            border-color: @nmColor;
            background: @nmColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @nmColor;
      }
    }
  }
}
</style>
