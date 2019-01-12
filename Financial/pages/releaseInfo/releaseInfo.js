// pages/releaseInfo/releaseInfo.js
import ajax from "../../utils/ajax";

let app = getApp();
let _ = {
    releaseInfo: (data, handler) => {
        ajax.post("/finance/requirement/save", data, handler);
    },
    postfile: (file, filename, handler) => {
        ajax.postfile("/finance/file/upload", file, filename, handler);
    }
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navList: [
            {
                category: 'PROJECT',
                text: '找项目'
            },
            {
                category: 'FINANCE',
                text: '找资金'
            }
        ],
        activeNav: 'PROJECT',
        content: '',
        labelList: [],
        labelInput: '',
        images: [],
        isModalOpen: false
    },

    bindChangeNav (e) {
        if (e.currentTarget.dataset.category !== this.data.activeNav) {
            this.setData({
                activeNav: e.currentTarget.dataset.category
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 检测登录
        app.globalData.checkLoginStatus();
        // let openId = wx.getStorageSync('openId');
        // let _this = this;
        // if (openId && openId !== '') {
            
        // }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    bindTextareaInput (e) {
        this.setData({
            content: e.detail.value
        })
    },

    bindLabelInput (e) {
        this.setData({
            labelInput: e.detail.value
        });
        console.log(e.detail.value);
    },

    // 
    bindReleaseInfo (e) {
        if (this.data.content !== '') {
            // let _this = this;
            let openId = wx.getStorageSync('openId');
            _.releaseInfo({
                openId,
                category: this.data.activeNav,
                content: this.data.content,
                label: this.data.labelList.join(','),
                images: this.data.images
            }, {
                success (res) {
                    res = res.data;
                    if (res.code === 200) {
                        // let pages = getCurrentPages();
                        // let prevPage = pages[pages.length - 2];
                        // prevPage.setData({
                        //     isReleaseBack: 1,
                        //     releaseBackProject: _this.data.activeNav
                        // })
                        wx.switchTab({
                            url: '/pages/info/info'
                        })
                    } else {
                        wx.showToast({
                            title: '服务异常，请稍后再试！',
                            icon: 'none'
                        })
                    }
                }
            })
        } else {
            wx.showToast({
                title: '请填写信息详情！',
                icon: 'none'
            })
        }
    },

    bindOpenModal () {
        this.setData({
            isModalOpen: true
        });
    },

    bindCloseModal () {
        this.setData({
            isModalOpen: false,
            labelInput: ''
        });
    },

    bindAddLabel () {
        let labelInput = this.data.labelInput.replace(/\s+/, '');
        if (labelInput === '') {
            wx.showToast({
                title: '标签不能为空！',
                icon: 'none'
            });
            return;
        };
        let labelList = this.data.labelList;
        if (labelList.length >= 5) {
            wx.showToast({
                title: '标签上限5个！',
                icon: 'none'
            });
            return;
        }
        if (labelInput !== '') {
            labelList.push(labelInput);
            this.setData({
                labelList,
                labelInput: ''
            });
        }
    },

    bindDeleteLabel (e) {
        let index = e.currentTarget.dataset.index;
        let labelList = this.data.labelList;
        labelList.splice(index, 1);
        this.setData({
            labelList
        });
    },

    bindChooseImage () {
        let _this = this
        wx.chooseImage({
            count: 1, // 最多可以选择的图片张数，默认9
            sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function(res){
                _.postfile(res.tempFiles[0].path, "file", {
                    success: function (res) {
                        res = JSON.parse(res.data);
                        if (res.code === 200) {
                            let images = _this.data.images;
                            images.push(res.data);
                            _this.setData({
                                images
                            });
                        };
                    }
                });
            },
            fail: function(err) {
                console.log(err);
            },
        })
    },
})