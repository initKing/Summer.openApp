const htop = $summer.offset($summer.byId('header')).h;
const bottom = $summer.offset($summer.byId('footer')).h;
summerready = function() {
	console.log("arguments： \n"+ arguments + "\n"+"summer.pageParam: \n"+summer.pageParam);
	openTab("address");
}

function openTab(type) {
	summer.openFrame({
		 id: type,
		 url: 'html/'+ type +'.html',
		 bounces: true,
		 position: {
			 top: htop,
			 bottom: bottom,
			 left: 0,
			 right: 0
		 }
	 });
}

function thirdWebOpenCurApp(args) {
	alert("aaa App 已被打开，传递进来的参数为: \n"+ JSON.stringify(args));
	console.log("aaa App 已被打开，传递进来的参数为: \n"+ JSON.stringify(args));
}
