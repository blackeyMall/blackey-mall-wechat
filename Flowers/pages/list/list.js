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
        // 导航列表
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
        // 当前导航
        activeNav: 1,
        // 订单列表
        // orderList: [],
        // mock订单数据
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
        // 暂无订单图片地址
        emptyImgUrl: "../../images/order-empty.png",
        // 当前页码
        current: 1,
        // 每页显示条数
        size: 5
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 设置当前分类
        let type = options.type;
        let activeNav = 1;
        if (parseInt(type)) {
            activeNav = parseInt(type);
        }
        this.setData({
            activeNav
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // 检索登录状态
        app.globalData.onCheckLoginStatus();
        // 页面进入清空订单列表 将当前页设置为第1页
        this.setData({
            orderList: [],
            current: 1
        });
        // 加载订单列表
        this.onLoadData(1)
    },

    bindSwitchList(e) {
        let active = e.currentTarget.dataset.active;
        if (active !== this.data.activeNav) {
            this.setData({
                activeNav: active,
                orderList: [],
                current: 1
            });
            this.onLoadData(1)
        }
    },

    onLoadData(page, isHideLoading) {
        let _this = this;
        let data = {
            openId: wx.getStorageSync("openId"), // openId
            // 当前选中订单类别  说明： 1 待付款  2 服务中  3 已完成  4 待评价  5 售后
            activeNav: this.data.activeNav,
            current: page, // 当前页页码
            size: this.data.size // 每页显示条数
        }
        _.getOrderList(
            data,
            {
                success(res) {
                    res = res.data;
                    if (res.code === 200) {
                        let orderList = [];
                        res.data.records.forEach(el => {
                            // 对返回数据进行二次处理
                            // ...
                            orderList.push(el);
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        // 显示加载图标
        wx.showLoading({
            title: "加载中..."
        });
        this.onLoadData(this.data.current + 1, 1);
    }
});
