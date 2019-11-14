// import { MessageBox } from 'element-ui'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

/**
 * @param {校验的字符串} str
 * @param {校验类型 'phone' 'password' 'numLetter':数字+字母, 'numForward':正整数, 'numDecimal':最多保留两位, numberDecimal:数字} type
 * @Auth zhangwei
 * @date 20181029
 */
export const validate = (str, type) => {
  let isMatch = false,
    isNum = /^[0-9]+.?[0-9]*$/, // 非负数
    isMobile = /^1[3578]\d{9}$|^147\d{8}$/,
    ispass = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/, // 6-20位字符；数字、字母、特殊字符（除空格），起码其中两种组合
    isNumAndLetter = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{2,30}$/, // 2-30位字母加数字
    isNumForward = /^[0-9]*[1-9][0-9]*$/, // 正整数
    isNumDecimal = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/, // 最多保留两位
    isDecimal = /^-?\d*\.?\d*$/ //数字

  switch (type) {
    case 'phone':
      if (isMobile.test(str)) {
        isMatch = true
      }
      break
    case 'password':
      if (ispass.test(str)) {
        isMatch = true
      }
      break
    case 'number':
      if (isNum.test(str)) {
        isMatch = true
      }
      break
    case 'numLetter':
      if (isNumAndLetter.test(str)) {
        isMatch = true
      }
      break
    case 'numForward':
      if (isNumForward.test(str)) {
        isMatch = true
      }
      break
    case 'numDecimal':
      if (isNumDecimal.test(str)) {
        isMatch = true
      }
      break
    case 'numberDecimal':
      if (isDecimal.test(str)) {
        isMatch = true
      }
      break
  }

  return isMatch
}

/**
 * 存储cookie信息并加密
 * @param {字段名} str
 * @param {值} val
 */
export const setCookieEncrypt = (str, val) => {
  let encJson1 = CryptoJS.AES.encrypt(val, process.env.VUE_APP_SALT).toString()
  let encData1 = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(encJson1)
  )
  Cookies.set(str, encData1, { expires: 7 })
}

// 获取cookie信息解密
export const getCookieDecrypt = str => {
  if (Cookies.get(str)) {
    let decData1 = CryptoJS.enc.Base64.parse(Cookies.get(str)).toString(
      CryptoJS.enc.Utf8
    )

    let decStr = CryptoJS.AES.decrypt(
      decData1,
      process.env.VUE_APP_SALT
    ).toString(CryptoJS.enc.Utf8)

    return decStr
  }
  return false
}
