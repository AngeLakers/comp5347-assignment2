import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Register from "../components/Register";
import MainPage from "../components/MainPage";
import UserPage from "../components/UserPage";
import ForgetPassword from "../components/ForgetPassword";
import ManageList from "../components/UserPageComoponents/ManageList";

import ResetPassword from "../components/ResetPassword";
import ActiveAccount from "../components/ActiveAccount";
import Home from "../components/Home.vue";
import Search from "../components/Search.vue";
import shop from "../components/Shop.vue";

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
    },

    {
      path: '/listings/:id',
      name: 'Listing1',

      component: ManageList
    },

    {
      path: '/deletelistings/:id',
      name: 'ListingPhone',

      component: ManageList

    },

    {path: '/userPage/changePassword',
      name: 'resetPassword',
      component: ResetPassword},

    {path: '/activecode',
      name: 'activecode',
      component: ActiveAccount


    },

    {
      path: '/home',
      name: 'home',
      component: Home
    },

    {
      path: '/search',
      name: 'search',
      component: Search
    },

    {
      path: '/shop',
      name: 'shop',
      component: shop
    },


  ]
})
