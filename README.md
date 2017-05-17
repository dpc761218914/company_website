##前言：

如果图片加载有问题可直接去博客查看：http://www.jianshu.com/p/b08d6266cbd6

&emsp;&emsp;最近使用node.js开发了一个简单的企业网站。发现node.js中许多现有的模块使用起来确实便捷，再配合前台json交互，网站就很快就开发完成。  
相关工具：
- node 4.4.5
- mongodb3.2.6(64bit)
- Robomongo0.9.0-RC8
- webstrom11.0.1  

相关环境安装以后，导入工程，npm install，修改配置node.exe路径。应该就能运行成功，欢迎issue。
关于数据库后台登录时，用户可以先注册一个帐号，然后在数据库修改用户的标志位。就可以登录成功了，标志位分别是0，1，2

—————————————
先上效果图吧（没有美工，资源就网上搜了）  


**1、网站效果图：**
![网站首页.png](http://upload-images.jianshu.io/upload_images/2227968-c210e2991d4f5a56.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![前台新闻列表.png](http://upload-images.jianshu.io/upload_images/2227968-a40e971dc06fafe0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**2、移动端显示：**   


![移动端1.png](http://upload-images.jianshu.io/upload_images/2227968-9fdf30b84461969a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![移动端2.png](http://upload-images.jianshu.io/upload_images/2227968-37031613e1ce2bd4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**3、后台管理系统：**  

![登陆界面.png](http://upload-images.jianshu.io/upload_images/2227968-f8bd6bbe28606a06.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![新闻列表.png](http://upload-images.jianshu.io/upload_images/2227968-9a34bbd9523bf7de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![管理员列表.png](http://upload-images.jianshu.io/upload_images/2227968-61eef83a099f30e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



##一：网站整体结构（express+mongoose+bootstrap+layui）：

**1.1、服务端**
- express+mongoose:后台整体结构我直接参照之前写的一个express+mongoose实现增删改查的例子。[源代码在这儿](http://https://github.com/dpc761218914/express_restapi)
- express:一个node.js快速开发web应用的框架。
- mongoose：一个在node.js异步环境下对mongodb进行便捷操作的对象模型工具。
- moment.js:一个极好用的node.js时间模块。
- svg-captcha:node.js图片验证码模块。
-  express-session：用户登录登录以及图片验证码校验时session管理。

**1.2、网站**
-  bootstrap + 参照网上的一个企业企业响应式网站模板。[模板地址在这儿](http://http://www.cssmoban.com/cssthemes/6419.shtml)

**1.3、后台管理系统**
-  Layui，一个很好用的前端框架，相对于bootstrap有各种实现好的功能直接用，如弹窗，时间选择器以及拥有活跃的社区。

##二：主要功能：
-  前台ui设计及信息展示。
-  后台管理系统登录、注册。
-  新闻，招聘，离职公告结合UEditor实现动态添加、删除。
-  express中使用图片验证码。
-  用户反馈，用户反馈时后台消息弹窗提示。

##三、开发流程及项目结构图：
-  3.1、前台静态页面设计。
-  3.2、express项目搭建、数据库设计、路由设计等。
-  3.3、后台cms设计，UEditor整合express。

![项目工程图.png](http://upload-images.jianshu.io/upload_images/2227968-107ede5900dfb92f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##四、网站相关代码说明：
-  4.1、导航栏选中变色；公共页面并不添加选中效果，在各自页面通过添加class实现选中效果。
```
//include_header.html包含所有的li链接。
  <li  id="main"><a href="/">首页</a></li>
//index.html页面初始化时执行
  $("#main").addClass("active");
```
-  4.2、网页中轮播相片在手机端显示时，被等比例缩放，显得特别窄。
```
//index.html页面中给轮播img标签设置最小高度200px
<div class="item active">  
      ![](http://localhost:3000/web/images/index3.jpg)
</div>
```
-  4.3、同样也是图片问题，使用UEditor上传图片内容后，如果图片过大，在手机端网页会图片撑开，不太友好。
```
//设置div的id为tabContent下所有的img标签最大宽度为屏幕90%
/*设置新闻详情图片最大宽度不超过90%，同时居中显示*/
#tabContent img{  max-width:90%;}
```
-  4.4、ejs include实现重复代码抽，在页面中引用的时候，include进来就好了，不过要注意相对路径。如下图将网页中的共有的头部和尾部提取出来。
![include.png](http://upload-images.jianshu.io/upload_images/2227968-598d1c1008fd8e12.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
//引入头部：
<%include ../common/include_header.html%>
//网页其他代码
//引入尾部：
<%include ../common/include_footer.html%>
```
-  4.5、网站用到的转场动画wow.js。[官网在这儿](http://mynameismatthieu.com/WOW/)



##五、后台管理系统相关代码说明：
-  5.1、关于express下图片验证码模块svg-captcha，不过使用前先要安装express-session，因为我们需要使用session存验证码字符串，便于校验。[详细使用介绍在这儿](https://github.com/lemonce/svg-captcha)

-  5.2、验证码模块安装配置好后，在用户登录或者注册的时候。如何实现点击图片验证码刷新呢。
![验证码示例.png](http://upload-images.jianshu.io/upload_images/2227968-02bfa2fbf3e0108c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
//网页中使用图片验证码的地方，有个style设置图片可以点击，同时onclick实现图片验证码点击刷新。
![](http://localhost:3000/captcha)
```

-  5.3、当网站有用户提交反馈信息时，工作人员希望在后台可及时收到消息提示信息。想着简单的方法，通过js定时查询数据库，发现有数据更新及时弹窗提醒工作人员。效果如下：

![弹窗消息提醒.png](http://upload-images.jianshu.io/upload_images/2227968-99e18c26845ae39f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
//在页面初始化的时候执行，这里设置5秒执行一次。
 setInterval(getFeedbacks,5000);
//在admin/main.html中ajax查询数据库函数
function getFeedbacks(){  
         $.get("/admin/check_feedbacks",function(resu
![Uploading 弹窗消息提醒_987878.png . . .]lt){     
           if(result.status==='success'){         
                            layer.open({           
                                     type: '1' 
                                     ,offset: 'rb' //右下方                          
                                    ,id: 'LAY_demo'+'rb' //防止重复弹出            
                                    ,content: '<div style="padding: 20px 100px;">你有'+result.size+'条待处理反馈信息,请在反馈信息列表查看！</div>'            
                                    ,btn: '我知道了'           
                                    ,btnAlign: 'c' //按钮居中           
                                    ,shade: 0 //不显示遮罩           
                                    ,time: 10000 //10秒后自动关闭            
                                    ,anim: 2 //设置弹出的动画样式           
                                     ,yes: function(){               
                                              layer.closeAll();          
                                      }        
                               });     
                     }  
 });};
```
-  5.4、关于后台使用到的分页建议参考代码，或者去layui找实例改。一般就是传当前页数，后台返回数据条数以及总数据条数。

##六、服务端相关代码说明：
-  6.1、关于后台权限问题，类似于java中过滤器。当用户访问登录及注册页面时可直接访问，但是当用户访问其他后台页面时，提醒用户先登录。app.js文件里面的路由文件是顺序执行的。  
[参考资料](https://cnodejs.org/topic/512d8172df9e9fcc58333c73)  
```
//网页中使用图片验证码的地方，有个style设置图片可以点击，同时onclick实现图片验证码点击刷新。
/*官网后台做操作是需要，登录验证*/
app.use(function(req,res,next){
              if (!req.session.user) {   
                       if(req.url=="/login"||req.url=="/register"){    
                                  next();//如果请求的地址是登录则通过，进行下一个请求    }    
                       else {     
                       res.redirect('/login');   
                 }  } 
                else if (req.session.user) 
                        {    
                              next(); 
                      }
});
/*后台登录验证*
//后台其他路由。
/require('./routes/admin')(app);
```
-  6.2、时间格式化代码使用moment.js模块。  [官网在这儿](http://momentjs.cn/)  

![moment格式化.png](http://upload-images.jianshu.io/upload_images/2227968-aaf77e905d066351.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
/*引入时间模块*/
var Moment = require('moment');
//使用Moment，获得格式化后的当前时间
var time=Moment().format('YYYY-MM-DD HH:mm');
```
-  6.3、express中使用UEditor相关配置。多文本编辑器不管是ueditor还是images他们都需要直接放在public下，不然会出错。  [参照这位朋友博客](http://blog.csdn.net/a1104258464/article/details/52231737)  

- 6.4、关于node.js中分页的处理。  [资料](http://www.cnblogs.com/sword-successful/p/4953803.html)  

##七、：最后
项目部署用的是阿里云的windows系统，懒得部署的话直接用在服务器上webstrom启动就是了。
也可参考我的另外一个博文： [nssm部署node.js项目](https://my.oschina.net/u/2480757/blog/713694)  
素材来源： [一个神奇的高清图片库](https://unsplash.com/)
 [完整源代码](https://github.com/dpc761218914/company_website)  

所有资料都来自互联网，有冒犯之处请告知。
