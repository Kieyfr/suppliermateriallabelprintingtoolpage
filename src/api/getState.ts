// 导入axios实例
import http from '@/http/index'
 




// 获取登录state信息
export function getStateApi() {
    return http({
        url: '/getState',
        method: 'post',
    })
}


