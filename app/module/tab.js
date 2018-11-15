define(["jquery","tools"],function($,tools){
	function Tab(btns, tabs){
			this.btns = btns;
			this.tabs = tabs;
		}
		Tab.prototype.init = function(){
			var _this = this;
//			console.log(this)
			//绑事件
			for (var i = 0; i < this.btns.length; i++) {
				this.btns[i].index = i;
				
				this.btns[i].onmouseover = function(){
					//切换
//					console.log(this)
					_this.change(this.index);
					
				}
			}
		}
		Tab.prototype.change = function(n){
			
			//n指的就是当前带点击按钮的下标
			for (var j = 0; j < this.btns.length; j++) {
				this.btns[j].className = "";
				this.tabs[j].style.display = "none";
			}
			this.btns[n].className = "change";
			this.tabs[n].style.display = "block";

		}


		return Tab;
})