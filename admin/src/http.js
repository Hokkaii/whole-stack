import axios from 'axios';
import Vue from 'vue'
import router from './router'
const http = axios.create({
    baseUrl: 'http://localhost:3000/admin/api'
})
http.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '');
    }
    return config;
}, err => {
    return Promise.reject(err)
})

http.interceptors.response.use(res => {
    return res;
}, err => {
    console.log(err.response);
    if (err.response.data.message) {
        Vue.prototype.$message.error(err.response.data.message)
        if (err.response.status === 401) {
            console.log('login')
            router.push('/login')
        }
    }
    return Promise.reject(err)
})
export default http;