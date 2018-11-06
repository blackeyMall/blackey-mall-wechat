Page({
    data:{
        orderInfo: {},
        orderData: {
            timeLine: [{
                date: '2018-11-07',
                name: '张师傅',
                des: '粉刷客户墙面',
                imgList: [
                    '../../lib/images/slider/slider1.jpg',
                    '../../lib/images/slider/slider2.jpg',
                    '../../lib/images/slider/slider3.jpg'
                ]
            }, {
                date: '2018-11-07',
                name: '张师傅',
                des: '粉刷客户墙面2',
                imgList: [
                    '../../lib/images/slider/slider1.jpg',
                ]
            }, {
                date: '2018-11-07',
                name: '张师傅',
                des: '粉刷客户墙面3',
                imgList: [
                    '../../lib/images/slider/slider1.jpg',
                    '../../lib/images/slider/slider2.jpg'
                ]
            }],
            materialImgUrl: '../../lib/images/slider/slider3.jpg',
            mark: 'yfsklfjsf'
        }
    },
    onLoad:function(options){
        // 生命周期函数--监听页面加载
        this.setData({
            orderInfo: JSON.parse(options.orderInfo)
        })
    },
    onReady:function(){
        // 生命周期函数--监听页面初次渲染完成
        
    },
    onShow:function(){
        // 生命周期函数--监听页面显示
        
    },
    onHide:function(){
        // 生命周期函数--监听页面隐藏
        
    },
    onUnload:function(){
        // 生命周期函数--监听页面卸载
        
    },
    onPullDownRefresh: function() {
        // 页面相关事件处理函数--监听用户下拉动作
        
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
        
    },
    onShareAppMessage: function() {
        // 用户点击右上角分享
        // return {
        //   title: 'title', // 分享标题
        //   desc: 'desc', // 分享描述
        //   path: 'path' // 分享路径
        // }
    }
})