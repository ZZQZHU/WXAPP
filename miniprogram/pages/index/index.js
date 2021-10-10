// miniprogram/pages/index/index.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
     
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    db.collection("wenzhang").orderBy('time','desc').get().then((res=>{
      this.setData({
        imgUrls:res.data
      })
    }))
  },
  formSubmit(res){
    console.log(res.detail.value);
    let some=res.detail.value.some;
    if(some==""){
      wx.showToast({
        title: '请输入内容',
        'image':'../../images/user/失败.png',
      })
    }else{
    wx.navigateTo({
      url: '../sswz/sswz?some='+some,
    })
  }
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