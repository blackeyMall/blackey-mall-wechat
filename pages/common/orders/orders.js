Component({
    properties: {
        orderList: Array
    },
    methods: {
        // 跳转订单详情
        orderDetail: function(el) {
            if (el.currentTarget.dataset.statusname === '预约中') {
                wx.showModal({
                    title: '提示',
                    content: '订单预约中，待联系确认后查看！',
                    showCancel: false
                })
                return
            } else if (el.currentTarget.dataset.statusname === '确认中') {
                // 跳转用户信息确认页面
                wx.navigateTo({
                  url: '/pages/orderConfirm/orderConfirm?orderInfo=' + encodeURIComponent(JSON.stringify(el.currentTarget.dataset))
                })
            } else {
                // 跳转订单详情页
                wx.navigateTo({
                  url: '/pages/orderDetail/orderDetail?orderInfo=' + encodeURIComponent(JSON.stringify(el.currentTarget.dataset))
                })
            }
        }
    }
});
