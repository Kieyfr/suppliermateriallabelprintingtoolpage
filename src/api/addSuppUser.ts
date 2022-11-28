// 导入axios实例
import http from '@/http/index'

interface addSuppUserParam  {
    CODE: string,             //供应商代码
    NAME: string,             //供应商名称
    SHORTNAME: string, //供应商简称
    PWD: string, //供应商密码
}
 
// 获取批号
export function addSuppUserApi(param: addSuppUserParam) {
    return http({
        url: 'http://192.168.1.106:8081/addSuppUser',
        method: 'post',
        data: param
    })
}