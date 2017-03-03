$(function() {
	//加载脚步nav
	$('#navWrap').load('../module/nav.html#nav');
	//查看协议
	$('#ck-deal')[0].addEventListener('tap', function() {
		$('#ck_agent').addClass('display');
		$('#regDeal').removeClass('display');
	}, false);
	//是否赞同协议
	$('#dealDisAgree')[0].addEventListener('tap', function() {
		$('#ck_agent').removeClass('display');
		$('#regDeal').addClass('display');
		$('#dealCheck').removeAttr('checked');
	}, false);
	$('#dealAgree')[0].addEventListener('tap', function() {
		$('#ck_agent').removeClass('display');
		$('#regDeal').addClass('display');
		$('#dealCheck')[0].checked = true;
	}, false);
	//发送验证码
	$('#ck-check')[0].addEventListener('tap', function() {
		var mobile = $('#ck-mobile').val();
		if(reg_phone.test(mobile)) {
			sessionStorage.regPhone = mobile;
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
						//倒计时
						mui.toast(data.message);
						countDown('#regCheckAgain');
					} else {
						mui.toast(data.message);
					}

				}
			});
		} else {
			mui.toast('手机号输入错误')
		}
	}, false);
});