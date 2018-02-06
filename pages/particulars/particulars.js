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
    wx.request({
      url: app.globalData.contact,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {},
      success: function (res) {
        wx.makePhoneCall({
          phoneNumber: res.data.phone //仅为示例，并非真实的电话号码
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.id)
    console.log('是否已认证' + app.globalData.funds_real)
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorage({
          key: 'userInfo',
          data: res.userInfo
        })
      }
    })
    // 登录(2017-1-23加上的)
    wx.login({
      success: res => {
        console.log(res.code)
        /*获取openid*/
        wx.request({
          url: app.globalData.get_open_id,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            code: res.code,
          },
          success: res => {
            console.log('index中获取的用户id:')
            console.log(res.data.user_id)
            app.globalData.user_id = res.data.user_id
            this.data.user_id = res.data.user_id
            /*获取用户信息*/
            wx.request({
              url: app.globalData.get_info,
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                user_id: res.data.user_id,
                nickName: app.globalData.userInfo.nickName,
                avatar: app.globalData.userInfo.avatarUrl,
                gender: app.globalData.userInfo.gender,
                province: app.globalData.userInfo.province,
                city: app.globalData.userInfo.city,
                country: app.globalData.userInfo.country,
              },
              success: res => {
                console.log('用户的认证信息：')
                console.log(res.data.funds_real)
                app.globalData.funds_real = res.data.funds_real
              }
            })
          }
        })
      }
    })
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
        console.log('债券信息：')
        console.log(res)
        console.log(res.data.user_id != app.globalData.user_id)
        wx.setStorage({ key: "phone", data: res.data.phone })
        that.setData({
          xiangqing: res.data
        })
        if (res.data.user_id != app.globalData.user_id){
          that.setData({
            canbuy: 0
          })
        }else{
          that.setData({
            canbuy: 1
          })
        }
      }
    })
    wx.request({
      url: app.globalData.contact,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        
      },
      success: function (res) {
        console.log('手机号：')
        that.setData({
         phone: res.data.phone
       })
      }
    })
    
  },
/**弹窗 */
  toggleToast: function () {
    var that = this
    that.setData({
      height: 100 + 'vh',
    })
    if (app.globalData.funds_real != 1) {
      wx.showModal({
        title: '提示',
        content: '您目前未认证资金方，立即认证?',
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/unauthorized/unauthorized',
            })
          } else if (res.cancel) {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
    }else{
      that.setData({
        showToast: !this.data.showToast,
        height: 100 + 'vh',
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
    }

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
  footerqueding:function(){
    var that = this
    that.setData({
      show: false
    })
    wx.switchTab({
      url: '../index/index',
    })
  },
  formSubmit:function(e){
    var that = this
    console.log('金额'+e.detail.value.money)
    console.log(e.detail.value)
    var funds_id = wx.getStorageSync('funds_id');
    if (!e.detail.value.money){
      wx.showModal({
        title: '提示',
        content: '认购金额不能为空',
      })
    } else if (e.detail.value.money<=0){
      wx.showModal({
        title: '提示',
        content: '认购金额不能为负数',
      })
    }else{
      wx.request({
        url: app.globalData.subscribe,
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          user_id: app.globalData.user_id,
          funds_id: funds_id,
          company: e.detail.value.company,
          money: e.detail.value.money,
        },
        success: function (res) {
          console.log(res)
          console.log(res.data.code)
          if(res.data.code==200){
            that.setData({
              show: true
            })
          }else if(res.data.code==400){
            wx.showModal({
              title: '提示',
              content: res.data.message,
            })
          }
         
        }
      })
    }
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
    var id = wx.getStorageSync('funds_id');
    console.log('zhaiquan id:')
    console.log(id)
    console.log('是否已认证' + app.globalData.funds_real)
    wx.request({
      url: app.globalData.funds_details,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_id: app.globalData.user_id,
        funds_id: id
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        console.log(res)
        wx.setStorage({ key: "phone", data: res.data.phone })
        that.setData({
          xiangqing: res.data
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
    var id = wx.getStorageSync('funds_id');
    return {
      title: '选资产，来碰投',
      desc: '选资产，来碰投',
      path: '/pages/particulars/particulars?id='+id
    }
  }
})