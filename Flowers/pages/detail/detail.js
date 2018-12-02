// 获取app应用实例
let app = getApp();
import ajax from '../../utils/ajax';

let _ = {
    sendOrder: (data, handler) => {
        ajax.post('', data, handler);
    },
    getTelNum: (data, handler) => {
        ajax.post('/flowers/user/mobile', data, handler);
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
            '../../images/swiper/jbxm/1.jpg',
            '../../images/swiper/jbxm/2.jpg',
            '../../images/swiper/jbxm/3.jpg'
        ],
        // 完结撒花系列图片
        wjshImgUrls: [
            '../../images/swiper/wjsh/1.jpg',
            '../../images/swiper/wjsh/2.jpg',
            '../../images/swiper/wjsh/3.jpg'
        ],
        // 躺赢KPI系列图片
        kpiImgUrls: [
            '../../images/swiper/kpi/1.jpg',
            '../../images/swiper/kpi/2.jpg',
            '../../images/swiper/kpi/3.jpg'
        ],
        // 压力山小系列图片
        ylsxImgUrls: [
            '../../images/swiper/ylsx/1.jpg',
            '../../images/swiper/ylsx/2.jpg',
            '../../images/swiper/ylsx/3.jpg'
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
            imgUrl: '../../images/detail-jbxm.png',
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
            imgUrl: '../../images/detail-wjsh.png',
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
            imgUrl: '../../images/detail-kpi.png',
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
            imgUrl: '../../images/detail-ylsx.png',
        },
        detailWjshImgUrl: '../../images/detail-wjsh.png',
        detailKpiImgUrl: '../../images/detail-kpi.png',
        detailYlsxImgUrl: '../../images/detail-ylsx.png',

        // 价格列表
        priceList: [
            {
                type: '0',
                price: '380',
                imgUrl: '../../images/once-price.png'
            },
            {
                type: '1',
                price: '880',
                imgUrl: '../../images/weeky-price.png'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
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
            detail,
            hasTelNum
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // 检索登录状态
        app.globalData.onCheckLoginStatus();
    },

    bindPayment(e) {
        wx.showModal({
            title: '订单确认',
            content: '需要现在下单吗？',
            success (res) {
                let data = {
                    openId: wx.getStorage('openId'), // openId
                    totalFee: e.currentTarget.dataset.price, // 总价格
                    goodsType: e.currentTarget.dataset.type, // 0 一周一次  1 三周三次
                    goodsNo: this.data.seriesId, // 系列ID
                    goodsName: this.data.title, // 名称
                    goodsDesc: this.data.des // 简介
                };
                _.sendOrder(data, {
                    success (res) {
                        res = res.data
                        wx.requestPayment({
                            timeStamp: res.data.timeStamp,
                            nonceStr: res.data.nonceStr,
                            package: res.data.package,
                            signType: "MD5",
                            paySign: res.data.paySign,
                            success(res) {
                                wx.showToast({
                                    title: '支付成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                            },
                            fail(error) {
                                console.log(error)
                            }
                        });
                    }
                })
            }
        })
    },

    // 获取手机号
    onGotPhoneNumber (e) {
        if (!e.detail.encryptedData) { return }
        let data = {};
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
                    this.setData({
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
