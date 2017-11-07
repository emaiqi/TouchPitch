// pages/particulars/particulars.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:0,
  
  },
  dadianhua:function(){
    var phone = wx.getStorageSync('phone');
    console.log(phone)
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.id)
    console.log('是否已认证' + app.globalData.funds_real)
    wx.setStorage({ key: "funds_id", data: options.id })
    wx.request({
      url: app.globalData.funds_details,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_id: app.globalData.user_id,
        funds_id: options.id
      },
      success: function (res) {
        console.log(res)
        wx.setStorage({ key: "phone", data: res.data.phone })
        that.setData({
          xiangqing: res.data
        })
      }
    })
    if (app.globalData.funds_real != 1) {
      wx.showModal({
        title: '提示',
        content: '您不是认证资金方，是否立即认证？',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../unauthorized/unauthorized',
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '../index/index',
            })
          }
        }
      })
    }
  },
/**弹窗 */
  toggleToast: function () {
    var that = this
    that.setData({
      showToast: !this.data.showToast
    })
    var funds_id = wx.getStorageSync('funds_id');
    wx.request({
      url: app.globalData.subscribe_info,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_id: app.globalData.user_id,
        funds_id: funds_id
      },
      success: function (res) {
        console.log(res)
        that.setData({
          rengouxinxi: res.data
        })
      }
    })

  },
  freetoBackRight: function () {
    var that = this
    that.setData({
      showToast: !this.data.showToast
    })
  },
  freeBackRight: function () {
    var that = this
    that.setData({
      showToast: !this.data.showToast
    })
  },

  formSubmit:function(e){
    console.log(e)
    var funds_id = wx.getStorageSync('funds_id');
    wx.request({
      url: app.globalData.subscribe,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_id: app.globalData.user_id,
        funds_id: funds_id,
        company:e.detail.value.company,
        money: e.detail.value.money,
      },
      success: function (res) {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: res.data.message,
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