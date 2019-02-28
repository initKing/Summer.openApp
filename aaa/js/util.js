window.sara = (function(w,s) {
	s.UPGRADEURL_ANDROID = "https://raw.githubusercontent.com/initKing/webData/master/android.zip";
	s.UPGRADEURL_IOS = "https://raw.githubusercontent.com/initKing/webData/master/ios.zip";
	s.UPGRADEAPP_ANDROID_URL = "https://raw.githubusercontent.com/initKing/webData/master/aaa_android.apk";
	s.UPGRADEAPP_IOS_URL = "itms-services://?action=download-manifest&url=https://raw.githubusercontent.com/initKing/webData/master/info.plist";
	s.MA_IP = "10.6.255.244"; //"192.168.31.195";
	s.MA_PORT = "8090";
	var tempObj = {};
	s.callMa = function(vue, method, param, successCallBack, errorCallBack) {
		vue.$indicator.open({
		  text: 'Loading...',
		  spinnerType: 'fading-circle'
		});
		summer.callAction({
             "appid" : "aaa", //当前应用id，即config.xml配置文件中的应用ID
             "viewid" : "com.yonyou.aaa.ExampleController", //后台带包名的Controller名
             "action" : method, //方法名
             "params" : param, //自定义参数
             "callback" : successCallBack, //请求回来后执行的js方法
             "error" : errorCallBack || function(args) {
             	vue.$indicator.close();
				const message = '请求失败,请联系管理员';
				summer.toast({
					msg : message
				});
				console.log("失败回调: " + JSON.stringify(args)); 
             } //失败回调的js方法 
        })
	};
	
	
	return s;
})(window, window.sara || {})