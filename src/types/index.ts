export interface PrintSheet {
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
    PRINT: boolean,              //是否打印
}

export interface GetPrintSheet {
    pk_ORDER: string,            //采购订单主键
    pk_ORDER_B: string,          //采购订单明细主键
    suppcode: string,             //供应商代码
    suppname: string,             //供应商名称
    suppshortname: string, //供应商简称
    suppmatercode: string,        //供应商料号
    supplotnum: string,           //供应商批号
    vbillcode: string,            //订单号
    matercode: string,            //物料编码
    matername: string,            //物料名称
    matermaterialspec: string,    //物料规格
    matermaterialtype: string,    //物料颜色
    producedate: Date,          //生产日期
    netweight: number,        //净重
    grossweight: number,      //毛重
    num: number,
    print: boolean,              //是否打印
}

export interface  Materiels {
    pk_ORDER: string,
    pk_ORDER_B: string,
    vbillcode: string,
    matercode: string,
    matername: string,
    matermaterialspec: string,
    matermaterialtype: string,
    num: number
}

export interface supplier{
    suppCode: string,
    suppName: string,
    suppShortname: string,
    password: string
}

export interface ShowPrintHistory {
    pk_ORDER: string,            //采购订单主键
    pk_ORDER_B: string,          //采购订单明细主键
    matername: string,            //物料编码
    suppmatercode: string,        //供应商料号
    producedate: Date,          //生产日期
    lotnum:string,              //批号
    netweight: number,        //净重
    grossweight: number,      //毛重
    supplotnum: string,           //供应商批号
    matermaterialspec: string,    //物料规格
    matermaterialtype: string,    //物料颜色
    printdate:Date,                  //打印日期
    PALLET:String               //托盘码信息
}