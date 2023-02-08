/*
 * @Author: zcd66666 15168728806@163.com
 * @Date: 2023-02-04 13:08:02
 * @LastEditors: zcd66666 15168728806@163.com
 * @LastEditTime: 2023-02-04 13:09:43
 * @FilePath: \suppliermateriallabelprintingtoolpage\src\api\getMateriel.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 导入axios实例
import http from '@/http/index'
 

interface getMaterielParam {
    suppCode: string,
    materCode:string
}


// 根据供应商代码获取物料信息列表
export function getMaterielApi(param:getMaterielParam) {
    return http({
        url: '/getMateriel',
        method: 'post',
        data: param
    })
}