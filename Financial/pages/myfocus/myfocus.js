// pages/myfocus/myfocus.js
import ajax from "../../utils/ajax";

let app = getApp();
let _ = {
    getFocusList: (data, handler) => {
        ajax.post("/finance/userpersonfollow/list/openid", data, handler);
    },
    friendFocus: (data, handler) => {
        ajax.post("/finance/userpersonfollow/foucs", data, handler);
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
        openId: '',
        navSubList: [
            {
                id: 1,
                text: '关注的人'
            },
            {
                id: 2,
                text: '关注需求'
            },
            {
                id: 3,
                text: '关注项目'
            }
        ],
        activeNavSub: 1,
        userInfoList: [],
        infoList: [],
        projectList: [],
        current: 1,
        size: 10,
        pages: 0,
        total: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (app.globalData.checkLoginStatus()) {
            this.setData({
                openId: wx.getStorageSync('openId'),
                activeNavSub: 1,
                userInfoList: [],
                infoList: [],
                projectList: [],
                current: 1,
                pages: 0,
                total: 0
            })
            this.onGetList(1);
        };
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
        let activeNav = this.data.activeNavSub;
        if (this.data.current < totalPage) {
            // 显示加载图标
            wx.showLoading({
                title: '加载中...',
            })
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

    bindChangeNavSub (e) {
        let id = parseInt(e.currentTarget.dataset.id);
        if (id !== this.data.activeNavSub) {
            this.setData({
                activeNavSub: id,
                userInfoList: [],
                infoList: [],
                projectList: [],
                current: 1,
                pages: 0,
                total: 0
            })
            this.onGetList(1);
        };
    },

    onGetList (page, isHideLoading) {
        let _this = this;
        let activeNav = this.data.activeNavSub;
        if (activeNav === 1) {
            _.getFocusList({
                openId: this.data.openId,
                size: this.data.size,
                current: page
            }, {
                success (res) {
                    res = res.data;
                    if (res.data.records !== null) {
                        let tempUserInfo = [];
                        res.data.records.forEach(el => {
                            let {openId, avatarUrl, name, company, duties, isAddFriend} = el;
                            let temp = {
                                openId, 
                                avatarUrl, 
                                name, 
                                company: company === null ? '公司地址待编辑' : company, 
                                duties: duties === null ? '职务待编辑' : duties, 
                                showFocus: 1, 
                                isFocus: 1, 
                                showAddFriend: 1, 
                                isAddFriend
                            };
                            tempUserInfo.push(temp);
                        });
                        _this.setData({
                            userInfoList: _this.data.userInfoList.concat(tempUserInfo)
                        })
                    };
                    _this.setData({
                        current: res.data.current,
                        total: res.data.total,
                        pages: res.data.pages
                    });
                }
            })
        } else if (activeNav === 2) {
            let _this = this;
            _.getInfoList({
                openId: wx.getStorageSync('openId'), //openid
                current: page, // 当前页
                size: this.data.size, // 每页条数
                category: 'DEFAULT', // 主分类
                tableCode: 'MY_FOLLOW' // 子分类
            }, {
                success (res) {
                    res = res.data;
                    if (res.code === 200) {
                        let tempInfoList = [];
                        let records = res.data.records;
                        if (records !== null) {
                            records.forEach(el => {
                                let {id, openId, avatarUrl, name, company, duties, content, followNum, isFollow, likeNum, isLike, isRecommend, label, images} = el;
                                let labelList = label === null ? [] : label.split(',');
                                company === null ? company = '公司地址未编辑' : company;
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
        } else if (activeNav === 3) {
            _.getProjectList({
                openId: this.data.openId, //openid
                current: page, // 当前页
                size: this.data.size, // 每页条数
                category: 'DEFAULT', // 主分类
                tableCode: 'MY_FOLLOW' // 子分类
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
                                attachment === null ? attachment = '' : attachment = '有BP';
                                projectDomain === null ? projectDomain = [] : projectDomain = projectDomain.split(',');
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

    bindProjectDetail (e) {
        let objectId = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/projectDetail/projectDetail?objectId=' + objectId
        })
    },

    bindFriendFocus (e) {
        let index = e.currentTarget.dataset.index;
        let _this = this;
        _.friendFocus({
            openId: this.data.openId,
            personId: e.currentTarget.dataset.id
        }, {
            success (res) {
                res = res.data
                if (res.code === 200) {
                    let userInfoList = _this.data.userInfoList;
                    userInfoList[index].isFocus = res.data;
                    _this.setData({
                        userInfoList
                    })
                    wx.showToast({
                        title: res.message,
                        icon: 'none'
                    })
                }
            }
        })
    },

    bindProjectFollow (e) {
        let index = e.currentTarget.dataset.index;
        let openId = this.data.openId;
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

    bindPreviewImg (e) {
        let imgList = e.currentTarget.dataset.imglist;
        wx.previewImage({
            urls: imgList
        });
    },

    bindRedirectUserCard (e) {
        wx.navigateTo({
            url: '/pages/userCard/userCard?openId=' + e.currentTarget.dataset.openid
        })
    }
})