// pages/releaseInfo/releaseInfo.js
import ajax from "../../utils/ajax";

let app = getApp();
let _ = {
    releaseInfo: (data, handler) => {
        ajax.post("/finance/requirement/save", data, handler);
    }
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navList: [
            {
                category: 'PROJECT',
                text: '找项目'
            },
            {
                category: 'FINANCE',
                text: '找资金'
            }
        ],
        activeNav: 'PROJECT',
        content: '',
        labelList: ['测试', '测试测试', '测试']
    },

    bindChangeNav (e) {
        if (e.currentTarget.dataset.category !== this.data.activeNav) {
            this.setData({
                activeNav: e.currentTarget.dataset.category
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 检测登录
        app.globalData.checkLoginStatus();
        // let openId = wx.getStorageSync('openId');
        // let _this = this;
        // if (openId && openId !== '') {
            
        // }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    bindTextareaInput (e) {
        this.setData({
            content: e.detail.value
        })
    },

    // 
    bindReleaseInfo (e) {
        if (this.data.content !== '') {
            // let _this = this;
            let openId = wx.getStorageSync('openId');
            _.releaseInfo({
                openId,
                category: this.data.activeNav,
                content: this.data.content,
                label: this.data.labelList.join(',')
            }, {
                success (res) {
                    res = res.data;
                    if (res.code === 200) {
                        // let pages = getCurrentPages();
                        // let prevPage = pages[pages.length - 2];
                        // prevPage.setData({
                        //     isReleaseBack: 1,
                        //     releaseBackProject: _this.data.activeNav
                        // })
                        wx.switchTab({
                            url: '/pages/info/info'
                        })
                    } else {
                        wx.showToast({
                            title: '服务异常，请稍后再试！',
                            icon: 'none'
                        })
                    }
                }
            })
        } else {
            wx.showToast({
                title: '请填写信息详情！',
                icon: 'none'
            })
        }
    }
})