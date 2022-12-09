// 导入axios实例
import http from '@/http/index'


 
// 获取登录的供应商信息
export function getSuppUserApi() {
    return http({
        url: '/getSuppUser',
        method: 'post'
    })
}