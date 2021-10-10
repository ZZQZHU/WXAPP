// pages/wdwz/wdwz.js
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

  },
  wzzs(ev){
   let  _openid=ev.currentTarget.dataset.openid;
   let  titleid=ev.currentTarget.dataset.titleid;
   wx.navigateTo({
     url: '../wzzs/wzzs?_openid='+ _openid+'&titleid='+titleid
   })
 },
 delete(ev){
   console.log(ev);
   let _id=ev.currentTarget.dataset.id;
   console.log(_id)
   db.collection("wenzhang").doc(_id).remove().then((res=>{
     console.log(res);
     wx.showToast({
       title: '删除成功',
     })
     this.onShow();
     })
   )
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
    db.collection("wenzhang").where({_openid:app.userInfo._openid}).get().then((res=>{
      this.setData({
        mytitles:res.data
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
  }
})