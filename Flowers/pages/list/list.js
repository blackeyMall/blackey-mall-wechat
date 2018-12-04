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
                type: 'DEFAULT',
                text: "全部订单"
            },
            {
                type: 'CANCEL',
                text: "已取消"
            },
            {
                type: 'SERVICE',
                text: "服务中"
            },
            {
                type: 'DONE',
                text: "已完成"
            }
        ],
        // 当前导航
        activeNav: 'DEFAULT',
        // 订单列表
        orderList: [],
        // mock订单数据
        // 暂无订单图片地址
        emptyImgUrl: "https://www.ssqushe.com/img/flower/order-empty.png",
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
        let activeNav = 'DEFAULT';
        if (type) {
            activeNav = type;
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
            // 当前选中订单类别
            tradeStatus: this.data.activeNav,
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
                            let {id, goodsNo, goodsName, goodsDesc, goodsType, amount, tradeStatus} = el;
                            let imgUrl = '', goodsTypeName = '';
                            switch (goodsNo) {
                                case '4e02b726ed5f4bdab58d404df0b35786':
                                    imgUrl = 'https://www.ssqushe.com/img/flower/swiper/jbxm/1.jpg';
                                    break;
                                case '4e02b726ed5f4bdab58d404di0b35986':
                                    imgUrl = 'https://www.ssqushe.com/img/flower/swiper/wjsh/1.jpg';
                                    break;
                                case '4e02b726ed5f4bdab58d407df0b35986':
                                    imgUrl = 'https://www.ssqushe.com/img/flower/swiper/kpi/1.jpg';
                                    break;
                                case '4e02b726ed5f4bdab58d404df0b45986':
                                    imgUrl = 'https://www.ssqushe.com/img/flower/swiper/ylsx/1.jpg';
                                    break;
                            }
                            switch (goodsType) {
                                case '0':
                                    goodsTypeName = '单周单次'
                                    break;
                                case '1':
                                    goodsTypeName = '三周三次'
                                    break;
                            }
                            let temp = {
                                id, goodsNo, goodsName, goodsDesc, goodsTypeName, amount: parseInt(amount) / 100, status: tradeStatus.name, imgUrl
                            }
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        // 显示加载图标
        wx.showLoading({
            title: "加载中..."
        });
        this.onLoadData(this.data.current + 1, 1);
    },

    bindDeleteOrder (e) {
        console.log(e.currentTarget.dataset.orderno);
    }
});
