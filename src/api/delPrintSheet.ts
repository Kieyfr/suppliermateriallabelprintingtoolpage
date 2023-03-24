// 导入axios实例
import http from '@/http/index'


 
// 删除打印列表
export function delPrintSheetApi(PK_ORDER_B:string,SUPPLOTNUM:string) {
    return http({
        url: '/delPrintSheet',
        method: 'post',
        data:{PK_ORDER_B,SUPPLOTNUM}
    })
}