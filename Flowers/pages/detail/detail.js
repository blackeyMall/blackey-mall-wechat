// 获取app应用实例
let app = getApp();
import ajax from '../../utils/ajax';

let _ = {
    sendOrder: (data, handler) => {
        ajax.post('/flowers/order/createOrder', data, handler);
    },
    getTelNum: (data, handler) => {
        ajax.post('/flowers/wx/mobile', data, handler);
    }
}

// pages/detail/detail.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 手机号是否已授权获取
        hasTelNum: false,
        // 鲜花系列分类 - 首页传递的数据
        category: '',
        // 系列ID
        seriesId: '',
        // --- 幻灯片设置 start ---
        indicatorDots: true, // 显示指示圆点
        autoplay: true, // 自动播放
        interval: 3000, // 滚动时长
        indicatorColor: "rgba(66, 66, 66, .3)", // 圆点颜色
        indicatorActiveColor: "#f7e3da", // 当前圆点颜色
        swiperImgUrls: [], //当前幻灯片列表
        // 加班续命系列图片
        jbxmImgUrls: [
            'https://www.ssqushe.com/img/flower/swiper/jbxm/1.jpg',
            'https://www.ssqushe.com/img/flower/swiper/jbxm/2.jpg',
            'https://www.ssqushe.com/img/flower/swiper/jbxm/3.jpg'
        ],
        // 完结撒花系列图片
        wjshImgUrls: [
            'https://www.ssqushe.com/img/flower/swiper/wjsh/1.jpg',
            'https://www.ssqushe.com/img/flower/swiper/wjsh/2.jpg',
            'https://www.ssqushe.com/img/flower/swiper/wjsh/3.jpg'
        ],
        // 躺赢KPI系列图片
        kpiImgUrls: [
            'https://www.ssqushe.com/img/flower/swiper/kpi/1.jpg',
            'https://www.ssqushe.com/img/flower/swiper/kpi/2.jpg',
            'https://www.ssqushe.com/img/flower/swiper/kpi/3.jpg'
        ],
        // 压力山小系列图片
        ylsxImgUrls: [
            'https://www.ssqushe.com/img/flower/swiper/ylsx/1.jpg',
            'https://www.ssqushe.com/img/flower/swiper/ylsx/2.jpg',
            'https://www.ssqushe.com/img/flower/swiper/ylsx/3.jpg'
        ],
        // --- 幻灯片设置 end ---

        // 详情信息
        detailTitle: '加班续命系列',
        detailDes: '提醒经常加班的她，定时养个眼，劳逸结合',
        detailPriceStart: 380,
        detailPriceEnd: 880,
        advantageList: [
            '首花实样',
            '统一每周一配送',
            '仅限上海地区（外环以内）'
        ],
        detailImgUrl: '',
        detail: {
            title: '',
            des: '',
            priceStart: 0,
            priceEnd: 0,
            advantageList: [],
            imgUrl: '',
        },
        detailJbxm: {
            title: '加班续命系列',
            des: '提醒经常加班的她，定时养个眼，劳逸结合',
            priceStart: 380,
            priceEnd: 880,
            advantageList: [
                '首花实样',
                '统一每周一配送',
                '仅限上海地区（外环以内）'
            ],
            imgUrl: 'https://www.ssqushe.com/img/flower/detail-jbxm.png',
        },
        detailWjsh: {
            title: '完结撒花系列',
            des: '犒赏项目达标的她，为成功的喜悦手动点赞',
            priceStart: 380,
            priceEnd: 880,
            advantageList: [
                '首花实样',
                '统一每周一配送',
                '仅限上海地区（外环以内）'
            ],
            imgUrl: 'https://www.ssqushe.com/img/flower/detail-wjsh.png',
        },
        detailKpi: {
            title: '躺赢KPI系列',
            des: '为任务艰巨的她，送个好彩头，KPI轻松搞定',
            priceStart: 380,
            priceEnd: 880,
            advantageList: [
                '首花实样',
                '统一每周一配送',
                '仅限上海地区（外环以内）'
            ],
            imgUrl: 'https://www.ssqushe.com/img/flower/detail-kpi.png',
        },
        detailYlsx: {
            title: '压力山小系列',
            des: '关怀各种鸭梨的她，有我在，什么都不是事儿',
            priceStart: 380,
            priceEnd: 880,
            advantageList: [
                '首花实样',
                '统一每周一配送',
                '仅限上海地区（外环以内）'
            ],
            imgUrl: 'https://www.ssqushe.com/img/flower/detail-ylsx.png',
        },
        detailWjshImgUrl: 'https://www.ssqushe.com/img/flower/detail-wjsh.png',
        detailKpiImgUrl: 'https://www.ssqushe.com/img/flower/detail-kpi.png',
        detailYlsxImgUrl: 'https://www.ssqushe.com/img/flower/detail-ylsx.png',

        // 价格列表
        priceList: [
            {
                type: '0',
                price: '380',
                imgUrl: 'https://www.ssqushe.com/img/flower/once-price.png'
            },
            {
                type: '1',
                price: '880',
                imgUrl: 'https://www.ssqushe.com/img/flower/weeky-price.png'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 设置当前详情页信息
        let activeSeries = [], detail = {};
        switch (options.category) {
            case 'jbxm':
                activeSeries = this.data.jbxmImgUrls
                detail = this.data.detailJbxm
                break;
            case 'wjsh':
                activeSeries = this.data.wjshImgUrls
                detail = this.data.detailWjsh
                break;
            case 'kpi':
                activeSeries = this.data.kpiImgUrls
                detail = this.data.detailKpi
                break;
            case 'ylsx':
                activeSeries = this.data.ylsxImgUrls
                detail = this.data.detailYlsx
                break;
        }
        this.setData({
            swiperImgUrls: activeSeries,
            seriesId: options.seriesId,
            detail
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // 检索登录状态
        app.globalData.onCheckLoginStatus();
        // 检索手机号
        let telNum = wx.getStorageSync('telNum');
        let hasTelNum = true
        if (telNum) {
            hasTelNum = true
        } else {
            wx.showModal({
                title: '温馨提示',
                content: '下单前请先授权手机号！',
                showCancel: false
            })
            hasTelNum = false
        }
        this.setData({
            hasTelNum
        })
    },

    bindPayment(e) {
        let _this = this;
        wx.showModal({
            title: '订单确认',
            content: '需要现在下单吗？',
            success (res) {
                console.log(res);
                if (res.confirm) {
                    let params = {
                        openId: wx.getStorageSync('openId'), // openId
                        totalFee: e.currentTarget.dataset.price * 100, // 总价格
                        goodsType: e.currentTarget.dataset.type, // 0 一周一次  1 三周三次
                        goodsNo: _this.data.seriesId, // 系列ID
                        goodsName: _this.data.detail.title, // 名称
                        goodsDesc: _this.data.detail.des // 简介
                    };
                    _.sendOrder(params, {
                        success (res) {
                            res = res.data
                            wx.requestPayment({
                                timeStamp: res.data.timeStamp,
                                nonceStr: res.data.nonceStr,
                                package: res.data.packageValue,
                                signType: "MD5",
                                paySign: res.data.paySign,
                                success(res) {
                                    wx.showToast({
                                        title: '支付成功',
                                        icon: 'success',
                                        duration: 2000,
                                        success (res) {
                                            wx.navigateTo({
                                                url: `/pages/list/list?type=SERVICE`
                                            })
                                        }
                                    })
                                }
                            });
                        }
                    })
                } else {
                    wx.showToast({
                        title: '已取消',
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail (error) {
                wx.showToast({
                    title: '加载失败',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },

    // 获取手机号
    onGotPhoneNumber (e) {
        if (!e.detail.encryptedData) { return }
        let data = {}, _this = this;
        let openId = wx.getStorageSync('openId');
        let sessionKey = wx.getStorageSync('sessionKey');
        data.openId =openId
        data.encrypData = e.detail.encryptedData
        data.iv = e.detail.iv
        data.sessionKey = sessionKey
        _.getTelNum(data, {
            success (res) {
                res = res.data
                if (res.code === 200) {
                    wx.setStorageSync('telNum', res.data)
                    _this.setData({
                        hasTelNum: true
                    })
                }
            }
        })
    },

    // 返回首页
    bindGoIndex () {
        wx.switchTab({
            url: '../index/index'
        })
    }
});
