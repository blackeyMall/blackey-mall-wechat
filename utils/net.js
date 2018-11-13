//获取应用实例
const app = getApp()

//GET请求
const GET = (url, data, requestHandler) => {
  request('GET', 'application/json', url, data, requestHandler)
}

//POST请求
const POST = (url, data, requestHandler) => {
  request('POST', 'application/json', url, data, requestHandler)
}

//POSTFILE请求
/**
 * url 上传文件路径
 * file 文件路径
 * filename 服务端传递的文件名称
 * requestHandler .
 */
const POSTFILE = (url, file, filename, requestHandler) => {
  wx.uploadFile({
    url: app.globalData.server + url,
    filePath: file,
    name: filename,
    header: { 'content-type': 'multipart/form-data' },
    success: res => {
    if ("function" == typeof requestHandler.success) {
      requestHandler.success(res)
      }
    },
    fail: res => {
      if ("function" == typeof requestHandler.fail) {
        requestHandler.fail(res)
      }
    }
  })
}

const request = (method, header, url, data, requestHandler) => {
  wx.showLoading({ title: "加载中..."})
  wx.request({
    url: app.globalData.server + url,
    data: data,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: { 'content-type': header }, // 设置请求的 header
    success: res => {
      if ("function" == typeof requestHandler.success) {
        requestHandler.success(res)
        // wx.hideLoading()
      }
    },
    fail: res => {
      if ("function" == typeof requestHandler.fail) {
        requestHandler.fail(res)
        // wx.hideLoading()     
      }
    },
    complete: res => {
      setTimeout(function(){
        wx.hideLoading()
      }, 1000);
      // complete
      if ("function" == typeof requestHandler.complete) {
        requestHandler.complete(res)
      }

      if (res.statusCode == 502) {
        wx.showToast({
          title: "无法链接服务器",
          icon: "none"
        })
      }

    }
  })
}

module.exports = {
  GET: GET,
  POST: POST,
  POSTFILE: POSTFILE
}