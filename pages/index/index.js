//index.js
//获取应用实例
const app = getApp()
var page = 1
Page({
  data: {
    page: 1,
    startqus:0,
    last_page: 0,
    company: [],
    showjiantou: true,
    showjiantou2: false,

    showjiantou3: true,
    showjiantou4: false,


    showjiantou5: true,
    showjiantou6: false,


    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    pingji: 0,
    qixian: 0,
    shouyi: 0,
    chengshi: 0,

    rate_order: null,
    earnings_order: null,
    limit_order: null,
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
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
    this.data.page = 1
    var id = e.currentTarget.dataset.id
    var that = this
    that.setData({
      id: id,
      more:'加载更多...'
    })
    /*获取公司首页*/
    if (e.currentTarget.dataset.id == 0) {
      if (this.data.showjiantou == true) {
        that.setData({
          showjiantou: !this.data.showjiantou,
          showjiantou2: !this.data.showjiantou2,
          rate_order: 'asc',
          earnings_order: '',
          limit_order: '',
        })
        console.log('点击导航栏，page的值：' + this.data.page)
        wx.request({
          url: app.globalData.indexdata,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            user_id: app.globalData.user_id,
            page: this.data.page,
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
      } else {
        that.setData({
          showjiantou: !this.data.showjiantou,
          showjiantou2: !this.data.showjiantou2,
          rate_order: 'desc',
          earnings_order: '',
          limit_order: '',
        })
        wx.request({
          url: app.globalData.indexdata,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            user_id: app.globalData.user_id,
            page: this.data.page,
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

    } else if (e.currentTarget.dataset.id == 1) {
      if (this.data.showjiantou3 == true) {
        that.setData({
          showjiantou3: !this.data.showjiantou3,
          showjiantou4: !this.data.showjiantou4,
          rate_order: '',
          earnings_order: 'asc',
          limit_order: '',
        })
        wx.request({
          url: app.globalData.indexdata,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            user_id: app.globalData.user_id,
            page: this.data.page,
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
          showjiantou4: !this.data.showjiantou4,
          rate_order: '',
          earnings_order: 'desc',
          limit_order: '',
        })
        wx.request({
          url: app.globalData.indexdata,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            user_id: app.globalData.user_id,
            page: this.data.page,
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
    } else if (e.currentTarget.dataset.id == 2) {
      if (this.data.showjiantou5 == true) {
        that.setData({
          showjiantou5: !this.data.showjiantou5,
          showjiantou6: !this.data.showjiantou6,
          rate_order: '',
          earnings_order: '',
          limit_order: 'asc',
        })
        wx.request({
          url: app.globalData.indexdata,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            user_id: app.globalData.user_id,
            page: this.data.page,
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
          showjiantou6: !this.data.showjiantou6,
          rate_order: '',
          earnings_order: '',
          limit_order: 'desc',
        })
        wx.request({
          url: app.globalData.indexdata,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            user_id: app.globalData.user_id,
            page: this.data.page,
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
  shouyiChange: function (e) {
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
      height: 100 + 'vh'
    });
  },
  freeBackRight: function (e) {
    if (this.data.rate_order==null){
      this.data.rate_order=0
    }
    if (this.data.earnings_order == null) {
      this.data.earnings_order = 0
    }
    if (this.data.limit_order == null) {
      this.data.limit_order = 0
    }
    console.log('点击导航排序：')
    console.log(this.data.rate_order)
    console.log(this.data.earnings_order)
    console.log(this.data.limit_order)
    this.data.page = 1
    var that = this
    that.setData({
      showDialogRight: !this.data.showDialogRight
    })
    for (var i = 0; i <= this.data.chengshi.length; i++) {
      if(this.data.chengshi[i] == '0' && i == 0) {
        this.data.chengshi.splice(i, 1);
        }
      if (this.data.chengshi[i] == '0' && i != 0) {
         this.data.chengshi = 0
      }
    }
    for (var i = 0; i <= this.data.pingji.length; i++) {
      if (this.data.pingji[i] == '0' && i == 0) {
        this.data.pingji.splice(i, 1);
      }
      if (this.data.chengshi[i] == '0' && i != 0) {
        this.data.pingji = 0
      }
    }
    for (var i = 0; i <= this.data.shouyi.length; i++) {
      if (this.data.shouyi[i] == '0' && i == 0) {
        this.data.shouyi = 0
      }
    }
    for (var i = 0; i <= this.data.qixian.length; i++) {
      if (this.data.qixian[i] == '0' && i == 0) {
        this.data.qixian = 0
      }
    }
    console.log(this.data.chengshi)
    console.log(this.data.pingji)
    console.log(this.data.shouyi)
    console.log(this.data.qixian)
    wx.request({
      url: app.globalData.indexdata,
      method: 'POST',
      header: {
        "Content-Type":"application/x-www-form-urlencoded"
      },
      data: {
        user_id: app.globalData.user_id,
        page: this.data.page,
        region_id: this.data.chengshi,
        rate_id: this.data.pingji,
        earnings_id: this.data.shouyi,
        limit_id: this.data.qixian,
        rate_order: that.data.rate_order,
        earnings_order: that.data.earnings_order,
        limit_order: that.data.limit_order,
      },
      success: function (res) {
        console.log('点击筛选获取到的数据：')
        console.log(res)
        that.setData({
          company: res.data.data
        })
      }
    })
  }, 
  freetoBackRight: function () {
    console.log('导航排序：')
    console.log(this.data.rate_order)
    console.log(this.data.earnings_order)
    console.log(this.data.limit_order)
    var that = this
    that.setData({
      showDialogRight: !this.data.showDialogRight,
      checked: false,
    })
  },

  formSubmit: function (e) {
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
        region_id: e.detail.value.chengshi,
        rate_id: e.detail.value.pingji,
        earnings_id: e.detail.value.shouyi,
        limit_id: e.detail.value.qixian,
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
  /*jiazai: function () {
    var that = this
    var last_page = wx.getStorageSync('last_page');
    that.setData({
      more: '加载更多……',
      page: this.data.page + 1,
    })
    console.log('当前页数为:' + this.data.page)
    console.log('最大页数为:' + last_page)
    if (this.data.page <= last_page) {
      if (that.data.rate_order || that.data.earnings_order || that.data.limit_order) {
        wx.request({
          url: app.globalData.indexdata,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            user_id: app.globalData.user_id,
            page: this.data.page,
            rate_order: that.data.rate_order,
            earnings_order: that.data.earnings_order,
            limit_order: that.data.limit_order,
            region_id: that.data.chengshi,
            rate_id: that.data.pingji,
            earnings_id: that.data.shouyi,
            limit_id: that.data.qixian,
          },
          success: function (res) {
            console.log('下拉请求成功,数据为：')
            console.log(res)
            console.log('之前的数据：')
            console.log(that.data.company)
            console.log('排序：')
            console.log(that.data.rate_order)
            console.log(that.data.earnings_order)
            console.log(that.data.limit_order)
            console.log(that.data.chengshi)
            console.log(that.data.pingji)
            console.log(that.data.shouyi)
            console.log(that.data.qixian)
            that.setData({
              company: that.data.company.concat(res.data.data)
            })
            that.data.page = that.data.page + 1
          }
        })
      } else {
        wx.request({
          url: app.globalData.indexdata,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            user_id: app.globalData.user_id,
            page: this.data.page,
            region_id: that.data.chengshi,
            rate_id: that.data.pingji,
            earnings_id: that.data.shouyi,
            limit_id: that.data.qixian,
          },
          success: function (res) {
            console.log('下拉请求成功,数据为：')
            console.log(res)
            console.log('之前的数据：')
            console.log(that.data.company)
            that.setData({
              company: that.data.company.concat(res.data.data)
            })
            that.data.page = that.data.page + 1
          }
        })
      }
    } else {
      that.setData({
        more: '已加载全部'
      })
    }
  },*/


  jiazai: function () {
    var last_page = wx.getStorageSync('last_page');
    var startque = wx.getStorageSync('startque');
    var that = this
    that.data.page = that.data.page+1
    if (that.data.page <= last_page && startque==1) {
      console.log(that.data.page)
      console.log(last_page)
      wx.removeStorage('startque')
      that.setData({
        more: '加载更多……',
      })
      wx.request({
        url: app.globalData.indexdata,
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          user_id:app.globalData.user_id,
          page: that.data.page,
          rate_order: that.data.rate_order,
          earnings_order: that.data.earnings_order,
          limit_order: that.data.limit_order,
          region_id: that.data.chengshi,
          rate_id: that.data.pingji,
          earnings_id: that.data.shouyi,
          limit_id: that.data.qixian,
        },
        success: function (res) {
          console.log(res.data)
          console.log(res.data.data)
          that.setData({
            company: that.data.company.concat(res.data.data)
          })
          wx.setStorage({
            key: 'startque',
            data: 1,
          })
        }
      })
    } else if (that.data.page > last_page) {
        that.setData({
          more: '已加载全部'
        })
      }
  },

  onLoad: function () {
    var that = this
    that.setData({
      id: 0,
      region: 0,
      more: '加载更多……',
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
        app.globalData.phone = res.data.phone
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.windowWidth / 2)

        that.setData({
          height: res.windowHeight + 'px',
          width: res.windowWidth,
          bijiheight: res.windowWidth / 2
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
            console.log(res.data.code)
            if (res.data.code==222){
              wx.showModal({
                title: '提示',
                content: '您的帐户已冻结，请联系客服解除。客服电话:' + app.globalData.phone,
                success: function () {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: -1
                    })
                  } else if (res.cancel) {
                    wx.navigateBack({
                      delta: -1
                    })
                  } else {
                    wx.navigateBack({
                      delta: -1
                    })
                  }
                },
              })
            }
            app.globalData.user_id = res.data.user_id
            this.data.user_id = res.data.user_id
            /*获取用户信息*/
            console.log('用户信息：')
            console.log(res.data.user_id)
            console.log(app.globalData.userInfo.nickName)
            console.log(app.globalData.userInfo.avatarUrl)
            console.log(app.globalData.userInfo.gender)
            console.log(app.globalData.userInfo.province)
            console.log(app.globalData.userInfo.city)
            console.log(app.globalData.userInfo.country)
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
                console.log('renzheng')
                console.log(res)
                console.log('是否已认证' + res.data.funds_real)
                app.globalData.funds_real = res.data.funds_real
              }
            })
            wx.request({
              url: app.globalData.indexdata,
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                user_id: res.data.user_id,
                page: page,
              },
              success: function (res) {
                console.log('首页开始数据')
                console.log(res)
                wx.setStorage({
                  key: 'last_page',
                  data: res.data.last_page,
                })
                wx.setStorage({
                  key: 'startque',
                  data: 1,
                })
                that.setData({
                  company: res.data.data,
                  logo: res.data.logo,
                  logos: res.data.troll,
                })
              }
            })
          }
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
          region: res.data.region,
          /**评级数据 */
          rate: res.data.rate,
          /**期限数据 */
          limit: res.data.limit,
          /**收益数据 */
          earnings: res.data.earnings,
        })
        that.data.page = 1
      },
    })
  },
  getUserInfo: function (e) {
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
      region[0].check = true
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
    // 将选中的item推进nowAgencyFilter0_checked中
    for (var i = 0; i < earnings.length; i++) {
      if (i == index) {
        earnings[i].check = true
        nowearnings.push(earnings[i])
      } else {
        earnings[i].check = false
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
    for (var i = 0; i < limit.length; i++) {
      if (i == index) {
        limit[i].check = true
        nowlimit.push(limit[i])
      } else {
        limit[i].check = false
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
    var that = this
    console.log('下拉')
    that.setData({
      showjiantou: true,
      showjiantou2: false,
      showjiantou3: true,
      showjiantou4: false,
      showjiantou5: true,
      showjiantou6: false,
      id:0,
      more:'加载更多...'
    })
    this.data.page=1
    wx.request({
      url: app.globalData.indexdata,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_id: app.globalData.user_id,
        page: 1,
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
    this.data.page = 1
    var that = this
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
            console.log(res.data.code)
            if (res.data.code == 222) {
              wx.showModal({
                title: '提示',
                content: '您的帐户已冻结，请联系客服解除。客服电话' + app.globalData.phone,
                success: function () {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: -1
                    })
                  } else if (res.cancel) {
                    wx.navigateBack({
                      delta: -1
                    })
                  } else {
                    wx.navigateBack({
                      delta: -1
                    })
                  }
                },
              })
            }
          }
        })
      }
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
  /**监听页面滚动 */
  onPageScroll:function(e){
    var that = this
    if (e.scrollTop>=128){
        that.setData({
          scrollTop: 'nav'
        })
      } else {
        that.setData({
          scrollTop: ''
        })
    }
  },
  onReachBottom:function(e){
    wx.showLoading({
      title: '玩命加载中',
    }) 
    var last_page = wx.getStorageSync('last_page');
    var startque = wx.getStorageSync('startque');
    var that = this
    that.data.page = that.data.page + 1
    console.log('当前page为：' + that.data.page)
    if (that.data.page <= last_page+1 && startque == 1) {
      console.log(that.data.page)
      console.log(last_page)
      wx.removeStorageSync("startque")
      that.setData({
        more: '加载更多……',
      })
      wx.request({
        url: app.globalData.indexdata,
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          user_id: app.globalData.user_id,
          page: that.data.page,
          rate_order: that.data.rate_order,
          earnings_order: that.data.earnings_order,
          limit_order: that.data.limit_order,
          region_id: that.data.chengshi,
          rate_id: that.data.pingji,
          earnings_id: that.data.shouyi,
          limit_id: that.data.qixian,
        },
        success: function (res) {
          console.log(res.data)
          console.log(res.data.data)
          console.log(res.data.data.length)
            that.setData({
              company: that.data.company.concat(res.data.data)
            })
            wx.setStorage({
              key: 'startque',
              data: 1,
            })
          if (res.data.data.length==0){
              wx.hideLoading(); 
              that.setData({
                more: '已加载完成',
              })
            }else{
              wx.hideLoading(); 
            }
          }
      })
    }else{
      wx.hideLoading(); 
    }
  },
  onShareAppMessage: function () {
    return {
      title: '选资产，来碰投',
      desc: '选资产，来碰投',
      path: '/pages/index/index'
    }
  }
})
