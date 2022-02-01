import Mock from 'mockjs'
import request from '../utils/request'
import { config } from 'process'
import qs from 'querystring'
Mock.setup(
    { timeout: '300-800' }
)
Mock.mock(/\/member\/collect/, 'get', config => {
    const queryString = config.url.split('?')[1]
    const queryObject = qs.parse(queryString)
    const items = []
    for (let i = 0; i < +queryObject.pageSize; i++) {
        items.push(Mock.mock({
            id: '@id',
            name: '@ctitle(10,20)',
            desc: '@ctitle(4,10)',
            price: '@float(100,200,2,2)',
            picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`
        }))
    }
    return {
        msg: '获取收藏商品成功',
        result: {
            counts: 35,
            pageSize: +queryObject.pageSize,
            page: +queryObject.page,
            items
        }
    }
})
export const findCollect = ({ page, pageSize = 10, collectType = 1 }) => {
    return request('/member/collect', 'get', { page, pageSize, collectType })
}
