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
        userInfoList: [],
        activeNav: 3,
        size: 5,
        current: 1,
        total: 0
    },

    bindChangeNav (e) {
        if (e.currentTarget.dataset.id !== this.data.activeNav) {
            this.setData({
                activeNav: e.currentTarget.dataset.id,
                userInfoList: [],
                current: 1,
                total: 0
            })
            this.onGotList(1);
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
        // 获取用户头像
        let openId = wx.getStorageSync('openId');
        let _this = this;
        if (openId && openId !== '') {
            _.getCardInfo({
                openid: openId
            }, {
                success (res) {
                    res = res.data;
                    if (res.code === 200) {
                        let userInfo = res.data;
                        for (const key in userInfo) {
                            if (userInfo.hasOwnProperty(key)) {
                                const el = userInfo[key];
                                el === null ? userInfo[key] = '待编辑' : el;
                            }
                        }
                        wx.setStorageSync('userInfo', userInfo);
                        _this.setData({
                            userInfo
                        });
                    }
                }
            });
            this.onGotList(1);
        }
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
        if (!e.currentTarget.dataset.disabled) {
            wx.makePhoneCall({
                phoneNumber: '17621153820',
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
        if (text !== '待编辑') {
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

    onGotList (page, isHideLoading) {
        // getRecommendList
        let openId = wx.getStorageSync('openId');
        let _this = this;
        if (this.data.activeNav === 3) {
            _.getRecommendList({
                openid: openId,
                size: this.data.size,
                current: this.data.current
            }, {
                success (res) {
                    res = res.data;
                    console.log(res);
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
                }
            })
        } else if (this.data.activeNav === 1) {
            _.getFriendList({
                openId,
                size: this.data.size,
                current: this.data.current,
                status: 'ACCEPT'
            }, {
                success (res) {
                    res = res.data;
                    if (res.data.list !== null) {
                        let tempUserInfo = [];
                        res.data.list.forEach(el => {
                            let {openId, avatarUrl, name, company, duties, telephone, email} = el;
                            let temp = {openId, avatarUrl, name, company, duties, telephone, email, showFocus: 1, isFocus: 0, showAddFriend: 0, isAddFriend: 0};
                            tempUserInfo.push(temp);
                        });
                        _this.setData({
                            userInfoList: _this.data.userInfoList.concat(tempUserInfo)
                        })
                    }
                }
            })
        } else if (this.data.activeNav === 2) {
            // 2
            _.getFocusList({
                openId,
                size: this.data.size,
                current: this.data.current
            }, {
                success (res) {
                    res = res.data;
                    if (res.data.list !== null) {
                        let tempUserInfo = [];
                        res.data.list.forEach(el => {
                            let {openId, avatarUrl, name, company, duties} = el;
                            let temp = {openId, avatarUrl, name, company, duties, showFocus: 0, isFocus: 0, showAddFriend: 1, isAddFriend: 0};
                            tempUserInfo.push(temp);
                        });
                        _this.setData({
                            userInfoList: _this.data.userInfoList.concat(tempUserInfo)
                        })
                    }
                }
            })
        }
        if (isHideLoading) {
            wx.hideLoading()
        }
    },

    bindFocus (e) {
        let openId = wx.getStorageSync('openId');
        let index = e.currentTarget.dataset.index;
        let _this = this;
        _.focus({
            openId,
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
        let openId = wx.getStorageSync('openId');
        let index = e.currentTarget.dataset.index;
        let _this = this;
        _.addFriend({
            openId,
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
    }
})