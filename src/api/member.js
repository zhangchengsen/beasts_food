import request from '@/utils/request'
/**
 * 
 * @param {本地购物车列表} cartList 
 * @returns 与服务器购物车合并
 */
export const mergeCart = (cartList) => {
    return request(`/member/cart/merge`, 'post', cartList)
}
/**
 * 
 * @returns 获取最新购物车列表
 */
export const getCart = () => {
    return request(`/member/cart`, 'get',)
}
export const deleteCart = (ids) => {
    return request('/member/cart', 'delete', { ids })
}
export const insertCart = ({ skuId, count }) => {
    return request('/member/cart', 'post', { skuId, count })
}

export const updateCart = (goods) => {
    return request('/member/cart/' + goods.skuId, 'put', goods)
}


export const checkAllCart = ({ selected, ids }) => {
    return request('/member/cart/selected', 'put', { selected, ids })
}