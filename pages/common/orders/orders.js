Component({
    behaviors: [],

    properties: {
        myProperty: {
            // 属性名
            type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: "", // 属性初始值（可选），如果未指定则会根据类型选择一个
            observer: function(newVal, oldVal, changedPath) {
                // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
                // 通常 newVal 就是新设置的数据， oldVal 是旧数据
            }
        },
        myProperty2: String, // 简化的定义方式
        pagetype: Number
    },
    data: {
        orderList: [],
        // 模拟mock数据
        mockOrderList: [
            {
                orderId: "order20181027088231",
                imgUrl: "../../../lib/images/item/item-1.png",
                title: "水电",
                date: "2018-11-03",
                address: '上海市浦东新区张江镇',
                price: "99999.64",
                status: 0,
                statusName: '预约中'
            },
            {
                orderId: "order20181027088231",
                imgUrl: "../../../lib/images/item/item-2.png",
                title: "水电",
                date: "2018-11-03",
                address: '上海市浦东新区川沙镇上海市浦东新区川沙镇',
                price: "99999.64",
                status: 1,
                statusName: '确认中'
            },
            {
                orderId: "order20181027088231",
                imgUrl: "../../../lib/images/item/item-3.png",
                title: "水电",
                date: "2018-11-03",
                address: '上海市徐汇区',
                price: "9",
                status: 2,
                statusName: '服务中'
            },
            {
                orderId: "order20181027088231",
                imgUrl: "../../../lib/images/item/item-4.png",
                title: "水电",
                date: "2018-11-03",
                address: '上海市浦东新区南汇',
                price: "99",
                status: 3,
                statusName: '已完成'
            },
            {
                orderId: "order20181027088231",
                imgUrl: "../../../lib/images/item/item-5.png",
                title: "水电",
                date: "2018-11-03",
                address: '北京朝阳区',
                price: "9999",
                status: 3,
                statusName: '已完成'
            }
        ]
    }, // 私有数据，可用于模板渲染

    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function() {},
        moved: function() {},
        detached: function() {}
    },

    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
    ready: function() {
        console.log(this.data.pagetype)
        if (this.data.pagetype === 0) {
            // 首页 - 传入openId
        } else if (this.data.pagetype === 1) {
            // 订单列表页 - 传入openId & 订单分类状态： 0 全部  1 预约中  2  确认中  3 服务中  4 已完成
        }
        let orderList = [];
        this.data.mockOrderList.forEach(el => {
            let { statusName, ...temp } = el;
            if (statusName === '预约中') {
                temp.statusClass = "info";
            } else if (statusName === '确认中') {
                temp.statusClass = "danger";
            } else if (statusName === '服务中') {
                temp.statusClass = "primary";
            } else if (statusName === '已完成') {
                temp.statusClass = "success";
            }
            temp.statusName = statusName
            orderList.push(temp);
        });
        this.setData({
            orderList
        });
    },

    pageLifetimes: {
        // 组件所在页面的生命周期函数
        show: function() {}
    },

    methods: {
        onMyButtonTap: function() {
            this.setData({
                // 更新属性和数据的方法与更新页面数据的方法类似
            });
        },
        // 内部方法建议以下划线开头
        _myPrivateMethod: function() {
            // 这里将 data.A[0].B 设为 'myPrivateData'
            this.setData({
                "A[0].B": "myPrivateData"
            });
        },
        _propertyChange: function(newVal, oldVal) {},

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
                    url: '/pages/orderConfirm/orderConfirm?orderInfo=' + JSON.stringify(el.currentTarget.dataset)
                });
                
            } else {
                // 跳转订单详情页
                wx.navigateTo({
                    url: '/pages/orderDetail/orderDetail?orderInfo=' + JSON.stringify(el.currentTarget.dataset)
                });
            }
        }
    }
});
