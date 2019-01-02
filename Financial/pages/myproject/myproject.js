// pages/info/info.js
import ajax from "../../utils/ajax";

let app = getApp();
let _ = {
    getProjectList: (data, handler) => {
        ajax.post("/finance/project/list", data, handler);
    },
    follow: (data, handler) => {
        ajax.post("/finance/follow/project/save", data, handler);
    }
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        projectList: [],
        current: 1,
        size: 5,
        total: 0,
        openId: ''
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
        if (app.globalData.checkLoginStatus()) {
            this.setData({
                openId: wx.getStorageSync('openId'),
                projectList: []
            })
            // 获取项目列表
            this.onGetProjectList(1);
        }
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
            this.onGetProjectList(this.data.current + 1, 1)
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

    },

    bindProjectDetail (e) {
        let objectId = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/projectDetail/projectDetail?objectId=' + objectId
        })
    },

    onGetProjectList (page, isHideLoading) {
        let data = {
            openId: this.data.openId, //openid
            current: page, // 当前页
            size: this.data.size, // 每页条数
            category: 'DEFAULT', // 主分类
            tableCode: 'MY_CREATE' // 子分类
        };
        let _this = this;
        _.getProjectList(data, {
            success (res) {
                res = res.data;
                console.log(res);
                if (res.code === 200) {
                    let projectList = [];
                    let records = res.data.records;
                    if (records !== null) {
                        records.forEach(el => {
                            let {id, openId, logo, name, attachment, brief, financeRound, financeAmount, projectDomain, isFollow, followNum} = el;
                            attachment === null ? attachment = '无BP' : attachment = '有BP';
                            projectList.push({
                                id, openId, logo, name, attachment, brief, financeRound, financeAmount, projectDomain, isFollow, followNum
                            });
                        });
                        _this.setData({
                            projectList: _this.data.projectList.concat(projectList)
                        });
                    }
                    _this.setData({
                        total: res.data.total,
                        current: res.data.current
                    });
                }
            }
        })
    }
})