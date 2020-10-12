import Vue from "vue";
import Router from "vue-router";

const Home = () => import("../views/home/Home");
const Category = () => import("../views/category/Category");
const Shopcart = () => import("../views/shopcart/Shopcart");
const Profile = () => import("../views/profile/Profile");

// 1. 安装插件
Vue.use(Router);

const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/shopcart",
    component: Shopcart
  },
  {
    path: "/profile",
    component: Profile
  }
];
const router = new Router({
  routes,
  mode: "history"
});

export default router;
