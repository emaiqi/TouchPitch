// pages/release/release.js
const app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1:'请选择',
    value2:'请选择',
    value3:'请选择',
    value4: '选择公司所在地',
    showDialogRight: false,

    cityname:null,
    zhouqiname:null,
    tempFilePaths:null,
    /**验证码 */
    sms_code:0,
    /**各个id */
    cityid:0,
    cycle_id:0,
    funds_rate_id:0,
  },
  /**侧面picker */
  toggleDialogRight() {
    this.setData({
      showDialogRight: !this.data.showDialogRight
    });
  },

  /**城市选择 */
  regionChange: function (e) {
    console.log(e)
    console.log('城市选项发生change事件，携带value值为：', e.detail.value)
    var that = this
    that.setData({
      chengshi: e.detail.value
    })
    console.log(this.data.chengshi)
  },
  regionclick: function (e) {
    var id = e.currentTarget.dataset.regionnum
    console.log(e)
    console.log(e.currentTarget.dataset.regionnum)
    var that = this
    that.setData({
      regionnum: id
    })
  },
  /**周期选择 */
  rateclick: function (e) {
    var id = e.currentTarget.dataset.ratenum
    console.log(e)
    console.log(e.currentTarget.dataset.ratenum)
    var that = this
    that.setData({
      ratenum: id
    })
  },
  pingjiChange: function (e) {
    console.log('评级发生change事件，携带value值为：', e.detail.value)
    this.data.cycle_id = e.detail.value
    console.log(this.data.cycle_id)
  },

  /*债券评级*/
  zhaiquanclick: function (e) {
    var id = e.currentTarget.dataset.zhaiquannum
    console.log(e)
    console.log(e.currentTarget.dataset.zhaiquannum)
    var that = this
    that.setData({
      zhaiquannum: id
    })
  },
  zhaiquanChange:function (e) {
    console.log('评级发生change事件，携带value值为：', e.detail.value)
    this.data.funds_rate_id = e.detail.value
    console.log(this.data.funds_rate_id)
  },

  /*主体评级*/
  zhuticlick: function (e) {
    var id = e.currentTarget.dataset.zhutinum
    console.log(e)
    console.log(e.currentTarget.dataset.zhutinum)
    var that = this
    that.setData({
      zhutinum: id
    })
  },
  zhutiChange: function (e) {
    console.log('评级发生change事件，携带value值为：', e.detail.value)
    this.data.main_rate_id = e.detail.value
    console.log(this.data.main_rate_id)
  },


  /**侧面picker的button按钮 */
  freetoBackRight: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '你没有选择任何内容',
    })
    that.setData({
      checked: false,
      showDialogRight: !this.data.showDialogRight
    })
  },
  freeBackRight: function () {
    var that = this
    that.setData({
      showDialogRight: !this.data.showDialogRight
    });
  },

  /**发短信 */
  faduanxin:function(e){
    var that = this
    wx.request({
      url: app.globalData.send_sms,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        phone: e.detail.value
      },
      success: function (res) {
        console.log(res.data.sms_code)
        this.data.sms_code = res.data.sms_code
      }
    })
  },
  formSubmit:function(e){
    console.log(e.detail.value)
    var name = e.detail.value.chengshi.split("+")
    var zhouqi = e.detail.value.zhouti.split("+")
    var pingji = e.detail.value.pingji.split("+")
    var zhuti = e.detail.value.zhuti.split("+")
    console.log('分割之后')
    console.log(name) 
    console.log(zhouqi) 
    this.data.cityid = name[0]
    this.data.cycle_id = zhouqi[0]
    this.data.funds_rate_id = pingji[0]
    this.data.main_rate_id = zhuti[0]
    var that = this
    that.setData({
      cityname: name[1],
      zhouqiname: zhouqi[1],
      zhaiquanname:pingji[1],
      zhutiname:zhuti[1]
    })


  },
  formSubmit2: function (e) {
    var that = this
    console.log(e.detail.value)
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;  
    var card = wx.getStorageSync('card3');
    if (e.detail.value.phone == '' || e.detail.value.company == '' || this.data.cityid == ''||e.detail.value.person == '' || e.detail.value.sms_code == ''){
        wx.showModal({
          title: '提示',
          content: '必填项必须填写完整，请检查是否有遗漏。',
        })
    }else{
      if (!myreg.test(e.detail.value.phone) || e.detail.value.phone.length!=11){
        wx.showModal({
          title: '提示',
          content: '你输入的手机号有误',
        })
      }else{
        wx.uploadFile({
          url: app.globalData.create_funds,
          filePath: card,

          name: 'card3',
          formData: {
            'user_id': app.globalData.user_id,
            'person': e.detail.value.person,
            'region_id': this.data.cityid,
            'company': e.detail.value.company,
            'phone': e.detail.value.phone,
            'money': e.detail.value.money,
            'limit': e.detail.value.limit,
            'interest': e.detail.value.interest,
            'cycle_id': e.detail.value.cycle_id,
            'funds_rate_id': e.detail.value.funds_rate_id,
            'main_rate_id': e.detail.value.main_rate_id,
            'issue_time': e.detail.value.issue_time,
            'measures': e.detail.value.measures,
            'card': card,
            'sms_code': e.detail.value.sms_code,
          },
          success: function (res) {
            console.log(res)
            wx.showModal({
              title: '成功提示',
              content: '发布成功，等待后台审核发布',
              success: function () {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../index/index',
                  })
                } else if (res.cancel) {
                  wx.navigateTo({
                    url: '../index/index',
                  })
                }
              }
            })
          }
        })
      }
    }
  },
  /**选择图片 */
  xuanzetupian:function(){
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
        wx.setStorage({ key: "card3", data: tempFilePaths[0] })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    that.setData({
      time: time
    });  
    wx.request({
      url: app.globalData.screen,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
      },
      success: function (res) {
        console.log(res)
        that.setData({
          /**城市 */
          region: res.data.region,
        })
      }
    })


    wx.request({
      url: app.globalData.cycle_data,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          /**城市 */
          zhouqi: res.data.data,
        })
      }
    })

    wx.request({
      url: app.globalData.rate_data,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          /*评级 */
          zhaiquanpingji: res.data.data,
        })
      }
    })


    wx.request({
      url: app.globalData.funds_details,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        funds_id: options.id
      },
      success: function (res) {
        console.log(666)
        console.log(res)
        console.log(666),
        that.setData({
          /**城市 */
          xiangqing: res.data,
          cityname:res.data.region,
          zhouqiname: res.data.cycle_id,
          zhaiquanname: res.data.funds_rate,
          zhutiname: res.data.main_rate,
          time: res.data.create_time,
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