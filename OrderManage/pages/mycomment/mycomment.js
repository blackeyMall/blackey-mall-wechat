// pages/mycomment/mycomment.js
import ajax from '../../utils/net'
let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        size: 5,
        current: 1,
        commentList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (app.globalData.checkOpenId()) {
            this.onGetMyCommentList(1);
        }

    },

    onGetMyCommentList (page, isHideLoading) {
        let _this = this;
        ajax.GET('/artisan/comment/list/page', {
            openid: wx.getStorageSync('openid'),
            size: this.data.size,
            current: this.data.current
        }, {
            success (res) {
                res = res.data;
                if (res.code === 200) {
                    if (res.data.records !== null) {
                        // _this.setData({
                        //     commentList: res.data.records
                        // });
                        let commentList = [];
                        res.data.records.forEach(el => {
                            let {serviceStatus, responseSpeed, ...temp} = el;
                            let attitudeStarList = [];
                            for (let index = 0; index <= serviceStatus; index++) {
                                attitudeStarList.push({
                                    active: false,
                                    index
                                })
                            };
                            let speedStarList = [];
                            for (let index = 0; index <= responseSpeed; index++) {
                                speedStarList.push({
                                    active: false,
                                    index
                                })
                            };
                            temp.attitudeStarList = attitudeStarList;
                            temp.speedStarList = speedStarList;
                            commentList.push(temp);
                        });
                        _this.setData({
                            commentList,
                            current: res.data.current,
                            total: res.data.total
                        });
                    };
                };
            }
        });
        if (isHideLoading) {
            wx.hideLoading();
        }
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
        let totalPage = Math.ceil(this.data.total / this.data.size);
        if (this.data.current < totalPage) {
            // 显示加载图标
            wx.showLoading({
                title: '加载中...',
            })
            this.onGetMyCommentList(this.data.current + 1, 1)
        } else {
            wx.showToast({
                title: '已经到底啦！',
                icon: 'none'
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})