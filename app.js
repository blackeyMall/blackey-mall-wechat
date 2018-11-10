//app.js
App({
  onLaunch: function () {
    wx.checkSession({
      fail: err => {
        wx.navigateTo({
          url: '/pages/loginGuide/loginGuide'
        })
      }
    })
  },
  globalData: {
    // server: 'https://www.ssqushe.com'
    server: 'http://192.168.1.104:1099/',
    checkSession () {
      wx.checkSession({
        fail: err => {
          wx.navigateTo({
            url: '/pages/loginGuide/loginGuide'
          })
        }
      })
    }
  }
})