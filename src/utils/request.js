import axios from 'axios'
import store from '@/store'
import router from '@/router'

export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
    baseURL,
    timeout: 5000
})
instance.interceptors.request.use((config) => { // 拦截时做的事情
    //拦截的业务逻辑
    //进行请求配置的修改
    //如果本地有token 就在头部携带
    //获取用户信息对象
    let { profile } = store.state.user
    if (profile.token) {
        config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
}, err => {                                // 错误时候的处理
    return Promise.reject(err)             //  
})
instance.interceptors.response.use((res) => {
    return res.data                         // res => res.data 如果不处理其他数据

}, (err) => {
    if (err.response && err.response.status === 401) {
        // 清空本地无效用户信息
        // 跳转到登录页码
        // 跳转需要传参 给登录页
        store.commit('user/setUser')
        const fullpath = encodeURIComponent(router.currentRoute.value.fullPath)
        router.push('/login?redirectUrl=' + fullpath)
    }
    return Promise.reject(err)              // 错误时候的处理
})
export default (url, method, data = {}) => {
    return instance({
        method,
        url,
        [method.toLowerCase() === 'get' ? 'params' : 'data']: data
    })
}