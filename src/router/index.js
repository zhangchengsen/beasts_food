import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import { h } from 'vue'
const Home = () => import('@/views/home/index.vue')
const Layout = () => import('@/views/Layout.vue')
const TopCategory = import('@/views/category/index.vue')
const SubCategory = import('@/views/category/sub.vue')
const Goods = import('@/views/goods/index.vue')
const Login = import('@/views/login/index.vue')
const Callback = import('@/views/login/callback.vue')
const Cart = import('@/views/cart/index.vue')
const Checkout = import('@/views/pay/index.vue')
const Pay = import('@/views/pay/pay.vue')
const PayRedirect = import('@/views/pay/redirect.vue')
const MemberLayout = () => import('@/views/member/layout.vue')
const MemberHome = () => import('@/views/member/components/home_like.vue')
const MemberOrder = () => import('@/views/member/components/member_order.vue')
const OrderDetail = () => import('@/views/member/components/order_detail.vue')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        redirect: () => '/home'
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/category/:id',
        component: TopCategory
      },
      {
        path: '/category/sub/:id',
        component: SubCategory
      },
      {
        path: '/product/:id',
        component: Goods
      },
      {
        path: '/login',
        component: Login
      }, {
        path: '/login/callback',
        component: Callback
      }
      , {
        path: '/cart',
        component: Cart
      }
      , {
        path: '/member/checkout',
        component: Checkout
      }
      , {
        path: '/member/pay',
        component: Pay
      },
      {
        path: '/pay/callback',
        component: PayRedirect
      },
      {
        path: '/member',
        component: MemberLayout,
        children: [
          { path: '/member', component: MemberHome },
          {
            path: '/member/order', component: {
              render: () => h(<RouterView></RouterView>),
            },
            children: [
              { path: '', component: MemberOrder },
              { path: ':id', component: OrderDetail }
            ]
          }
        ]
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

export default router
