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
    server: 'https://www.ssqushe.com',
    // server: 'http://127.0.0.1:1099',
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