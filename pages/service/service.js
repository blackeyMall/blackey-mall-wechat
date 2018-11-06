// pages/service/service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [{
      id: '1',
      imgUrl: '../../lib/images/item/item-1.png',
      type: 0,
      title: '水电'
    }, {
      id: '2',
      imgUrl: '../../lib/images/item/item-2.png',
      type: 1,
      title: '木式'
    }, {
      id: '3',
      imgUrl: '../../lib/images/item/item-3.png',
      type: 2,
      title: '瓦工'
    }, {
      id: '4',
      imgUrl: '../../lib/images/item/item-4.png',
      type: 3,
      title: '裁缝'
    }, {
      id: '5',
      imgUrl: '../../lib/images/item/item-5.png',
      type: 4,
      title: '保洁'
    }, {
      id: '6',
      imgUrl: '../../lib/images/item/item-6.png',
      type: 5,
      title: '折旧'
    }, {
      id: '7',
      imgUrl: '../../lib/images/item/item-7.png',
      type: 6,
      title: '杂工'
    }, {
      id: '8',
      imgUrl: '../../lib/images/item/item-8.png',
      type: 7,
      title: '水电'
    }, {
      id: '9',
      imgUrl: '../../lib/images/item/item-9.png',
      type: 8,
      title: '保洁'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.checkSession({
      fail: err => {
        console.log(err)
        wx.navigateTo({
          url: '/pages/loginGuide/loginGuide'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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