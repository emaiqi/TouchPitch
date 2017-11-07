// pages/unauthorized/unauthorized.js
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
  formSubmit:function(e){
    var that = this
    console.log(e.detail.value)
    var card1 = wx.getStorageSync('card1');

    wx.uploadFile({
      url: 'https://bond.jikeyun.net/index.php/interfaces/info/funds_real',
      filePath: card1,

      name: 'card2',
      formData: {
        'user_id': app.globalData.user_id,
        'name': e.detail.value.name,
        'phone': e.detail.value.phone,
        'business_card': card1,
      },
      success: function (res) {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '认证已提交，等待后台审核',
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../index/index',
              })
            } else if (res.cancel) {
              wx.switchTab({
                url: '../index/index',
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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