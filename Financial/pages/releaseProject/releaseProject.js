// pages/releaseProject/releaseProject.js
import ajax from "../../utils/ajax";

let app = getApp();
let _ = {
    releaseProject: (data, handler) => {
        ajax.post("/finance/project/save", data, handler);
    },
    sendBP: (data, handler) => {
        ajax.post("/finance/email/send", data, handler);
    },
    postfile: (file, filename, requestHandler) => {
        ajax.postfile("/finance/file/upload", file, filename, requestHandler)
    }
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryList: [
            {
                category: 'STOCK',
                text: '股权项目'
            },
            {
                category: 'OTHER',
                text: '其他项目'
            }
        ],
        cityArray: ['请选择', '测试一', '测试二', '测试三', '测试四'],
        cityIndex: 0,
        financeRoundArray: ['请选择', '种子期', '天使期', 'A轮', 'B轮', 'C轮'],
        financeRound: 0,
        activeCategory: 'STOCK',
        openId: '',
        name: '',
        brief: '',
        websiteUrl: '',
        financeAmount: '',
        projectDomain: '',
        projectDesc: '',
        logo: ''
    },

    bindRoundPickerChange (e) {
        this.setData({
            financeRound: parseInt(e.detail.value)
        })
    },

    bindCityPickerChange (e) {
        this.setData({
            cityIndex: parseInt(e.detail.value)
        })
    },

    bindChangeCategory (e) {
        if (e.currentTarget.dataset.category !== this.data.activeCategory) {
            this.setData({
                activeCategory: e.currentTarget.dataset.category
            })
        }
    },

    bindChangeName (e) {
        this.setData({
            name: e.detail.value
        })
    },

    bindChangeBrief (e) {
        this.setData({
            brief: e.detail.value
        })
    },

    bindChangeUrl (e) {
        this.setData({
            websiteUrl: e.detail.value
        })
    },

    bindChangeAmount (e) {
        this.setData({
            financeAmount: e.detail.value
        })
    },

    bindChangeDomain (e) {
        this.setData({
            projectDomain: e.detail.value
        })
    },

    bindTextareaInput (e) {
        this.setData({
            projectDesc: e.detail.value
        })
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
        this.setData({
            openId: wx.getStorageSync('openId')
        })
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

    bindChooseImage () {
        let _this = this
        wx.chooseImage({
            count: 1, // 最多可以选择的图片张数，默认9
            sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function(res){
                _.postfile(res.tempFiles[0].path, "file", {
                    success: function (res) {
                        res = res.data
                        _this.setData({
                            logo: JSON.parse(res).data
                        })
                    }
                });
            },
            fail: function(err) {
                console.log(err)
            },
        })
    },

    bindReleaseProject () {
        let data = {}, _this = this;
        data.openId = this.data.openId;
        data.category = this.data.activeCategory;
        data.name = this.data.name;
        data.brief = this.data.brief;
        data.websiteUrl = this.data.websiteUrl;
        data.logo = this.data.logo;
        data.financeAmount = this.data.financeAmount;
        data.financeRound = this.data.financeRoundArray[this.data.financeRound];
        data.projectDomain = this.data.projectDomain;
        data.city = this.data.cityArray[this.data.cityIndex];
        data.projectDesc = this.data.projectDesc;
        _.releaseProject(data, {
            success (res) {
                res = res.data;
                let id = res.data;
                if (res.code === 200) {
                    wx.showModal({
                        title: '温馨提示',
                        content: '是否发送BP上传链接？',
                        success (res) {
                            if (res.confirm) {
                                _.sendBP({
                                    openId: _this.data.openId,
                                    id
                                }, {
                                    success (res) {
                                        res = res.data;
                                        if (res.code === 200) {
                                            wx.showToast({
                                                title: 'BP上传链接已发送！',
                                                icon: 'none'
                                            });
                                        }
                                    }
                                })
                            } else if (res.cancel) {
                                wx.showToast({
                                    title: '创建成功，请至详情页发送BP链接！',
                                    icon: 'none'
                                });
                            }
                        },
                        complete () {
                            setTimeout(() => {
                                wx.switchTab({
                                    url: '/pages/project/project'
                                })
                            }, 3000);
                        }
                    })
                }
            }
        })
    }
})