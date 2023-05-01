import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Register from "../components/Register";
import Main from "../components/Main";
import UserPage from "../components/UserPage";


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },
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
            path: '/userPage',
            name: 'userPage',
            component: UserPage
        }
    ]
})
