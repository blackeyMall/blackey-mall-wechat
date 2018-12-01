//app.js
App({
    onLaunch: function() {
        this.globalData.onCheckLoginStatus();
    },
    globalData: {
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
