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
    // ------------------------------
    // -   首页取消订单列表相关逻辑     -
    // ------------------------------
    // 订单列表
    // orderList: [],
    showModal: false,
    telNum: '',
    serviceList: [],
    pickerIndex: 0,
    pickerArray: ['请选择', '水电', '瓦工', '木工', '保洁']
  },
  onShow () {
    let _this = this;
    if (app.globalData.checkOpenId()) {
      // 好友关系绑定
      // --
      // ----------

      _.findNumber({
        openid: wx.getStorageSync('openid')
      }, {
        success: function(res) {
          res = res.data
          if (res.data.telephone) {
            _this.setData({
              showModal: false
            });
            wx.setStorageSync('phoneNumber', res.data.telephone);
          } else {
            _this.setData({
              showModal: true
            })
            return
          }
        }
      });
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
      });
      _.getServiceList({}, {
        success: function(res) {
          res = res.data
          _this.setData({
            serviceList: res.data.list
          })
        }
      });
    }
    // let _this = this
    // let openid = wx.getStorageSync('openid')
    // if (!openid) {
    //   wx.navigateTo({
    //     url: '/pages/loginGuide/loginGuide'
    //   })
    //   return
    // } else {
    //   let phoneNumber = wx.getStorageSync('phoneNumber')
    //   if (phoneNumber && phoneNumber !== '') {
    //     _this.setData({
    //       showModal: false
    //     })
    //   } else {
    //     _this.setData({
    //       showModal: true
    //     })
    //     // -----------------------------------
    //     // -   取消获取微信绑定手机号相关逻辑     -
    //     // -----------------------------------
    //     _.findNumber({
    //       openid: wx.getStorageSync('openid')
    //     }, {
    //       success: function(res) {
    //         res = res.data
    //         if (res.data.telephone) {
    //           _this.setData({
    //             showModal: false
    //           })
    //         } else {
    //           _this.setData({
    //             showModal: true
    //           })
    //           return
    //         }
    //       }
    //     })
    //   }
    // }
    // // ------------------------------
    // // -   首页取消订单列表相关逻辑     -
    // // ------------------------------
    // // this.setData({
    // //   orderList: []
    // // })
    // _.getSwiper({
    //   currPage: '1',
    //   pageSize: '1'
    // }, {
    //   success: function(res) {
    //     res = res.data
    //     _this.setData({
    //       imgUrls: res.data.list
    //     })
    //   }
    // })
    // _.getServiceList({}, {
    //   success: function(res) {
    //     res = res.data
    //     _this.setData({
    //       serviceList: res.data.list
    //     })
    //   }
    // })
    // ------------------------------
    // -   首页取消订单列表相关逻辑     -
    // ------------------------------
    // _.getOrderList({
    //   openId: wx.getStorageSync('openid')
    // }, {
    //   success: function(res) {
    //     // let orderList = res.data.data
    //     res = res.data
    //     if (res.code === 200) {
    //       let orderList = []
    //       res.data.records.forEach(el => {
    //           let { orderStatus, ...temp } = el;
    //           if (orderStatus.name === '预约中') {
    //               orderStatus.statusClass = "info";
    //           } else if (orderStatus.name === '确认中') {
    //               orderStatus.statusClass = "danger";
    //           } else if (orderStatus.name === '服务中') {
    //               orderStatus.statusClass = "primary";
    //           } else if (orderStatus.name === '已完成') {
    //               orderStatus.statusClass = "success";
    //           }
    //           temp.orderStatus = orderStatus
    //           orderList.push(temp);
    //       });
    //       _this.setData({
    //         orderList
    //       })
    //     }
    //   }
    // })
  },
  // 拨打电话
  onMakePhoneCall () {
    wx.makePhoneCall({
      phoneNumber: '15221127738'
    })
  },

  onRedirectDetail (e) {
    // 幻灯片跳转预留接口
  },

  onSwitchOrderCenter () {
    wx.switchTab({
      url: '/pages/orderCenter/orderCenter'
    })
  },

  onUpdatePhoneNumber () {
    let _this = this
    if (this.data.telNum === '') {
      wx.showModal({
        title: '温馨提示',
        content: '手机号不能为空',
        showCancel: false
      })
    } else if (this.data.telNum.length !== 11) {
      wx.showModal({
        title: '温馨提示',
        content: '请输入正确的手机号',
        showCancel: false
      })
    } else {
      _.sendUserInfo({
        openId: wx.getStorageSync('openid'),
        telephone: this.data.telNum,
        // role: this.data.pickerIndex, // 角色索引
        role: this.data.pickerArray[this.data.pickerIndex] // 角色中文
      }, {
        success: function (res) {
          res = res.data
          if (res.data) {
            wx.setStorageSync('phoneNumber', res.data)
            _this.setData({
              showModal: false
            })
          }
        }
      })
    } 
    // else if (parseInt(this.data.pickerIndex) === 0) {
    //   wx.showModal({
    //     title: '温馨提示',
    //     content: '请选择角色',
    //     showCancel: false
    //   })
    // }
  },

  bindNumberInput (e) {
    this.setData({
      telNum: e.detail.value
    })
    console.log(this.data.telNum)
  },

  /**
   * 点击服务项目跳转至预约服务页
   */
  handleReservation (el) {
    wx.navigateTo({
      url: '/pages/reservation/reservation?serviceItem=' + encodeURIComponent(JSON.stringify(el.currentTarget.dataset))
    })
  },

  bindPickerChange(e) {
    this.setData({
      pickerIndex: parseInt(e.detail.value)
    })
  },

  onShareAppMessage () {
    let openId = wx.getStorageSync('openid');
    return {
      title: '好匠工',
      path: '/page/index/index?openid=' + openId,
      desc: '测试测试',
      imageUrl: '../../lib/images/logo.jpg'
    }
  }
})


let _ = {
  getSwiper: (data, handler) => {
    ajax.GET('/artisan/advertis/list/page', data, handler)
  },
  getOrderList: (data, handler) => {
    ajax.POST('/artisan/order/main/order', data, handler)
  },
  findNumber: (data, handler) => {
    ajax.GET('/artisan/user/find/openid', data, handler)
  },
  sendUserInfo: (data, handler) => {
    ajax.POST('/artisan/user/save', data, handler)
  },
  getServiceList: (data, handler) => {
    ajax.GET('/artisan/project/list/page', data, handler)
  }
}