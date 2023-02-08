/*
 * @Author: zcd66666 15168728806@163.com
 * @Date: 2022-11-28 12:29:09
 * @LastEditors: zcd66666 15168728806@163.com
 * @LastEditTime: 2023-02-04 13:08:33
 * @FilePath: \suppliermateriallabelprintingtoolpage\src\api\getMateriels.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入axios实例
import http from '@/http/index'
 
interface getMaterielsByCodeParam  {
    suppCode: string        //供应商代码
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