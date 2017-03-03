$(function() {
	$('#navWrap').load('../module/nav.html#nav');
	//发送验证码
	$('#sendCheck')[0].addEventListener('tap', function() {
		var forgetMobile = $('#forgetMobile').val();
		if(reg_phone.test(forgetMobile)) {
			$.ajax({
				type: "post",
				url: "/wxomi2/wx2/login/WX2Login_sendMobileChkCode.action",
				data: {
					mobile: forgetMobile
				},
				dataType: 'json',
				success: function(data) {
					console.log(data);
					if(data.status) {
						countDown('#sendCheck');
						mui.toast(data.message);
					} else {
						mui.toast(data.message);
					}

				},
				error: function() {
					console.log('验证码错误');
				}
			});
		} else {
			mui.toast('请输入正确的手机号')
		}
	}, false);
	//校验验证码
	$('#forgetNext')[0].addEventListener('tap', function() {
		var forgetCheckNum = $('#forgetCheckNum').val();
		$.ajax({
			type: "post",
			url: "/wxomi2/wx2/login/WX2Login_checkMobileCode.action",
			data: {
				forgetPwdChkCode: forgetCheckNum
			},
			dataType: 'json',
			success: function(data) {
				console.log(data);
				if(data.status) {
					$('#reg_check').addClass('zc-hidden');
					$('#reg_phone').removeClass('zc-hidden')
				} else {
					mui.toast(data.message)
				}
			}
		});
	}, false);
	//修改密码
	$('#fixPwd')[0].addEventListener('tap', function() {
		var newPwd1 = $('#newPwd1').val();
		var newPwd2 = $('#newPwd2').val();
		if(newPwd1.length != 0 && newPwd2.length != 0) {
			if(newPwd1 == newPwd2) {
				console.log('11')
				$.ajax({
					type: "post",
					url: "/wxomi2/wx2/login/WX2Login_updatePassword.action",
					data: {
						password: newPwd1
					},
					dataType: 'json',
					success: function(data) {
						console.log(data);
						if(data.status){
							goUrl('commonLogin.html')
						}else{
							mui.toast(data.message)
						}
					}
				});
			} else {
				mui.toast('密码不一致')
			}
		} else {
			mui.toast('密码不能为空')
		}
	}, false);
});