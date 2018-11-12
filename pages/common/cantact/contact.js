//Component Object
Component({
    methods: {
        // 拨打电话
        onMakePhoneCall() {
            wx.makePhoneCall({
                phoneNumber: "12344442222"
            });
        }
    }
});
