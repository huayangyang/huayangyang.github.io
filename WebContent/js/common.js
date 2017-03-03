(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			if(clientWidth >= 414) {
				docEl.style.fontSize = '100px';
			} else {
				docEl.style.fontSize = 100 * (clientWidth / 414) + 'px';
			}
		};

	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
//返回上一级
function goBack() {
	window.history.back();
	window.location.reload();
}
//url定向
function goUrl(url) {
	window.location.href = url;
}
//数据请求路径公共头
function commonUrl() {
	return 'http://zhichong365.com';
}
//手机正则
var reg_phone = /^1(3|4|5|7|8)\d{9}$/;
//qq正则
var isQQ = /^[1-9][0-9]{4,}$/;

//邮箱正则
var isEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

//倒计时
var timer;

function countDown(el) {
	var count = 60;
	timer = setInterval(function() {
		if(count >= 0) {
			$(el).html('(' + count + ')');
			count--;
			$(el).attr('disabled', '');
		} else {
			$(el).html('重发验证码');
			$(el).removeAttr('disabled');
		}
	}, 1000);
}
//轮播
$(function() {
	mui.init({
		swipeBack: true //启用右滑关闭功能
	});
	var slider = mui("#slider");
	slider.slider({
		interval: 1000
	});
});
//15993491596
//微信授权登录
function weixinLogin() {
	$.ajax({
		type: "get",
		url: "/wxomi2/wx2/login/OAuth2Validate_sendOAuthUrl.action",
		dataType: 'jsonp',
		success: function(data) {
			console.log(data);
		},
		error: function() {
			console.log('请求失败');
		},
	});
}