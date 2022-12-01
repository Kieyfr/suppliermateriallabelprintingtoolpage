// 导入axios实例
import http from '@/http/index'
 
// 定义接口的传参
interface loginParam {
    suppCode: string,
    password: string
}
 
// 获取供应商名称
export function loginApi(param: loginParam) {
    return http({
        url: '/login',
        method: 'post',
        data: param,
    })
}