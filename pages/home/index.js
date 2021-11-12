// index.js
// 获取应用实例
const app = getApp()
import { requst_get_dogeinfo, requst_get_iteminfo, requst_post_checkin, requst_get_info, requst_post_feeding } from '../api/index.js'
Page({
  data: {
    feedFaildPop:false,
    feedPop:false,
    foodPop:false,
    receivePop:false,
    dogeInfo:{},
    itemInfo:{},
    checkin:false,
    checkin_level:0,
    friendPop:false,
    sucMsg:''
  },
  feeding() {
    let that = this
    requst_post_feeding({id:this.data.dogeInfo.id}).then(res=>{
      if(res.data.code === 0){
        that.setData({
          feedPop:true,
          sucMsg: res.data.data.message
        })
        that.getDogeInfo()
      }else{
        that.setData({
          feedFaildPop:true,
          sucMsg: res.data.message
        })
      }
    })
  },
  doCheckin() {
    let that = this
    if(this.checkin){
      return
    }
    requst_post_checkin().then(res=>{
      if(res.data.code === 0){
        wx.showToast({
          title: res.data.data.message,
          icon: 'success',
          duration: 2000
         })
         that.getUserInfo()
      }
    })
  },
  getUserInfo() {
    let that = this
    requst_get_info().then(res=>{
      if(res.data.code === 0){
        that.setData({
          checkin:res.data.data.checkin,
          checkin_level:res.data.data.checkin_level
        })
      }
    })
  },
  getDogeInfo() {
    let that = this
    requst_get_dogeinfo().then(res=>{
      if(res.data.code === 0){
        that.setData({
          dogeInfo:res.data.data[0]
        })
      }
    })
  },
  getItemInfo() {
    let that = this
    requst_get_iteminfo().then(res=>{
      if(res.data.code === 0){
        that.setData({
          itemInfo:res.data.data[0]
        })
      }
    })
  },
  closeFeedFaildPop() {
    this.setData({
      feedFaildPop:false
    })
  },
  closeFeedPop() {
    this.setData({
      feedPop:false
    })
  },
  showFoodPop() {
    this.setData({
      foodPop:true
    })
  },
  closeFoodPop(){
    this.setData({
      foodPop:false
    })
  },
  showReceivePop(){
    this.setData({
      receivePop:true
    })
  },
  closeReceivePop(){
    this.setData({
      receivePop:false
    })
  },
  closeFriendPop(){
    this.setData({
      friendPop:false
    })
  },
  showFriendPop(){
    this.setData({
      friendPop:true
    })
  },
  toInvite() {
    wx.navigateTo({
      url: '../inverte/index'
    })
  },
  toPacTip() {
    wx.navigateTo({
      url: '../package/index'
    })
  },
  toWatch() {
    wx.navigateTo({
      url: '../advertise/index'
    })
  },
  toRules() {
    wx.navigateTo({
      url: '../signIn/index'
    })
  },
  toDynamic() {
    wx.navigateTo({
      url: '../dynamic/index'
    })
  },
  onLoad() {
    this.getDogeInfo()
    this.getItemInfo()
    this.getUserInfo()
  },
})
