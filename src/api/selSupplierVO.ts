// 导入axios实例
import http from '@/http/index'



//获取供应商总数
export function selSupplierVOApi(SUPPCODE:string,SUPPNAME:string,SUPPSHORTNAME:string,loginRecordSUPPCODE:number,current:number,pageSize:number) {
    return http({
        url: '/selSupplierVO',
        method: 'post',
        data: {SUPPCODE,SUPPNAME,SUPPSHORTNAME,loginRecordSUPPCODE,current,pageSize}
    })
}