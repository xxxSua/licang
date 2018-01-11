require(["config"], function(){
	require(["jquery","load"], function($){
		// $(function(){
			$.getJSON('/mock/user_info.json',function(data){
				arr = data.res_body.data;
				allow = false;
				console.log(data);
			});
			$(".login_btn").click(function(){
				var username = $("#mobile").val(),
					password = $("#yanzhengma").val();
				arr.forEach(function(curr){
					if(username == curr.username && password == curr.password){
						allow = true;
					};
				});
				if(allow){
					alert("登录成功");
					$.cookie('username',username,{expires:7,path:"/"});
					location.href="/index.html";
				}else{
					alert("请输入正确的账号密码");
				}
				allow = false;
			});
		// });
	});
});