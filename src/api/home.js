import request from "@/utils/request";
/**
 * 
 * @param {Integer} limit - 品牌个数 
 * @returns 
 */
export const getPopular = (limit) => request('/home/brand', 'get', { limit })

/**
 * 
 * @returns - 轮播图片 
 */
export const findBanner = () => request('/home/banner', 'get')

/**
 * 
 * @returns - 发现更多列表
 */
export const findNew = () => request('/home/new', 'get')


/**
 * 
 * @returns 获取人气推荐
 */
export const findHot = () => request('/home/hot', 'get')

/**
 * 
 * @returns 获取商品好货列表
 */
export const findGoods = () => request('/home/goods', 'get')

/**
 * 
 * @returns 最新专题
 */

export const findSpecial = () => request('/home/special', 'get')