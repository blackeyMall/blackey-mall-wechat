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
        myProperty2: String // 简化的定义方式
    },
    data: {
        orderList: [],
        mockOrderList: [
            {
                orderId: "order20181027088231",
                imgUrl: "../../../lib/images/order/item1.png",
                title:
                    "欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具",
                des:
                    "欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具欧式沙发厨房餐具",
                price: 9999.64,
                count: 3,
                status: 0
            },
            {
                orderId: "order20181027088232",
                imgUrl: "../../../lib/images/order/item2.png",
                title: "欧式沙发",
                des: "厨房餐具",
                price: 9999.64,
                count: 3,
                status: 1
            },
            {
                orderId: "order20181027088233",
                imgUrl: "../../../lib/images/order/item3.png",
                title: "欧式沙发2",
                des: "欧式沙发2",
                price: 9999.64,
                count: 3,
                status: 2
            },
            {
                orderId: "order20181027088234",
                imgUrl: "../../../lib/images/order/item4.png",
                title: "欧式沙发3",
                des: "欧式沙发3",
                price: 9999.64,
                count: 3,
                status: 0
            },
            {
                orderId: "order20181027088235",
                imgUrl: "../../../lib/images/order/item1.png",
                title: "欧式沙发4",
                des: "欧式沙发4",
                price: 9999.64,
                count: 3,
                status: 1
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
        let orderList = [];
        this.data.mockOrderList.forEach(el => {
            let { status, ...temp } = el;
            if (status === 0) {
                temp.status = "预约中";
                temp.statusClass = "info";
            } else if (status === 1) {
                temp.status = "服务中";
                temp.statusClass = "danger";
            } else if (status === 2) {
                temp.status = "已完成";
                temp.statusClass = "success";
            }
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

        orderDetail: function () {
            console.log(1)
        }
    }
});
