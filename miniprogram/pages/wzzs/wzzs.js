// pages/wzzs/wzzs.js
const db=wx.cloud.database()
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   titledetail:'',
   sum:'',
   userPhoto:"",
   nickName:"",
   content:'',
   zhuangtai:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var wzid=options.titleid;
     let openid=app.userInfo._openid;
     console.log(wzid);
     console.log(openid);
    db.collection("wenzhang").doc(wzid).get().then((res=>{
      console.log(res)
      this.setData({
        titledetail:res.data,
        sum:res.data.loves,
        content:res.data.content.replace(/\n/g, "\n    ")
      })
    }))
    db.collection("users").where({_openid:options._openid}).get()
    .then((res=>{
      this.setData({
        nickName:res.data[0].nickName,
        userPhoto:res.data[0].userPhoto
      })
    }
    ))
    db.collection("lovertitles").where({
      titleid:wzid,
      loverid:openid
    }).get().then((res=>{
      if(res.data.length>0){
      this.setData({
        zhuangtai:res.data[0].zhuangtai
      })}
    }))
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
  dz(ev){
    let id=ev.currentTarget.dataset.id;
    let zhuangtai=!this.data.zhuangtai;
    let _openid=app.userInfo._openid;
    console.log(id);
    console.log(_openid);
    if(!app.userInfo._openid){
      wx.showToast({
        title: '请先登录',
        'image':'../../images/user/失败.png',
      })
    }else{
    if(zhuangtai==true){
      wx.cloud.callFunction({
        name:"dianzan",
        data:{
          id:id,
        }
      }).then(res=>{db.collection("wenzhang").doc(id).get().then(res=>{
        console.log(res);
        this.setData({
          sum:res.data.loves,
          zhuangtai:zhuangtai
        })
      })})
     db.collection("lovertitles").add({
      data: {
        titleid:id,
        loverid:_openid,
        zhuangtai:true
      }
     });
     wx.showToast({
      title: '点赞成功',
      mask:true
    });  
    }else{
      wx.cloud.callFunction({
        name:"quxiao",
        data:{
          id:id,
        }
      }).then(res=>{db.collection("wenzhang").doc(id).get().then(res=>{
        console.log(res);
        this.setData({
          sum:res.data.loves,
          zhuangtai:zhuangtai
        })
      })})
     db.collection('lovertitles').where({
      titleid:id,
      loverid:_openid
     }).remove({
      success: function(res) {
        console.log(res.data)
      }
    });
    wx.showToast({
      title: '取消成功',
      mask:true
    })
    }
    }
  }
})