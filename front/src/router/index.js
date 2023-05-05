import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Register from "../components/Register";
import MainPage from "../components/MainPage";
import UserPage from "../components/UserPage";
import ForgetPassword from "../components/ForgetPassword";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/mainPage',
      name: 'mainPage',
      component: MainPage
    },
    {
      path: '/userPage',
      name: 'userPage',
      component: UserPage
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: ForgetPassword
    }

  ]
})
