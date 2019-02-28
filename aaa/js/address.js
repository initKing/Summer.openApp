summerready = function() {
	summer.writeConfig({
		"host" : sara.MA_IP, //MA主机地址
		"port" : sara.MA_PORT //MA主机端口
	});
}

var jsonArray = [{
	"sender" : "summer.callAction",
	"img" : "../img/org1.png",
	"msgNum" : 0,
	"lastMsg" : "通过callAction调用Ma服务",
	"lastTime" : "15:24",
	"methodIndex" : 0
}, {
	"sender" : "summer.ajax",
	"img" : "../img/org2.png",
	"msgNum" : 4,
	"lastMsg" : "通过summer.ajax调用Ma服务",
	"lastTime" : "12:40",
	"methodIndex" : 1
}, {
	"sender" : "summer.upgrade (应用内升级)",
	"img" : "../img/org3.png",
	"msgNum" : 5,
	"lastMsg" : "替换应用内的资源文件",
	"lastTime" : "12:21",
	"methodIndex" : 2
}, {
	"sender" : "summer.upgradeApp (应用升级)",
	"img" : "../img/org2.png",
	"msgNum" : 3,
	"lastMsg" : "升级App",
	"lastTime" : "11:21",
	"methodIndex" : 3
}, {
	"sender" : "summer.openApp (打开第三方应用)",
	"img" : "../img/org3.png",
	"msgNum" : 1,
	"lastMsg" : "打开第三方App",
	"lastTime" : "01:21",
	"methodIndex" : 4
}];
// 构造控件Vue实例
var listview = new Vue({
	el : '#index',
	data : {
		listDatas : [],
		timeOutEvent : 0,
		testMethods : [],
		maInputVisible : false,
		activeIndex : 0
	},
	mounted : function() {
		// 组件挂载后执行...
		this.listDatas = jsonArray;
		this.testMethods = [this.popupMaInputArea, this.popupMaInputArea, this.upgrade, this.upgradeApp, this.openThirdApp];
	},
	methods : {
		/* 在这里定义方法 */
		itemClick : function(index) {
			// 这里编辑单击列表项逻辑
			// alert("您点击了列表第" + (index + 1) + "行！");
			this.activeIndex = index;
			if (index + 1 <= this.testMethods.length) {
				this.testMethods[index]();
			} else {
				console.log("超出测试方法数组长度范围, 请添加testMethods方法...");
			}
		},
		tapHold : function(index) {
			// 这里编辑长按列表项逻辑
			var ev = event || window.event;
			var touches = ev.targetTouches;
			if (touches.length > 1) {
				return;
			}
			this.timeOutEvent = setTimeout(function() {
				this.timeOutEvent = 0;
				alert("您长按了列表第" + (index + 1) + "行！");
			}, 2000);
		},
		cancelTapHold : function() {
			// 取消长按
			clearTimeout(this.timeOutEvent);
			this.timeOutEvent = 0;
		},
		deleteItem : function(index) {
			// 这里编辑删除列表项逻辑
			this.listDatas.splice(index, 1);
		},
		loadTop : function() {
			// 这里编辑下拉刷新逻辑
			var self = this;
			setTimeout(function() {
				var row = {
					"sender" : "集团技术部",
					"img" : "../img/org4.png",
					"msgNum" : 2,
					"lastMsg" : "各位同仁，2015年4季度油料报销标准5.85元/升。",
					"lastTime" : "16:22",
					"methodIndex" : 0
				};
				self.listDatas.unshift(row);
				self.$refs.loadmore.onTopLoaded();
			}, 2000);
		},
		loadBottom : function() {
			// 这里编辑上拉加载逻辑
			var self = this;
			setTimeout(function() {
				var row = {
					"sender" : "集团咨询部",
					"img" : "../img/org5.png",
					"msgNum" : 6,
					"lastMsg" : "各位同仁，2015年4季度油料报销标准5.85元/升。",
					"lastTime" : "12月22日",
					"methodIndex" : 0
				};
				self.listDatas.push(row);
				self.$refs.loadmore.onBottomLoaded();
			}, 2000);
		},
		popupMaInputArea : function() {
			this.maInputVisible = true;
		},
		callAction : function() {
			this.maInputVisible = false;
			const name = $("#name").val();
			const pwd = $("#pwd").val();
			
			sara.callMa(this, "getbilllist11", {
				"uname" : name,
				"upwd" : pwd
			}, function(args) {
				listview.$indicator.close();
				console.log("成功回调：\n" + JSON.stringify(args));
			});
		},
		callMaWithAjax : function() {
			this.maInputVisible = false;
			const name = $("#name").val();
			const pwd = $("#pwd").val();
			summer.ajax({
				"header" : {}, //可选参数，方便开发者设置请求的header
				"type" : "post", //请求方式
				"url" : "http://"+sara.MA_IP+":"+sara.MA_PORT+"/umserver/core", //url地址
				"param" : {
					tp : "",
					data : {
						"appcontext" : {
							"token" : "",
							"devid" : "d454c683867951031147164",
							"userid" : "",
							"massotoken" : "",
							"appid" : "aaa",
							"funcid" : "",
							"groupid" : "",
							"sessionid" : "",
							"user" : "",
							"tabid" : "",
							"pass" : ""
						},
						"servicecontext" : {
							"actionid" : "umCommonService",
							"viewid" : "com.yonyou.aaa.ExampleController",
							"callback" : "nothing",
							"params" : {
								"uname" : name,
								"upwd" : pwd
							},
							"actionname" : "getbilllist11",
							"controllerid" : "com.yonyou.aaa.ExampleController"
						},
						"deviceinfo" : {
							"os" : "android",
							"devid" : "d454c683867951031147164",
							"versionname" : "1",
							"appversion" : "1",
							"mac" : "02:00:00:00:00:00",
							"osversion" : "7.1.2",
							"lang" : "zh",
							"style" : "android",
							"isroot" : false,
							"name" : "OC105",
							"ssid" : "WiFi共享大师-A0",
							"ncdevid" : "867951031147164",
							"wfaddress" : "02:00:00:00:00:00",
							"uuid" : ""
						},
						"serviceid" : "umCommonService"
					}
				},//可选参数，post请求的要写入的条件数据，须为json对象
			}, function(response) {//成功回调
				listview.$indicator.close();
				alert("成功回调：\n" + response.data);
			}, function(response) {//失败回调
				listview.$indicator.close();
				alert("失败回调：\n" + response.data);
				alert("失败回调：\n" + response.error);
			});
		},

		upgrade : function() {
			summer.getPermission(["android.permission.READ_EXTERNAL_STORAGE", "android.permission.WRITE_EXTERNAL_STORAGE", "android.permission.READ_PHONE_STATE"], //所需权限参数，多个权限用逗号分隔
			function(response) {
			}, function(response) {
			});

			var v = JSON.parse(summer.getAppVersion());
			console.log(v);
			sara.callMa(this, "getAppVersion", {}, function(args) {
				listview.$indicator.close();
				console.log("成功回调：\n" + JSON.stringify(args));
				if (parseFloat(v.versionCode) <= parseFloat(args.version)) {
					const url = $summer.os == "android" ? sara.UPGRADEURL_ANDROID : sara.UPGRADEURL_IOS;
					summer.upgrade({
						"url" : url, //资源包下载地址
						"version" : {
							"versionCode" : "2.0.0",  // 必须从服务器拉取，必须与服务器上的版本一致
							"versionName" : "2.0.0"
						},
						showProgress:true 			  // 是否弹出加载菊花
					}, function(res) {
						console.log("应用升级回调：\n" + JSON.stringify(res));
						if (res.isfinish == true) {
							 alert("应用升级完毕");
							 summer.openWin({//下载完成后重新打开页面，为已更新的新版本
							 	id:'index', // 需要重新指定初始页的id,不能为默认的root，否则无法打开(否则打开的还是原来的页面)
								url : 'index.html',
								isKeep : false
							});
						}
					}, function(res) {
						alert("应用升级错误");
					});
				}
			});

		},
		upgradeApp : function() {
			const app_url = $summer.os == "android" ? sara.UPGRADEAPP_ANDROID_URL : sara.UPGRADEAPP_IOS_URL;
			summer.upgradeApp({
				"url" : app_url, //App下载地址
				"version" : {
					"versionCode" : 3.0, // 必须从服务器拉取，必须与服务器上的版本一致
					"versionName" : 3.0
				},
				showProgress:true        // 是否弹出加载菊花
			}, function(ret) {
				console.log("应用升级 \n"+ JSON.stringify(ret));
				if (ret.state == 1 || ret == "OK") {
					summer.closeWin();
				}
			}, function(ret) {
				alert("应用升级失败");
				summer.closeWin();
			});
		}
	}
});