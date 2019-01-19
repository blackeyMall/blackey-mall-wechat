// pages/info/info.js
import ajax from "../../utils/ajax";

let app = getApp();
let _ = {
    getProjectList: (data, handler) => {
        ajax.post("/finance/project/list", data, handler);
    },
    follow: (data, handler) => {
        ajax.post("/finance/follow/project/save", data, handler);
    },
    deleteProject: (data, handler) => {
        ajax.get("/finance/project/delete", data, handler);
    }
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        projectList: [],
        current: 1,
        size: 10,
        total: 0,
        openId: '',
        startX: 0, //开始坐标
        startY: 0
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

    // bindProjectDetail (e) {
    //     let objectId = e.currentTarget.dataset.id;
    //     wx.navigateTo({
    //         url: '/pages/projectDetail/projectDetail?objectId=' + objectId
    //     })
    // },

    bindEditProject (e) {
        let objectId = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/releaseProject/releaseProject?objectId=' + objectId
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
                            attachment === null ? attachment = '' : attachment = '有BP';
                            projectDomain === null ? projectDomain = [] : projectDomain = projectDomain.split(',');
                            projectList.push({
                                id, openId, logo, name, attachment, brief, financeRound, financeAmount, projectDomain, isFollow, followNum, isTouchMove: false
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
    },

    bindReleaseProject () {
        wx.navigateTo({
            url: '/pages/releaseProject/releaseProject'
        });
    },

    touchstart: function(e) {
        //开始触摸时 重置所有删除
        let projectList = this.data.projectList;
        projectList.forEach(el => {
            if (el.isTouchMove)
                //只操作为true的
                el.isTouchMove = false;
        });
        this.setData({
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY,
            projectList
        });
    },

    touchmove: function(e) {
        var _this = this,
            index = e.currentTarget.dataset.index, //当前索引
            startX = _this.data.startX, //开始X坐标
            startY = _this.data.startY, //开始Y坐标
            touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
            touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
            //获取滑动角度

            angle = _this.angle(
                { X: startX, Y: startY },
                { X: touchMoveX, Y: touchMoveY }
            );

        _this.data.projectList.forEach((el, i) => {
            el.isTouchMove = false;
            if (Math.abs(angle) > 30) return;
            if (i == index) {
                if (touchMoveX > startX) {
                    //右滑
                    el.isTouchMove = false;
                } else {
                    //左滑
                    el.isTouchMove = true;
                }
            };
        });
        //更新数据
        _this.setData({
            projectList: _this.data.projectList
        });
    },

    angle: function(start, end) {
        var _X = end.X - start.X,
            _Y = end.Y - start.Y;
        //返回角度 /Math.atan()返回数字的反正切值
        return (360 * Math.atan(_Y / _X)) / (2 * Math.PI);
    },

    //删除好友事件
    bindDeleteProject (e) {
        let index = e.currentTarget.dataset.index,
            id = e.currentTarget.dataset.id,
            // openId = this.data.openId,
            _this = this,
            projectList = this.data.projectList;
        _.deleteProject({
            id
        }, {
            success (res) {
                res = res.data;
                if (res.code === 200) {
                    projectList.splice(index, 1);
                    _this.setData({
                        projectList
                    })
                    wx.showToast({
                        title: '删除成功！',
                        icon: 'none'
                    });
                }
            }
        })
    }
})