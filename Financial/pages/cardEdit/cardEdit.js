// pages/cardEdit/cardEdit.js
import ajax from "../../utils/ajax";

let app = getApp();
let _ = {
    saveInfo: (data, handler) => {
        ajax.post("/finance/userinfo/save", data, handler);
    },
};


Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: [],
        telephone: '',
        email: '',
        wechatNo: '',
        avatarUrl: '',
        company: '',
        duties: '',
        companyBrief: '',
        companyWebsite: '',
        companyAddress: '',
        visitingAcrd: '',
        isIdentity: '',
        name: '',
        // {"telephone":"待编辑","email":"待编辑","wechatNo":"待编辑","avatarUrl":"1","openId":"o34gB5S5NGkVZoSaTro9pNsCip0s","company":"待编辑","duties":"待编辑","companyBrief":"待编辑","companyWebsite":"待编辑","companyAddress":"待编辑","visitingAcrd":"待编辑","isIdentity":"待编辑","name":"12138"}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userInfo');
        let {telephone, email, wechatNo, avatarUrl, company, duties, companyBrief, companyWebsite, companyAddress, visitingAcrd, isIdentity, name} = userInfo;
        this.setData({
            telephone, email, wechatNo, avatarUrl, company, duties, companyBrief, companyWebsite, companyAddress, visitingAcrd, isIdentity, name
        })
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

    bindNameInput (e) {
        this.setData({
            name: e.detail.value
        })
    },
    bindDutiesInput (e) {
        this.setData({
            duties: e.detail.value
        })
    },
    bindTelInput (e) {
        this.setData({
            telephone: e.detail.value
        })
    },
    bindBriefInput (e) {
        this.setData({
            companyBrief: e.detail.value
        })
    },
    bindEmailInput (e) {
        this.setData({
            email: e.detail.value
        })
    },
    bindCompanyInput (e) {
        this.setData({
            company: e.detail.value
        })
    },
    bindWebsiteInput (e) {
        this.setData({
            companyWebsite: e.detail.value
        })
    },
    bindAddressInput (e) {
        this.setData({
            companyAddress: e.detail.value
        })
    },
    bindWechatNoInput (e) {
        this.setData({
            wechatNo: e.detail.value
        })
    },

    bindSaveInfo () {
        let openId = wx.getStorageSync('openId');
        if (this.data.name === '' || this.data.duties === '' || this.data.telephone === '' || this.data.companyBrief === '' || this.data.email === '') {
            wx.showToast({
                title: '请完善必填信息！',
                icon: 'none'
            })
            return
        };
        let userInfo = {
            openId,
            telephone: this.data.telephone,
            email: this.data.email,
            wechatNo: this.data.wechatNo,
            avatarUrl: this.data.avatarUrl,
            company: this.data.company,
            duties: this.data.duties,
            companyBrief: this.data.companyBrief,
            companyWebsite: this.data.companyWebsite,
            companyAddress: this.data.companyAddress,
            visitingAcrd: this.data.visitingAcrd,
            isIdentity: this.data.isIdentity,
            name: this.data.name
        };
        _.saveInfo(userInfo, {
            success (res) {
                res = res.data
                if (res.code === 200) {
                    wx.showToast({
                        title: '保存成功！',
                        icon: 'none'
                    })
                    wx.setStorageSync('userInfo', userInfo);
                }
            }
        })
    }
})