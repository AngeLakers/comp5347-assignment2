import axios from 'axios';
export const baseURL ='http://127.0.0.1:3000'
const service = axios.create({
  baseURL:baseURL
})

service.interceptors.request.use(config => {
  const token =  window.sessionStorage.getItem('token')
  config.data = Object.assign({}, config.data)
  config.headers = {
    'Content-Type': 'application/json',
    "Authorization":token
  }
  return config
}, error => {
    return error;
})

service.interceptors.response.use(response => {
  if (response.status) {
    switch (response.data.code) {
      case 0:
        return response.data.data;
      case 401:
        break;
      case 403:
        break;
      default:
    }
  }
})
export default service
