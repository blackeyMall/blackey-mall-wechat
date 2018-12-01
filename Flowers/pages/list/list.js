// 获取应用程序实例
let app = getApp();
import ajax from "../../utils/ajax";

let _ = {
    getOrderList: (data, handler) => {
        ajax.post('/flowers/order/list', data, handler);
    }
};

// pages/list/list.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        navList: [
            {
                type: 1,
                text: "全部订单"
            },
            {
                type: 2,
                text: "待付款"
            },
            {
                type: 3,
                text: "服务中"
            },
            {
                type: 4,
                text: "已完成"
            },
            {
                type: 5,
                text: "已评价"
            }
        ],
        activeNav: 1,
        // orderList: [],
        orderList: [
            {
                orderNo: 123123123123123,
                price: 380,
                status: "正在配送",
                title: "加班续命系列",
                des: "提醒经常加班的她，定时养个眼，劳逸结合",
                type: "单品单次",
                imgUrl: "../../images/test.png"
            },
            {
                orderNo: 123123123123123,
                price: 880,
                status: "正在配送",
                title: "压力山小系列",
                des: "提醒经常加班的她，定时养个眼，劳逸结合",
                type: "三周三次",
                imgUrl: "../../images/test.png"
            },
            {
                orderNo: 123123123123123,
                price: 380,
                status: "正在配送",
                title: "加班续命系列",
                des: "提醒经常加班的她，定时养个眼，劳逸结合",
                type: "单品单次",
                imgUrl: "../../images/test.png"
            },
            {
                orderNo: 123123123123123,
                price: 880,
                status: "正在配送",
                title: "压力山小系列",
                des: "提醒经常加班的她，定时养个眼，劳逸结合",
                type: "三周三次",
                imgUrl: "../../images/test.png"
            }
        ],
        emptyImgUrl: "../../images/order-empty.png",
        current: 1,
        size: 5
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let type = options.type;
        console.log(type);
        let activeNav = 1;
        if (parseInt(type)) {
            activeNav = parseInt(type);
        }
        this.setData({
            activeNav
        });
    },

    bindSwitchList(e) {
        let active = e.currentTarget.dataset.active;
        if (active !== this.data.activeNav) {
            this.setData({
                activeNav: active
            });
        }
    },

    onLoadData(page, isHideLoading) {
        let _this = this;
        _.getOrderList(
            {
                openId: wx.getStorageSync("openid"),
                orderStatus: this.data.activeItem,
                current: page,
                size: this.data.size
            },
            {
                success(res) {
                    res = res.data;
                    if (res.code === 200) {
                        let orderList = [];
                        res.data.records.forEach(el => {
                            let { orderStatus, ...temp } = el;
                            if (orderStatus.name === "预约中") {
                                orderStatus.statusClass = "info";
                            } else if (orderStatus.name === "确认中") {
                                orderStatus.statusClass = "danger";
                            } else if (orderStatus.name === "服务中") {
                                orderStatus.statusClass = "primary";
                            } else if (orderStatus.name === "已完成") {
                                orderStatus.statusClass = "success";
                            }
                            temp.orderStatus = orderStatus;
                            orderList.push(temp);
                        });
                        _this.setData({
                            orderList: _this.data.orderList.concat(orderList),
                            current: res.data.current
                        });
                    }
                }
            }
        );
        if (isHideLoading) {
            wx.hideLoading();
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // 检索登录状态
        app.globalData.onCheckLoginStatus();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        // 显示加载图标
        wx.showLoading({
            title: "加载中..."
        });
        this.onLoadData(this.data.current + 1, 1);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
});
