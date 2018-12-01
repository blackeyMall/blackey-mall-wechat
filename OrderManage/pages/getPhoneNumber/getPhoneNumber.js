// pages/my/my.js
import ajax from '../../utils/net'
let _ = {
  sendUserInfo: (data, handler) => {
    ajax.POST('/artisan/user/save', data, handler)
  }
}

Page({
    /**
     * 点击登录按钮事件
     */
    onGotPhoneNumber(e) {
        // 获得用户手机号
        console.log(e)
        if (!e.detail.encryptedData) {
          return
        }
        // 直接发送数据及手机号加密信息
        let userInfo = wx.getStorageSync('userInfo')
        let thisOpenId = wx.getStorageSync('openid')
        let wxSessionKey = wx.getStorageSync('sessionKey')
        userInfo.openId =thisOpenId
        userInfo.encrypData = e.detail.encryptedData
        userInfo.iv = e.detail.iv
        userInfo.wxSessionKey = wxSessionKey
        _.sendUserInfo(userInfo, {
          success (res) {
            res = res.data
            wx.setStorageSync('phoneNumber', res.data)
            wx.navigateBack({delta: 2})
          }
        })
    }
});