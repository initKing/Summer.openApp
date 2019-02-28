## 示例用图：

### 说明：aaa App为主调App的工程代码， test1 App为 被调App的示例工程代码。

#### 1. 使用 summer 框架开发的 summer App 调用**第三方App**示例
> 示例包含了，打开第三方App，如微信、支付宝、手机内置浏览器等第三方App的示例， 安卓、iOS均有效

#### 2. 使用 summer 框架开发的 summer App 调用**summer App**
 > iOS、Android端都已验证打开 test1 app OK
 
 > iOS 端传参没问题，执行test1 App指定方法没问题

> Android 端打开指定方法 & 传参待验证，正在修改底层代码中...

#### 3. web页面 调用**summer App** 示例
> aaa 示例中，提供了 web页面调用 test1 App 的示例，但是当前在App内的通过*a*标签打开test1 App 有问题，在调试中...
  
> 在web页面上通过a标签的href属性打开summer App 没问题

```
<div class="p15">
  <p>web 方式打开summer App</p>
  <a href="testapp://evaluateJavaScript?parameters=%7B%22function%22:%22open()%22,%22winId%22:%22root%22,%22parameters%22:%7B%22aa%22:%22vv%22%7D%7D%0A">打开testapp</a>
 </div>
```
  
