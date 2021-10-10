// pages/user/user.js
const app=getApp()
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto:"../../images/user/头像.png",
    nickName:"",
    logged:false,
    disabled:true
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
    wx.cloud.callFunction({
      name:"login",
      data:{},
    }).then((res)=>{
      db.collection("users").where({
        _openid:res.result.openid
      }).get().then((res)=>{
        if(res.data.length){
          app.userInfo=Object.assign(app.userInfo,res.data[0]);
          this.setData({
            userPhoto: app.userInfo.userPhoto,
            nickName: app.userInfo.nickName,
             logged:true
          });
        }
        else{
          this.setData({
            disabled:false
          });
        }
      });
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
this.setData({
  userPhoto:app.userInfo.userPhoto,
  nickName:app.userInfo.nickName
})
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
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        let userInfo=res.userInfo;
        if(!this.data.logged&&userInfo){
              db.collection("users").add({
                data:{
                  userPhoto:userInfo.avatarUrl,
                  nickName:userInfo.nickName
                }
              }).then((res)=>{
                db.collection("users").doc(res._id).get().then((res)=>{
                  app.userInfo=Object.assign(app.userInfo,res.data);
                  this.setData({
                    userPhoto: app.userInfo.userPhoto,
                    nickName: app.userInfo.nickName,
                    logged:true
                  })
                });
              });
            }
      }
    })
  },
})