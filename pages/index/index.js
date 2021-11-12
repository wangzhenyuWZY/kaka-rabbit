// index.js
// 获取应用实例
const app = getApp()
import { requst_post_login,requst_get_info} from '../api/index.js'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: false, // 如需尝试获取用户信息可改为false
    city:'',
    country:'',
    nickName:'',
    province:''
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
 //验证登录是否过期
 checksession:function(){
  var that=this
  wx.checkSession({
   success:function(res){
    console.log(res,'登录未过期')
    that.checkIsFirst()
   },
   fail:function(res){
    console.log(res,'登录过期了')
    wx.showModal({
     title: '提示',
     content: '你的登录信息过期了，请重新登录',
    })
    //再次调用wx.login()
    
   }
  })
 },
 //登录
 login:function(){
   let that = this
  wx.login({
    success: function (res) {
      requst_post_login({code:res.code+''}).then(loginRps=>{
          wx.getUserInfo({
            success:function(res){
              console.log(res.userInfo)
              var city = res.userInfo.city
              var country = res.userInfo.country
              var nickName = res.userInfo.nickName
              var province = res.userInfo.province
              that.setData({
                city:city,
                country:country,
                nickName:nickName,
                province:province
              })
          }
        })
        wx.setStorageSync('access-token', loginRps.data.token)
        that.checkIsFirst()
      })
    }
   })
 },
  //获取用户的信息
  info:function(){
      var that=this
        wx.getUserInfo({
          success:function(res){
            console.log(res.userInfo)
            var city = res.userInfo.city
            var country = res.userInfo.country
            var nickName = res.userInfo.nickName
            var province = res.userInfo.province
            that.setData({
              city:city,
              country:country,
              nickName:nickName,
              province:province
            })
            wx.navigateTo({
              url: '../home/index'
            })
        }
      })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  checkIsFirst(){
    requst_get_info().then(res=>{
      if(res.data.code === 0){
        if(res.data.data.activate){
          wx.navigateTo({
            url: '../home/index'
          })
        }else{
          wx.navigateTo({
            url: '../adopt/index'
          })
        }
        
      }
    }) 
  },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.login()
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
