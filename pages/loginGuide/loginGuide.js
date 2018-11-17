// pages/my/my.js
import ajax from '../../utils/net'

let _ = {
  login: (data, handler) => {
    ajax.GET('/artisan/user/login', data, handler)
  },
  sendUserInfo: (data, handler) => {
    ajax.POST('/artisan/user/save', data, handler)
  }
}

Page({
    /**
     * 点击登录按钮事件
     */
    onGotUserInfo(e) {
        // 获得最新的用户信息
        if (!e.detail.userInfo) {
          return
        }
        wx.setStorageSync("userInfo", e.detail.userInfo)
        wx.setStorageSync('encryptedData', e.detail.encryptedData)
        wx.setStorageSync('iv', e.detail.iv)
        this.login()
    },

    /**
     * 检查登录
     */
    login () {
      wx.login({
        success: res => {
          console.log(res)
          _.login({code: res.code}, {
            success: function(res) {
              res = res.data
              wx.setStorageSync("openid", res.data.openid)
              wx.setStorageSync("sessionKey", res.data.sessionKey)
              // let userInfo = wx.getStorageSync('userInfo')
              // let encryptedData = wx.getStorageSync('encryptedData')
              // let iv = wx.getStorageSync('iv')
              // userInfo.openId = res.data.openid
              // userInfo.wxSessionKey = res.data.sessionKey
              // userInfo.encrypData = encryptedData
              // userInfo.iv = iv
              // _.sendUserInfo(userInfo, {
              //   success (res) {
              //     res = res.data
              //     wx.setStorageSync('phoneNumber', res.data)
              //     wx.navigateBack({delta: 1})
              //   }
              // })
              wx.navigateTo({
                url: '/pages/getPhoneNumber/getPhoneNumber'
              })
            }
          })
        }
      })
    }
});