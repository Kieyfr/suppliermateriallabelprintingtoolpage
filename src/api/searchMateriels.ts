// 导入axios实例
import http from '@/http/index'

interface searchMaterielsParam  {
    search: string,          //采购订单明细主键
    suppCode: string
}
 
// 添加打印历史记录
export function searchMaterielsApi(param: searchMaterielsParam) {
    return http({
        url: '/searchMateriels',
        method: 'post',
        data: param
    })
}