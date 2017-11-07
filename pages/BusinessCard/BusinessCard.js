// pages/BusinessCard/BusinessCard.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**选择图片 */
  xuanzetupian: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths: res.tempFilePaths
        })
        console.log(res.tempFilePaths)

        wx.setStorage({ key: "card1", data: tempFilePaths[0] })
      } 
    })
  },
  formSubmit: function (e) {
    var that = this
    console.log(e.detail.value)
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; 
    wx.setStorage({ key: "company", data: e.detail.value.company })
    wx.setStorage({ key: "name", data: e.detail.value.name })
    wx.setStorage({ key: "phone", data: e.detail.value.phone })
    wx.setStorage({ key: "job", data: e.detail.value.job })
    wx.setStorage({ key: "email", data: e.detail.value.email })
    wx.setStorage({ key: "brief", data: e.detail.value.brief })
    var company = wx.getStorageSync('company');
    var name = wx.getStorageSync('name');
    var phone = wx.getStorageSync('phone');
    var job = wx.getStorageSync('job');
    var email = wx.getStorageSync('email');
    var card1 = wx.getStorageSync('card1');
    var brief = wx.getStorageSync('brief');
    if (!myreg.test(e.detail.value.phone) || e.detail.value.phone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '你输入的手机号有误',
      })
    } else {
      wx.uploadFile({
        url: app.globalData.create_card,
        filePath: card1,
        
        name: 'card',
        formData: {
          'user_id': app.globalData.user_id,
          'name': e.detail.value.name,
          'phone': e.detail.value.phone,
          'company': e.detail.value.company,
          'job': e.detail.value.job,
          'email': e.detail.value.email,
          'brief': e.detail.value.brief,
        },
        success: function (res) {
          console.log(res)
        }
      })
    }
    
  },
  dianji:function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var card = wx.getStorageSync('card');
    that.setData({
      src:card
    })
    wx.request({
      url: app.globalData.my_card,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_id: app.globalData.user_id,
      },
      success: function (res) {
        console.log(res)
        that.setData({
          mycard: res.data,
          tempFilePaths: res.data.card
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