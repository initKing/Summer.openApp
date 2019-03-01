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

function openAppaa() {
	window.location.href="testapp://evaluateJavaScript?parameters=%7B%22function%22:%22open()%22,%22winId%22:%22root%22,%22parameters%22:%7B%22项目名%22:%22台湾华新丽华%22%7D%7D";
}

/*
 summer.openApp({
        "ios_appid" : urlScheme, //ios所需的参数，目标app的urlscheme，例如："weixin://" 如果要打开summer App，需要配置evaluateJavaScript 例如：molischeme://evaluateJavaScript
        "android_packagename" : pkgName,//android所需的参数，目标app的应用包名(即config.xml文件中应用包名)，例如："com.tencent.mm" 
        "param" : {'name':'华新丽华'}, //不支持
        "callback" : function(args){
        	//目前只有Android有callback
        	alert(JSON.stringify(args)); //android args is {"status":"打开成功","code":"1"}
        	 		     //andriod args is {"err_msg":{"status":"没有访问权限或者应用不存在","code":"0"}}
        }
    })
    */