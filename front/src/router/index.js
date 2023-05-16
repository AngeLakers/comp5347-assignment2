import Vue from "vue";
import Router from "vue-router";

import Layout from "../layout/index.vue";
import Login from "../components/Login";
import Register from "../components/Register";
import MainPage from "../components/MainPage";
import UserPage from "../components/UserPage";
import ForgetPassword from "../components/ForgetPassword";
import ManageList from "../components/UserPageComoponents/ManageList";

import ResetPassword from "../components/ResetPassword";
import ActiveAccount from "../components/ActiveAccount";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "goods",
      redirect: "/goods/home",
      component: Layout,
      children: [
        {
          path: "/goods/home",
          name: "home",
          component: () => import("../views/goods/home.vue")
        },
        {
          path: "/goods/list",
          name: "list",
          component: () => import("../views/goods/list.vue")
        },
        {
          path: "/goods/detail",
          name: "detail",
          component: () => import("../views/goods/detail.vue")
        },
        {
          path: "/goods/cart",
          name: "cart",
          component: () => import("../views/goods/cart.vue")
        }
      ]
    },
    // {
    //   path: "/login",
    //   name: "login",
    //   component: () => import("../views/login.vue")
    // },
    // {
    //   path: "/register",
    //   name: "register",
    //   component: () => import("../components/register.vue")
    // },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: "/mainPage",
      name: "mainPage",
      component: MainPage
    },
    {
      path: "/userPage",
      name: "userPage",
      component: UserPage
    },
    {
      path: "/forgetPassword",
      name: "forgetPassword",
      component: ForgetPassword
    },
    {
      path: "/listings/:id",
      name: "Listing1",

      component: ManageList
    },

    {
      path: "/deletelistings/:id",
      name: "ListingPhone",
      component: ManageList
    },
    {
      path: "/userPage/changePassword",
      name: "resetPassword",
      component: ResetPassword
    },
    { path: "/activecode", name: "activecode", component: ActiveAccount }
  ]
});
