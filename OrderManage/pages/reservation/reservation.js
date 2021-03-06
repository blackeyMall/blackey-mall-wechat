import ajax from "../../utils/net";
let app = getApp();

Page({
    data: {
        serviceItem: {},
        name: "",
        // tel: "",
        date: new Date().toLocaleDateString(),
        address: "",
        remark: "",
        reservationFlag: true,
        phoneNumber: ""
    },
    onLoad: function(options) {
        // 生命周期函数--监听页面加载
        let phoneNumber = wx.getStorageSync('phoneNumber')
        if (phoneNumber) {
            this.setData({
                phoneNumber
            })
        }
        app.globalData.checkOpenId();
        this.setData({
            serviceItem: JSON.parse(decodeURIComponent(options.serviceItem))
        });
    },
    onShow: function() {
        // 生命周期函数--监听页面显示
    },

    // 输入框focus事件
    bindNameChanged(e) {
        this.setData({
            name: e.detail.value
        });
    },
    bindTelChanged(e) {
        this.setData({
            phoneNumber: e.detail.value
        });
    },
    bindDateChange(e) {
        this.setData({
            date: e.detail.value
        });
    },
    bindAddressChanged(e) {
        this.setData({
            address: e.detail.value
        });
    },
    bindRemarkChanged(e) {
        this.setData({
            remark: e.detail.value
        });
    },
    onCommitReservation() {
      if (this.data.phoneNumber === "") {
            wx.showModal({
                title: "温馨提示",
                content: "手机号必填！",
                showCancel: false
            });
            return;
        } else {
            if (this.data.reservationFlag) {
                this.data.reservationFlag = false;
                ajax.POST(
                    "/artisan/order/booking",
                    {
                        projectId: this.data.serviceItem.id,
                        openId: wx.getStorageSync("openid"),
                        name: this.data.name,
                        telephone: this.data.phoneNumber,
                        serviceTime: this.data.date,
                        address: this.data.address,
                        remark: this.data.remark
                    },
                    {
                        success: function(res) {
                            res = res.data;
                            if (res.code === 200) {
                                wx.showModal({
                                    title: "温馨提示",
                                    content:
                                        "预约成功，请等待工作人员电话联系！",
                                    showCancel: false,
                                    success: () => {
                                        wx.switchTab({
                                            url: "/pages/orderCenter/orderCenter"
                                        });
                                    }
                                });
                            } else {
                                wx.showModal({
                                    title: "温馨提示",
                                    content: "预约失败，请稍后重试！",
                                    showCancel: false
                                });
                                this.data.reservationFlag = true;
                            }
                        },
                        fail: function() {
                            wx.showModal({
                                title: "温馨提示",
                                content: "请误重复预约！",
                                showCancel: false
                            });
                            this.data.reservationFlag = true;
                        }
                    }
                );
            } else {
                wx.showModal({
                    title: "温馨提示",
                    content: "请误重复预约！",
                    showCancel: false
                });
            }
        }
    }
});
