// 导入axios实例
import http from '@/http/index'
 
// 获取批号
export function getPrintSheetsApi() {
    return http({
        url: '/getPrintSheets',
        method: 'post'
    })
}