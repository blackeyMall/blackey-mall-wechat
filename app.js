//app.js
App({
  onLaunch: function () {
    // wx.checkSession({
    //   fail: err => {
    //     wx.navigateTo({
    //       url: '/pages/loginGuide/loginGuide'
    //     })
    //   }
    // })
    // let openid = wx.getStorageSync('openid')
    // if (!openid) {
    //   wx.navigateTo({
    //     url: '/pages/loginGuide/loginGuide'
    //   })
    // }
    this.globalData.checkOpenId()
  },
  globalData: {
    server: 'https://www.ssqushe.com',
    // server: 'http://192.168.1.104:1099/',
    checkSession () {
      wx.checkSession({
        fail: err => {
          wx.clearStorageSync()
          wx.navigateTo({
            url: '/pages/loginGuide/loginGuide'
          })
        }
      })
    },
    checkOpenId () {
      let openid = wx.getStorageSync('openid')
      if (!openid) {
        wx.navigateTo({
          url: '/pages/loginGuide/loginGuide'
        })
      }
    }
  }
})