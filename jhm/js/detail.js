$(function(){
	$('#top').load('html/top.html');
	$('#header').load('html/header.html');
	$('#nav-list').load('html/nav-list.html');
	$('#detailFooter-top').load('html/footertopDetail.html');
	$('#detailFooter-btm').load('html/footerbtm.html');
	var rightBarH = $(window).height();
	$('#index-right-bar').css({
		'height': rightBarH + 'px',
		'width': 35 + 'px',
		'position': 'fixed',
		'right': 0,
		'z-index': 999,
		'background': '#333333',
		'top': 0
	});
	$(window).resize(function() {
		var rightBarH = $(document).height();
		$('#index-right-bar').animate({
			'height': rightBarH + 'px',
			'width': 35 + 'px'
		}, 100);
	});
	$('.index-bar>li:nth-child(3)').indexbar('.index-bar>li:nth-child(3)');
	$('.index-bar>li:nth-child(5)').indexbar('.index-bar>li:nth-child(5)');
	$('.index-bar>li:nth-child(6)').indexbar('.index-bar>li:nth-child(6)');
	$('.index-bar>li:nth-child(7)').indexbar('.index-bar>li:nth-child(7)');
	$('.index-bar>li:nth-child(8)').indexbar('.index-bar>li:nth-child(8)');
	$('.index-bar>li:nth-child(8)').css('opacity', '0');
	//设置回到顶部临界值
	$(window).scroll(function(){
		var _index=$(window).scrollTop();
		if(_index<600){
			$('.index-bar>li:nth-child(8)').css('opacity', '0');
		}else{
			$('.index-bar>li:nth-child(8)').css('opacity', '1');
		}
	});
	//主页右侧客户中心
	$('.index-bar>li:nth-child(1)').menu('.index-bar>li:nth-child(1)','.index-bar>li:nth-child(13)');
	//在线客服
	$('.index-bar>li:nth-child(2)').fadetog('.index-bar>li:nth-child(2)','.index-bar>li:nth-child(12)');
	//主页右侧购物车的显示与隐藏
	$('.index-bar>li:nth-child(4)').fadetog('.index-bar>li:nth-child(4)','.index-bar>li:nth-child(10)');
	//主页右侧调查显示
	$('.index-bar>li:nth-child(3)').fadetog('.index-bar>li:nth-child(3)','.index-bar>li:nth-child(11)');
	//主页右侧微信显示与隐藏
	$('.index-bar>li:nth-child(7)').fadetog('.index-bar>li:nth-child(7)','.index-bar>li:nth-child(9)');
	//回到顶部
	$('.index-bar>li:nth-child(8)').click(function(){
		$(window).scrollTop(0);
	});
	$('.detailImg-1').hover(function(){
		$('.float-box').fadeIn(200);
		$('.detailPicBig').fadeIn(200);
	},function(){
		$('.float-box').fadeOut(200);
		$('.detailPicBig').fadeOut(200);
	});
	$('.float-box').mousemove(function(ev){
		var left = ev.pageX - $('.detailImg')[0].offsetLeft - $('.detailImg-1')[0].offsetLeft - $('.float-box')[0].offsetWidth / 2;
			var top = ev.pageY - $('.detailImg')[0].offsetTop - $('.detailImg-1')[0].offsetTop - $('.detailImg')[0].offsetHeight / 2;

			if (left < 0) {
				left = 0;
			} else if (left > ($('.detailImg-1')[0].offsetWidth - $('.float-box')[0].offsetWidth)) {
				left = $('.detailImg-1')[0].offsetWidth - $('.float-box')[0].offsetWidth;
			}

			if (top < 0) {
				top = 0;
			} else if (top > ($('.detailImg-1')[0].offsetHeight - $('.float-box')[0].offsetHeight)) {
				top = $('.detailImg-1')[0].offsetHeight - $('.float-box')[0].offsetHeight;
			}

			$('.float-box')[0].style.left = left + "px";
			$('.float-box')[0].style.top = top + "px";

			var percentX = left / ($('.detailImg-1')[0].offsetWidth - $('.float-box')[0].offsetWidth);
			var percentY = top / ($('.detailImg-1')[0].offsetHeight - $('.float-box')[0].offsetHeight);
			console.log(percentX);
			$('.detailPicBig>img')[0].style.left = -percentX * ($('.detailPicBig>img')[0].offsetWidth - $('.detailPicBig')[0].offsetWidth) + "px";
			$('.detailPicBig>img')[0].style.top = -percentY * ($('.detailPicBig>img')[0].offsetHeight - $('.detailPicBig')[0].offsetHeight) + "px";
	});
	var count=1;
	
	$('.detailColor').click(function(){
		if(count%2==1){
			$('.detailColor')[0].style.background='url(img/detail/goods_act6.png) no-repeat right bottom';
		}else{
			$('.detailColor')[0].style.background='none';
		}
		count++;
	});
	$('.detailX').click(function(){
		
		if(count%2==1){
			$('.detailX')[0].style.background='url(img/detail/goods_act6.png) no-repeat right bottom';
			$('.detailXL')[0].style.background='none';
		}else{
			$('.detailX')[0].style.background='none';
		}
		count++;
	});
	$('.detailXL').click(function(){
		
		if(count%2==1){
			$('.detailXL')[0].style.background='url(img/detail/goods_act6.png) no-repeat right bottom';
			$('.detailX')[0].style.background='none';
		}else{
			$('.detailXL')[0].style.background='none';
		}
		count++;
	});
	//详情页楼梯
	$('.dCtBtmCenter1>a').click(function(){
		var _index = $(this).index();
		//		alert(_index)
		var scrollH = $(".detailFloor").eq(_index).offset().top;
		$("html,body").animate({
			"scrollTop": scrollH-50
		}, 400);
	});
	$('.dCtBtmRight-ul>li').click(function(){
		var _index = $(this).index();
		//		alert(_index)
		var scrollH = $(".detailFloor").eq(_index).offset().top;
		$("html,body").animate({
			"scrollTop": scrollH-50
		}, 400);
	});
		var sh=$('.dCtBtmCenter1').offset().top;
		var uh=$('.dCtBtmRight').offset().top;

	$('.detailPay3>li:nth-child(4)>a:nth-child(2)').click(function(){
//		alert('1');
		var _txt=$('.detailPay3>li:nth-child(4)>a:nth-child(3)').html();
		var _txtInt=parseInt(_txt);
		if(_txtInt==1){
			_txt=$('.detailPay3>li:nth-child(4)>a:nth-child(3)').html(_txtInt)
		}else{
			_txtInt-=1;
			_txt=$('.detailPay3>li:nth-child(4)>a:nth-child(3)').html(_txtInt)
		}
	});
	$('.detailPay3>li:nth-child(4)>a:nth-child(4)').click(function(){
//		alert('1');
		var _txt=$('.detailPay3>li:nth-child(4)>a:nth-child(3)').html();
		var _txtInt=parseInt(_txt);
		if(_txtInt==5){
			alert('商品缺货，最多购买五件！');
		}else{
			_txtInt+=1;
			_txt=$('.detailPay3>li:nth-child(4)>a:nth-child(3)').html(_txtInt)
		}
	});
	
	$('.dCtBtmCenter1>a').click(function(){
		$(this).addClass('fixedClick').siblings().removeClass('fixedClick');
	});
	$(document).scroll(function(){
		var wh=$(document).scrollTop();
		if(wh>=sh){
			$('.dCtBtmCenter1').addClass('position');
		}else{
			$('.dCtBtmCenter1').removeClass('position');
		};
	});
});