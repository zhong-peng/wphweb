require(["config"],function(){
	require(["jquery","template"],function($,template){
		$.ajax({
			method:"post",
			url:"",//链接数据库地址http：、、
			success:function(res){
				var html=template("pro-template",{products:res.products});
				$("#prolist").html(html);
			}
		})
	})
})
