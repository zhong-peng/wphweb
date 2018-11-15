require(["config"], function(){
	require(["jquery","header","footer","template","tools"], function($,header,footer,template,tools){
		$("header").load("/html/component/header.html",function(){
			console.log("end");
			header.welcome();
		});
		$("footer").load("/html/component/footer.html",function(){
			console.log("end");
		});
		//同时发送异步请求渲染主体部分
		//从url上取出id参数，然后携带这个参数去请求当前数据
		var str = location.search.slice(1);
		var arr = str.split("="); // ["id","3"];
    	
//		var obj = {
//			arr[0]:arr[1],
//		};//这儿不能写变量，回错误
		var obj={};//{id:3}
		obj[arr[0]] = arr[1];//每一个详情页面的obj对象id不同；{id:3}

        //保存价格、图片路径的信息给购物车使用
       
        
		$.ajax({
			url:"http://localhost/workplace/11.3/projectserver/api/detail.php",
			data: obj,
			method:"POST",
			dataType:"json",
			success: function(res){
				
				
				
				if(res.code === 1){
					var str = template("detil-template",{product: res.product});
					$("#container2").html(str);
					
					//构造obj
                    //console.log(num);
                    
                    var price=null;
			        var _img=null;
			        var strong=null;
                    var num=$("#num").val();
                    
					price=res.product.price;
					_img=res.product.img3;
					strong=res.product.strong;
					//console.log(price);
//					obj={
//						price:price,
//						_img:_img,
//						strong:strong,
//						num:num
//					};//这种会覆盖原来的id；

                    obj.price=price;
                    obj._img=_img;
                    obj.strong=strong;
					
					console.log(obj);//{id: "2", price: "254", _img: "/images/100001236_M.jpg", strong: "坚果大地", num: "1"}	
				}	
				
				//点击增加、减少数量；
				$("#plus").on("click",function(){
					console.log(111)
					num++;
					$("#num").val(num);
				})
				$("#minus").on("click",function(){
					console.log(111)
					num--;
					$("#num").val(num);
				})
				
				
				
				//异步
				$("#btn_buy").click(function(e){
					//为了在详情页能够修改数量；
					
					var num1 = parseInt($("#num").val());
					
					obj.num=num1;
					
					if(tools.cookie("cart")){//有过cookie
						var cart_cookie=tools.cookie("cart");//取cookie"[{},{}]"
						var json=JSON.parse(cart_cookie);//[{},{}]
						for(var i=0;i<json.length;i++){
							if(json[i].id===obj.id){
								json[i].num=json[i].num+num1;
								console.log(222);
								console.log(json[i].num);
								break;
							}
						};
						if(i===json.length){
							json.push(obj);//[{},{},{}]						
//							console.log(cart_str);
                        };
                        var cart_str=JSON.stringify(json);
						tools.cookie("cart",cart_str);//再存cookie
					}else{//之前没有cookie
						//console.log(num);
						var json=[];
						json.push(obj);
						console.log(111);
						console.log(obj);
						var cart_str=JSON.stringify(json);
						tools.cookie("cart",cart_str);
//						console.log(cart_str);
					}

					window.location.href="http://localhost:1807/html/cart.html";
					
					
					
					
					
		            e.preventDefault();
				})
				
				
				//放大镜
				var min_box=tools.$("#fdj_box");
				var fdj=tools.$(".fdj")[0];
				var max_box=tools.$(".max_box")[0];
				var max_pic=tools.$(".max_pic")[0];
				min_box.onmousemove = function(e){
					e = e || event;
					var _left = e.clientX - tools.getPosition(min_box).left - fdj.offsetWidth/2;
					var _top = e.clientY - tools.getPosition(min_box).top - fdj.offsetHeight/2;
//					
					console.log(_left,_top);
					if(_left < 0) _left = 0;
					if(_top < 0) _top = 0;
					if(_left > min_box.offsetWidth - fdj.offsetWidth) _left = min_box.offsetWidth - fdj.offsetWidth;
					if(_top > min_box.offsetHeight - fdj.offsetHeight) _top = min_box.offsetHeight - fdj.offsetHeight;
					
					fdj.style.display="block";
					max_box.style.display="block";
					console.log(_left,_top);
					
					
					fdj.style.left = _left + "px";
					fdj.style.top = _top + "px";
					
					max_pic.style.left = -3 * _left + "px";
					max_pic.style.top = -3 * _top + "px";
					
				}
				
				
				min_box.onmouseleave = function(){
					fdj.style.display=max_box.style.display="none";
				}
				
				//
				
			}
		})
	})
})


