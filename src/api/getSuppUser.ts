// 导入axios实例
import http from '@/http/index'
 
// 获取批号
export function getSuppUserApi() {
    return http({
        url: 'http://192.168.1.106:8081/getSuppUser',
        method: 'post'
    })
}