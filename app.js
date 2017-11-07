//app.js
App({
  globalData: {
    userInfo: null,
    user_id: null,
    funds_real:null,
    /**获取openid */
    get_open_id: 'https://bond.jikeyun.net/index.php/interfaces/auth/get_open_id',
    /**获取用户信息 */
    get_info: 'https://bond.jikeyun.net/index.php/interfaces/auth/get_info',
    /**个人中心 */
    my_center: 'https://bond.jikeyun.net/index.php/interfaces/info/my_center',
    /**关于我们 */
    about: 'https://bond.jikeyun.net/index.php/interfaces/info/about',
    /**我的名片 */
    my_card: 'https://bond.jikeyun.net/index.php/interfaces/info/my_card',
    /**创建或修改名片 */
    create_card:'https://bond.jikeyun.net/index.php/interfaces/info/create_card',
    /**债券筛选 */
    screen_funds: 'https://bond.jikeyun.net/index.php/interfaces/home/screen_funds',
    /**我的债券 */
    my_funds: 'https://bond.jikeyun.net/index.php/interfaces/info/my_funds',
    /**发布债券 */
    create_funds: 'https://bond.jikeyun.net/index.php/interfaces/home/create_funds',
    /**债券详情 */
    funds_details: 'https://bond.jikeyun.net/index.php/interfaces/home/funds_details',
    /**认购债券信息页 */
    subscribe_info: 'https://bond.jikeyun.net/index.php/interfaces/home/subscribe_info',
    /**认购债券 */
    subscribe: 'https://bond.jikeyun.net/index.php/interfaces/home/subscribe',
    /**首页数据 */
    indexdata:'https://bond.jikeyun.net/index.php/interfaces/home/data',
    /**筛选数据 */
    screen: 'https://bond.jikeyun.net/index.php/interfaces/home/screen',
    /*发送验证码*/
    send_sms:'https://bond.jikeyun.net/index.php/interfaces/home/send_sms',
    /**付息周期接口 */
    cycle_data:'https://bond.jikeyun.net/index.php/interfaces/home/cycle_data',
    /**评级接口 */
    rate_data: 'https://bond.jikeyun.net/index.php/interfaces/home/rate_data',
    /**资金方认证 */
    funds_real: 'https://bond.jikeyun.net/index.php/interfaces/info/funds_real',
  },
  onLaunch: function () {
  var _this = this
  /*获取屏幕尺寸*/
  wx.getSystemInfo({
    success: res => {
      console.log(res)
    }
  })
  // 获取用户信息
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            _this.globalData.userInfo = res.userInfo
            

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
      }
    }
  })
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        /*获取openid*/
        wx.request({
          url: _this.globalData.get_open_id,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            code: res.code,
          },
          success:res=> {
            console.log(res)
            _this.globalData.user_id = res.data.user_id
            console.log(_this.globalData.userInfo)
          /*获取用户信息*/
          wx.request({
            url: _this.globalData.get_info,
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              user_id: res.data.user_id,
              nickName: _this.globalData.userInfo.nickName,
              avatar: _this.globalData.userInfo.avatarUrl,
              gender: _this.globalData.userInfo.gender,
              province: _this.globalData.userInfo.province,
              city: _this.globalData.userInfo.city,
              country: _this.globalData.userInfo.country,
            },
            success: res => {
              console.log('renzheng')
              console.log(res)
              console.log('是否已认证'+res.data.funds_real)
              _this.globalData.funds_real = res.data.funds_real
            }
          })
          }
        })
      }
    })
  },
})