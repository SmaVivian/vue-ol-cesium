import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: '/singleMuseum', // api 的 base_url
  // baseURL: '/vivi', // api 的 base_url
  // baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.state.user.userid) {
      config.headers['token'] = store.state.user.token // 让每个请求携带自定义userId 请根据实际情况自行修改
    }
    // 添加时间戳
    if (
      config.method === 'post' &&
      Object.prototype.toString.call(config.data) !== '[object FormData]'
    ) {
      // config.data = {
      //   ...config.data,
      //   _t: Date.parse(new Date()) / 1000
      // }
    } else if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data

    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm(
    //       '你已被登出，可以取消继续留在该页面，或者重新登录',
    //       '确定登出',
    //       {
    //         confirmButtonText: '重新登录',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //       }
    //     ).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload() // 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   return Promise.reject('error')
    // } else {
    //   return response.data
    // }

    return res
  },
  error => {
    if (error.response.status === 999) {
      MessageBox.alert('', '登录超时，请重新登录', {
        confirmButtonText: '确定',
        callback: () => {
          store.dispatch('LoginOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

const request = {
  base: config => {
    return service.request(config)
  },
  get: (url, params) => {
    return service.get(url, { params: params })
  },
  post: (url, params) => {
    return service.post(url, params)
  }
}

export default request
