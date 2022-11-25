import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/material",
    name: "Material",
    component: () =>
      import("../components/Material.vue"),
  },
  
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/LoginView.vue"),
  },
  {
    path: "/header",
    name: "Header",
    component: () =>
      import("../components/Header.vue"),
  },
  {
    path: "/order",
    name: "Order",
    component: () =>
      import("../components/Order.vue"),
  },
  {
    path: "/query",
    name: "Query",
    component: () =>
      import("../components/Query.vue"),
  },
  {
    path: "/record",
    name: "Record",
    component: () =>
      import("../components/Record.vue"),
  },
  {
    path: "/word",
    name: "Word",
    component: () =>
      import("../components/Word.vue"),
  },
  {
    path: "/",
<<<<<<< HEAD
    name: "Login2",
=======
    name: "loginView",
>>>>>>> 2bc7f140e5e8e13736d1ec5380bdcf3a3fdffe63
    component: () =>
      import("../views/LoginView.vue"),
  },
  {
    path: "/index",
    name: "indexView",
    component: () =>
      import("../views/IndexView.vue"),
  },
  {
    path: '/:catchAll(.*)',  //找到所有没有的路由 正则表达
    name: 'errorView',
    component: () => 
      import( '../views/ErrorView.vue')
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
