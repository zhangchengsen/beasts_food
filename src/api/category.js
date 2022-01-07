import request from "@/utils/request";
//获取所有分类
export const findAllCategory = () => {
    return request('/home/category/head', 'get')
}
/**
 * 获取顶级类目信息 （children属性就是各个子分类）
 * @param {*} id 顶级类目id 
 * @returns 
 */
export const findTopCategory = (id) => {
    return request('/category', 'get', { id })
}
/**
 * 
 * @param {*} id 
 * 
 * @returns -删选商品信息
 */
export const findSubCategoryFilter = (id) => {
    return request('/category/sub/filter', 'get', { id })
}
/**
 * 
 * @param {*} params 筛选商品数据
 * @returns 筛选的数据
 */
export const findSubCategoryGoods = (params) => {
    return request('/category/goods/temporary', 'post', params)
}