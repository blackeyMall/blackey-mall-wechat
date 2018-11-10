let app = getApp()
Page({
    data:{
        orderInfo: {}
    },
    onLoad:function(options){
        // 生命周期函数--监听页面加载
        this.setData({
            orderInfo: JSON.parse(options.orderInfo)
        })
    },
    onShow:function(){
        // 生命周期函数--监听页面显示
        app.globalData.checkSession()
    },

    // 跳转服务进度页
    orderDetailList (e) {
        wx.navigateTo({
            url: `/pages/orderDetailList/orderDetailList?orderInfo=${JSON.stringify(this.data.orderInfo)}&type=${e.currentTarget.dataset.type}`
        })
    },
    // 跳转服务反馈页
    onFeedBack (e) {
        wx.navigateTo({
            url: `/pages/feedback/feedback?orderInfo=${JSON.stringify(e.currentTarget.dataset)}`
        })
    }
})