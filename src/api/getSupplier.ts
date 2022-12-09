// 导入axios实例
import http from '@/http/index'
 
// 定义接口的传参
interface getSupplierParam {
    suppCode: string
}
 
// 根据供应商代码获取供应商信息
export function getSupplierApi(param: getSupplierParam) {
    return http({
        url: '/getSupplier',
        method: 'post',
        data: param
    })
}