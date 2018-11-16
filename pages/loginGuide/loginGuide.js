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
        console.log(e.detail.encryptedData)
        console.log(e.detail.iv)
        wx.setStorageSync("userInfo", e.detail.userInfo);
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
            success: function(obj) {
              wx.setStorageSync("openid", obj.data.data.openid)
              wx.setStorageSync("sessionKey", obj.data.data.sessionKey)
              wx.navigateTo({
                url: '/pages/getPhoneNumber/getPhoneNumber'
              })
            }
          })
        }
      })
    }
});