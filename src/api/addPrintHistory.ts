// 导入axios实例
import http from '@/http/index'

interface addPrintHistoryParam  {
    PK_ORDER: string,            //采购订单主键
    PK_ORDER_B: string,          //采购订单明细主键
    SUPPCODE: string,             //供应商代码
    PRODUCEDATE: Date,
    NETWEIGHT:number,
    GROSSWEIGHT:number,
    SUPPLOTNUM:string,
    PRINTDATE:Date,
    PALLET:String               //托盘码信息
}

// 添加打印历史记录
export function addPrintHistoryApi(param: addPrintHistoryParam) {
    return http({
        url: '/addPrintHistory',
        method: 'post',
        data: param
    })
}