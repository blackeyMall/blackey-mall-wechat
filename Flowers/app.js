//app.js
App({
    onLaunch: function() {
        this.globalData.onCheckLoginStatus();
    },
    globalData: {
        // 服务器地址
        serverUrl: "https://www.ssqushe.com",
        // 检查登录状态
        onCheckLoginStatus() {
            let openId = wx.getStorageSync("openId");
            if (openId === '') {
                wx.navigateTo({
                    url: "/pages/login/login"
                });
            }
        }
    }
});
