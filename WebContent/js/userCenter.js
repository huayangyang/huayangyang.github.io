$(function() {
	/*
	 获取头像，用户名
	 */
	//加载脚步nav
	$('#navWrap').load('../module/nav.html#nav');
	document.getElementById("center-touxiang").addEventListener('tap', function() {
		window.location.href = 'set.html';
	}, false);
	$.ajax({
		type: "get",
		url: "/wxomi2/wx2/home/home.action",
		dataType: 'json',
		success: function(data) {
			console.log(data);

			//						console.log(data[0].imgPath);
			//						console.log(commonUrl()+data[0].imgPath);
			$('#center-touxiang').attr('src',data[0].imgPath);
			$('#center-userName').html(data[0].vcMobile);

		}
	});
	//列表跳转
	var centerList = $('.centerList');
	centerList.each(function(i, item) {
		item.addEventListener('tap', function() {
			if(i == 0) {
				window.location.href = 'chartCenter.html'
			} else if(i == 1) {
				window.location.href = 'coupons.html'
			} else if(i == 2) {
				window.location.href = '../buy/order.html'
			} else if(i == 3) {
				window.location.href = 'collect.html'
			} else if(i == 4) {
				window.location.href = 'adressList.html'
			} else if(i == 5) {
				window.location.href = 'aftersaleCenter.html'
			} else {
				window.location.href = 'set.html'
			}
		}, false);
	});
	//退出登录
	$('#outLogin')[0].addEventListener('tap', function() {
		$.ajax({
			type: "get",
			url: "/wxomi2/wx2/login/WX2Login_exit.action",
			dataType: 'json',
			success: function(data) {
				console.log(data);
				if(data.status){
					goUrl('../../index.html');
					localStorage.logined=false;
					localStorage.userType=null;
				}
			}
		});
	}, false);
});