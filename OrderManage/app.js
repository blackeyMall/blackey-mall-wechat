//app.js
App({
  onLaunch: function () {
    
  },
  globalData: {
    // server: 'https://www.ssqushe.com',
    server: 'http://192.168.1.113:1099',
    checkOpenId () {
      let openid = wx.getStorageSync('openid')
      if (!openid) {
        wx.navigateTo({
          url: '/pages/loginGuide/loginGuide'
        });
        return false;
      }
      return true;
    }
  }
})