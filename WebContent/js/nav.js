$(function() {
	$('#goHome').get(0).addEventListener('tap', function() {
		goUrl('../../index.html');
	});
	$('#chart')[0].addEventListener('tap', function() {
		goUrl('../buy/order.html');
	});
	$('#personCenter')[0].addEventListener('tap', function() {
		if(localStorage.logined == 'true' && localStorage.userType == 'buy') {
			goUrl('../center/center.html');
		}else if(localStorage.logined == 'true' && localStorage.userType == 'proxy'){
			goUrl('../center/agentCenter.html');
		}else{
			goUrl('../user/commonLogin.html');
		}

	});
});