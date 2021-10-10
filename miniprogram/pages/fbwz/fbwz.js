// pages/fbwz/fbwz.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bigImg:''//默认图片，设置为空也可以
  },
changeBigImg() {
    var that = this;
    let openid = app.globalData.openid || wx.getStorageSync('openid');
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,//云存储图片名字
          filePath,//临时路径
          success: res => {
            console.log('[上传图片] 成功：', res)
            console.log(res.fileID)
            that.setData({
              bigImg: res.fileID,//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
            });
          },
           fail: e => {
            console.error('[上传图片] 失败：', e)
          },
          complete: () => {
            wx.hideLoading()
          }
        });
      }
    })
  },
  //提交表单添加到数据库
  formSubmit(res){
    var{title,content}=res.detail.value;
    if(title!=""&&content!=""){
    var dataTimes = new Date();
    //获取年月日
      var dataYear = dataTimes.getFullYear();
      var dataMonth = dataTimes.getMonth() + 1;
      var dataDay = dataTimes.getDate();
      var dataHours = dataTimes.getHours();
       var dataMinutes = dataTimes.getMinutes();
       var dataSeconds = dataTimes.getSeconds();
      if (dataMonth < 10) {
        dataMonth = '0' + dataMonth;
      };
      if (dataDay < 10) {
        dataDay = '0' + dataDay;
      };
      if (dataHours < 10) {
        dataHours = '0' + dataHours;
      };
      if (dataMinutes < 10) {
        dataMinutes = '0' +dataMinutes;
      };
      if (dataSeconds < 10) {
        dataSeconds = '0' + dataSeconds;
      };
    var myDate =  dataYear+ '-' + dataMonth + '-' + dataDay + '  ' +dataHours + ':' + dataMinutes + ':' + dataSeconds;
     //把图片存到集合表
     const db = wx.cloud.database();
     db.collection("wenzhang").add({
       data: {
         bigImg:this.data.bigImg,
         time:myDate,
         title:title,
         content:content,
         loves:0,
         titleid:Math.random() * 1000000
       },
       success: function () {
         wx.showToast({
           title: '提交成功',
           'icon': 'none',
           duration: 3000
         });
         wx.switchTab({
          url: '../user/user',
        })
       },
       fail: function () {
         wx.showToast({
           title: '提交失败',
           'icon': 'none',
           duration: 3000
         })
       }
     }); }else{
       wx.showToast({
         title: '提交失败，为空',
         'image':'../../images/user/失败.png',
       })
     }
  },

  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
  },
  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
  },
  /* 生命周期函数--监听页面显示 */
  onShow: function () {
  },
  /* 生命周期函数--监听页面隐藏*/
  onHide: function () {
  },
  /* 生命周期函数--监听页面卸载 */
  onUnload: function () {
  },
  /* 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {
  },
  /* 页面上拉触底事件的处理函数 */
  onReachBottom: function () {
  },
  /* 用户点击右上角分享*/
  onShareAppMessage: function () {
  }
})