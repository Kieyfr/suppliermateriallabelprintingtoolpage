import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    meta: {title: '登录'},
    component: () =>
      import("../views/LoginView.vue"),
      
  },
  {
    path: "/loginAdmin",
    name: "LoginAdmin",
    meta: {title: '登录'},
    component: () =>
      import("../views/LoginAdminView.vue"),
  },
  
  
  {
    path: "/",
    name: "LoginView",
    meta: {title: '登录'},
    component: () =>
      import("../views/LoginView.vue"),
      
  },
  {
    path: "/index",
    name: "indexView",
    meta: {title: '首页'},
    component: () =>
      import("../views/IndexView.vue"),
      
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach( (to,from,next)=>{                          //每次请求前都执行如下操作
  const accessToken = localStorage.getItem("accessToken")    //不是去/login路径，则先到浏览器的存储里面查找存储的’token‘的值，
  if (to.path !='/index' ){
    if (accessToken){
      return next('/index')
    }
   return next()                                              //判断要去往的链接是否是/login路径，是的话往下执行
  }
  if (!accessToken){
    return next('/')
  }                                                           //如果没有’token'对应的值，则跳往'/login'页面
  next()                                                      //如果获取到了‘token’的值，则跳往请求的页面
})

export default router;
