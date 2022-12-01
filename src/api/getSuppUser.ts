// 导入axios实例
import http from '@/http/index'
 
// 获取批号
export function getSuppUserApi() {
    return http({
        url: '/getSuppUser',
        method: 'post'
    })
}