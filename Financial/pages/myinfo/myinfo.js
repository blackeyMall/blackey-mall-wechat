// pages/info/info.js
import ajax from "../../utils/ajax";

let app = getApp();
let _ = {
    getInfoList: (data, handler) => {
        ajax.post("/finance/requirement/list", data, handler);
    },
    like: (data, handler) => {
        ajax.post("/finance/like/require/save", data, handler);
    },
    follow: (data, handler) => {
        ajax.post("/finance/follow/require/save", data, handler);
    }
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        infoList: [],
        current: 1,
        size: 5,
        total: 0,
        openId: ''
    },

    // 获取信息列表
    onGetInfoList (page, isHideLoading) {
        let data = {
            openId: wx.getStorageSync('openId'), //openid
            current: page, // 当前页
            size: this.data.size, // 每页条数
            category: 'DEFAULT', // 主分类
            tableCode: 'MY_CREATE' // 子分类
        };
        let _this = this;
        _.getInfoList(data, {
            success (res) {
                res = res.data;
                if (res.code === 200) {
                    let tempInfoList = [];
                    let records = res.data.records;
                    if (records !== null) {
                        records.forEach(el => {
                            let {id, openId, avatarUrl, name, company, duties, content, followNum, isFollow, likeNum, isLike, isRecommend, label, images} = el;
                            let labelList = label === null ? [] : label.split(',');
                            company === null ? company = '公司未编辑' : company;
                            duties === null ? duties = '职务未编辑' : duties;
                            isRecommend === null ? isRecommend = 0 : isRecommend = 1;
                            images === null ? images = [] : images;
                            tempInfoList.push({
                                id, openId, avatarUrl, name, company, duties, content, followNum, isFollow, likeNum, isLike, isRecommend, labelList, images
                            })
                        });

                        _this.setData({
                            infoList: _this.data.infoList.concat(tempInfoList)
                        });
                    }
                    _this.setData({
                        current: res.data.current,
                        total: res.data.total
                    })
                }
            }
        })
        if (isHideLoading) {
            wx.hideLoading()
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 检测登录
        if (app.globalData.checkLoginStatus()) {
            this.setData({
                infoList: [],
                activeNavSub: 'DEFAULT',
                openId: wx.getStorageSync('openId')
            })
            this.onGetInfoList(1);
        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let totalPage = Math.ceil(this.data.total / this.data.size);
        if (this.data.current < totalPage) {
            // 显示加载图标
            wx.showLoading({
                title: '加载中...',
            })
            this.onGetInfoList(this.data.current + 1, 1)
        } else {
            wx.showToast({
                title: '已经到底啦！',
                icon: 'none'
            })
        }
    },

    bindPreviewImg (e) {
        let imgList = e.currentTarget.dataset.imglist;
        wx.previewImage({
            urls: imgList
        });
    }
})