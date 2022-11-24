import axios from 'axios'
// 创建一个 axios 实例
const service = axios.create({
    baseURL: '/api', // 所有的请求地址前缀部分
    timeout: 60000, // 请求超时时间毫秒
    withCredentials: false, // 异步请求携带cookie
    headers: {
        // 设置后端需要的传参类型
        'Content-Type': 'application/x-www-form-urlencoded',
        'accessToken': localStorage.getItem("accessToken"),
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
        return config
    },
    function (error) {
        // 对请求错误做些什么
        console.log(error)
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
        return Promise.reject(error)
    }
)
export default service