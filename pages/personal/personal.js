// pages/personal/personal.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      url:'../CorporateBonds/CorporateBonds',
      src:'../../image/gongsizhai1.png',
      name:'我的公司债'
    },
      {
        url: '../BusinessCard/BusinessCard',
        src: '../../image/mingpian1.png',
        name: '我的名片'
      },
      {
        url: '../About/About',
        src: '../../image/about1.png',
        name: '关于我们'
      },]
  },
  tiaozhuan:function(){
    wx.navigateTo({
      url: '../unauthorized/unauthorized',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(app.globalData.userInfo)
    that.setData({
      userInfo: app.globalData.userInfo,
      funds_real: app.globalData.funds_real
    })
    wx.request({
      url: app.globalData.my_center,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_id: app.globalData.user_id,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          userInfo: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.request({
      url: app.globalData.my_center,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_id: app.globalData.user_id,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          userInfo: res.data
        })
      }
    })
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
    var that = this
    console.log(app.globalData.userInfo)
    that.setData({
      userInfo: app.globalData.userInfo,
      funds_real: app.globalData.funds_real
    })
    wx.request({
      url: app.globalData.my_center,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_id: app.globalData.user_id,
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        console.log(res.data)
        that.setData({
          userInfo: res.data
        })
      }
    })
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