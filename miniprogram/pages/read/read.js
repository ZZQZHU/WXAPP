// pages/read/read.js
const db=wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titles:[],
    paixu:'loves'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  wzzs(ev){
    let  _openid=ev.currentTarget.dataset.openid;
    let  titleid=ev.currentTarget.dataset.titleid;
    wx.navigateTo({
      url: '../wzzs/wzzs?_openid='+ _openid+'&titleid='+titleid
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
    db.collection("wenzhang").orderBy(this.data.paixu,'desc').get().then((res=>{
      this.setData({
        titles:res.data
      })
    }))
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

  },
  changepx(ev){
    let paixu=ev.target.dataset.paixu;
    console.log(ev.target.dataset);
    if(paixu==this.data.paixu){
    }else{
      this.setData({
        paixu:paixu
      })
    }
    this.onShow()
  },
})