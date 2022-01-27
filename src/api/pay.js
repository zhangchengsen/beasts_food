import request from '@/utils/request'
/**
 * 
 * @returns 结算页面生成订单 
 */
export const createOrder = () => {
    return request('/member/order/pre', 'get')
}