// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  // 事件处理函数
  toRule() {
    wx.navigateTo({
      url: '../inviteRule/index'
    })
  },
  onLoad() {
    
  },
  showtab() {
    console.log(1111)
  },
})
