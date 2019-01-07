// pages/releaseInfo/releaseInfo.js
import ajax from "../../utils/ajax";

let app = getApp();
let _ = {
    feedback: (data, handler) => {
        ajax.post("/", data, handler);
    },
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: ''
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

    bindFeedback () {
        wx.showToast({
            title: '反馈成功！',
            icon: 'none'
        });
        setTimeout(() => {
            wx.navigateBack({
                delta: 1
            });
        }, 1500);
    }
})