
require(["config"], function(){
	require(["jquery", "tools", "header", "column","footer","lunbo","tab"], function($,tools,header,column,footer,lunbo,TTab){

		//promise
		new Promise(function(resolve, reject){
			$("header").load("/html/component/header.html", function(){
				resolve();
				header.welcome();
			});
			$("footer").load("/html/component/footer.html", function(){
				//footer的交互代码
			    console.log("1");
			});
		}).then(function(){
			 $("#lunbo").lunbo({
					goPrev:"left",
					goNext: "right"
				});
		}).then(function(){
			$("#tab").load("/html/component/tab.html",function(){
				var aBtn =tools.$("li",tools.$("#RecommendTab"));
				var aLi = tools.$(".tab_nth");
				new TTab(aBtn, aLi).init();
			});
		}).then(function(){
			$("#column").load("/html/component/column.html");
		}).then(function(){
			column.init("#column");
		}).then(function(){
			$("#column1").load("/html/component/column.html");
		}).then(function(){
			column.init("#column1");
		}).then(function(){
			column.init("#column2");
		})
	})
})