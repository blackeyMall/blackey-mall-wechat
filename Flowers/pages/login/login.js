// pages/my/my.js
import ajax from "../../utils/ajax";

let _ = {
    login: (data, handler) => {
        ajax.post("/flowers/wx/login", data, handler);
    },
    sendUserInfo: (data, handler) => {
        ajax.post("/flowers/user/save", data, handler);
    }
};

Page({
    /**
     * 点击登录按钮事件
     */
    onGotUserInfo(e) {
        // 获得最新的用户信息
        if (!e.detail.userInfo) {
            return;
        }
        wx.setStorageSync("userInfo", e.detail.userInfo);
        this.login();
    },

    /**
     * 检查登录
     */
    login() {
        wx.login({
            success: res => {
                _.login(
                    { code: res.code },
                    {
                        success: function(res) {
                            res = res.data;
                            wx.setStorageSync("openId", res.data.openid);
                            wx.setStorageSync(
                                "sessionKey",
                                res.data.sessionKey
                            );
                            let userInfo = wx.getStorageSync("userInfo");
                            userInfo.openId = res.data.openid;
                            _.sendUserInfo(userInfo, {
                                success(res) {
                                    res = res.data;
                                    if (res.code === 200) {
                                        wx.navigateBack({ delta: 1 });
                                    }
                                }
                            });
                        }
                    }
                );
            }
        });
    }
});
