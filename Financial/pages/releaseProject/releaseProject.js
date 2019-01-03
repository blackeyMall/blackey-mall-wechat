// pages/releaseProject/releaseProject.js
import ajax from "../../utils/ajax";

let app = getApp();
let _ = {
    releaseProject: (data, handler) => {
        ajax.post("/finance/project/save", data, handler);
    },
    sendBP: (data, handler) => {
        ajax.post("/finance/email/send", data, handler);
    },
    postfile: (file, filename, requestHandler) => {
        ajax.postfile("/finance/file/upload", file, filename, requestHandler)
    }
};

Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryList: [
            {
                category: 'STOCK',
                text: '股权项目'
            },
            {
                category: 'OTHER',
                text: '其他项目'
            }
        ],
        activeCategory: 'STOCK',
        cityArray: ['请选择', '河北省', '山西省', '吉林省', '辽宁省', '黑龙江省', '陕西省', '甘肃省', '青海省', '山东省', '福建省', '浙江省', '台湾省', '河南省', '湖北省', '湖南省', '江西省', '江苏省', '安徽省', '广东省', '海南省', '四川省', '贵州省', '云南省', '北京市', '上海市', '天津市', '重庆市', '内蒙古', '新疆', '宁夏', '广西', '西藏自治区', '香港', '澳门'],
        cityIndex: 0,
        financeRoundArray: ['请选择', '未知','未融资','种子轮','天使轮','Pre-A轮','A轮','A+轮','Pre-B轮','B轮','B+轮','C轮','C+轮','D轮','E轮及以后','新四板','新三板','Pre-IPO','并购','上市','战略投资','上市后','定增'],
        financeRound: 0,
        domainArray: ['请选择', '机器人','环保','化工','地产建筑','人工智能','医疗健康','硬件','能源矿产','汽车交通','教育','金融','电商','房产家居','光电','旅游','物流','企业服务','无人机','生产执照','农业','VR','工具','消费生活','文娱传媒','社交','材料','公共事业','体育'],
        domainIndex: 0,
        openId: '',
        name: '',
        brief: '',
        websiteUrl: '',
        financeAmount: '',
        projectDesc: '',
        logo: ''
    },

    bindRoundPickerChange (e) {
        this.setData({
            financeRound: parseInt(e.detail.value)
        })
    },

    bindCityPickerChange (e) {
        this.setData({
            cityIndex: parseInt(e.detail.value)
        })
    },

    bindDomainPickerChange (e) {
        this.setData({
            domainIndex: parseInt(e.detail.value)
        })
    },

    bindChangeCategory (e) {
        if (e.currentTarget.dataset.category !== this.data.activeCategory) {
            this.setData({
                activeCategory: e.currentTarget.dataset.category
            })
        }
    },

    bindChangeName (e) {
        this.setData({
            name: e.detail.value
        })
    },

    bindChangeBrief (e) {
        this.setData({
            brief: e.detail.value
        })
    },

    bindChangeUrl (e) {
        this.setData({
            websiteUrl: e.detail.value
        })
    },

    bindChangeAmount (e) {
        this.setData({
            financeAmount: e.detail.value
        })
    },

    bindTextareaInput (e) {
        this.setData({
            projectDesc: e.detail.value
        })
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
        this.setData({
            openId: wx.getStorageSync('openId')
        })
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

    bindChooseImage () {
        let _this = this
        wx.chooseImage({
            count: 1, // 最多可以选择的图片张数，默认9
            sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function(res){
                _.postfile(res.tempFiles[0].path, "file", {
                    success: function (res) {
                        res = res.data
                        _this.setData({
                            logo: JSON.parse(res).data
                        })
                    }
                });
            },
            fail: function(err) {
                console.log(err)
            },
        })
    },

    bindReleaseProject () {
        if (this.data.name === '') {
            wx.showToast({
                title: '请填写项目名称！',
                icon: 'none'
            });
            return;
        };
        if (this.data.brief === '') {
            wx.showToast({
                title: '请填写项目介绍！',
                icon: 'none'
            });
            return;
        };
        if (this.data.websiteUrl === '') {
            wx.showToast({
                title: '请填写项目网址！',
                icon: 'none'
            });
            return;
        };
        if (this.data.logo === '') {
            wx.showToast({
                title: '请上传项目Logo！',
                icon: 'none'
            });
            return;
        };
        if (this.data.financeAmount === '') {
            wx.showToast({
                title: '请填写融资金额！',
                icon: 'none'
            });
            return;
        };
        if (this.data.financeRound === 0) {
            wx.showToast({
                title: '请选择融资阶段！',
                icon: 'none'
            });
            return;
        };
        if (this.data.domainIndex === 0) {
            wx.showToast({
                title: '请选择融资领域！',
                icon: 'none'
            });
            return;
        };
        if (this.data.cityIndex === 0) {
            wx.showToast({
                title: '请选择融资城市！',
                icon: 'none'
            });
            return;
        };
        if (this.data.projectDesc === '') {
            wx.showToast({
                title: '请填写项目描述！',
                icon: 'none'
            });
            return;
        };
        let data = {}, _this = this;
        data.openId = this.data.openId;
        data.category = this.data.activeCategory;
        data.name = this.data.name;
        data.brief = this.data.brief;
        data.websiteUrl = this.data.websiteUrl;
        data.logo = this.data.logo;
        data.financeAmount = this.data.financeAmount;
        data.financeRound = this.data.financeRoundArray[this.data.financeRound];
        data.projectDomain = this.data.domainArray[this.data.domainIndex];
        data.city = this.data.cityArray[this.data.cityIndex];
        data.projectDesc = this.data.projectDesc;
        _.releaseProject(data, {
            success (res) {
                res = res.data;
                let id = res.data;
                if (res.code === 200) {
                    wx.showModal({
                        title: '温馨提示',
                        content: '是否发送BP上传链接？',
                        success (res) {
                            if (res.confirm) {
                                _.sendBP({
                                    openId: _this.data.openId,
                                    id
                                }, {
                                    success (res) {
                                        res = res.data;
                                        if (res.code === 200) {
                                            wx.showToast({
                                                title: 'BP上传链接已发送！',
                                                icon: 'none'
                                            });
                                        }
                                    }
                                })
                            } else if (res.cancel) {
                                wx.showToast({
                                    title: '创建成功，请至详情页发送BP链接！',
                                    icon: 'none'
                                });
                            }
                        },
                        complete () {
                            setTimeout(() => {
                                wx.switchTab({
                                    url: '/pages/project/project'
                                })
                            }, 1500);
                        }
                    })
                }
            }
        })
    }
})