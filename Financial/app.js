//app.js
import GlobalConfig from './pages/config/index'

const globalConfig = new GlobalConfig()

globalConfig.init()

App({
    onLaunch: function() {
        // 检测是否登录
        this.globalData.checkLoginStatus();
    },
    globalData: {
        // 服务器地址
        // serverUrl: "http://127.0.0.1:1099",
        serverUrl: "https://www.ssqushe.com",
        // 检查登录状态
        checkLoginStatus() {
            let openId = wx.getStorageSync("openId");
            if (openId === '') {
                wx.navigateTo({
                    url: "/pages/login/login"
                });
                return false;
            };
            return true;
        },
        config: globalConfig
    }
});
