// 导入axios实例
import http from '@/http/index'
 
// 获取供应商打印列表
export function getPrintSheetsApi() {
    return http({
        url: '/getPrintSheets',
        method: 'post'
    })
}

// 定义接口的传参
interface getPrintSheetsParam {
    suppCode: string
}
 
// 根据供应商代码获取供应商信息
export function getPrintSheetsByCodeApi(param: getPrintSheetsParam) {
    return http({
        url: '/getPrintSheetsByCode',
        method: 'post',
        data: param
    })
}