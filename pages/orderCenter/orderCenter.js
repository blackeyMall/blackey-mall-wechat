// pages/order/order.js
import ajax from '../../utils/net'
let app = getApp()

Page({

  properties: {
    type: Number
  },

  /**
   * 页面的初始数据
   */
  data: {
    navList: [{
      orderCategoryName: '全部',
      orderStatus: 'DEFAULT'
    }, {
      orderCategoryName: '预约中',
      orderStatus: 'BOOK'
    }, {
      orderCategoryName: '确认中',
      orderStatus: 'CONFIRM'
    }, {
      orderCategoryName: '服务中',
      orderStatus: 'SERVICE'
    }, {
      orderCategoryName: '已完成',
      orderStatus: 'DONE'
    }],
    activeItem: 'DEFAULT',
    current: 1,
    size: 5,
    orderList: []
  },

  onChangeNav (e) {
    let current = e.currentTarget.dataset.status
    if (this.data.activeItem !== current) {
      this.setData({
        activeItem: current,
        orderList: []
      })
      this.onLoadData(1)
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.checkSession()
    this.setData({
      orderList: [],
      activeItem: 'DEFAULT'
    })
    this.onLoadData(this.data.current)
  },

  onLoadData (page, isHideLoading) {
    let _this = this
    ajax.POST('/artisan/order/list', {
      openId: wx.getStorageSync('openid'),
      orderStatus: this.data.activeItem,
      current: page,
      size: this.data.size
    }, {
      success: function(res) {
        res = res.data
        if (res.code === 200) {
          let orderList = []
          res.data.records.forEach(el => {
            let { orderStatus, ...temp } = el;
            if (orderStatus.name === '预约中') {
                orderStatus.statusClass = "info";
            } else if (orderStatus.name === '确认中') {
                orderStatus.statusClass = "danger";
            } else if (orderStatus.name === '服务中') {
                orderStatus.statusClass = "primary";
            } else if (orderStatus.name === '已完成') {
                orderStatus.statusClass = "success";
            }
            temp.orderStatus = orderStatus
            orderList.push(temp);
          });
          _this.setData({
            orderList: _this.data.orderList.concat(orderList),
            current: res.data.current
          })
        }
      }
    })
    if (isHideLoading) {
      wx.hideLoading()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 显示加载图标
    wx.showLoading({
      title: '加载中...',
    })
    this.onLoadData(this.data.current + 1, 1)
  }
})