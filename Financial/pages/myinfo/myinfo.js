// pages/info/info.js
import ajax from "../../utils/ajax";

let app = getApp();
let _ = {
    getInfoList: (data, handler) => {
        ajax.post("/finance/requirement/list", data, handler);
    },
    like: (data, handler) => {
        ajax.post("/finance/like/require/save", data, handler);
    },
    follow: (data, handler) => {
        ajax.post("/finance/follow/require/save", data, handler);
    },
    deleteInfo: (data, handler) => {
        ajax.get("/finance/requirement/delete", data, handler);
    },
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        infoList: [],
        current: 1,
        size: 10,
        total: 0,
        openId: '',
        startX: 0, //开始坐标
        startY: 0
    },

    // 获取信息列表
    onGetInfoList (page, isHideLoading) {
        let data = {
            openId: wx.getStorageSync('openId'), //openid
            current: page, // 当前页
            size: this.data.size, // 每页条数
            category: 'DEFAULT', // 主分类
            tableCode: 'MY_CREATE' // 子分类
        };
        let _this = this;
        _.getInfoList(data, {
            success (res) {
                res = res.data;
                if (res.code === 200) {
                    let tempInfoList = [];
                    let records = res.data.records;
                    if (records !== null) {
                        records.forEach(el => {
                            let {id, openId, avatarUrl, name, company, duties, content, followNum, isFollow, likeNum, isLike, isRecommend, label, images} = el;
                            let labelList = label === null ? [] : label.split(',');
                            company === null ? company = '公司未编辑' : company;
                            duties === null ? duties = '职务未编辑' : duties;
                            isRecommend === null ? isRecommend = 0 : isRecommend = 1;
                            images === null ? images = [] : images;
                            tempInfoList.push({
                                id, openId, avatarUrl, name, company, duties, content, followNum, isFollow, likeNum, isLike, isRecommend, labelList, images, isTouchMove: false
                            })
                        });

                        _this.setData({
                            infoList: _this.data.infoList.concat(tempInfoList)
                        });
                    }
                    _this.setData({
                        current: res.data.current,
                        total: res.data.total
                    })
                }
            }
        })
        if (isHideLoading) {
            wx.hideLoading()
        }
    },

    bindEditInfo (e) {
        let infoId = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/releaseInfo/releaseInfo?infoId=' + infoId
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 检测登录
        if (app.globalData.checkLoginStatus()) {
            this.setData({
                infoList: [],
                activeNavSub: 'DEFAULT',
                openId: wx.getStorageSync('openId')
            })
            this.onGetInfoList(1);
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
            this.onGetInfoList(this.data.current + 1, 1)
        } else {
            wx.showToast({
                title: '已经到底啦！',
                icon: 'none'
            })
        }
    },

    bindPreviewImg (e) {
        let imgList = e.currentTarget.dataset.imglist;
        wx.previewImage({
            urls: imgList
        });
    },

    bindReleaseInfo () {
        wx.navigateTo({
            url: '/pages/releaseInfo/releaseInfo'
        });
    },

    touchstart: function(e) {
        //开始触摸时 重置所有删除
        let infoList = this.data.infoList;
        infoList.forEach(el => {
            if (el.isTouchMove)
                //只操作为true的
                el.isTouchMove = false;
        });
        this.setData({
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY,
            infoList
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

        _this.data.infoList.forEach((el, i) => {
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
            infoList: _this.data.infoList
        });
    },

    angle: function(start, end) {
        var _X = end.X - start.X,
            _Y = end.Y - start.Y;
        //返回角度 /Math.atan()返回数字的反正切值
        return (360 * Math.atan(_Y / _X)) / (2 * Math.PI);
    },

    //删除好友事件
    bindDeleteInfo (e) {
        let index = e.currentTarget.dataset.index,
            id = e.currentTarget.dataset.id,
            // openId = this.data.openId,
            _this = this,
            infoList = this.data.infoList;
        _.deleteInfo({
            id
        }, {
            success (res) {
                res = res.data;
                if (res.code === 200) {
                    infoList.splice(index, 1);
                    _this.setData({
                        infoList
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