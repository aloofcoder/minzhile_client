import axios from 'axios'
import router from '../router'
axios.interceptors.request.use((config) => {
    let token = window.localStorage.getItem('authorization')
    if (!token) {
        router.push('/login')
    } else {
        config.headers['authorization'] = token
    }
    return config
})
axios.interceptors.response.use((response) => {
    // 对响应数据做点什么
    if (response.headers.authorization) {
        window.localStorage.setItem('authorization', response.headers.authorization)
    }
    return response;
}, (error) => {
    // 对响应错误做点什么
    if (error.response.status === 401) {
        router.push('/login')
    }
    return Promise.reject(error);
});
const baseUrl = "minzhile"
export default {
    get (url, param = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                baseURL: baseUrl,
                params: param
            }).then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err.response.data)
            })
        })
    },
    post (url, param={}) {
      return new Promise((resolve, reject) => {
          axios.post(url, param,{
              baseURL: baseUrl
          }).then((res) => {
              resolve(res.data)
          }).catch((err) => {
              reject(err.response.data)
          })
      })
    },
    delete(url, param ={}) {
        return new Promise((resolve, reject) => {
            axios.delete(url, {
                baseURL: baseUrl,
                params: param
            }).then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err.response.data)
            })
        })
    },
    // 封装axios put 方法
    put(url, param = {}) {
        return new Promise((resolve, reject) => {
            axios.put(url, param, {
                baseURL: baseUrl
            }).then((res) => {
                resolve(res.data)
            }).catch((err) => {
                reject(err.response.data)
            })
        })
    }
}
