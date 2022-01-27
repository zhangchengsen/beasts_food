import request from '@/utils/request'
export const getProductInfo = (id) => {
    return request('/goods', 'get', { id })
}
export const getRelevant = ({ id, limit = 16 }) => {
    return request('/goods/relevant', 'get', { id, limit })
}
/**
 * 
 * @param {*}  
 * @returns    获取热销榜
 */
export const getGoodsHot = ({ id, limit = 3, type = 1 }) => {
    return request('/goods/hot', 'get', { id, limit, type })
}
export const getComments = (id) => {
    return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}
export const getCommentsList = (id, params) => {
    return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}
/**
 * 
 * @param {sku唯一标识} skuId 
 * @returns 购物车最新商品信息
 */
export const getNewCartGoods = (skuId) => {
    return request(`/goods/stock/${skuId}`, 'get')
}
export const getGoodsSku = (skuId) => {
    return request(`/goods/sku/${skuId}`, 'get')
}
