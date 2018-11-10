import ajax from '../../utils/net'
let app = getApp()

Page({
  data: {
    // 幻灯片 - 列表
    imgUrls: [],
    // 幻灯片选项 - 开始
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    indicatorDots: "rgba(255, 255, 255, .5)",
    indicatorActiveColor: '#4454cd',
    // 幻灯片选项 - 结束
    // 订单列表
    orderList: []
  },
  onShow () {
    app.globalData.checkSession()
    this.setData({
      orderList: []
    })
    let _this = this
    _.getSwiper({
      currPage: '1',
      pageSize: '1'
    }, {
      success: function(res) {
        res = res.data
        _this.setData({
          imgUrls: res.data.list
        })
      }
    })
    _.getOrderList({
      openId: wx.getStorageSync('openid')
    }, {
      success: function(res) {
        // let orderList = res.data.data
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
            orderList
          })
        }
      }
    })
  },
  // 拨打电话
  onMakePhoneCall () {
    wx.makePhoneCall({
      phoneNumber: '12344442222'
    })
  },

  onRedirectDetail (e) {
    // 幻灯片跳转预留接口
  },

  onSwitchOrderCenter () {
    wx.switchTab({
      url: '/pages/orderCenter/orderCenter'
    })
  }
})


let _ = {
  getSwiper: (data, handler) => {
    ajax.GET('/artisan/advertis/list/page', data, handler)
  },
  getOrderList: (data, handler) => {
    ajax.POST('/artisan/order/main/order', data, handler)
  }
}