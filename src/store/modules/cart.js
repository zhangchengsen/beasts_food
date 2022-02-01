import { getNewCartGoods } from '@/api/product'
import { insertCart, mergeCart } from '@/api/member'

import Message from '@/components/library/Message'
export default {
    namespaced: true,
    state() {
        return {
            list: []
        }
    },
    mutations: {
        insertCart(state, payload) {
            let idx = state.list.findIndex(v => v.skuId === payload.skuId)
            if (idx > -1) {
                payload.count += state.list[idx].count
                state.list.splice(idx, 1)

            }
            state.list.unshift(payload)
        },
        updateCart(state, payload) {
            let list
            if (payload.preSkuId)
                list = state.list.find(item => item.skuId === payload.preSkuId)
            else
                list = state.list.find(item => item.skuId === payload.skuId)

            for (let key in payload) {
                if (payload[key] !== undefined && payload[key] !== null && payload[key] !== '' && key !== 'preSkuId')
                    list[key] = payload[key]
            }
        },
        deleteCartItem(state, payload) {
            let index = state.list.findIndex(v => payload === v.skuId)
            state.list.splice(index, 1)
        },
        updateAllCheck(state, payload) {
            state.list.forEach(v => v.selected = payload)
        },
        setCart(state, payload) {
            state.list = payload
        }
    },
    actions: {
        mergeCart(ctx) {
            const cartList = ctx.getters.validList.map(({ skuId, selected, count }) => {
                return { skuId, selected, count }
            })
            mergeCart(cartList).then(() => {
                // 合并成功将本地购物车删除
                ctx.commit('setCartList', [])
            })

        },

        updateAllCheck(ctx, payload) {
            ctx.commit('updateAllCheck', payload)
        },
        insertCart(ctx, payload) {
            if (ctx.rootState.user.token) {
                insertToCart({ skuId: payload.skuId, count: payload.skuId })
                    .then(() => { })
                    .catch(err => {
                        Message({ text: '插入商品失败', type: 'error' })
                    })
            }
            ctx.commit('insertCart', payload)
        },
        updateCartItem(ctx, payload) {
            ctx.commit('updateCart', payload)
        },
        updateCart(ctx) {

            let promiseArr = ctx.getters.validList.map(v => getNewCartGoods(v.skuId))
            Promise.all(promiseArr).then(res => {
                ctx.commit('updateCart', { ...res.result })
            })
                .catch(err => {
                    console.dir(err)
                })
        },
        deleteCartItem(ctx, payload) {
            console.log('delete')
            ctx.commit('deleteCartItem', payload)    //skuId
        }
    },
    getters: {
        validList(state) {
            return state.list.filter(v => v.stock > 0 && v.isEffective)
        },
        validCounts(state, getters) {
            return getters.validList.length
        },
        validPrice(state, getters) {
            return getters.validList.reduce((pre, cur) => pre += parseInt(cur.nowPrice * 100 * cur.count), 0) / 100
        },
        // 无效商品列表
        invalidList(state) {
            return state.list.filter(item => !(item.stock > 0 && item.isEffective))
        },
        // 选中商品列表
        selectedList(state, getters) {
            return getters.validList.filter(item => item.selected)
        },
        // 选中商品件数
        selectedTotal(state, getters) {
            return getters.selectedList.reduce((p, c) => p + c.count, 0)
        },
        // 选中商品总金额
        selectedAmount(state, getters) {
            return getters.selectedList.reduce((p, c) => p + (c.nowPrice * 100 * c.count), 0) / 100
        },
        // 是否全选
        isCheckAll(state, getters) {
            return getters.validList.length === getters.selectedList.length && getters.selectedList.length !== 0
        }
    }
}