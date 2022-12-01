// 导入axios实例
import http from '@/http/index'

interface selPrintHistoryParam  {
    PK_ORDER_B: string,          //采购订单明细主键
}
 
 
// 获取供应商名称
export function selPrintHistoryApi(param: selPrintHistoryParam) {
    return http({
        url: '/selPrintHistory',
        method: 'post',
        data: param
    })
}