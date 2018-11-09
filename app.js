//app.js
App({
  onLaunch: function () {
    wx.checkSession({
      fail: err => {
        console.log(err)
        wx.navigateTo({
          url: '/pages/loginGuide/loginGuide'
        })
      }
    })

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        wx.request({
          url: 'https://www.ssqushe.com/artisan/user/login',
          data: {
            code : res.code
          },
          header: {},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(obj) {
            wx.setStorageSync("openid", obj.data.data.openid)
            wx.setStorageSync("sessionKey", obj.data.data.sessionKey)
            console.log(res)
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})

//接口请求
let request = {
  login: (data, frequestHandler) => {
    http.GET("/artisan/user/login", data, frequestHandler)
  }
}