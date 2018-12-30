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
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 检测登录
        app.globalData.checkLoginStatus();
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
        let telReg = /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/;
        let emailReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
        if (this.data.name === '') {
            wx.showToast({
                title: '姓名不能为空！',
                icon: 'none'
            })
            return
        };
        if (this.data.duties === '') {
            wx.showToast({
                title: '职务不能为空！',
                icon: 'none'
            })
            return
        };
        if (!telReg.test(this.data.telephone)) {
            wx.showToast({
                title: '手机号码有误！',
                icon: 'none'
            })
            return
        };
        if (this.data.companyBrief === '') {
            wx.showToast({
                title: '公司简称不能为空！',
                icon: 'none'
            })
            return
        };
        if (!emailReg.test(this.data.email)) {
            wx.showToast({
                title: '邮箱格式有误！',
                icon: 'none'
            })
            return
        };
        let userInfo = {
            openId: wx.getStorageSync('openId'),
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