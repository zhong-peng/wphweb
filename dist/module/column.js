define(["tools","jquery","template"],function(t,o,n){function e(){}return e.prototype.init=function(e){$.ajax({method:"get",url:"http://localhost/workplace/11.3/projectserver/api/column.php",dataType:"json",success:function(t){console.log(t);var o=n("pro-template",{products:t});$(e).html(o)}})},new e});