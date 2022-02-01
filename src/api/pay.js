import request from '@/utils/request'
/**
 * 
 * @returns 结算页面生成订单 
 */
export const setOrder = () => {
    return request('/member/order/pre', 'get')
}
export const findOrder = (id) => {
    return request('/member/order/' + id, 'get')
}
export const createOrder = (order) => {
    return request('/member/order', 'post', order)
}
export const findOrderDetail = (orderId) => {
    return request('/member/order/' + orderId, 'get')
}