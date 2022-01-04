import request from "@/utils/request";
//获取所有分类
export const findAllCategory = () => {
    return request('/home/category/head', 'get')
}