let app = getApp();

// 普通Ajax请求
/**
 * method 请求方式
 * header 请求头
 * url 请求地址
 * data 请求数据
 * requestHandler 响应处理事件
 */
const request = (method, url, data, requestHandler, header = 'application/json') => {
    wx.showLoading({ title: "加载中..." });
    wx.request({
        url: app.globalData.serverUrl + url,
        data: data,
        method: method, // 选项： GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: { "content-type": header }, // 设置请求的 header
        success: res => {
            if ("function" == typeof requestHandler.success) {
                requestHandler.success(res);
            }
        },
        fail: res => {
            if ("function" == typeof requestHandler.fail) {
                requestHandler.fail(res);
            }
        },
        complete: res => {
            setTimeout(function() {
                wx.hideLoading();
            }, 1000);
            if ("function" == typeof requestHandler.complete) {
                requestHandler.complete(res);
            }
            // 服务器异常
            if (res.statusCode == 502) {
                wx.showModal({
                    title: "温馨提示",
                    content: "无法链接服务器",
                    showCancel: false
                });
            }
        }
    });
};

//postfile请求
/**
 * url 上传文件路径
 * file 文件路径
 * filename 服务端传递的文件名称
 * requestHandler .
 */
const postfile = (url, file, filename, requestHandler) => {
    wx.showLoading({title: '上传中...'})
    wx.uploadFile({
        url: app.globalData.serverUrl + url,
        filePath: file,
        name: filename,
        header: { "content-type": "multipart/form-data" },
        success: res => {
            if ("function" == typeof requestHandler.success) {
                requestHandler.success(res);
            }
        },
        fail: res => {
            if ("function" == typeof requestHandler.fail) {
                requestHandler.fail(res);
            }
        },
        complete: res => {
            setTimeout(function() {
                wx.hideLoading();
            }, 1000);
            // 服务器异常
            if (res.statusCode !== 200) {
                wx.showToast({
                    title: '系统异常，请稍后再试！',
                    icon: 'none'
                })
            } else {
                if ("function" == typeof requestHandler.complete) {
                    requestHandler.complete(res);
                }
            }
        }
    });
};

//get请求
const get = (url, data, requestHandler, header) => {
    request("GET", url, data, requestHandler, header);
};

//post请求
const post = (url, data, requestHandler, header) => {
    request("POST", url, data, requestHandler, header);
};

module.exports = {
    get,
    post,
    postfile
};


// module.exports = {
//     getCardInfo: (data, handler) => {
//         get("/finance/userinfo/info", data, handler);
//     },
//     getRecommendList: (data, handler) => {
//         get("/finance/userinfo/list/user", data, handler);
//     },
//     getFocusList: (data, handler) => {
//         post("/finance/userpersonfollow/list/openid", data, handler);
//     },
//     getFriendList: (data, handler) => {
//         post("/finance/userrelation/list/openid", data, handler);
//     },
//     focus: (data, handler) => {
//       post("/finance/userpersonfollow/foucs", data, handler);
//     },
//     addFriend: (data, handler) => {
//         post("/finance/userrelation/add", data, handler);
//     },
//     accept: (data, handler) => {
//         post("/finance/userrelation/accept", data, handler);
//     },
//     refuse: (data, handler) => {
//         post("/finance/userrelation/refuse", data, handler);
//     },
// };