define(["jquery","jquerycookie"],function($){
	function Header(){}

    //登录后头部变化
	Header.prototype.welcome = function(){
		var username = $.cookie("username");
		if(username){
			//已经登录
			//登录注册按钮隐藏，欢迎您,usernmae  显示
			$("#header_user").html("<a href='javascript'>"+"亲，"+username+"</a>");
			$("#header_ul").append("<li class='quit'><a href='javascript' id='quit'>退出</a></li>");
		}
		$("#header_ul").on("click",".quit",function(e){
			$.cookie("username","",{exprice:-1,path:"/"});
			location.reload(true);
			e.preventDefault();
		})
			
	}
	

	return new Header();
})












