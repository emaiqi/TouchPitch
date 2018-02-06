// pages/CorporateBonds/CorporateBonds.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1, 
    company:[]
  },
  tiaozhuan:function(){
    wx.navigateTo({
      url: '../release2/release2',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.my_funds,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_id: app.globalData.user_id
      },
      success: res => {
       console.log(res)
      that.setData({
        company:res.data.data,
        last_page: res.data.last_page
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
    var that = this
    wx.request({
      url: app.globalData.my_funds,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_id: app.globalData.user_id
      },
      success: res => {
        wx.stopPullDownRefresh()
        console.log(res)
        that.setData({
          company: res.data.data
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(this.data.page)
    console.log('我上上拉')
    var that = this
    that.setData({
      more: '加载更多……',
      page: this.data.page + 1,
    })
    console.log('page:' + this.data.page)
    if (this.data.page <= this.data.last_page){
      wx.request({
        url: app.globalData.my_funds,
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          user_id: app.globalData.user_id,
          page: this.data.page,
        },
        success: function (res) {
          that.setData({
            company: that.data.company.concat(res.data.data)
          })
        }
      })
    }else{
        that.setData({
          more: '已加载全部'
        })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})