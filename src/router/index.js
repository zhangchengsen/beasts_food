import { createRouter, createWebHashHistory } from 'vue-router'
const Home = () => import('@/views/home/index.vue')
const Layout = () => import('@/views/Layout.vue')
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
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
