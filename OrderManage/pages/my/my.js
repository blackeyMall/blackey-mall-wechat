// pages/my/my.js
import ajax from '../../utils/net'
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderCount: 0,
    orderSum: 0,
    city: '',
    nickName: '',
    myScore: -1,
    friendScore: -1,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // app.globalData.checkSession()
    app.globalData.checkOpenId()

    this.setData({
      city: wx.getStorageSync('userInfo').city,
      nickName: wx.getStorageSync('userInfo').nickName,
      myScore: wx.getStorageSync('myScore'),
      friendScore: wx.getStorageSync('friendScore'),
    })
    let _this = this
    ajax.GET('/artisan/order/user', {
      openId: wx.getStorageSync('openid')
    }, {
      success: function(res) {
        res = res.data
        _this.setData({
          orderCount: res.data.orderCount,
          orderSum: res.data.orderSum
        })
      }
    })
  }
})