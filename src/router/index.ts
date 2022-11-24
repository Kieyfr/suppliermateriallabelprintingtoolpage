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
    path: "/frame",
    name: "Frame",
    component: () =>
      import("../components/Frame.vue"),
  },
  {
    path: "/header",
    name: "Header",
    component: () =>
      import("../components/Header.vue"),
  },
  {
    path: "/menu",
    name: "Menu",
    component: () =>
      import("../components/Menu.vue"),
  },
  {
    path: "/order",
    name: "Order",
    component: () =>
      import("../components/Order.vue"),
  },
  {
    path: "/record",
    name: "Record",
    component: () =>
      import("../components/Record.vue"),
  },
  {
    path: "/print",
    name: "Print",
    component: () =>
      import("../components/Print.vue"),
  },
  {
    path: "/",
    name: "Login2",
    component: () =>
      import("../views/LoginView.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import("../views/HomeView.vue"),
  },
  {
    path: '/:catchAll(.*)',  //找到所有没有的路由 正则表达
    name: '404',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/404.vue')
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
