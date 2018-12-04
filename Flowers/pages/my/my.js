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
                type: 'CANCEL',
                imgUrl: 'https://www.ssqushe.com/img/flower/orderstatus/1.png',
                text: '已取消'
            },
            {
                type: 'SERVICE',
                imgUrl: 'https://www.ssqushe.com/img/flower/orderstatus/2.png',
                text: '服务中'
            },
            {
                type: 'DONE',
                imgUrl: 'https://www.ssqushe.com/img/flower/orderstatus/3.png',
                text: '已完成'
            },
            {
                type: 'TEST',
                imgUrl: 'https://www.ssqushe.com/img/flower/orderstatus/4.png',
                text: '待评价'
            },
            {
                type: 'TEST2',
                imgUrl: 'https://www.ssqushe.com/img/flower/orderstatus/5.png',
                text: '售后'
            }
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