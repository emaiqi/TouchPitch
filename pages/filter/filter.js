// pages/filter/filter.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断筛选类型是机构还是技师
    isAgency: true,
    item: {
      key: '机构类型',
      id: 0,
      names: [{
        name: '公益调理',
        checked: true,
        id: 0,
        key_id: 0
      }, {
        name: '商业调理',
        checked: false,
        id: 1,
        key_id: 0
      }, {
        name: '培训',
        checked: false,
        id: 2,
        key_id: 0
      }, {
        name: '产品供应商',
        checked: false,
        id: 3,
        key_id: 0
      }, {
        name: '素食餐厅',
        checked: false,
        id: 4,
        key_id: 0
      }, {
        name: '养老院',
        checked: false,
        id: 5,
        key_id: 0
      }, {
        name: '不限',
        checked: false,
        id: -1,
        key_id: 0
      }],
    },
  },
  
  // 选择机构类型
  chooseAgencyStyle0: function (e) {
    console.log(e.currentTarget.dataset.index)
    var that = this
    var index = e.currentTarget.dataset.index
    var isAgency = that.data.isAgency
    var item = that.data.item
    var nowitem = []
    // 切换item状态
    item.names[index].checked = !item.names[index].checked
    // 将选中的item推进nowAgencyFilter0_checked中
    for (let i in item.names){
      if (item.names[i].checked){
        nowitem.push(item.names[i])
      }
    }
    // 如果nowAgencyFilter0_checked为空，则选中最后一项，不限；否则最后一项不选中
    if (nowitem.length === 0 ){
      nowitem.push(item.names[item.names.length-1])
      item.names[item.names.length - 1].checked = true
    }else{
      item.names[item.names.length - 1].checked = false
    }
    // 如果选中不限，则其余选中的item都取消
    if (index === (item.names.length - 1) ){
      for (let i in item.names) {
        item.names[i].checked = false
      }
      // 并且只选中不限
      item.names[item.names.length - 1].checked = true
    }
    //清空nowAgencyFilter0_checked，重新添加选中的item进去
    nowitem = []
    for (let i in item.names) {
      if (item.names[i].checked) {
        nowitem.push(item.names[i])
      }
    }
    that.setData({
      item: item,
    })
  },

})