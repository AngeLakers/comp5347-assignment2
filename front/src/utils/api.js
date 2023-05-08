import axios from 'axios'

// eslint-disable-next-line camelcase
let my_axios = axios.create({
  baseURL: 'http://127.0.0.1:3000'
})

my_axios.interceptors.request.use(config => {
  // 如果存在token，请求携带这个token
  if (window.sessionStorage.getItem('token')) {
    config.headers['Authorization'] = window.sessionStorage.getItem('token')
  }
  return config
}, error => {
  console.log(error)
})

export const postRequest = (url, params) => {
  return my_axios({
    method: 'post',
    url: `${url}`,
    data: params
  })
}

export const putRequest = (url, params) => {
  return my_axios({
    method: 'put',
    url: `${url}`,
    data: params
  })
}

export const getRequest = (url,  params) => {
  return my_axios({
    method: 'get',
    url: `${url}`,
    data: params

  })
}

export const deleteRequest = (url, params) => {
  return my_axios({
    method: 'delete',
    url: `${url}`,
    data: params
  })
}
