import ajax from '../../utils/net'
let app = getApp()
let _ = {
    getConfirmOrderInfo: (data, handler) => {
      ajax.GET('/artisan/serviceinfo/order', data, handler)
    },
    confirmOrder: (data, handler) => {
      ajax.POST('/artisan/order/confirm', data, handler)
    }
}
Page({
    data: {
        date: new Date().toLocaleDateString(),
        orderInfo: {},
        orderComfirmDetail: {}
    },
    onLoad: function(options) {
        // 生命周期函数--监听页面加载
        this.setData({
          orderInfo: JSON.parse(decodeURIComponent(options.orderInfo))
        })
    },
    onShow: function() {
        // 生命周期函数--监听页面显示
        let _this = this
        app.globalData.checkSession()
        _.getConfirmOrderInfo({
            orderId: this.data.orderInfo.id
        }, {
            success: function(res) {
                res = res.data
                if (res.code === 200) {
                    _this.setData({
                        orderComfirmDetail: res.data
                    })
                }
            }
        })
    },
    onConfirmInfo () {
        // 点击确认按钮弹出提示框
        let _this = this
        wx.showModal({
            title: '提示',
            content: '确认订单信息无误！',
            success (res) {
                if (res.confirm) {
                    _.confirmOrder({
                        id: _this.data.orderInfo.id,
                        orderStatus: 'SERVICE'
                    }, {
                        success: function(res) {
                            res = res.data
                            if (res.code === 200) {
                                wx.switchTab({
                                    url: '/pages/index/index'
                                })
                            } else {
                                wx.showModal({
                                    title: '温馨提示',
                                    content: '服务异常，请稍后重试！'
                                })
                            }
                        },
                        fail: function() {
                            wx.showModal({
                                title: '温馨提示',
                                content: '服务异常，请稍后重试！'
                            })
                        }
                    })
                } 
            }
        })
    }
});
