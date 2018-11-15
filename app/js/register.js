require(["config"], function(){
	require(["jquery","header","footer","template","tools","jquerycookie"], function($,header,footer,template,tools){
		$("header").load("/html/component/header.html",function(){
			console.log("end");
		});
		$("footer").load("/html/component/footer.html",function(){
			console.log("end");
		});
		
		function register(obj,reg){
			obj.focus(function(){
				obj.css("border","1px solid blue");
			})
			obj.blur(function(){
				var reg_result=reg;
				if(!reg_result.test($(this).val())){
					obj.css("border","1px solid red");
					obj.siblings().last().html("<font color='red'>x输入有误</font>");
				}else{
					obj.siblings().last().html("");
					obj.css("border","1px solid #d7d7d7");
				}
			})
		}
		
//		register($("#tel_input"),/^1\d{10}$/);
		register($("#tel2"),/^1\d{10}$/);
		register($("#email"),/\w+@[a-z0-9]+\.[a-z]+/i);
		register($("#password"),/^\w{6,}$/);
		
		//判断是否已经注册过
		$("#tel_input").focus(function(){
			$("#tel_input").css("border","1px solid blue");
		})
		$("#tel_input").blur(function(){
			var reg_result_tel=/^1\d{10}$/;
			if(!reg_result_tel.test($(this).val())){
				$("#tel_input").css("border","1px solid red");
				$("#tel_input").siblings().last().html("<font color='red'>x输入有误</font>");
			}else{
				var data_tel={
					tel_register:$("#tel_input").val()
				};
				$.ajax({
					method:"post",
					data: data_tel,
					dataType:"json",
					url:"http://localhost/workplace/11.3/projectserver/api/register.php",
					success: function(res){
						if(res.tel==="registered"){
							$("#tel_input").css("border","1px solid red");
							$("#tel_input").siblings().last().html("<font color='red'>x该手机号已存在！</font>");
						}else{
							$("#tel_input").siblings().last().html("");
							$("#tel_input").css("border","1px solid #d7d7d7");	
						}
					}
				})
			}	
		})
		
		
		
		
		//验证密码是否相同
		$("#password2").focus(function(){
			$("#password2").css("border","1px solid blue");
		})
		$("#password2").blur(function(){
			if($("#password2").val()!==$("#password").val()){
				$("#password2").css("border","1px solid red");
				$("#password2").siblings().last().html("<font color='red'>x输入密码不同</font>");
			}else{
				$("#password2").siblings().last().html("");
				$("#password2").css("border","1px solid #d7d7d7");
				
			}
		})
		
		
		//切换登录或注册
		$("#login_a").click(function(){
			$("#qr_login").css("display","block");
			$("#qr_register").css("display","none");
			$("#switch_bottom").css("left","447px");
			
		})
		$("#register_a").click(function(){
			$("#qr_register").css("display","block");
			$("#qr_login").css("display","none");
			$("#switch_bottom").css("left","680px")
		})
		
		

		
		var btn_register=tools.$("#btn_register");
		//判断是否提交
		var flag=true;//能提交
		btn_register.onclick=function(e){
			console.log(11111111111)
			e=e||event;
			var _input=tools.$("input");
			for(var i=0;i<_input.length;i++){
				if(_input[i].style.borderColor==="red"){
					flag=false;//不能提交
					//alert(1);
				}
			}
			if($("#tel_input").val()===""||$("#password").val()===""||$("#password2").val()===""){
				flag=false;//不能提交
				//alert(2);
			}
			if(flag){//能提交
				var data={
					tel:$("#tel_input").val(),
					email:$("#email").val(),
					password:$("#password").val(),
					birthday:$("#birthday").val()
				}
				//alert(33333333);
				$.ajax({
					method:"post",
					data: data,
					dataType:"json",
					url:"http://localhost/workplace/11.3/projectserver/api/register.php",
					success: function(res){
						console.log(res);
						if(res.isSucc === "success"){
							//alert(2222222);
							$("#qr_login").css("display","block");
			                $("#qr_register").css("display","none");
							$("#switch_bottom").css("left","447px");
						}
					}
				})
			}
			e.preventDefault();
			return false;
			
		}
		
		
		
		
		
		
		
		
		//登录
		var btn_login=tools.$("#btn_login");
		
		btn_login.onclick=function(e){
			e=e||event;
			var data_login = {
				username: $("#username").val(),
				password: $("#username2").val()
			};
			
			$.ajax({
				method:"post",
				data: data_login,
				dataType:"json",
				url:"http://localhost/workplace/11.3/projectserver/api/login.php",
				success: function(res){
					console.log("register");
					console.log(res);
					
					if(res.code === 1){//登录成功
						//document.cookie = "login=true;path=/"; //使用cookie记录登录状态
						$.cookie("username",data_login.username,{
							path:"/"
						});
						$("#error").css("opacity",0);
						location.href = "http://localhost:1807";	
					}else if(res.code === 0){
						$("#error").css("opacity",1);
					}
				}
			})
			
		
			
			
			
			e.preventDefault();
			return false;
		}
		
		
	})
})