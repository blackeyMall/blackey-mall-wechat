// pages/releaseProject/releaseProject.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stageArray: ['请选择', '测试一', '测试二', '测试三', '测试四'],
        stageIndex: 0,
        fieldArray: ['请选择', '测试一', '测试二', '测试三', '测试四'],
        fieldIndex: 0,
        cityArray: ['请选择', '测试一', '测试二', '测试三', '测试四'],
        cityIndex: 0
    },

    bindStagePickerChange (e) {
        this.setData({
            stageIndex: parseInt(e.detail.value)
        })
    },

    bindFieldPickerChange (e) {
        this.setData({
            fieldIndex: parseInt(e.detail.value)
        })
    },

    bindCityPickerChange (e) {
        this.setData({
            cityIndex: parseInt(e.detail.value)
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

    }
})