// 导入axios实例
import http from '@/http/index'

interface adminsupplier  {
    suppCode: string,
    state:number        
}
 
// 管理员直接登录
export function loginAdminsupplier(param: adminsupplier) {
    return http({
        url: '/loginAdminsupplier',
        method: 'post',
        data: param
    })
}