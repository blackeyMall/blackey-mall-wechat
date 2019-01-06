//Component Object
Component({
    methods: {
        // 拨打电话
        onMakePhoneCall() {
            wx.makePhoneCall({
                phoneNumber: "15221127738"
            });
        }
    }
});