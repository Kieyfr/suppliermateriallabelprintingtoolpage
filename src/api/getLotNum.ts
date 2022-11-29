// 导入axios实例
import http from '@/http/index'

// 定义接口的传参
interface getLotNumParam {
    PK_ORDER_B: string
}
 
// 获取批号
export function getLotNumApi(param: getLotNumParam) {
    return http({
        url: 'http://192.168.1.106:8081/getLotNum',
        method: 'post',
        data: param,
    })
}