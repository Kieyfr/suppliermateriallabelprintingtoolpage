/*
 * @Author: zcd66666 15168728806@163.com
 * @Date: 2022-11-28 14:14:20
 * @LastEditors: zcd66666 15168728806@163.com
 * @LastEditTime: 2023-03-28 14:41:35
 * @FilePath: \suppliermateriallabelprintingtoolpage\src\api\selPrintHistory.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入axios实例
import http from '@/http/index'

interface selPrintHistoryParam  {
    PK_ORDER_B: string,          //采购订单明细主键
    SUPPLOTNUM:string           //供应商批号
}
 
 
// 查询对应的打印历史
export function selPrintHistoryApi(param: selPrintHistoryParam) {
    return http({
        url: '/selPrintHistory',
        method: 'post',
        data: param
    })
}
// 获取供应商名称
export function selPrintHistoryBApi(param: selPrintHistoryParam) {
    return http({
        url: '/selPrintHistoryB',
        method: 'post',
        data: param
    })
}