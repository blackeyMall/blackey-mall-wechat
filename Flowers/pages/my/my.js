// 获取应用程序实例
let app = getApp();

// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        categoryList: [
            {
                type: 1,
                imgUrl: '../../images/orderstatus/1.png',
                text: '待付款'
            },
            {
                type: 2,
                imgUrl: '../../images/orderstatus/2.png',
                text: '服务中'
            },
            {
                type: 3,
                imgUrl: '../../images/orderstatus/3.png',
                text: '已完成'
            },
            {
                type: 4,
                imgUrl: '../../images/orderstatus/4.png',
                text: '待评价'
            },
            {
                type: 5,
                imgUrl: '../../images/orderstatus/5.png',
                text: '售后'
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        let userInfo = wx.getStorageSync('userInfo');
        if (userInfo) {
            this.setData({
                userInfo
            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // 检索登录状态
        app.globalData.onCheckLoginStatus();
    },

    bindRedirect (e) {
        wx.navigateTo({
            url: `/pages/list/list?type=${e.currentTarget.dataset.type}`
        })
    }
})