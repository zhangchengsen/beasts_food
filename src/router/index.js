import { createRouter, createWebHashHistory } from 'vue-router'
const Home = () => import('@/views/home/index.vue')
const Layout = () => import('@/views/Layout.vue')
const TopCategory = import('@/views/category/index.vue')
const SubCategory = import('@/views/category/sub.vue')
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
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // scrollBehavior() {
  //   // return {}
  // }
})

export default router
