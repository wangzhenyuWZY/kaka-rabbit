// index.js
// 获取应用实例
const app = getApp()
import { requst_get_message } from '../api/index.js'
Page({
  data: {
    messageList:[]
  },
  getMessage() {
    let that = this
    requst_get_message().then(res=>{
      if(res.data.code === 0){
        that.setData({
          messageList:res.data.data
        })
      }
    })
  },
  onLoad() {
    this.getMessage()
  },
  showtab() {
    console.log(1111)
  },
})
