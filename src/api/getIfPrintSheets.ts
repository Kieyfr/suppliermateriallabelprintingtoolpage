// 导入axios实例
import http from '@/http/index'

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
export function getIfPrintSheetsByCodeApi(param: getIfPrintSheetsByCodeParam) {
    return http({
        url: '/getIfPrintSheetsByCode',
        method: 'post',
        data: param
    })
}