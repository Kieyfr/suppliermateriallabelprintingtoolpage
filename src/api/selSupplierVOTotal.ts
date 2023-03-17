// 导入axios实例
import http from '@/http/index'



//获取供应商总数
export function selSupplierVOTotalApi(SUPPCODE:string,SUPPNAME:string,SUPPSHORTNAME:string,loginRecordSUPPCODE:number) {
    return http({
        url: '/selSupplierVOTotal',
        method: 'post',
        data: {SUPPCODE,SUPPNAME,SUPPSHORTNAME,loginRecordSUPPCODE}
    })
}