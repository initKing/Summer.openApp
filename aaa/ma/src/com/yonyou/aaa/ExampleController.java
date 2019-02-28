package com.yonyou.aaa;

import java.util.Map;
import org.json.JSONObject;
import com.yonyou.uap.um.context.util.UmContextUtil;
import com.yonyou.uap.um.gateway.service.GatewayServiceFactory;
import com.yonyou.uap.um.gateway.service.IGatewayService;
import com.yonyou.uap.ump.log.UmpLogger;

public class ExampleController {
	// 公用方法
		public String commonMethod(String args, String serviceid) throws Exception {
			JSONObject json = new JSONObject(args);
		    Map<String, String> map = UmContextUtil.transJsonToMap(json);
		    String appid = map.get("appid");
		    IGatewayService service = GatewayServiceFactory.findGatewayService(appid, serviceid, map);
		    return (String)service.doService();	
		}
		
		public String testHttp(String args) throws Exception{
			return commonMethod(args, "loginid");
		}
		
		public String getbilllist(String args) throws Exception{
			return commonMethod(args, "mt01id");
		}
		
		public String getbilllist1(String args) throws Exception{
			UmpLogger.info("日志输出");
			return commonMethod(args, "mt01id1");
		}
		
		public String getbilllist11(String args) throws Exception{
			JSONObject json = new JSONObject(args);
			return "请求成功！"+json.getString("uname") +" && "+json.getString("upwd");
		}
		// 版本检测
		public String getAppVersion(String args) throws Exception{
			
			return "{status:200, msg:'请求成功！',version:2.1.0}";
		}
		
}