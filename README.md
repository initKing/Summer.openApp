## 示例用图：

### 说明：aaa App为主调App的工程代码， test1 App为 被调App的示例工程代码。

#### 1. 使用 summer 框架开发的 summer App 调用**第三方App**示例
> 示例包含了，打开第三方App，如微信、支付宝、手机内置浏览器等第三方App的示例， 安卓、iOS均有效

#### 2. 使用 summer 框架开发的 summer App 调用**summer App**
> iOS、Android端都已验证打开 test1 app OK
 
> iOS 端传参没问题，执行test1 App指定方法没问题


> Android 端打开指定方法 & 传参已OK，Android须在summer.openApp API中传递 type:"scheme"参数（**必传**），对iOS无影响





2.1 HTML示例
```
<div class="um-content">
   <p>打开第三方应用</p>
   <div class="p15">
    <button class="btn" onclick="openApp('weixin://dl/moments','com.tencent.mm')">
     click打开【weixin://dl/moments】
    </button>
   </div>
   <div class="p15">
    <button class="btn" onclick="openApp('http://','com.android.browser')">
     click打开【com.android.browser】
    </button>
   </div>
   <div class="p15">
    <button class="btn" onclick="openApp('mqq://','com.tencent.mobileqq')">
     click打开【mqq://】     【com.tencent.mobileqq】
    </button>
   </div>
   <div class="p15">
    <button class="btn" onclick="openApp('autonavi://','com.autonavi.minimap')">
     click打开【autonavi://】【高德地图com.autonavi.minimap】
    </button>
   </div>
   <div class="p15">
    <p>iOS端必须要添加evaluateJavaScript， 对Android无影响</p>
    <button class="btn" onclick="openApp('testapp://evaluateJavaScript','com.yonyou.test1')">
     click打开【testapp://】【方式1 openApp test1 App】
    </button>
   </div>
   <div class="p15">
    <button class="btn" onclick="openAppaa()">
     click打开【testapp://】【方式2 web test1 App】
    </button>
   </div>

   <div class="p15">
    <p>从web 方式打开summer App，在App内部使用a标签打开summer App功能升级中，当前不支持</p>
    <a href="testapp://evaluateJavaScript?parameters=%7B%22function%22:%22open()%22,%22winId%22:%22root%22,%22parameters%22:%7B%22aa%22:%22vv%22%7D%7D%0A">打开testapp</a>
   </div>
</div>
```

2.2 JS示例
```
//对于ios，打开第三方app还需要在当前app配置要打开的目标app的白名单，参见config.xml中的queriesSchemes配置
function openApp(urlScheme, pkgName){
	alert('ios需要再config.xml中配置queriesSchemes')
	summer.openApp({
		"type":"scheme",  // 仅Android可用，对iOS无影响；增加后，唤起被调App后，可执行指定方法，并且可接收传递的参数
        "ios_appid" : urlScheme, //ios所需的参数，目标app的urlscheme，例如："weixin://" 
        						 //如果要打开summer App，需要配置evaluateJavaScript 
        						 // 例如：molischeme://evaluateJavaScript
        "android_packagename" : pkgName,//android所需的参数，目标app的应用包名(即config.xml文件中应用包名)，例如："com.tencent.mm" 
        "param" : {
	        "parameters":{
		        "parameters":{"项目名称":"华新丽华"},
		        "function":'open()',
		        "winId":"root"
	        }
        },
        "callback" : function(args){
        	//目前只有Android有callback
        	alert(JSON.stringify(args)); //android args is {"status":"打开成功","code":"1"}
        	 		     //andriod args is {"err_msg":{"status":"没有访问权限或者应用不存在","code":"0"}}
        }
    })
}
```

#### 3. web页面 调用**summer App** 示例
> aaa 示例中，提供了 web页面调用 test1 App 的示例，但是当前在App内的通过*a*标签打开test1 App 有问题，在升级中...
  
> 在web页面上通过a标签的href属性打开summer App 没问题

###### 3.1 操作步骤
> 详细步骤参照： [传送门](https://moli.yonyoucloud.com/molidoc/docs/summer//433) 
> 地址： https://moli.yonyoucloud.com/molidoc/docs/summer//433
- 在被打开的App 配置文件config.xml 中添加 **Scheme**
 ```
  <!-- 设置当前App的 scheme， 以便被其他App调用 --> 
  <urlScheme>testapp</urlScheme>  
  <androidScheme>testapp</androidScheme>  
 ```

- 支持的调用方式：
网页中新增如下跳转协议：即scheme://evaluateJavaScript?parameters=

> 注意：parameters参数需要使用 **url编码**

如参数：
```
{"function":"open()","winId":"root","parameters":{"aa":"vv"}}
```
编码完成后是
``` 
%7B%22function%22:%22open()%22,%22winId%22:%22root%22,%22parameters%22:%7B%22aa%22:%22vv%22%7D%7D 
```
则页面跳转写入如下代码即可实现跳转
```
scheme://evaluateJavaScript?parameters=%7B%22function%22:%22open()%22,%22frameId%22:%22newHome%22,%22winId%22:%22homePage%22,%22parameters%22:%7B%22aa%22:%22vv%22%7D%7D
```

> 参数说明：

 **scheme**：协议名称，即用户在config.xml配置的App的(urlScheme|androidScheme)的值
**function**：打开app后调用的方法
**winId**：此参数为app配置的起始页，summerApp的起始页id为root，即此值必须为root
**parameters**：function中传递的参数

> 注意：
1、androidScheme的值只能为小写的英文字母
2、打开app若要传递参数，必须保证此方法存在于起始页root中 
- 在HTML页面中的a标签的href属性上，添加经过URL编码的字符串

* HTML示例
```
<div class="p15">
  <p>web 方式打开summer App</p>
  <a href="testapp://evaluateJavaScript?parameters=%7B%22function%22:%22open()%22,%22winId%22:%22root%22,%22parameters%22:%7B%22aa%22:%22vv%22%7D%7D%0A">打开testapp</a>
 </div>
 
```
  
