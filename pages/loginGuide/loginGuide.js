// pages/my/my.js
Page({
    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},

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
          console.log(res.code)
          wx.request({
            url: 'https://www.ssqushe.com/artisan/user/login',
            data: {
              code: res.code
            },
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (obj) {
              wx.setStorageSync("openid", obj.data.data.openid)
              wx.setStorageSync("sessionKey", obj.data.data.sessionKey)
              console.log(res)
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      })
    },
    sendUserInfoToServer () {
      let userInfo = wx.getStorageSync('userInfo')
      let thisOpenId = wx.getStorageSync('openid')
      userInfo.openid =thisOpenId
      wx.request({
        url: 'http://www.baidu.com',
        data: userInfo,
        dataType: 'json',
        method: 'POST',
        success: function(res){
          res = res.data
          if (res.code === 0) {
            wx.navigateBack({})
          } else {
            wx.showModal({
              title: 'Sorry',
              content: '同步信息出错~',
            })
          }
        }
      })
    }
});
