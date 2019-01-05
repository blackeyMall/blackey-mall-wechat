import ajax from "../../utils/net";
let app = getApp()
Page({
    data: {
        date: new Date().toLocaleDateString(),
        orderInfo: {},
        picUrl: '',
        pics: [],
        des: '',
        attitudeStarList: [
            {
                active: false,
                index: 0
            },
            {
                active: false,
                index: 1
            },
            {
                active: false,
                index: 2
            },
            {
                active: false,
                index: 3
            },
            {
                active: false,
                index: 4
            }
        ],
        speedStarList: [
            {
                active: false,
                index: 0
            },
            {
                active: false,
                index: 1
            },
            {
                active: false,
                index: 2
            },
            {
                active: false,
                index: 3
            },
            {
                active: false,
                index: 4
            }
        ],
        serviceStatus: 0,
        responseSpeed: 0
    },
    onLoad: function(options) {
        // 生命周期函数--监听页面加载
        // app.globalData.checkSession()
        app.globalData.checkOpenId()
        // console.log(options)
        this.setData({
          orderInfo: JSON.parse(decodeURIComponent(options.orderInfo))
        })
    },
    bindDesChange (e) {
        this.setData({
            des: e.detail.value
        })
    },
    onFeedBack () {
        let _this = this;
        if (this.data.des === '') {
            wx.showToast({
                title: '请输入描述内容！',
                icon: 'none'
            });
            return;
        };
        if (parseInt(this.data.orderInfo.type) === 1) {
            ajax.POST('/artisan/comment/save', {
                comment: _this.data.des,
                serviceStatus: _this.data.serviceStatus,
                responseSpeed: _this.data.responseSpeed,
                picUrl: _this.data.pics,
                serviceId: _this.data.orderInfo.id
            }, {
                success: function(res) {
                    res = res.data
                    if (res.code === 200) {
                        wx.showToast({
                            title: '评价成功！',
                            icon: 'none'
                        });
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1000);
                    }
                }
            });
        } else {
            ajax.POST('/artisan/feedback/save', {
                openId: wx.getStorageSync('openid'),
                content: _this.data.des,
                picUrl: _this.data.pics,
                orderId: _this.data.orderInfo.id,
                feedBackType: _this.data.orderInfo.statusname === '服务中' ? 'BYUSER' : 'AFTERSALES'
            }, {
                success: function(res) {
                    res = res.data
                    if (res.code === 200) {
                        wx.showModal({
                            title: '温馨提示',
                            content: '反馈成功，请等待客服联系！',
                            showCancel: false,
                            success: function() {
                                wx.navigateBack({
                                    delta: 1
                                })
                            }
                        })
                    }
                }
            })
        };
    },
    bindChooseImage () {
        let _this = this;
        wx.chooseImage({
            count: 1, // 最多可以选择的图片张数，默认9
            sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function(res){
                ajax.POSTFILE('/artisan/file/upload', 
                  res.tempFiles[0].path, "file", {
                    success: function (res) {
                        res = res.data
                        console.log(JSON.parse(res))
                        let pics = _this.data.pics
                        pics.push(JSON.parse(res).data)
                        _this.setData({pics})
                    }}
                )
            },
            fail: function(err) {
                console.log(err)
            },
        })
    },
    bindAttitudeStarClick (e) {
        let index = e.currentTarget.dataset.index;
        let attitudeStarList = this.data.attitudeStarList;
        this.setData({
            serviceStatus: index,
        });
        attitudeStarList.forEach(el => {
            el.index <= index ? el.active = true : el.active = false;
        });
        this.setData({
            attitudeStarList
        });
    },
    bindSpeedStarClick (e) {
        let index = e.currentTarget.dataset.index;
        let speedStarList = this.data.speedStarList;
        this.setData({
            responseSpeed: index
        });
        speedStarList.forEach(el => {
            el.index <= index ? el.active = true : el.active = false;
        });
        this.setData({
            speedStarList
        });
    }
});
