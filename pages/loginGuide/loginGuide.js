// pages/my/my.js
import ajax from '../../utils/net'

Page({
    /**
     * 点击登录按钮事件
     */
    onGotUserInfo(e) {
        // 获得最新的用户信息
        if (!e.detail.userInfo) {
          return
        }
        wx.setStorageSync("userInfo", e.detail.userInfo);
        this.checkSessionAndLogin()
    },

    /**
     * 检查登录
     */
    checkSessionAndLogin () {
      let _this = this
      let thisOpenId = wx.getStorageSync('openid')
      if (thisOpenId) {
        wx.checkSession({
          success () {
            wx.navigateBack({})
          },
          fail () {
            wx.removeStorageSync('openid')
            _this.checkSessionAndLogin()
          }
        })
      } else {
        _this.loginAndGetOpenid()
      }
    },
    loginAndGetOpenid () {
      let _this = this
      // 登录
      wx.login({
        success: res => {
          _.login({code: res.code}, {
            success: function(obj) {
              wx.setStorageSync("openid", obj.data.data.openid)
              wx.setStorageSync("sessionKey", obj.data.data.sessionKey)
              _this.sendUserInfoToServer()
            }
          })
        }
      })
    },
    sendUserInfoToServer () {
      let userInfo = wx.getStorageSync('userInfo')
      let thisOpenId = wx.getStorageSync('openid')
      userInfo.openId =thisOpenId
      _.sendUserInfo(userInfo, {
        success: function(res) {
          wx.navigateBack({delta: 1})
        }
      })
    }
});

let _ = {
  login: (data, handler) => {
    ajax.GET('/artisan/user/login', data, handler)
  },
  sendUserInfo: (data, handler) => {
    ajax.POST('/artisan/user/save', data, handler)
  }
}