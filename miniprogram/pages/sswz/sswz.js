// pages/sswz/sswz.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ssarrs=[];
  var titlesarrs=[];
  console.log(options.some);
  var some=options.some;
  db.collection("wenzhang").get().then((res=>{
    console.log(res.data);
    var arrs=[];
    arrs=res.data;
    console.log(arrs);
    let tarrs=[];
    for(var i=0;i<arrs.length;i++){
      tarrs[i]=arrs[i].title;
    };
    console.log(tarrs[1]);
    var i=0;
    tarrs.forEach((item)=>{
      let res = item.indexOf(some);
      if (res != -1) {
        ssarrs[i]=item;
        i++;
      };
    }); 
    console.log(ssarrs);
    for(var h=0;h<ssarrs.length;h++){
          db.collection("wenzhang").where({
            title:ssarrs[h]
          }).get().then((res=>{
            console.log(res.data[0]);       
              // titlesarrs[h]=res.data[0];   异步问题，此时h始终为1。换用push
              titlesarrs.push(res.data[0]);
              console.log(titlesarrs);
              this.setData({
                titles:titlesarrs
              });
          }))
        }; 
  }));
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  wzzs(ev){
    let  _openid=ev.currentTarget.dataset.openid;
    let  titleid=ev.currentTarget.dataset.titleid;
    wx.navigateTo({
      url: '../wzzs/wzzs?_openid='+ _openid+'&titleid='+titleid
    })
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

  }
})