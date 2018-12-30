// pages/card/card.js
import ajax from "../../utils/ajax";

let app = getApp();
let _ = {
    getCardInfo: (data, handler) => {
        ajax.get("/finance/userinfo/info", data, handler);
    },
    getRecommendList: (data, handler) => {
        ajax.get("/finance/userinfo/list/user", data, handler);
    },
    getFocusList: (data, handler) => {
        ajax.post("/finance/userpersonfollow/list/openid", data, handler);
    },
    getFriendList: (data, handler) => {
        ajax.post("/finance/userrelation/list/openid", data, handler);
    },
    focus: (data, handler) => {
      ajax.post("/finance/userpersonfollow/foucs", data, handler);
    },
    addFriend: (data, handler) => {
        ajax.post("/finance/userrelation/add", data, handler);
    },
    accept: (data, handler) => {
        ajax.post("/finance/userrelation/accept", data, handler);
    },
    refuse: (data, handler) => {
        ajax.post("/finance/userrelation/refuse", data, handler);
    },
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        isMoreinfoActive: false,
        isModalOpen: false,
        navList: [
            {
                id: 1,
                text: '好友'
            },
            {
                id: 2,
                text: '关注的人'
            },
            {
                id: 3,
                text: '推荐人脉'
            }
        ],
        activeNav: 1,
        userInfoList: [],
        applyList: [],
        size: 5,
        current: 1,
        applyCurrent: 1,
        total: 0,
        openId: ''
    },

    bindChangeNav (e) {
        if (e.currentTarget.dataset.id !== this.data.activeNav) {
            this.setData({
                activeNav: e.currentTarget.dataset.id,
                userInfoList: [],
                current: 1,
                total: 0
            })
            this.onGetList(1);
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
        // ---
        let _this = this;
        wx.nextTick(() => {
            // 清空列表数据，获取用户openId
            this.setData({
                userInfoList: [],
                applyList: [],
                openId: wx.getStorageSync('openId')
            });
            // 获取个人名片信息
            this.onGetCardInfo();
            // 获取用户列表
            this.onGetApplyList(1);
            // 获取好友申请列表
            this.onGetList(1);
        });
    },

    // 打开好友申请弹窗
    bindOpenModal () {
        this.setData({
            isModalOpen: true
        })
    },

    // 关闭好友申请弹窗
    bindCloseModal () {
        this.setData({
            isModalOpen: false
        })
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
            this.onGetList(this.data.current + 1, 1)
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

    // 跳转信息编辑页
    bindCardEdit () {
        wx.navigateTo({
            url: '/pages/cardEdit/cardEdit'
        })
    },

    bindMakePhoneCall (e) {
        if (e.currentTarget.dataset.disabled !== '') {
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

    onGetApplyList (page) {
        let _this = this;
        _.getFriendList({
            openId: this.data.openId,
            size: this.data.size,
            current: page,
            status: 'APPLY'
        }, {
            success (res) {
                res = res.data;
                if (res.code === 200) {
                    if (res.data.list !== null) {
                        let applyList = [];
                        res.data.list.forEach(el => {
                            let {id, openId, avatarUrl, name, company, duties, telephone, email, isFocus} = el;
                            let temp = {id, openId, avatarUrl, name, company, duties, telephone, email, showFocus: 1, isFocus, showAddFriend: 0, isAddFriend: 0};
                            applyList.push(temp);
                        });
                        _this.setData({
                            applyList: _this.data.applyList.concat(applyList)
                        })
                    }
                    // _this.setData({
                    //     current: res.data.current,
                    //     total: res.data.total
                    // })
                }
            }
        })
    },

    // 获取用户列表
    onGetList (page, isHideLoading) {
        // getRecommendList
        let _this = this;
        if (this.data.activeNav === 3) {
            _.getRecommendList({
                openid: this.data.openId,
                size: this.data.size,
                current: page
            }, {
                success (res) {
                    res = res.data;
                    if (res.data.list !== null) {
                        let tempUserInfo = [];
                        res.data.list.forEach(el => {
                            let {openId, avatarUrl, name, company, duties} = el;
                            let temp = {openId, avatarUrl, name, company, duties, showFocus: 1, isFocus: 0, showAddFriend: 1, isAddFriend: 0};
                            tempUserInfo.push(temp);
                        });
                        _this.setData({
                            userInfoList: _this.data.userInfoList.concat(tempUserInfo)
                        })
                    }
                    _this.setData({
                        current: res.data.current,
                        total: res.data.total
                    })
                }
            })
        } else if (this.data.activeNav === 1) {
            _.getFriendList({
                openId,
                size: this.data.size,
                current: page,
                status: 'ACCEPT'
            }, {
                success (res) {
                    res = res.data;
                    if (res.data.list !== null) {
                        let tempUserInfo = [];
                        res.data.list.forEach(el => {
                            let {openId, avatarUrl, name, company, duties, telephone, email, isFocus} = el;
                            let temp = {openId, avatarUrl, name, company, duties, telephone, email, showFocus: 1, isFocus, showAddFriend: 0, isAddFriend: 0};
                            tempUserInfo.push(temp);
                        });
                        _this.setData({
                            userInfoList: _this.data.userInfoList.concat(tempUserInfo)
                        })
                    }
                    _this.setData({
                        current: res.data.current,
                        total: res.data.total
                    })
                }
            })
        } else if (this.data.activeNav === 2) {
            // 2
            _.getFocusList({
                openId,
                size: this.data.size,
                current: page
            }, {
                success (res) {
                    res = res.data;
                    if (res.data.list !== null) {
                        let tempUserInfo = [];
                        res.data.list.forEach(el => {
                            let {openId, avatarUrl, name, company, duties, isAddFriend} = el;
                            let temp = {openId, avatarUrl, name, company, duties, showFocus: 0, isFocus: 0, showAddFriend: 1, isAddFriend};
                            tempUserInfo.push(temp);
                        });
                        _this.setData({
                            userInfoList: _this.data.userInfoList.concat(tempUserInfo)
                        })
                    }
                    _this.setData({
                        current: res.data.current,
                        total: res.data.total
                    })
                }
            })
        }
        if (isHideLoading) {
            wx.hideLoading()
        }
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

    bindFocus (e) {
        let index = e.currentTarget.dataset.index;
        let _this = this;
        _.focus({
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

    bindAddFriend (e) {
        let index = e.currentTarget.dataset.index;
        let _this = this;
        _.addFriend({
            openId: this.data.openId,
            friendId: e.currentTarget.dataset.id
        }, {
            success (res) {
                res = res.data
                if (res.code === 200) {
                    let userInfoList = _this.data.userInfoList;
                    userInfoList[index].isAddFriend = 1;
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

    bindRefuse (e) {
        let index = e.currentTarget.dataset.index;
        let friendId = e.currentTarget.dataset.friendid;
        let _this = this;
        _.refuse({
            openId: this.data.openId,
            friendId
        }, {
            success (res) {
                res = res.data;
                if (res.code === 200) {
                    let applyList = _this.data.applyList;
                    applyList.splice(index, 1);
                    _this.setData({
                        applyList
                    });
                    wx.showToast({
                        title: '已拒绝！',
                        icon: 'none'
                    })
                }
            }
        })
    },

    bindAccept (e) {
        let index = e.currentTarget.dataset.index;
        let friendId = e.currentTarget.dataset.friendid;
        let _this = this;
        _.accept({
            openId: this.data.openId,
            friendId
        }, {
            success (res) {
                res = res.data;
                if (res.code === 200) {
                    let applyList = _this.data.applyList;
                    applyList.splice(index, 1);
                    _this.setData({
                        applyList
                    });
                    wx.showToast({
                        title: '添加成功！',
                        icon: 'none'
                    })
                }
            }
        })
    }
})