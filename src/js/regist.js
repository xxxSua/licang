require(["config"], function(){
	require(["jquery","load"], function($){
		$(function(){
			$.getJSON('/mock/user_info.json',function(data){
					arr = data.res_body.data;
					allow = false;
					console.log(data);
				});
			$(".regist_btn").click(function(){
				if ($("#a_agree").is(':checked')) {
					var ipnub = $("#regist_phone_nb").val(),
						password_b = $("#regist_pw").val(),
						username = $("#regist_yanzhengma_nb").val(),
						password_s = $("#regist_sure_txt").val();
					if(ipnub == "" || password_b == "" || password_s == "" || username == ""){
						alert("请输入必要信息");
					}else{
						arr.forEach(function(curr){
							if (curr.username == username) {
								alert("用户名已存在");
								$("#regist_pw").val("");
								$("#regist_sure_txt").val("");
								$("#regist_yanzhengma_nb").val("");
								allow = false;
							}
						});
						var reg_pw =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
							reg_ip =  /^1[3|4|5|7|8][0-9]{9}$/,
							reg_un = /^[a-zA-Z0-9_-]{4,16}$/;
						if (reg_ip.test(ipnub)) {
							if (reg_un.test(username)) {
								if (reg_pw.test(password_b)) {
									if (password_b == password_s) {
										alert("注册成功！！");
										$.cookie('username', username, { expires: 7, path: '/' });
										 location.href = "/index.html";
										}else{
											alert("两次输入密码请一致！");
											$("#regist_pw").val("");
											$("#regist_sure_txt").val("");
										}
								}else{
									alert("密码格式不正确")
								}
							}else{
								alert("用户名格式不正确");
								$("#regist_yanzhengma_nb").val("");
							}
						} else{
							alert("手机号码格式不正确");
						}
					}
				}else{
					alert("请先同意良仓注册条款");
				}	
			})
		})
	});
});