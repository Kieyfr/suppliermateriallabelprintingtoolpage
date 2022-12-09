// 导入axios实例
import http from '@/http/index'
 
interface getMaterielsByCodeParam  {
    uppCode: string        //供应商代码
}

// 获取物料信息列表
export function getMaterielsApi() {
    return http({
        url: '/getMateriels',
        method: 'post'
    })
}

// 根据供应商代码获取物料信息列表
export function getMaterielsByCodeApi(param:getMaterielsByCodeParam) {
    return http({
        url: '/getMaterielsByCode',
        method: 'post',
        data: param
    })
}