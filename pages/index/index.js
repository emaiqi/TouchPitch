//index.js
//获取应用实例
const app = getApp()
var page = 1
Page({
  data: {
    showjiantou:true,
    showjiantou2: false,

    showjiantou3: true,
    showjiantou4: false,


    showjiantou5: true,
    showjiantou6: false,


    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
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
  preventTouchMove: function (e) {

  },
  /**跳转查看债券详情 */
  tiaozhuan: function (options) {
    console.log(options.currentTarget.dataset.renzheng)
    if (options.currentTarget.dataset.renzheng == 1) {
      wx.navigateTo({
        url: '../particulars/particulars?id=' + options.currentTarget.dataset.id,
      })
    } else {
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
  /*导航点击变色*/
  navclick: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(e.currentTarget.dataset.id)
    console.log(e)
    console.log('导航id='+e.currentTarget.dataset.id)
    var that = this
    that.setData({
      id:id
    })
    /*获取公司首页*/
    if (e.currentTarget.dataset.id==0){
      if (this.data.showjiantou==true){
        that.setData({
          showjiantou: !this.data.showjiantou,
          showjiantou2: !this.data.showjiantou2
        })
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
            region_id: this.data.chengshi,
            rate_id: this.data.pingji,
            earnings_id: this.data.shouyi,
            limit_id: this.data.qixian,
          },
          success: function (res) {
            console.log('顺序')
            console.log(res.data.data)
            that.setData({
              company: res.data.data
            })
          }
        })
      }else{
        that.setData({
          showjiantou: !this.data.showjiantou,
          showjiantou2: !this.data.showjiantou2
        })
        wx.request({
          url: app.globalData.indexdata,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            user_id: app.globalData.user_id,
            page: page,
            rate_order: 'desc',
            region_id: this.data.chengshi,
            rate_id: this.data.pingji,
            earnings_id: this.data.shouyi,
            limit_id: this.data.qixian,
          },
          success: function (res) {
            console.log('倒叙')
            console.log(res.data.data)
            that.setData({
              company: res.data.data
            })
          }
        })
      }

    } else if (e.currentTarget.dataset.id == 1){
      if (this.data.showjiantou3 == true) {
        that.setData({
          showjiantou3: !this.data.showjiantou3,
          showjiantou4: !this.data.showjiantou4
        })
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
            region_id: this.data.chengshi,
            rate_id: this.data.pingji,
            earnings_id: this.data.shouyi,
            limit_id: this.data.qixian,
          },
          success: function (res) {
            console.log(res.data)
            console.log('正旭：')
            that.setData({
              company: res.data.data
            })
          }
        })
      } else {
        that.setData({
          showjiantou3: !this.data.showjiantou3,
          showjiantou4: !this.data.showjiantou4
        })
        wx.request({
          url: app.globalData.indexdata,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            user_id: app.globalData.user_id,
            page: page,
            earnings_order: 'desc',
            region_id: this.data.chengshi,
            rate_id: this.data.pingji,
            earnings_id: this.data.shouyi,
            limit_id: this.data.qixian,
          },
          success: function (res) {
            console.log(res.data)
            console.log('倒叙：')
            that.setData({
              company: res.data.data
            })
          }
        })
      }
    } else if (e.currentTarget.dataset.id == 2){
      if (this.data.showjiantou5 == true) {
        that.setData({
          showjiantou5: !this.data.showjiantou5,
          showjiantou6: !this.data.showjiantou6
        })
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
            region_id: this.data.chengshi,
            rate_id: this.data.pingji,
            earnings_id: this.data.shouyi,
            limit_id: this.data.qixian,
          },
          success: function (res) {
            console.log(res.data)
            console.log('正旭；')
            that.setData({
              company: res.data.data
            })
          }
        })
      } else {
        that.setData({
          showjiantou5: !this.data.showjiantou5,
          showjiantou6: !this.data.showjiantou6
        })
        wx.request({
          url: app.globalData.indexdata,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            user_id: app.globalData.user_id,
            page: page,
            limit_order: 'desc',
            region_id: this.data.chengshi,
            rate_id: this.data.pingji,
            earnings_id: this.data.shouyi,
            limit_id: this.data.qixian,
          },
          success: function (res) {
            console.log(res.data)
            console.log('倒叙')
            that.setData({
              company: res.data.data
            })
          }
        })
      }
    }
  },

  pingjiChange: function (e) {
    console.log('评级发生change事件，携带value值为：', e.detail.value)
    var that = this
    that.setData({
      pingji: e.detail.value
    })

  },
  qixianChange: function (e) {
    console.log('期限发生change事件，携带value值为：', e.detail.value)
    var that = this
    that.setData({
      qixian: e.detail.value
    })
  },
  shouyiChange:function(e) {
    console.log('收益发生change事件，携带value值为：', e.detail.value)
    var that = this
    that.setData({
      shouyi: e.detail.value
    })
  },
  regionChange: function (e) {
    console.log('城市发生change事件，携带value值为：', e.detail.value)
    var that = this
    that.setData({
      chengshi: e.detail.value
    })
  },

  /**侧面picker */
  toggleDialogRight() {
    this.setData({
      showDialogRight: !this.data.showDialogRight,
      height:100+'vh'
    });
  },
  freeBackRight: function () {
    var that = this
    console.log('原数组：')
    console.log(this.data.chengshi)
    var chengshi = this.data.chengshi
    for(var i =0;i<=chengshi.length;i++){
      if (chengshi[i] == "0"){
        if (i == 0 && chengshi.length <= 2){
          chengshi.splice(i, 1);
        }else{
          chengshi = 0
        }
      }
    }
    console.log('城市新数组：')
    console.log(chengshi)
    var pingji = this.data.pingji
    for (var i = 0; i <= pingji.length; i++) {
      if (pingji[i] == "0") {
        if (i == 0 && pingji.length <= 2) {
          pingji.splice(i, 1);
        } else {
          pingji = 0
        }
      }
    }
    console.log('评级新数组：')
    console.log(pingji)
    var shouyi = this.data.shouyi
    for (var i = 0; i <= shouyi.length; i++) {
      if (shouyi[i] == "0") {
        if (i == 0 && shouyi.length <= 2) {
          shouyi.splice(i, 1);
        } else {
          shouyi = 0
        }
      }
    }
    console.log('收益新数组：')
    console.log(shouyi)
    var qixian = this.data.qixian
    for (var i = 0; i <= qixian.length; i++) {
      if (qixian[i] == "0") {
        if (i == 0 && qixian.length <= 2) {
          qixian.splice(i, 1);
        } else {
          qixian = 0
        }
      }
    }
    console.log('收益新数组：')
    console.log(qixian)
    if (this.data.value == 'show') {
      wx.showModal({
        title: '提示',
        content: '你没有选择任何内容',
      })
    }
    that.setData({
      showDialogRight: !this.data.showDialogRight
    })
    console.log('城市id:')
    console.log(this.data.chengshi)
    console.log('评级id:')
    console.log(this.data.pingji)
    console.log('收益id:')
    console.log(this.data.shouyi)
    console.log('期限id:')
    console.log(this.data.qixian)
    wx.request({
      url: app.globalData.indexdata,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_id: app.globalData.user_id,
        page: page,
        region_id: this.data.chengshi,
        rate_id: this.data.pingji,
        earnings_id: this.data.shouyi,
        limit_id: this.data.qixian,
      },
      success: function (res) {
        console.log(res)
        console.log(res.data.data)
        that.setData({
          company: res.data.data
        })
      }
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
      url: app.globalData.indexdata,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_id: app.globalData.user_id,
        page: page,
        rate_order: 'asc',
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
  /**页面滚动 */
  jiazai: function () {
    var that = this
    console.log('到底了')
    that.setData({
      jiazai: true
    })
    
    
  },
  scroll: function (e) {
    var that = this
    console.log(e.detail.scrollTop)
    if (e.detail.scrollTop >= 130) {
      that.setData({
        scrollTop: 'nav'
      })
    } else {
      that.setData({
        scrollTop: ''
      })
    }
  },  
  onLoad: function () {
	  
    var that = this
    that.setData({
      id:0,
      region:0
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.windowWidth/ 2)

        that.setData({
          height: res.windowHeight+'px',
          width: res.windowWidth,
          bijiheight: res.windowWidth/2
        })
      }
    }) 
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
        rate_order: 'asc',
        region_id: this.data.chengshi,
        rate_id: this.data.pingji,
        earnings_id: this.data.shouyi,
        limit_id: this.data.qixian,
      },
      success: function (res) {
        console.log('首页开始数据')
        console.log(res.data.logo)
        that.setData({
          company: res.data.data,
          logo:res.data.logo
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
  },

  /**城市点击 */
  click1: function (e) {
    console.log(e.currentTarget.dataset.index)
    var that = this
    var index = e.currentTarget.dataset.index
    var region = this.data.region
    console.log(this.data.region)
    var nowregion = []
    // 切换item状态
    region[index].check = !region[index].check
    // 将选中的item推进nowAgencyFilter0_checked中
    for (var i = 0; i < region.length; i++) {
      if (region[i].check) {
        nowregion.push(region[i])
      }
    }
    // 如果nowAgencyFilter0_checked为空，则选中最后一项，不限；否则最后一项不选中
    if (nowregion.length === 0) {
      nowregion.push(region[0])
      region[0].check = true
    } else {
      region[0].check = false
    }
    // 如果选中不限，则其余选中的item都取消
    if (index === (0)) {
      for (var i = 0; i < region.length; i++) {
        region[i].check = false
      }
      // 并且只选中不限
      region[0].check= true
    }
    //清空nowAgencyFilter0_checked，重新添加选中的item进去
    nowregion = []
    for (let i in region) {
      if (region[i].check) {
        nowregion.push(region[i])
      }
    }
    that.setData({
      region: region,
    })
  },
  /**城市点击 */
  click2: function (e) {
    console.log(e.currentTarget.dataset.index)
    var that = this
    var index = e.currentTarget.dataset.index
    var rate = this.data.rate
    console.log(this.data.rate)
    var nowrate = []
    // 切换item状态
    rate[index].check = !rate[index].check
    // 将选中的item推进nowAgencyFilter0_checked中
    for (var i = 0; i < rate.length; i++) {
      if (rate[i].check) {
        nowrate.push(rate[i])
      }
    }
    // 如果nowAgencyFilter0_checked为空，则选中最后一项，不限；否则最后一项不选中
    if (nowrate.length === 0) {
      nowrate.push(rate[0])
      rate[0].check = true
    } else {
      rate[0].check = false
    }
    // 如果选中不限，则其余选中的item都取消
    if (index === (0)) {
      for (var i = 0; i < rate.length; i++) {
        rate[i].check = false
      }
      // 并且只选中不限
      rate[0].check = true
    }
    //清空nowAgencyFilter0_checked，重新添加选中的item进去
    nowrate = []
    for (let i in rate) {
      if (rate[i].check) {
        nowrate.push(rate[i])
      }
    }
    that.setData({
      rate: rate,
    })
  },
  /**城市点击 */
  click3: function (e) {
    console.log(e.currentTarget.dataset.index)
    var that = this
    var index = e.currentTarget.dataset.index
    var earnings = this.data.earnings
    console.log(this.data.earnings)
    var nowearnings = []
    // 切换item状态
    earnings[index].check = !earnings[index].check
    // 将选中的item推进nowAgencyFilter0_checked中
    for (var i = 0; i < earnings.length; i++) {
      if (earnings[i].check) {
        nowearnings.push(earnings[i])
      }
    }
    // 如果nowAgencyFilter0_checked为空，则选中最后一项，不限；否则最后一项不选中
    if (nowearnings.length === 0) {
      nowearnings.push(rate[0])
      earnings[0].check = true
    } else {
      earnings[0].check = false
    }
    // 如果选中不限，则其余选中的item都取消
    if (index === (0)) {
      for (var i = 0; i < earnings.length; i++) {
        earnings[i].check = false
      }
      // 并且只选中不限
      earnings[0].check = true
    }
    //清空nowAgencyFilter0_checked，重新添加选中的item进去
    nowearnings = []
    for (let i in earnings) {
      if (earnings[i].check) {
        nowearnings.push(earnings[i])
      }
    }
    that.setData({
      earnings: earnings,
    })
  },
  /**城市点击 */
  click4: function (e) {
    console.log(e.currentTarget.dataset.index)
    var that = this
    var index = e.currentTarget.dataset.index
    var limit = this.data.limit
    console.log(this.data.limit)
    var nowlimit = []
    // 切换item状态
    limit[index].check = !limit[index].check
    // 将选中的item推进nowAgencyFilter0_checked中
    for (var i = 0; i < limit.length; i++) {
      if (limit[i].check) {
        nowlimit.push(limit[i])
      }
    }
    // 如果nowAgencyFilter0_checked为空，则选中最后一项，不限；否则最后一项不选中
    if (nowlimit.length === 0) {
      nowlimit.push(limit[0])
      limit[0].check = true
    } else {
      limit[0].check = false
    }
    // 如果选中不限，则其余选中的item都取消
    if (index === (0)) {
      for (var i = 0; i < limit.length; i++) {
        limit[i].check = false
      }
      // 并且只选中不限
      limit[0].check = true
    }
    //清空nowAgencyFilter0_checked，重新添加选中的item进去
    nowlimit = []
    for (let i in limit) {
      if (limit[i].check) {
        nowlimit.push(limit[i])
      }
    }
    that.setData({
      limit: limit,
    })
  },
  /**下拉刷新 */
  onPullDownRefresh: function () {
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
        region_id: this.data.chengshi,
        rate_id: this.data.pingji,
        earnings_id: this.data.shouyi,
        limit_id: this.data.qixian,
      },
      success: function (res) {
        console.log('顺序')
        wx.stopPullDownRefresh()
        console.log(res.data.data)
        that.setData({
          company: res.data.data,
          logo: res.data.logo
        })
       
      }
    })
  },
  onShow: function () {
    var that = this
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
        region_id: this.data.chengshi,
        rate_id: this.data.pingji,
        earnings_id: this.data.shouyi,
        limit_id: this.data.qixian,
      },
      success: function (res) {
        console.log('顺序')
        wx.stopPullDownRefresh()
        console.log(res.data.data)
        that.setData({
          company: res.data.data,
          logo: res.data.logo
        })

      }
    })
  },
    /*rateclick: function (e) {
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
  },*/
})
