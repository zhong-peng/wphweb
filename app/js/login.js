require(["config"], function(){
	require(["jquery","header","footer"], function($, header){
		new Promise(function(resolve,reject){
			$("header").load("/html/component/header.html", function(){
				resolve();
			})
		}).then(function(){
			//执行header和footer的逻辑代码，实现交互
			header.nav();
		}).then(function(){
			//处理表单提交
			$("form").submit(function(e){
				//构造请求携带的参数
				var data = {
					username: $("#username").val(),
					password: $("#password").val()
				};

				$.ajax({
					method:"post",
					data: data,
					dataType:"json",
					url:"http://localhost/projectserver/api/login.php",
					success: function(res){
						console.log(res);
						if(res.code === 1){
							//document.cookie = "login=true;path=/"; //使用cookie记录登录状态
							location.href = "http://localhost:2333/html/about.html";
						}else{
							alert("用户名或者密码错误");
						}
					}
				})



				e.preventDefault();
			})
		})
	})
})