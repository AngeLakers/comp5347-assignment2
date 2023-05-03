import Main from './components/Main.vue'
import Vue from 'vue';
import router from './router'
import axios from 'axios';

new Vue({
    router,
    render: h => h(Main),
}).$mount('#Main')



const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // 设置基础请求 URL
    timeout: 10000, // 设置请求超时时间
    // headers: { // 设置通用的请求头
    //     'Content-Type': 'application/json',
    //     'Authorization': localStorage.getItem('token')
    // },
});
Vue.prototype.$http = axiosInstance;

axiosInstance.interceptors.request.use(
    (config) => {
        // 添加请求头等通用信息
        // config.headers.Authorization = localStorage.getItem('token');
        return config;
    },
    (error) => {
        // 处理请求错误
        return Promise.reject(error);
    }
);

axiosInstance.postRequest = function(url, params) {
    return this.$http.post(url, params, {
        headers: {
            // 'Authorization': localStorage.getItem('token')
        },
        data: params,
        url: `${url}`,
    });
};

Vue.prototype.putRequest = function(url, params) {
    return this.$http.put(url, params, {
        headers: {
            // 'Authorization': localStorage.getItem('token')
        },
        data: params,
        url: `${url}`,
    });
};

Vue.prototype.deleteRequest = function(url, params) {
    return this.$http.delete(url, {
        headers: {
            // 'Authorization': localStorage.getItem('token')
        },
        data: params,
        url: `${url}`,
    });
}
