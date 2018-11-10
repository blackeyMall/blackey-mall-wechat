import ajax from "../../utils/net";
let app = getApp()
Page({
    data: {
        date: new Date().toLocaleDateString(),
        orderInfo: {},
        des: ''
    },
    onLoad: function(options) {
        // 生命周期函数--监听页面加载
        app.globalData.checkSession()
        this.setData({
            orderInfo: JSON.parse(options.orderInfo)
        })
    },
    bindDesChange (e) {
        this.setData({
            des: e.detail.value
        })
    },
    onFeedBack () {
        let _this = this
        if (this.data.des !== '') {
            ajax.POST('/artisan/feedback/save', {
                openId: wx.getStorageSync('openid'),
                content: _this.data.des,
                orderId: _this.data.orderInfo.id,
                feedBackType: _this.data.orderInfo.statusname === '服务中' ? 'BYUSER' : 'AFTERSALES'
            }, {
                success: function(res) {
                    res = res.data
                    if (res.code === 200) {
                        wx.showModal({
                            title: '温馨提示',
                            content: '反馈成功，请等待客服联系！',
                            showCancel: false,
                            success: function() {
                                wx.navigateBack({
                                    delta: 1
                                })
                            }
                        })
                    }
                }
            })
        }
    }
});
