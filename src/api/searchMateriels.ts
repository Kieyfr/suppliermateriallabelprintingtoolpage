// 导入axios实例
import http from '@/http/index'

interface searchMaterielsParam  {
    search: string,          //采购订单明细主键
}
 
// 添加打印历史记录
export function searchMaterielsApi(param: searchMaterielsParam) {
    return http({
        url: 'http://192.168.1.106:8081/searchMateriels',
        method: 'post',
        data: param
    })
}