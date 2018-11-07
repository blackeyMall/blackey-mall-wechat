Page({
  data: {
    pageType: 2,
    imgUrls: [
      '../../lib/images/slider/slider1.jpg',
      '../../lib/images/slider/slider2.jpg',
      '../../lib/images/slider/slider3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    indicatorDots: "rgba(255, 255, 255, .5)",
    indicatorActiveColor: '#4454cd'
  },
  onLoad: function() {
  }
})
