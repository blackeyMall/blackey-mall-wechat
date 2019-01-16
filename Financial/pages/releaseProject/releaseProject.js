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
    },
    onGetProjectDetail: (data, handler) => {
        ajax.get("/finance/project/info", data, handler);
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
        city: '',
        financeRoundArray: ['请选择', '未知','未融资','种子轮','天使轮','Pre-A轮','A轮','A+轮','Pre-B轮','B轮','B+轮','C轮','C+轮','D轮','E轮及以后','新四板','新三板','Pre-IPO','并购','上市','战略投资','上市后','定增'],
        financeRound: 0,
        // domainArray: ['请选择', '机器人','环保','化工','地产建筑','人工智能','医疗健康','硬件','能源矿产','汽车交通','教育','金融','电商','房产家居','光电','旅游','物流','企业服务','无人机','生产执照','农业','VR','工具','消费生活','文娱传媒','社交','材料','公共事业','体育'],
        // domainIndex: 0,
        projectDomain: '',
        openId: '',
        name: '',
        brief: '',
        websiteUrl: '',
        financeAmount: '',
        projectDesc: '',
        logo: '',
        isModalOpen: false,
        labelList: [],
        labelInput: '',
        industry: '',
        id: ''
    },

    bindRoundPickerChange (e) {
        this.setData({
            financeRound: parseInt(e.detail.value)
        })
    },

    // bindCityPickerChange (e) {
    //     this.setData({
    //         cityIndex: parseInt(e.detail.value)
    //     })
    // },

    bindChangeCity (e) {
        this.setData({
            city: e.detail.value
        })
    },

    bindChangeDomain (e) {
        this.setData({
            projectDomain: e.detail.value
        })
    },

    // bindDomainPickerChange (e) {
    //     this.setData({
    //         domainIndex: parseInt(e.detail.value)
    //     })
    // },

    bindChangeIndustry (e) {
        this.setData({
            industry: e.detail.value
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
        // 检测登录
        if (app.globalData.checkLoginStatus()) {
            this.setData({
                openId: wx.getStorageSync('openId')
            });
            if (options.cropUrl) {
                if (options.id) {
                    
                }
                this.onPostFile(options.cropUrl);
            };
            if (options.objectId) {
                this.setData({
                    id: options.objectId
                });
                this.onGetProjectDetail();
            }
        }
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

    onGetProjectDetail () {
        let _this = this;
        _.onGetProjectDetail({
            id: _this.data.id,
            openId: _this.data.openId
        }, {
            success (res) {
                res = res.data;
                if (res.code === 200) {
                    let financeRoundIndex = _this.data.financeRoundArray.indexOf(res.data.financeRound);
                    _this.setData({
                        activeCategory: res.data.category.value,
                        financeRound: financeRoundIndex,
                        id: res.data.id,
                        name: res.data.name,
                        brief: res.data.brief,
                        websiteUrl: res.data.websiteUrl,
                        logo: res.data.logo === null ? '' : res.data.logo,
                        financeAmount: res.data.financeAmount,
                        labelList: res.data.projectDomain === null ? [] : res.data.projectDomain.split(','),
                        city: res.data.city,
                        industry: res.data.industry,
                        projectDesc: res.data.projectDesc
                    })
                }
            }
        })
    },

    bindChooseImage () {
        let _this = this
        wx.chooseImage({
            count: 1, // 最多可以选择的图片张数，默认9
            sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function(res){
                const src = res.tempFiles[0].path;
                let url = `/pages/avatarCrop/avatarCrop?target=releaseProject&src=${src}`;
                if (_this.data.id !== '') {
                    url += `&id=${_this.data.id}`;
                }
                wx.redirectTo({
                    url
                });
            },
            fail: function(err) {
                console.log(err)
            },
        })
    },

    onPostFile (url) {
        let isPosted = false;
        let _this = this;
        _.postfile(url, "file", {
            success: function (res) {
                res = JSON.parse(res.data);
                if (res.code === 200) {
                    isPosted = true;
                    _this.setData({
                        logo: res.data
                    });
                }
            }
        });
        return isPosted;
    },

    bindReleaseProject () {
        if (this.data.name === '') {
            wx.showToast({
                title: '请填写项目名称！',
                icon: 'none'
            });
            return;
        };
        // if (this.data.brief === '') {
        //     wx.showToast({
        //         title: '请填写项目介绍！',
        //         icon: 'none'
        //     });
        //     return;
        // };
        // if (this.data.websiteUrl === '') {
        //     wx.showToast({
        //         title: '请填写项目网址！',
        //         icon: 'none'
        //     });
        //     return;
        // };
        // if (this.data.logo === '') {
        //     wx.showToast({
        //         title: '请上传项目Logo！',
        //         icon: 'none'
        //     });
        //     return;
        // };
        // if (this.data.financeAmount === '') {
        //     wx.showToast({
        //         title: '请填写融资金额！',
        //         icon: 'none'
        //     });
        //     return;
        // };
        // if (this.data.financeRound === 0) {
        //     wx.showToast({
        //         title: '请选择融资阶段！',
        //         icon: 'none'
        //     });
        //     return;
        // };
        // if (this.data.domainIndex === 0) {
        //     wx.showToast({
        //         title: '请选择融资领域！',
        //         icon: 'none'
        //     });
        //     return;
        // };
        // if (this.data.cityIndex === 0) {
        //     wx.showToast({
        //         title: '请选择融资城市！',
        //         icon: 'none'
        //     });
        //     return;
        // };
        // if (this.data.projectDesc === '') {
        //     wx.showToast({
        //         title: '请填写项目描述！',
        //         icon: 'none'
        //     });
        //     return;
        // };
        let data = {}, _this = this;
        data.openId = this.data.openId;
        data.category = this.data.activeCategory;
        data.name = this.data.name;
        data.brief = this.data.brief;
        data.websiteUrl = this.data.websiteUrl;
        data.logo = this.data.logo;
        data.financeAmount = this.data.financeAmount;
        data.financeRound = this.data.financeRoundArray[this.data.financeRound];
        // data.projectDomain = this.data.domainArray[this.data.domainIndex];projectDomain
        data.projectDomain = this.data.labelList.join(',');
        // data.city = this.data.cityArray[this.data.cityIndex];
        data.city = this.data.city;
        data.industry = this.data.industry;
        data.projectDesc = this.data.projectDesc;
        if (this.data.id !== '') {
            data.id = this.data.id
        };
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

    bindDeleteLabel (e) {
        let index = e.currentTarget.dataset.index;
        let labelList = this.data.labelList;
        labelList.splice(index, 1);
        this.setData({
            labelList
        });
    },

    bindLabelInput (e) {
        this.setData({
            labelInput: e.detail.value
        });
        console.log(e.detail.value);
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
})