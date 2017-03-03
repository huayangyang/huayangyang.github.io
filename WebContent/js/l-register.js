$(function() {
	//加载底部
	$('#navWrap').load('../module/nav.html#nav');
	$('#regCheckAgain').stop().get(0).addEventListener('tap', function() {
		clearInterval(timer);
		countDown('#regCheckAgain');
	}, false);
	//查看协议
	$('#deal')[0].addEventListener('tap', function() {
		$('#regCheck').addClass('display');
		$('#regDeal').removeClass('display');
	}, false);
	//是否赞同协议
	$('#dealDisAgree')[0].addEventListener('tap', function() {
		$('#regCheck').removeClass('display');
		$('#regDeal').addClass('display');
		$('#dealCheck').removeAttr('checked');
	}, false);
	$('#dealAgree')[0].addEventListener('tap', function() {
		$('#regCheck').removeClass('display');
		$('#regDeal').addClass('display');
		$('#dealCheck')[0].checked = true;
	}, false);
	//普通账号注册
	//phone正则
	//			console.log(reg_phone);
	$('#regNext')[0].addEventListener('tap', function() {
		var regPhone = $('#regPhone').val();
		console.log(regPhone);
		if(reg_phone.test(regPhone)) {
			sessionStorage.regPhone = regPhone;
			$.ajax({
				type: "post",
				url: "/wxomi2/wx2/login/OAuth2Validate_sendMobileChkCode.action",
				data: {
					mobile: sessionStorage.regPhone
				},
				dataType: 'json',
				success: function(data) {
					console.log(data);
					console.log(data.status)
					if(data.status == true) {
						$('#regPhoneWrap').addClass('display');
						$('#regCheck').removeClass('display');
						//倒计时
						countDown('#regCheckAgain');
					} else {
						mui.toast(data.message);
					}

				}
			});
		} else {
			mui.toast('手机号输入错误');
		}
	});
	//提交注册
	$('#regSubmit')[0].addEventListener('tap', function() {
		var regPone = sessionStorage.regPhone;
		var mobileChkCode = $('#mobileChkCode').val();
		var pwd1 = $('#password1').val();
		var pwd2 = $('#password2').val();
		if(pwd1.length!=0 && pwd2.length!=0){
			if(pwd1 == pwd2 && $('#dealCheck').attr('checked')) {
				$.ajax({
					type: "post",
					url: "/wxomi2/wx2/login/OAuth2Validate_bindMoblie.action",
					data: {
						mobileChkCode:mobileChkCode,
						password:pwd1
					},
					dataType: 'json',
					success: function(data) {
						console.log(data);
						console.log(data.status)
						if(data.status==true){
							mui.toast(data.message);
							setTimeout(function(){
								window.location.href = 'agentLogin.html';
							},1000);
						}else{
							mui.toast(data.message);
						}

					}
				});
			}else if(!pwd1 == pwd2){
				mui.toast('密码不一致');
			}else if(!$('#dealCheck').attr('checked')){
				mui.toast('请勾选协议');
			}
		}else{
			mui.toast('密码不能为空');
		}


	}, false);

});