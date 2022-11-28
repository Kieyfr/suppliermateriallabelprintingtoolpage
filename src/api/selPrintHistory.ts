// 导入axios实例
import http from '@/http/index'

interface selPrintHistoryParam  {
    PK_ORDER_B: string,          //采购订单明细主键
}
 
 
// 获取供应商名称
export function selPrintHistoryApi(param: selPrintHistoryParam) {
    return http({
        url: 'http://192.168.1.106:8081/selPrintHistory',
        method: 'post',
        data: param
    })
}