Page({
    data: {
        date: new Date().toLocaleDateString(),
        orderInfo: {}
    },
    onLoad: function(options) {
        // 生命周期函数--监听页面加载
        this.setData({
            orderInfo: JSON.parse(options.orderInfo)
        })
    },
    onReady: function() {
        // 生命周期函数--监听页面初次渲染完成
        // 调取接口获取订单预约信息 入参 openId & orderId: this.data.orderInfo.id
        wx.request({
            url: 'https://URL',
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res){
                // success
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })

    },
    onShow: function() {
        // 生命周期函数--监听页面显示
    },
    onHide: function() {
        // 生命周期函数--监听页面隐藏
    },
    onUnload: function() {
        // 生命周期函数--监听页面卸载
    },
    onPullDownRefresh: function() {
        // 页面相关事件处理函数--监听用户下拉动作
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function() {
        // 用户点击右上角分享
        // return {
        //   title: 'title', // 分享标题
        //   desc: 'desc', // 分享描述
        //   path: 'path' // 分享路径
        // }
    },
    onConfirmInfo () {
        // 点击确认按钮弹出提示框
        wx.showModal({
            title: '提示',
            content: '确认订单信息无误！',
            success (res) {
                if (res.confirm) {
                    // 用户点击确认，请求接口更新订单状态
                    wx.request({
                        url: 'https://URL',
                        data: {},
                        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                        // header: {}, // 设置请求的 header
                        success: function(res){
                            // success
                        },
                        fail: function() {
                            // fail
                        },
                        complete: function() {
                            // complete
                        }
                    })
                    // 回到原页面
                    wx.navigateBack({})
                } else if (res.cancel) {
                    // 用户点击取消按钮
                }
            }
        })
    }
});
