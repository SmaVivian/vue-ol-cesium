// import Cookies from 'js-cookie'
// import CryptoJS from 'crypto-js'

const user = {
  state: {
    token: '',
    userid: '',
    userName: '',
    headImg: '',
    phone: ''
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      if (userInfo) {
        state.token = userInfo.token
        state.userid = userInfo.userid
        state.userName = userInfo.userName
        state.headImg = userInfo.headImg
        state.phone = userInfo.phone
      } else {
        state.token = ''
        state.userid = ''
        state.userName = ''
        state.headImg = ''
        state.phone = ''
      }
    },
    SET_USER_PHONE(state, val) {
      state.phone = val
    }
  },
  actions: {
    setUserIfo({ commit }, info) {
      commit('SET_USER_INFO', info)
    },
    // 用户名登录
    LoginUser({ commit }, userInfo) {
      // return new Promise((resolve, reject) => {
      //   this._vm.$http.post('/login/webLogin', userInfo).then(
      //     res => {
      //       if (res.success) {
      //         let data = res.result
      //         commit('SET_USER_PHONE', data.phone)
      //         commit('SET_USER_INFO', {
      //           token: data.token,
      //           userid: data.userId,
      //           userName: data.nickName,
      //           headImg: data.image,
      //           phone: data.phone
      //         })
      //         Cookies.set('token', data.token, { expires: 7 })
      //         // Cookies.set('userid', data.userId, { expires: 7 })
      //         //加密数据
      //         let encJson1 = CryptoJS.AES.encrypt(
      //           data.userId,
      //           process.env.VUE_APP_SALT
      //         ).toString()
      //         //对加密数据进行base64处理, 原理：就是先将字符串转换为utf8字符数组，再转换为base64数据
      //         let encData1 = CryptoJS.enc.Base64.stringify(
      //           CryptoJS.enc.Utf8.parse(encJson1)
      //         )
      //         Cookies.set('userid', encData1, { expires: 7 })
      //         //加密数据
      //         let encJson2 = CryptoJS.AES.encrypt(
      //           data.nickName,
      //           process.env.VUE_APP_SALT
      //         ).toString()
      //         //对加密数据进行base64处理, 原理：就是先将字符串转换为utf8字符数组，再转换为base64数据
      //         let encData2 = CryptoJS.enc.Base64.stringify(
      //           CryptoJS.enc.Utf8.parse(encJson2)
      //         )
      //         // debugger
      //         Cookies.set('userName', encData2, { expires: 7 })
      //         Cookies.set('headImg', data.image, { expires: 7 })
      //         //加密数据
      //         let encJson3 = CryptoJS.AES.encrypt(
      //           data.phone,
      //           process.env.VUE_APP_SALT
      //         ).toString()
      //         //对加密数据进行base64处理, 原理：就是先将字符串转换为utf8字符数组，再转换为base64数据
      //         let encData3 = CryptoJS.enc.Base64.stringify(
      //           CryptoJS.enc.Utf8.parse(encJson3)
      //         )
      //         Cookies.set('phone', encData3, { expires: 7 })
      //         resolve()
      //       } else {
      //         // this._vm.$message.error(res.message)
      //         reject(res.message)
      //       }
      //     },
      //     error => {
      //       this._vm.$message.error(error.msg || '服务器异常')
      //     }
      //   )
      // })
    },
    LoginOut({ commit }) {
      commit('SET_USER_INFO', '')
      Cookies.remove('userid')
    }
  }
}

export default user
