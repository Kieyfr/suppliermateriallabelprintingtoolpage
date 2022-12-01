import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/LoginView.vue"),
  },
  
  {
    path: "/",
    name: "LoginView",
    component: () =>
      import("../views/LoginView.vue"),
  },
  {
    path: "/index",
    name: "indexView",
    component: () =>
      import("../views/IndexView.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
