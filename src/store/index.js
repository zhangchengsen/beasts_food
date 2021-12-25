import { createStore } from 'vuex'
import category from '@/store/modules/category'
import user from '@/store/modules/user'
import cart from '@/store/modules/cart'
import createPersistedState from 'vuex-persistedstate'
export default createStore({

  modules: {
    category,
    user,
    cart
  },
  plugins: [
    // createPersistedState() 这样是保持所有状态
    // 默认存储在localstorage  
    createPersistedState({
      //本地存储名字
      key: 'beasts_of_burden',
      //指定需要存储的模块
      paths: ['user', 'cart']
    })
  ]
})
