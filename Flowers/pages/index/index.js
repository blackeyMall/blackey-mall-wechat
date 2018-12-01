// 获取app应用实例
let app = getApp();

Page({
    data: {
        // 点击价格滚动到商品页
        toView: '',
        // banner图
        bannerImgUrl: '../../images/banner.png',
        // 价格图片地址
        priceImgUrls: [
            '../../images/once.png',
            '../../images/weeky.png'
        ],
        deliveryTime: '统一配送时间：周一（全天）',
        // 鲜花系列标题图
        seriesTitleImgUrl: '../../images/series/title-series.png',
        // 鲜花系列图
        seriesList: [
            {
                // 加班续命系列
                category: 'jbxm',
                imgUrl: '../../images/series/jbxm.png',
                desImgUrl: '../../images/series/jbxm-des.png'
            },
            {
                // 完结撒花
                category: 'wjsh',
                imgUrl: '../../images/series/wjsh.png',
                desImgUrl: '../../images/series/wjsh-des.png'
            },
            {
                // 躺赢KPI
                category: 'kpi',
                imgUrl: '../../images/series/kpi.png',
                desImgUrl: '../../images/series/kpi-des.png'
            },
            {
                // 压力山小
                category: 'ylsx',
                imgUrl: '../../images/series/ylsx.png',
                desImgUrl: '../../images/series/ylsx-des.png'
            }
        ],
        // 系列图标签地址
        seriesTagImgUrl: '../../images/icon-tag.png',
        // 系列按钮广西
        seriesBtnText: 'BUY NOW',
        // 鲜花样本标题图
        sampleTitleImgUrl: '../../images/sample-title.png',
        // 鲜花样本图
        sampleImgUrl: '../../images/sample.png'
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
            url: `/pages/detail/detail?category=${e.currentTarget.dataset.category}`
        })
    }
});