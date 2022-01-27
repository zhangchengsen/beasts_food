import { createRouter, createWebHashHistory } from 'vue-router'
const Home = () => import('@/views/home/index.vue')
const Layout = () => import('@/views/Layout.vue')
const TopCategory = import('@/views/category/index.vue')
const SubCategory = import('@/views/category/sub.vue')
const Goods = import('@/views/goods/index.vue')
const Login = import('@/views/login/index.vue')
const Callback = import('@/views/login/callback.vue')
const Cart = import('@/views/cart/index.vue')
const Checkout = import('@/views/pay/index.vue')
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
