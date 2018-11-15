define(["tools","jquery","template"],function(tools,jquery,template){
	function Column(){};
	
	Column.prototype.init=function(id){
		$.ajax({
			method: "get",
			url:"http://localhost/workplace/11.3/projectserver/api/column.php",
			dataType:"json",
			success: function(res){
				console.log(res);
				var html = template("pro-template",{products: res});
				//console.log(html);
				$(id).html(html);
			}
		
		})
	}
	return new Column();

})




