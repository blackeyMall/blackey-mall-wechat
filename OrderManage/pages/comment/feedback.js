import ajax from "../../utils/net";
let app = getApp()
Page({
    data: {
        date: new Date().toLocaleDateString(),
        orderInfo: {},
        picUrl: '',
        pics: [],
        des: '',
        autoFocus: true
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
        let _this = this
        if (this.data.des !== '') {
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
        } else {
            wx.showModal({
                title: '温馨提示',
                content: '问题描述不能为空！',
                showCancel: false
            })
        }
    },
    bindChooseImage () {
        let _this = this
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
    }
});
