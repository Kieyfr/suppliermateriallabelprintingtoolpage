/*
 * @Author: zcd66666 15168728806@163.com
 * @Date: 2023-01-06 09:47:45
 * @LastEditors: zcd66666 15168728806@163.com
 * @LastEditTime: 2023-02-20 11:20:36
 * @FilePath: \suppliermateriallabelprintingtoolpage\src\http\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
// 创建一个 axios 实例
import { ElMessage } from 'element-plus'
function setBaseURL(){
    let baseURL="";
    if (process.env.NODE_ENV === 'production') {
        baseURL='/api/'
      } else {
        baseURL='http://192.168.44.64:18990'
      }
      return baseURL
}
const service = axios.create({
    baseURL: setBaseURL(), // 所有的请求地址前缀部分，可以放域名
    timeout: 60000, // 请求超时时间毫秒
    withCredentials: false, // 异步请求携带cookie
    headers: {
        // 设置后端需要的传参类型
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

declare module "axios" {
    interface AxiosResponse<T = any> {
        state: string;
        msg: string;
        data: T
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
  }
// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        config.headers!['accessToken'] = localStorage.getItem('accessToken')
        return config
    },
    function (error) {
        // 对请求错误做些什么
        console.log(error)
        // ElMessage.error('请求地址有误')
        return Promise.reject(error)
    }
)
// 添加响应拦截器
service.interceptors.response.use(
    function (response) {
        const data = response.data
        return data
    },
    function (error) {
        console.log(error)
        // ElMessage.error('签名无效或者已过期，请重新登录')
        return Promise.reject(error)
    }
)
export default service