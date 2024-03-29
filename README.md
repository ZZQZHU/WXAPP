知识学习社区微信小程序（Github上图片可能显示不出来，下载下来没有问题）

​                                                                                正式上线的小程序扫码即可查看（或者微信搜索小程序：海洋知识学习）

![](https://github.com/ZZQZHU/WXAPP/blob/main/readmeIMG/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%A0%81.png?raw=true)

注意由于该小程序是以个人号发布上线的，有些功能无法发布（如不允许发布发表文章功能），因此我在正式上线的小程序版本中对发表文章功能进行了删除，所以各位扫码的小程序是没有发表文章的功能，也因此各位我的文章也为空。

但GitHub上下载的代码，这些功能还是完备的。因此特意将小程序运行演示录屏。

视频地址           https://v.qq.com/x/page/w3301gi0411.html?sf=uri



一.如何实现部署

打开微信小程序开发者工具，创建一个能实现云开发的小程序（将其自带的代码全删了）

将下载下来的代码全拷进去

然后需要开通云开发功能并注意设置当前环境



1.开通数据库并创建三个数据表分别为文章，用户和点赞功能所需要的喜爱文章表。如下图。

<img src="https://github.com/ZZQZHU/WXAPP/blob/main/readmeIMG/%E4%BA%91%E6%95%B0%E6%8D%AE%E5%BA%93.png?raw=true" style="zoom:80%;" />

2.开通云存储（用于存放用户头像userPhoto和文章图片）其中只需创建一个userPhoto的文件夹即可，用于单独存放用户头像。而文章图片（是发表文章功能中由用户自己上传）则如图中一样为散放状态，如下图。

<img src="https://github.com/ZZQZHU/WXAPP/blob/main/readmeIMG/%E4%BA%91%E5%AD%98%E5%82%A8.png?raw=true" style="zoom:67%;" />



3.开通云函数（是用户自定义函数来实现某些功能）如下图其中依次为点赞功能，获取用户id功能，自动登录功能和取消点赞功能。

![](https://github.com/ZZQZHU/WXAPP/blob/main/readmeIMG/%E4%BA%91%E5%87%BD%E6%95%B0.png?raw=true)

注意云函数这里不需要进行什么操作，只需将这四个云函数复制到对应的文件夹（cloudfunctions）中并完成上传部署（同步云函数列表）注意当前环境

如下图

![](https://github.com/ZZQZHU/WXAPP/blob/main/readmeIMG/%E4%BA%91%E5%87%BD%E6%95%B0%E9%83%A8%E7%BD%B2.jpg?raw=true)



二.代码文件的一些解释（方便各位理解）

整个步骤完成后，最后的编辑器应该是这样的，如下图

![](https://github.com/ZZQZHU/WXAPP/blob/main/readmeIMG/%E5%AE%8C%E6%88%90.png?raw=true)

其中gongju是用来对点赞数和文章标题过长进行优化的。

images是用来存放一些tabbar和默认头像以及提示的小图标等。

style是通过阿里巴巴矢量图标库来引用对应的小图标

pages是各页面（采用拼音首字母来命名各页面）如下图。各页面依次为发表文章fbwz，首页index，修改昵称nicheng，阅读read，搜索文章sswz，修改头像touxiang，我的user，我的文章wdwz，我的喜欢wdxh，文章展示wzzs。

![](https://github.com/ZZQZHU/WXAPP/blob/main/readmeIMG/%E9%A1%B5%E9%9D%A2.png?raw=true)

这个小程序供大家学习参考，如何部署已经尽量说的很详细了。
