$(function() {
	$('#navWrap').load('../module/nav.html#nav')
		//消费者登录
	$('#commonLogin').get(0).addEventListener('tap', function() {
		var userName = $('#userName').val();
		var password = $('#pwd').val();
		console.log(userName+password)
		$.ajax({
			url: "/wxomi2/wx2/login/WX2Login.action",
			type: "post",
			data: {
				password: password,
				userName: userName
			},
			beforeSend: function() {
				$('#agentLogin').html('登录中...')
			},
			dataType: 'json',
			success: function(data) {
				console.log(data)
				if(data.status){
					localStorage.logined=data.item.logined;
					localStorage.userType=data.item.userType;
					window.location.href = '../../index.html';
				}else{
					mui.toast(data.message)
				}
			}
		});
	}, false);
	//微信登录
	$('#weixinLogin1')[0].addEventListener('tap', function() {
		weixinLogin();
		return false;
	}, false);
});