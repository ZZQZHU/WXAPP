// pages/wdxh/wdxh.js
const db=wx.cloud.database()
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mytitles:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var titleids=[];
    var titlearrs=[];
    console.log(app.userInfo._openid);
    db.collection("lovertitles").where({loverid:app.userInfo._openid}).get().then((res=>{
      console.log(res.data.length)
      if(res.data.length!=0){
      for(var i=0;i<res.data.length;i++){
        titleids[i]=res.data[i].titleid;
      }
      console.log(titleids);
      for(var i=0;i<titleids.length;i++){
        db.collection("wenzhang").doc(titleids[i]).get().then((res=>{
          titlearrs.push(res.data);
          console.log(titlearrs);
          this.setData({
            mytitles: titlearrs
          })
        }))
      }}else{
        this.setData({
          mytitles: titlearrs
        })
      }
    }))
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
    this.onLoad()
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