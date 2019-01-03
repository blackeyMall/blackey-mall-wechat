// pages/card/card.js
import ajax from "../../utils/ajax";

let app = getApp();
let _ = {
    getCardInfo: (data, handler) => {
        ajax.get("/finance/userinfo/info", data, handler);
    },
    getInfoList: (data, handler) => {
        ajax.post("/finance/requirement/list", data, handler);
    },
    infoLike: (data, handler) => {
        ajax.post("/finance/like/require/save", data, handler);
    },
    infoFollow: (data, handler) => {
        ajax.post("/finance/follow/require/save", data, handler);
    },
    getProjectList: (data, handler) => {
        ajax.post("/finance/project/list", data, handler);
    },
    projectFollow: (data, handler) => {
        ajax.post("/finance/follow/project/save", data, handler);
    }
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        isMoreinfoActive: false,
        navList: [
            {
                id: 1,
                text: 'TA的需求'
            },
            {
                id: 2,
                text: 'TA的项目'
            }
        ],
        activeNav: 1,
        infoList: [],
        projectList: [],
        size: 5,
        current: 1,
        total: 0,
        pages: '',
        openId: ''
    },

    bindChangeNav (e) {
        if (e.currentTarget.dataset.id !== this.data.activeNav) {
            this.setData({
                activeNav: e.currentTarget.dataset.id,
                infoList: [],
                projectList: [],
                current: 1,
                pages: '',
                total: 0
            })
            this.onGetList(1);
        };
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(1);
        // this.setData({
        //     openId: options.openId
        // });
        // 检测登录是否成功
        if (app.globalData.checkLoginStatus()) {
            // 清空数据
            this.setData({
                openId: options.openId,
                activeNav: 1,
                infoList: [],
                projectList: [],
                current: 1,
                pages: '',
                total: 0
            });
            // 获取个人名片信息
            this.onGetCardInfo();
            // 获取用户列表
            this.onGetList(1);
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log(2);
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
            });
            this.onGetList(this.data.current + 1, 1);
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

    // 展开信息详情
    bindViewDetail () {
        this.setData({
            isMoreinfoActive: !this.data.isMoreinfoActive
        })
    },

    bindMakePhoneCall (e) {
        let text = e.currentTarget.dataset.text;
        if (text !== '') {
            wx.makePhoneCall({
                phoneNumber: this.data.userInfo.telephone,
                success: function(res) {
                    wx.showToast({
                        title: '拨打成功！',
                        icon: 'none'
                    })
                }
            })
        }
    },

    bindCopyText (e) {
        let text = e.currentTarget.dataset.text;
        if (text !== '') {
            wx.setClipboardData({
                data: text,
                success () {
                    wx.showToast({
                        title: '复制成功！',
                        icon: 'none'
                    })
                }
            });
        };
    },

    // 获取用户名片信息
    onGetCardInfo () {
        let _this = this;
        _.getCardInfo({
            openid: _this.data.openId
        }, {
            success (res) {
                res = res.data;
                if (res.code === 200) {
                    let userInfo = res.data;
                    for (const key in userInfo) {
                        if (userInfo.hasOwnProperty(key)) {
                            const el = userInfo[key];
                            el === null ? userInfo[key] = '' : el;
                        }
                    }
                    wx.setStorageSync('userInfo', userInfo);
                    _this.setData({
                        userInfo
                    });
                }
            }
        });
    },

    onGetList (page, isHideLoading) {
        let _this = this;
        let activeNav = this.data.activeNav;
        if (activeNav === 1) {
            let _this = this;
            _.getInfoList({
                openId: this.data.openId, //用户openid
                current: page, // 当前页
                size: this.data.size, // 每页条数
                category: 'DEFAULT', // 主分类
                tableCode: 'MY_CREATE' // 子分类
            }, {
                success (res) {
                    res = res.data;
                    if (res.code === 200) {
                        let tempInfoList = [];
                        let records = res.data.records;
                        if (records !== null) {
                            records.forEach(el => {
                                let {id, openId, avatarUrl, name, company, duties, content, followNum, isFollow, likeNum, isLike, isRecommend, label, images} = el;
                                let labelList = label.split(',');
                                company === null ? company = '公司未编辑' : company;
                                duties === null ? duties = '职务未编辑' : duties;
                                isRecommend === null ? isRecommend = 0 : isRecommend = 1;
                                images === null ? images = [] : images;
                                tempInfoList.push({
                                    id, openId, avatarUrl, name, company, duties, content, followNum, isFollow, likeNum, isLike, isRecommend, labelList, images
                                });
                            });

                            _this.setData({
                                infoList: _this.data.infoList.concat(tempInfoList)
                            });
                        }
                        _this.setData({
                            current: res.data.current,
                            total: res.data.total,
                            pages: res.data.pages
                        })
                    }
                }
            })
        } else if (activeNav === 2) {
            _.getProjectList({
                openId: this.data.openId, //openid
                current: page, // 当前页
                size: this.data.size, // 每页条数
                category: 'DEFAULT', // 主分类
                tableCode: 'MY_CREATE' // 子分类
            }, {
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
                            current: res.data.current,
                            pages: res.data.pages
                        });
                    }
                }
            })
        }
        if (isHideLoading) {
            wx.hideLoading()
        };
    },

    bindProjectFollow (e) {
        let index = e.currentTarget.dataset.index;
        let openId = wx.getStorageSync('openId');
        let objectId = e.currentTarget.dataset.id;
        let _this = this;
        _.projectFollow({
            openId,
            objectId
        }, {
            success (res) {
                res = res.data;
                if (res.code === 200) {
                    let projectList = _this.data.projectList;
                    let currentProject = projectList[index];
                    currentProject.isFollow = res.data;
                    res.data.value === 'ADD' ? currentProject.followNum += 1 : currentProject.followNum -= 1;
                    _this.setData({
                        projectList
                    })
                }
            }
        })
    },

    bindInfoLike (e) {
        let index = e.currentTarget.dataset.index;
        let openId = wx.getStorageSync('openId');
        let objectId = e.currentTarget.dataset.id;
        let _this = this;
        _.infoLike({
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

    bindInfoFollow (e) {
        let index = e.currentTarget.dataset.index;
        let openId = wx.getStorageSync('openId');
        let objectId = e.currentTarget.dataset.id;
        let _this = this;
        _.infoFollow({
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
    },

    bindProjectDetail (e) {
        let objectId = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/projectDetail/projectDetail?objectId=' + objectId
        })
    },

    bindPreviewImg (e) {
        let imgList = e.currentTarget.dataset.imglist;
        wx.previewImage({
            urls: imgList
        });
    }
})