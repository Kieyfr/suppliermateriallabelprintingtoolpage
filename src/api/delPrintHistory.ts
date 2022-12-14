// 导入axios实例
import http from '@/http/index'

interface delPrintHistoryParam  {
    PK_ORDER_B: string,          //采购订单明细主键
}
 
// 添加打印历史记录
export function delPrintHistoryApi(param: delPrintHistoryParam) {
    return http({
        url: '/delPrintHistory',
        method: 'post',
        data: param
    })
}