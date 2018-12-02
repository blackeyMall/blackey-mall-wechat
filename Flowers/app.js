//app.js
App({
    onLaunch: function() {
        this.globalData.onCheckLoginStatus();
    },
    globalData: {
        // 服务器地址
        serverUrl: "http://192.168.14.104:1099",
        // 检查登录状态
        onCheckLoginStatus() {
            // let openId = wx.getStorageSync("openId");
            // if (openId === '') {
            //     wx.navigateTo({
            //         url: "/pages/login/login"
            //     });
            // }
        }
    }
});
