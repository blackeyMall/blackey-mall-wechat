// 获取app应用实例
let app = getApp();

Page({
    data: {
        // 点击价格滚动到商品页
        toView: '',
        // banner图
        bannerImgUrl: 'https://www.ssqushe.com/img/flower/banner.png',
        // 价格图片地址
        priceImgUrls: [
            'https://www.ssqushe.com/img/flower/once.png',
            'https://www.ssqushe.com/img/flower/weeky.png'
        ],
        deliveryTime: '统一配送时间：周一（全天）',
        // 鲜花系列标题图
        seriesTitleImgUrl: 'https://www.ssqushe.com/img/flower/series/title-series.png',
        // 鲜花系列图
        seriesList: [
            {
                // 加班续命系列
                seriesId: '4e02b726ed5f4bdab58d404df0b35786',
                category: 'jbxm',
                imgUrl: 'https://www.ssqushe.com/img/flower/series/jbxm.png',
                desImgUrl: 'https://www.ssqushe.com/img/flower/series/jbxm-des.png'
            },
            {
                // 完结撒花
                seriesId: '4e02b726ed5f4bdab58d404di0b35986',
                category: 'wjsh',
                imgUrl: 'https://www.ssqushe.com/img/flower/series/wjsh.png',
                desImgUrl: 'https://www.ssqushe.com/img/flower/series/wjsh-des.png'
            },
            {
                // 躺赢KPI
                seriesId: '4e02b726ed5f4bdab58d407df0b35986',
                category: 'kpi',
                imgUrl: 'https://www.ssqushe.com/img/flower/series/kpi.png',
                desImgUrl: 'https://www.ssqushe.com/img/flower/series/kpi-des.png'
            },
            {
                // 压力山小
                seriesId: '4e02b726ed5f4bdab58d404df0b45986',
                category: 'ylsx',
                imgUrl: 'https://www.ssqushe.com/img/flower/series/ylsx.png',
                desImgUrl: 'https://www.ssqushe.com/img/flower/series/ylsx-des.png'
            }
        ],
        // 系列图标签地址
        seriesTagImgUrl: 'https://www.ssqushe.com/img/flower/icon-tag.png',
        // 系列按钮广西
        seriesBtnText: 'BUY NOW',
        // 鲜花样本标题图
        sampleTitleImgUrl: 'https://www.ssqushe.com/img/flower/sample-title.png',
        // 鲜花样本图
        sampleImgUrl: 'https://www.ssqushe.com/img/flower/sample.png'
    },
    onLoad: function (options) {
        // 获取二维码参数
        if (options.scene) {
            wx.setStorageSync('scene', options.scene);
        } else {
            wx.removeStorageSync('scene');
        }
    },
    onShow: function() {
        // 检索登录状态
        app.globalData.onCheckLoginStatus();
    },
    bindSetToView () {
        this.setData({
            toView: 'series'
        })
    },
    // 跳转详情页
    bindGoDetail (e) {
        wx.navigateTo({
            url: `/pages/detail/detail?seriesId=${e.currentTarget.dataset.seriesid}&category=${e.currentTarget.dataset.category}`
        })
    }
});