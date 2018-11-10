// pages/service/service.js
import ajax from '../../utils/net'
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceList: [],
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.checkSession()
    let _this = this
    ajax.GET('/artisan/project/list/page', {}, {
      success: function(res) {
        res = res.data
        _this.setData({
          serviceList: res.data.list
        })
      }
    })
  },

  /**
   * 点击服务项目跳转至预约服务页
   */
  handleReservation (el) {
    wx.navigateTo({
      url: '/pages/reservation/reservation?serviceItem=' + JSON.stringify(el.currentTarget.dataset)
  })
  }
})