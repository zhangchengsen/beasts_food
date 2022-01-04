import { findAllCategory } from "@/api/category"
import { topCategory } from "@/api/constant"
export default {
    namespaced: true,
    state() {
        return {
            list: topCategory.map(v => ({ name: v }))
        }
    },
    actions: {
        async getList({ commit }) {
            // 获取分类数据
            const data = await findAllCategory()
            // 修改分类数据
            commit('setList', data.result)

        }
    },
    mutations: {
        setList(state, payload) {
            state.list = payload
        },
        show(state, id) {
            let index = state.list.findIndex(v => v.id === id)
            state.list[index].open = true
        },
        hide(state) {
            state.list.forEach(v => v.open = false)
        }
    }
}