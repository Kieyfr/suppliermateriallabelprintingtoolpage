// 导入axios实例
import http from '@/http/index'



//重置供应商密码为供应商代码
export function resetPWDApi(SUPPCODE:string) {
    return http({
        url: '/resetPWD',
        method: 'post',
        data: {SUPPCODE}
    })
}