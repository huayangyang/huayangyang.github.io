;
$(function() {
	$('#top').load('html/top.html');
	$('#header').load('html/header.html');
	$('#nav-list').load('html/nav-list.html');
	$('#banner').load('html/banner.html');
	$('#wetgoods').load('html/wetgoods.html');
	$('#stores').load('html/stores.html');
	$('#hotsale').load('html/hotsale.html');
	$('#floor1').load('html/floor1.html');
	$('#floor2').load('html/floor2.html');
	$('#floor3').load('html/floor3.html');
	$('#floor4').load('html/floor4.html');
	$('#floor5').load('html/floor5.html');
	$('#floor6').load('html/floor6.html');
	$('#floor7').load('html/floor7.html');
	$('#floor8').load('html/floor8.html');
	$('#supper').load('html/supper.html');
	$('#footer-btm').load('html/footerbtm.html');
//	if(localStorage.phone!=' '){
//		$('.top>li:nth-child(2)>a:first-child').html('user');
//	}
//	if(localStorage.phone){
//		var _phone1=JSON.stringify(localStorage.phone);
//		var _phonenum=_phone1.username;
//		$('#topUser').html(_phonenum);
//	}
	//摩太狂的加载-----------------------------
	if(localStorage.phone!=''||localStorage.email!=''){
		$('#topUser').html('user');
	}
		$('body').css({
			'overflow':'hidden'
		});
	
	$('#model-top').click(function(){
		$('body').css({
			'overflow':'scroll'
		});
		$('#modal').hide();
		$('#maskLayer').hide();
	});
	var status;
	if(sessionStorage.comstatus){
		$('body').css({
			'overflow':'scroll'
		});
		$('#modal').hide();
		$('#maskLayer').hide();
	}
	$('#modal-btm>li').click(function(){
		status=1;
		sessionStorage.comstatus=JSON.stringify(status);
		$('body').css({
			'overflow':'scroll'
		});
		$('#modal').hide();
		$('#maskLayer').hide();
		var _index=$(this).index();
		var txt=$('#modal-btm>li').eq(_index).html();
		$('.top>li:first-child>a:nth-child(2)').html(txt);
	});
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
		if(_index<100){
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
	//楼梯点击事件
	$("#floorNav .floorNav li").on("click", function() {
		var _index = $(this).index();
		//		alert(_index)
		var scrollH = $("#floor .floors").eq(_index).offset().top;
		$("html,body").animate({
			"scrollTop": scrollH
		}, 400);
	});
	var initH = $("#floor .floors").eq(0).offset().top - 200; //判断快捷导航显示与隐藏的条件
	var sh = $(window).scrollTop(); //获取到现在滚动条的高
	if (sh > initH) {
		$("#floorNav .floorNav").fadeIn();
	} else {
		$("#floorNav .floorNav").fadeOut();
	}
	$(window).scroll(function() {
		var sh = $(window).scrollTop(); //获取到现在滚动条的高
		if (sh > (initH)) {
			$("#floorNav .floorNav").fadeIn();
		} else {
			$("#floorNav .floorNav").fadeOut();
		}
		var $obj = $("#floor .floors");
		$obj.each(function() {
			var index = $(this).index();
			var h = $obj.eq(index).offset().top;
			if (sh > (h - 300)) {
				$("#floorNav .floorNav li").removeClass("active");
				$("#floorNav .floorNav li").eq(index).addClass("active");
				return;
			}
		});
	});
	//主页登录
	
	var _keep=$('.indexFormMind').get(0);
		$('.indexFormUser').blur(function(){
	//		var reg=localStorage.phone;
	//		var str=JSON.parse(reg);
	//		alert(str.username);
			var _phone=JSON.parse(localStorage.phone);
			var _email=JSON.parse(localStorage.email);
			var _phoneUser=_phone.username;
			var _emailUser=_email.email;
			var _username=$('.indexFormUser').val();
			var _userpwd=$('.indexFormPwd').val();
			if(_username!=_phoneUser && _username!=_emailUser){
				alert('用户名不存在！新用户请注册！');
			}
		});
		$('.indexFormLogin').click(function(){
			var _phone=JSON.parse(localStorage.phone);
//			var _email=JSON.parse(localStorage.email);
			var _phoneUser=_phone.username;
			var _phonePwd=_phone.userpwd;
//			var _emailUser=_email.email;
//			var _emailpwd=_email.emailpwd;
			var _username=$('.indexFormUser').val();
			var _userpwd=$('.indexFormPwd').val();
			if(_username!=_phoneUser){
				alert('用户名错误！');
			}else if(!_userpwd==_phonePwd ){
				alert('密码错误！');
			}else{
				alert('登录成功！')
				window.location='index.html';
				$('#topUser').html(_phonenum);
			}
			if(_keep.checked){
				$('#userName').val(_username);
				$('#pwd').val(_phoneUser);
			}
			
		});
});