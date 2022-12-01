// 导入axios实例
import http from '@/http/index'

interface addPrintSheetParam  {
    PK_ORDER: string,            //采购订单主键
    PK_ORDER_B: string,          //采购订单明细主键
    SUPPCODE: string,             //供应商代码
    SUPPNAME: string,             //供应商名称
    SUPPSHORTNAME: string, //供应商简称
    SUPPMATERCODE: string,        //供应商料号
    SUPPLOTNUM: string,           //供应商批号
    VBILLCODE: string,            //订单号
    MATERCODE: string,            //物料编码
    MATERNAME: string,            //物料名称
    MATERMATERIALSPEC: string,    //物料规格
    MATERMATERIALTYPE: string,    //物料颜色
    PRODUCEDATE: Date,          //生产日期
    NETWEIGHT: number,        //净重
    GROSSWEIGHT: number,      //毛重
    NUM: number,
    PRINT: boolean,              //是否可以打印
}
 
// 获取批号
export function addPrintSheetApi(param: addPrintSheetParam) {
    return http({
        url: '/addPrintSheet',
        method: 'post',
        data: param
    })
}