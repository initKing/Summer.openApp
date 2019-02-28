

summerready = function(){
	console.log("arguments： \n"+ JSON.stringify(arguments) + "\n"+"summer.pageParam: \n"+ JSON.stringify(summer.pageParam));
	
	alert(" arguments： \n"+ JSON.stringify(arguments) + "\n"+"summer.pageParam: \n"+JSON.stringify(summer.pageParam));
    // here is your code...	
    var top = $summer.offset($summer.byId('header')).h;
	var bottom = $summer.offset($summer.byId('footer')).h;
    summer.openFrame({
        id: 'main',
        url: 'html/main.html',
        bounces: true,
        position: {
            top: top,
			bottom: bottom,
            left: 0,
            right: 0
        }
    });
}



function open(args) {
	alert("aaa App 已被打开，传递进来的参数为: \n"+ JSON.stringify(args));
	console.log("aaa App 已被打开，传递进来的参数为: \n"+ JSON.stringify(args));
}