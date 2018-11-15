require(["config"],function(){
	require(["jquery","header","footer","template","tools"],function($,header,footer,template,tools){
		$("header").load("/html/component/header.html",function(){
			console.log("end");
			header.welcome();
		});
		$("footer").load("/html/component/footer.html",function(){
			console.log("end");
		});
        var table=tools.$("#cart_p_list");
        
		var str=tools.cookie("cart");
		var json=JSON.parse(str);//[{id:3},[]]
		console.log(json);
        for(var i = 0; i < json.length; i++){
			var tr = document.createElement("tr");
			tr.className="tr_td";
			tr.innerHTML=`<td>
							<a href="">
								<img src="${json[i]._img}" alt="" />
							</a>
							<strong>${json[i].strong}</strong>
							<p>规格：<span>8号</span></p>
						</td>
						<td>
							<strong>${json[i].price}</strong>
						</td>
						<td>
							<form action="">
								<a href="">-</a>
								<input type="text" name="" id="" value="${json[i].num}" />
								<a href="">+</a>
							</form>
						</td>
						<td>
							<a href="">移除</a></br></br>
							<input type="checkbox" />
						</td>`
			table.appendChild(tr);
		}	
	})
})


//		var str = "";

//str += `<tr class="tr_td">
//			            <td>
//							<a href="">
//								<img src="${json[i]._img}" alt="" />
//							</a>
//							<strong>${json[i].strong}</strong>
//							<p>规格：<span>8号</span></p>
//						</td>
//						<td>
//							<strong>${json[i].price}</strong>
//						</td>
//						<td>
//							<form action="">
//								<a href="">-</a>
//								<input type="text" name="" id="" value="${json[i].num}" />
//								<a href="">+</a>
//							</form>
//						</td>
//						<td>
//							<a href="">移除</a>
//						</td>
//			       </tr>`;