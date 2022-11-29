// 导入axios实例
import http from '@/http/index'

interface getIfPrintSheetsParam  {
    SUPPMATERCODE:"",//供应商料号
    VBILLCODE: string,//订单号
    SUPPLOTNUM: string,//供应商批号
    COMPLETION: string,//是否完成
    STARTDATE: Date,//起始日期
    ENDDATE: Date   //截止日期
}
 
// 添加打印历史记录
export function getIfPrintSheetsApi(param: getIfPrintSheetsParam) {
    return http({
        url: 'http://192.168.1.106:8081/getIfPrintSheets',
        method: 'post',
        data: param
    })
}