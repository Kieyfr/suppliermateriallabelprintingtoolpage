// 导入axios实例
import http from '@/http/index'
 
// 获取供应商名称
export function getMaterielsApi() {
    return http({
        url: 'http://localhost:8081/getMateriels',
        method: 'post'
    })
}