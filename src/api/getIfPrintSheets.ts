/*
 * @Author: zcd66666 15168728806@163.com
 * @Date: 2022-11-30 10:00:48
 * @LastEditors: zcd66666 15168728806@163.com
 * @LastEditTime: 2023-02-08 09:14:25
 * @FilePath: \suppliermateriallabelprintingtoolpage\src\api\getIfPrintSheets.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入axios实例
import http from '@/http/index'
import { SelInfo} from '../types/index'
interface getIfPrintSheetsParam  {
    SUPPMATERCODE:string,//供应商料号
    VBILLCODE: string,//订单号
    SUPPLOTNUM: string,//供应商批号
    COMPLETION: string,//是否完成
    STARTDATE: Date,//起始日期
    ENDDATE: Date   //截止日期

}

interface getIfPrintSheetsByCodeParam  {
    SUPPCODE:string,//供应商代码
    SUPPMATERCODE:string,//供应商料号
    VBILLCODE: string,//订单号
    SUPPLOTNUM: string,//供应商批号
    COMPLETION: string,//是否完成
    STARTDATE: Date,//起始日期
    ENDDATE: Date   //截止日期
    Print:string //是否有打印记录
}

export interface Page{
    selInfo:SelInfo,
    pageSize:number,
    current:number
}
// 查询打印记录
export function getIfPrintSheetsApi(param: getIfPrintSheetsParam) {
    return http({
        url: '/getIfPrintSheets',
        method: 'post',
        data: param
    })
}

// 根据供应商代码查询打印记录
export function getIfPrintSheetsByCodeApi(param:SelInfo) {
    return http({
        url: '/getIfPrintSheetsByCode',
        method: 'post',
        data: param,
    })
}

// 根据供应商代码查询打印记录数量
export function getQueryPrintSheetsTotalApi(param: SelInfo) {
    return http({
        url: '/getQueryPrintSheetsTotal',
        method: 'post',
        data: param
    })
}