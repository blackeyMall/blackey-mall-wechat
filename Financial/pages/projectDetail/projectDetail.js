// pages/projectDetail/projectDetail.js
import ajax from "../../utils/ajax";

let app = getApp();
let _ = {
    onGetProjectDetail: (data, handler) => {
        ajax.get("/finance/project/info", data, handler);
    },
    follow: (data, handler) => {
        ajax.post("/finance/follow/project/save", data, handler);
    },
    sendBP: (data, handler) => {
        ajax.post("/finance/email/send", data, handler);
    },
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        openId: '',
        projectDetail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            id: options.objectId,
            openId: wx.getStorageSync('openId')
        });
        this.onGetProjectDetail();
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
        this.setData({
            displayWebView: false
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    onGetProjectDetail () {
        let _this = this;
        _.onGetProjectDetail({
            id: _this.data.id,
            openId: _this.data.openId
        }, {
            success (res) {
                res = res.data;
                _this.setData({
                    projectDetail: res.data
                })
            }
        })
    },

    bindViewBP () {
        wx.downloadFile({
            url: this.data.projectDetail.attachment,
            success (res) {
                let path = res.tempFilePath;
                wx.openDocument({
                    filePath: path,
                    success: function(res){
                        wx.showToast({
                            title: '打开成功！'
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: '打开失败！'
                        });
                    }
                })
            },
            fail (err) {
                wx.showToast({
                    title: '下载失败！'
                });
            }
        })
    },

    bindMakePhoneCall () {
        let tel = this.data.projectDetail.telephone;
        (tel !== null && tel !== '待编辑')
        ?
        wx.makePhoneCall({
            phoneNumber: tel,
            success: function(res) {
                wx.showToast({
                    title: '拨打成功！',
                    icon: 'none'
                })
            }
        })
        :
        wx.showToast({
            title: '项目方手机号暂未编辑！',
            icon: 'none'
        })
    },

    bindFollow (e) {
        let openId = this.data.openId;
        let objectId = e.currentTarget.dataset.id;
        let _this = this;
        _.follow({
            openId,
            objectId
        }, {
            success (res) {
                res = res.data;
                if (res.code === 200) {
                    let projectDetail = _this.data.projectDetail;
                    projectDetail.isFollow = res.data;
                    res.data.value === 'ADD' ? projectDetail.followNum += 1 : projectDetail.followNum -= 1;
                    _this.setData({
                        projectDetail
                    })
                }
            }
        })
    },

    bindSendBPLink () {
        _.sendBP({
            openId: this.data.openId,
            id: this.data.id
        }, {
            success (res) {
                res = res.data;
                if (res.code === 200) {
                    wx.showToast({
                        title: 'BP上传链接已发送！',
                        icon: 'none'
                    });
                };
            }
        });
    },

    bindRedirectUserCard (e) {
        wx.navigateTo({
            url: '/pages/userCard/userCard?openId=' + e.currentTarget.dataset.id
        })
    }
})