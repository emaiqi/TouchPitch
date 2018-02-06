// pages/BusinessCard/BusinessCard.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: '../../image/upload@3x.png',
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
        console.log(tempFilePaths[0])
        wx.uploadFile({
          url: app.globalData.upload,
          filePath: tempFilePaths[0],
          name: 'img',
          success: function (res) {
            console.log('上传照片：')
            console.log(res)
            console.log(res.data)
            console.log('选择的图片：')
            console.log(JSON.parse(res.data).img)
            console.log('选择的图片：')
            var imageurl = JSON.parse(res.data).img
            wx.setStorage({ key: "mpimg", data: JSON.parse(res.data).img })
          }
        })
      } 
    })
  },
  shanchu:function(){
    var that = this
    wx.setStorage({ key: "card1", data: '' })
    that.setData({
      tempFilePaths: '../../image/upload@2x.png'
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
    var card1 = wx.getStorageSync('mpimg'); 
    var oldimage = wx.getStorageSync('oldimage');
    var brief = wx.getStorageSync('brief');
    if (!myreg.test(e.detail.value.phone) || e.detail.value.phone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '你输入的手机号有误',
      })
    } else {
      var img = '../../image/upload@3x.png';
      console.log('上传的图片')
      console.log(card1)
      var card2 = wx.getStorageSync('oldimage');
      console.log(card2)
      if (oldimage == img && oldimage != '' && card2==''){
        wx.showModal({
          title: '提示',
          content: '请上传最新名片',
        })
      }else{
        console.log('选择的图片1')
        var card1 = wx.getStorageSync('mpimg');
        console.log(card1)
        console.log('原先的图片1')
        var card2 = wx.getStorageSync('oldimage');
        if (card1==''){
          console.log('用原先的图片')
          console.log(card2)
          if (card2==''){
            wx.showModal({
              title: '提示',
              content: '请上传最新名片',
            })
          }else{
            wx.request({
              url: app.globalData.create_card,
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                user_id: app.globalData.user_id,
                name: e.detail.value.name,
                phone: e.detail.value.phone,
                company: e.detail.value.company,
                job: e.detail.value.job,
                email: e.detail.value.email,
                brief: e.detail.value.brief,
                card: card2,
              },
              success: res => {
                console.log(res)
                console.log(res.data.code)
                console.log(wx.getStorageSync('mpimg'))
                wx.showModal({
                  title: '提交成功',
                  content: '您修改的名片信息提交成功，我们会尽快完成审核',
                  success: function (res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '../personal/personal'
                      })
                    } else if (res.cancel) {
                      wx.switchTab({
                        url: '../personal/personal'
                      })
                    }
                  }
                })
              }
            })
          }
        }else{
          console.log('用新上传的图片')
          wx.request({
            url: app.globalData.create_card,
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              user_id: app.globalData.user_id,
              name: e.detail.value.name,
              phone: e.detail.value.phone,
              company: e.detail.value.company,
              job: e.detail.value.job,
              email: e.detail.value.email,
              brief: e.detail.value.brief,
              card: card1,
            },
            success: res => {
              console.log(res)
              console.log(res.data.code)
              console.log(wx.getStorageSync('mpimg'))
              if (res.data.code == 200) {
                wx.showModal({
                  title: '成功提示',
                  content: '您的信息已修改成功，请等待后台审核',
                  success: function (res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '../personal/personal'
                      })
                    } else if (res.cancel) {
                      wx.switchTab({
                        url: '../personal/personal'
                      })
                    }
                  }
                })
              }
              if (res.data.code == 400) {
                wx.showModal({
                  title: '提示',
                  content: '请上传最新名片',
                })
              }
            }
          })
        }
      }
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
        wx.clearStorageSync()
        wx.setStorage({ key: "oldimage", data: res.data.card })
        console.log(res)
        console.log(res.data)
        if (res.data.card==''){
          that.setData({
            mycard: res.data,
            tempFilePaths: '../../image/upload@3x.png',
          })
        }else{
          that.setData({
            mycard: res.data,
            tempFilePaths: res.data.card,
          })
        }
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
    var card = wx.getStorageSync('card');
    that.setData({
      src: card
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
        wx.stopPullDownRefresh()
        console.log(res)
        that.setData({
          mycard: res.data,
          tempFilePaths: res.data.card
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