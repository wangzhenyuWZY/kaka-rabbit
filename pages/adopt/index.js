// index.js
// 获取应用实例
const app = getApp()
import { requst_post_adopt } from '../api/index.js'
Page({
  data: {
    adoptPop:false,
    name:'',
    newpeople:false
  },
  showPop(){
    this.setData({
      adoptPop:true
    })
  },
  closePop(){
    this.setData({
      adoptPop:false
    })
  },
  goHome(){
    wx.navigateTo({
      url: '../home/index'
    })
  },
  doAdopt(){
    let that = this
    requst_post_adopt({name:this.data.name}).then(res=>{
      if(res.data.code === 0){
        that.setData({
          adoptPop:false,
          newpeople:true
        })
      }else{
        wx.showToast({
          title: res.data.data.message,
          icon: 'success',
          duration: 2000
         })
         wx.navigateTo({
          url: '../home/index'
        })
      }
    })
  },
  onLoad() {
    
  }
})
