// 导入axios实例
import http from '@/http/index'



//删除供应商登录信息
export function delSuppUserApi(SUPPCODE:string) {
    return http({
        url: '/delSuppUser',
        method: 'post',
        data: {SUPPCODE}
    })
}