// pages/unauthorized/unauthorized.js
var app = getApp()
var util = require('../../utils/util.js')
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime: 61,
    bian: false,
    yanzhengma: '发送验证码',//倒计时 
    tempFilePaths: '../../image/upload@3x.png',
  },
  yaoqiu: function (e) {
    wx.navigateTo({
      url: '../requirements/requirements',
    })
  },
  bphone: function (e) {
    this.data.bphone = e.detail.value
  },
  yzmjianyan: function (e) {
    console.log(e.detail.value)
    this.data.yanzhengmacode = e.detail.value
    console.log(this.data.yanzhengmacode)
  },
  /**发短信 */
  faduanxin: function (e) {
    console.log(this.data.bphone)
    if (this.data.bphone) {
      var that = this
      that.setData({
        bian: true,
        disabled: true
      })
      wx.request({
        url: app.globalData.send_sms,
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          phone: this.data.bphone,
          type: 2,
        },
        success: function (res) {
          console.log('验证码：' + res.data.sms_code)
          if (res.data.sms_code == undefined) {
            wx.showModal({
              title: '提示',
              content: '您的短信发送已上限，请明天再发布债券',
            })
            that.setData({
              yanzhengma: '发送验证码',
              currentTime: 61,
              disabled: false,
              bian: false,
            })
          } else {
            that.dianjiing();
            that.setData({
              sms_code: res.data.sms_code
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入手机号',
      })
    }
  },
  dianjiing: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        yanzhengma: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          yanzhengma: '重新发送',
          currentTime: 61,
          bian: false,
        })
      }
    }, 1000)
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

        wx.setStorage({ key: "card66", data: tempFilePaths[0] })

      }
    })
  },
  formSubmit: function (e) {
    var that = this
    console.log(e.detail.value)
    var card1 = wx.getStorageSync('card66');
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(e.detail.value.phone) || e.detail.value.phone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '你输入的手机号有误',
      })
    } else {
      console.log('填写的验证码' + this.data.yanzhengmacode)
      console.log('真正的验证码' + this.data.sms_code)
      if (!e.detail.value.name){
        wx.showModal({
          title: '提示',
          content: '请录入资金方姓名',
        })
      }else{
        if (this.data.yanzhengmacode != this.data.sms_code) {
          wx.showModal({
            title: '提示',
            content: '你输入的验证码有误',
          })
        } else {
          console.log('用户id:' + app.globalData.user_id)
          console.log('名片')
          console.log(card1)
          if (card1 == '') {
            wx.showModal({
              title: '提示',
              content: '您的名片未上传',
            })
          } else {
            wx.uploadFile({
              url: 'https://bond.jikeyun.net/index.php/interfaces/info/funds_real',
              filePath: card1,
              name: 'business_card',
              formData: {
                'user_id': app.globalData.user_id,
                'name': e.detail.value.name,
                'phone': e.detail.value.phone,
                'sms_code': e.detail.value.sms_code,
              },
              success: function (res) {
                console.log(res)
                //console.log(JSON.parse(res.data).code)
                if (JSON.parse(res.data).code == 200) {
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
                } else {
                  wx.showModal({
                    title: '提示',
                    content:'认证失败',
                    success: function (res) {
                      if (res.confirm) {
                        wx.switchTab({
                          url: '../index/index',
                        })
                      } else if (res.cancel) {

                      }
                    }
                  })
                }
              }
            })
          }
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.clearStorage('card66')
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