//index.js
//获取应用实例
const app = getApp()
var page = 1
Page({
  data: {
    pingji:0,
    qixian:0,
    shouyi:0,
    chengshi:0,
    
    region_id: null,
    rate_id: null,
    earnings_id: null,
    limit_id: null,
        
    showDialog: false,
    showDialogRight: false,
  },
  /*导航点击变色*/
  navclick: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(e.currentTarget.dataset.id)
    var that = this
    that.setData({
      id:id
    })
    /*获取公司首页*/
    if (e.currentTarget.dataset.id==0){
      wx.request({
        url: app.globalData.indexdata,
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          user_id: app.globalData.user_id,
          page: page,
          rate_order: 'asc',
        },
        success: function (res) {
          console.log(res.data)
          console.log(res.data.data)
          that.setData({
            company: res.data.data
          })
        }
      })
    } else if (e.currentTarget.dataset.id == 1){
      wx.request({
        url: app.globalData.indexdata,
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          user_id: app.globalData.user_id,
          page: page,
          earnings_order: 'asc',
        },
        success: function (res) {
          console.log(res.data)
          console.log(res.data.data)
          that.setData({
            company: res.data.data
          })
        }
      })
    } else if (e.currentTarget.dataset.id == 2){
      wx.request({
        url: app.globalData.indexdata,
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          user_id: app.globalData.user_id,
          page: page,
          limit_order: 'asc',
        },
        success: function (res) {
          console.log(res.data)
          console.log(res.data.data)
          that.setData({
            company: res.data.data
          })
        }
      })
    }
  },

  pingjiChange: function (e) {
    console.log('评级发生change事件，携带value值为：', e.detail.value)
    var that = this
    that.setData({
      pingji: e.detail.value
    })
    console.log(this.data.pingji)
  },
  qixianChange: function (e) {
    console.log('期限发生change事件，携带value值为：', e.detail.value)
    var that = this
    that.setData({
      qixian: e.detail.value
    })
    console.log(this.data.qixian)
  },
  shouyiChange:function(e) {
    console.log('收益发生change事件，携带value值为：', e.detail.value)
    var that = this
    that.setData({
      shouyi: e.detail.value
    })
    console.log(this.data.shouyi)
  },
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
  rateclick: function (e) {
    var id = e.currentTarget.dataset.ratenum
    console.log(e)
    console.log(e.currentTarget.dataset.ratenum)
    var that = this
    that.setData({
      ratenum: id
    })
  },
  earningsclick: function (e) {
    var id = e.currentTarget.dataset.earningsnum
    console.log(e)
    console.log(e.currentTarget.dataset.earningsnum)
    var that = this
    that.setData({
      earningsnum: id
    })
  },
  limitclick: function (e) {
    var id = e.currentTarget.dataset.limitnum
    console.log(e)
    console.log(e.currentTarget.dataset.limitnum)
    var that = this
    that.setData({
      limitnum: id
    })
  },
  /**侧面picker */
  toggleDialogRight() {
    this.setData({
      showDialogRight: !this.data.showDialogRight
    });
  },
  freeBackRight: function () {
    var that = this
    if (this.data.value == 'show') {
      wx.showModal({
        title: '提示',
        content: '你没有选择任何内容',
      })
    }
    that.setData({
      showDialogRight: !this.data.showDialogRight
    })
  },
  freetoBackRight: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '你没有选择任何内容',
    })
    that.setData({
      showDialogRight: !this.data.showDialogRight,
      checked: false,
    })
  },

  formSubmit:function(e){
    var that = this
    console.log('筛选form提交：')
    console.log(e.detail.value)
    this.data.region_id = e.detail.value.chengshi,
    this.data.rate_id = e.detail.value.pingji,
    this.data.earnings_id = e.detail.value.shouyi,
    this.data.limit_id = e.detail.value.qixian

    wx.request({
      url: app.globalData.screen_funds,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        region_id:e.detail.value.chengshi,
        rate_id:e.detail.value.pingji,
        earnings_id:e.detail.value.shouyi,
        limit_id:e.detail.value.qixian,
      },
      success: function (res) {
        console.log(res.data)
        console.log(res.data.data)
        that.setData({
          company: res.data.data
        })
      }
    })
  },
  onLoad: function () {

    var that = this
    that.setData({

      id:0,
      region:0
    })

    /**获得权限登陆 */
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


    /*获取公司首页*/
    wx.request({
      url: app.globalData.indexdata,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_id: app.globalData.user_id,
        page: page,
      },
      success: function (res) {
        console.log(res.data)
        console.log(res.data.data)
        that.setData({
          logo: res.data.logo,
          company:res.data.data
        })
      }
    })
    /*获取公司首页*/
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
         region:res.data.region,
         /**评级数据 */
         rate: res.data.rate,
         /**期限数据 */
         limit: res.data.limit,
         /**收益数据 */
         earnings: res.data.earnings,
       })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
