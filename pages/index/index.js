//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    orderList: [],
    mockOrderList: [{
      orderId: 'order20181027088231',
      imgUrl: '../../lib/images/order/item1.png',
      title: '欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具',
      des: '欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具',
      price: 9999.64,
      count: 3,
      status: 0
    }, {
      orderId: 'order20181027088232',
      imgUrl: '../../lib/images/order/item2.png',
      title: '欧式沙发',
      des: '厨房餐具',
      price: 9999.64,
      count: 3,
      status: 1
    }, {
      orderId: 'order20181027088233',
      imgUrl: '../../lib/images/order/item3.png',
      title: '欧式沙发2',
      des: '欧式沙发2',
      price: 9999.64,
      count: 3,
      status: 2
    }, {
      orderId: 'order20181027088234',
      imgUrl: '../../lib/images/order/item4.png',
      title: '欧式沙发3',
      des: '欧式沙发3',
      price: 9999.64,
      count: 3,
      status: 3
    }, {
      orderId: 'order20181027088235',
      imgUrl: '../../lib/images/order/item1.png',
      title: '欧式沙发4',
      des: '欧式沙发4',
      price: 9999.64,
      count: 3,
      status: 4
    }],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    indicatorDots: "rgba(255, 255, 255, .5)",
    indicatorActiveColor: '#4454cd'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    let orderList = []
    this.data.mockOrderList.forEach(el => {
      let {status, ...temp} = el
      if (status === 0) {
        temp.status = '待付款'
        temp.statusClass = 'info'
      } else if (status === 1) {
        temp.status = '已付款'
        temp.statusClass = 'primary'
      } else if (status === 2) {
        temp.status = '配送中'
        temp.statusClass = 'warning'
      } else if (status === 3) {
        temp.status = '订单完成'
        temp.statusClass = 'success'
      } else if (status === 4) {
        temp.status = '订单关闭'
        temp.statusClass = 'danger'
      }
      orderList.push(temp)
    });
    this.setData({
      orderList
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})


// //index.js
// //获取应用实例
// const app = getApp()

// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
