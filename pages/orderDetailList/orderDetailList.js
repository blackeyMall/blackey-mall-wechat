import ajax from "../../utils/net";
let app = getApp()
let _ = {
    getProcess: (data, handler) => {
        ajax.POST("/artisan/serviceprocess/query/process", data, handler);
    },
    getMaterials: (data, handler) => {
        ajax.GET("/artisan/material/order", data, handler);
    }
};
Page({
    data: {
        orderInfo: {},
        timeLine: [],
        materials: [],
        type: 2
    },
    onLoad: function(options) {
        app.globalData.checkSession()
        // 生命周期函数--监听页面加载
        this.setData({
          orderInfo: JSON.parse(decodeURIComponent(options.orderInfo)),
            type: parseInt(options.type)
        });
        let _this = this
        if (parseInt(options.type) === 0) {
            // 服务进度
            _.getProcess({
                orderId: this.data.orderInfo.id
            }, {
                success: function(res) {
                    res = res.data
                    _this.setData({
                        timeLine: res.data.list
                    })
                    // _this.timeLine = res.data.list
                }
            })
        } else if (parseInt(options.type) === 1) {
            // 材料清单
            _.getMaterials({
                orderId: this.data.orderInfo.id
            }, {
                success: function(res) {
                    res = res.data
                    _this.setData({
                        materials: [res.data]
                    })
                    // _this.timeLine = res.data.list
                }
            })
        } else {
            // 脏数据
        }
    },
    previewProcessImg: function (e) {
      console.log(e.currentTarget.dataset.index);
      var itemIndex = e.currentTarget.dataset.itemindex;
      var index = e.currentTarget.dataset.index;
      var imgArr = this.data.timeLine[itemIndex].pics;
      wx.previewImage({
        current: imgArr[index],     //当前图片地址
        urls: imgArr,               //所有要预览的图片的地址集合 数组形式
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
    previewMaterialImg: function (e) {
      var imgArr = [];
      imgArr.push(this.data.materials[0].picUrl);
      wx.previewImage({
        current: imgArr[0],     //当前图片地址
        urls: imgArr,               //所有要预览的图片的地址集合 数组形式
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
    // 跳转服务反馈页
    onFeedBack (e) {
        wx.navigateTo({
          url: `/pages/feedback/feedback?orderInfo=${encodeURIComponent(JSON.stringify(e.currentTarget.dataset))}`
        })
    }
});
