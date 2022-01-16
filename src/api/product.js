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