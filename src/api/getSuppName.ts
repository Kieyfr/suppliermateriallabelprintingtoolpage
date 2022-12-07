// 导入axios实例
import http from '@/http/index'
 
// 定义接口的传参
interface getSuppNameParam {
    suppCode: string
}
 
// 获取供应商名称
export function getSuppNameApi(param: getSuppNameParam) {
    return http({
        url: '/getSuppName',
        method: 'post',
        data: param,
    })
}

// 获取全部供应商名称
export function adminGetSuppNamesApi() {
    return http({
        url: '/adminGetSuppNames',
        method: 'post'
    })
}