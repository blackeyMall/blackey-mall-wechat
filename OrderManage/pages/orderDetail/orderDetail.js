let app = getApp()
Page({
    data:{
        orderInfo: {}
    },
    onLoad:function(options){
        // 生命周期函数--监听页面加载
        this.setData({
          orderInfo: JSON.parse(decodeURIComponent(options.orderInfo))
        })
    },
    onShow:function(){
        // 生命周期函数--监听页面显示
        // app.globalData.checkSession()
        app.globalData.checkOpenId()
    },

    // 跳转服务进度页
    orderDetailList (e) {
        wx.navigateTo({
          url: `/pages/orderDetailList/orderDetailList?orderInfo=${encodeURIComponent(JSON.stringify(this.data.orderInfo))}&type=${encodeURIComponent(e.currentTarget.dataset.type)}`
        })
    },
    // 跳转服务反馈页
    onFeedBack (e) {
        if (!e.currentTarget.dataset.type && this.data.orderInfo.statusname === '已完成') {
            wx.showToast({
                title: '订单已评论，请在我的评论列表查看！',
                icon: 'none'
            });
            return;
        }
        wx.navigateTo({
          url: `/pages/feedback/feedback?orderInfo=${encodeURIComponent(JSON.stringify(e.currentTarget.dataset))}`
        })
    }
})