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
    }
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        displaySearchBtn: false,
        searchValue: '',
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
        navSubList: [
            {
                tableCode: 'DEFAULT',
                text: '全部需求'
            },
            {
                tableCode: 'TODAY_PUBLISH',
                text: '今日发布'
            },
            {
                tableCode: 'MY_FOLLOW',
                text: '关注需求'
            },
            {
                tableCode: 'MY_CREATE',
                text: '我的需求'
            }
        ],
        activeNavSub: 'DEFAULT',
        infoList: [],
        current: 1,
        size: 5,
        total: 0,
        openId: ''
    },

    bindChangeNav (e) {
        if (e.currentTarget.dataset.category !== this.data.activeNav) {
            this.setData({
                activeNav: e.currentTarget.dataset.category,
                activeNavSub: 'DEFAULT',
                infoList: []
            })
            this.onGetInfoList(1);
        }
    },

    bindChangeNavSub (e) {
        if (e.currentTarget.dataset.tablecode !== this.data.activeNavSub) {
            this.setData({
                activeNavSub: e.currentTarget.dataset.tablecode,
                infoList: []
            })
            this.onGetInfoList(1);
        }
    },

    // 获取信息列表
    onGetInfoList (page, isHideLoading) {
        let data = {
            openId: wx.getStorageSync('openId'), //openid
            current: page, // 当前页
            size: this.data.size, // 每页条数
            category: this.data.activeNav, // 主分类
            tableCode: this.data.activeNavSub // 子分类
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
                            let {id, openId, avatarUrl, name, company, duties, content, followNum, isFollow, likeNum, isLike, isRecommend, label} = el;
                            let labelList = label.split(',');
                            company === null ? company = '公司未编辑' : company;
                            duties === null ? duties = '职务未编辑' : duties;
                            isRecommend === null ? isRecommend = 0 : isRecommend = 1;
                            tempInfoList.push({
                                id, openId, avatarUrl, name, company, duties, content, followNum, isFollow, likeNum, isLike, isRecommend, labelList
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 检测登录
        app.globalData.checkLoginStatus();
        this.setData({
            infoList: [],
            activeNavSub: 'DEFAULT',
            openId: wx.getStorageSync('openId')
        })
        this.onGetInfoList(1);
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

    bindSearchInput (e) {
        this.setData({
            searchValue: e.detail.value
        })
    },

    bindSearchFocus (e) {
        this.setData({
            displaySearchBtn: true
        })
    },

    bindSearchConfirm () {
        wx.showModal({
            title: '测试',
            content: '123'
        })
    },

    bindCancelSearch (e) {
        this.setData({
            displaySearchBtn: false
        })
    },

    bindClearInputValue () {
        this.setData({
            searchValue: ''
        })
    },

    bindRedirect () {
        wx.navigateTo({
            url: '/pages/releaseInfo/releaseInfo'
        })
    },

    bindLike (e) {
        let index = e.currentTarget.dataset.index;
        let openId = wx.getStorageSync('openId');
        let objectId = e.currentTarget.dataset.id;
        let _this = this;
        _.like({
            openId,
            objectId
        }, {
            success (res) {
                res = res.data;
                if (res.code === 200) {
                    let infoList = _this.data.infoList;
                    let currentInfo = infoList[index];
                    currentInfo.isLike = res.data;
                    res.data.value === 'ADD' ? currentInfo.likeNum += 1 : currentInfo.likeNum -= 1;
                    _this.setData({
                        infoList
                    })
                }
            }
        })
    },

    bindFollow (e) {
        let index = e.currentTarget.dataset.index;
        let openId = wx.getStorageSync('openId');
        let objectId = e.currentTarget.dataset.id;
        let _this = this;
        _.follow({
            openId,
            objectId
        }, {
            success (res) {
                res = res.data;
                if (res.code === 200) {
                    let infoList = _this.data.infoList;
                    let currentInfo = infoList[index];
                    currentInfo.isFollow = res.data;
                    res.data.value === 'ADD' ? currentInfo.followNum += 1 : currentInfo.followNum -= 1;
                    _this.setData({
                        infoList
                    })
                }
            }
        })
    }
})