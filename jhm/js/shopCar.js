$(function(){
	$('#shopTop').load('html/top.html');
	$('#shopFooter').load('html/footerbtm.html');
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
			var _email=JSON.parse(localStorage.email);
			var _phoneUser=_phone.username;
			var _phonePwd=_phone.userpwd;
			var _emailUser=_email.email;
			var _emailpwd=_email.emailpwd;
			var _username=$('.indexFormUser').val();
			var _userpwd=$('.indexFormPwd').val();
			if(_username!=_phoneUser && _username!=_emailUser){
				alert('用户名错误！');
			}else if(!((_userpwd==_phonePwd && _userpwd!=_emailpwd)||(_userpwd!=_phonePwd && _userpwd==_emailpwd) )){
				alert('密码错误！');
			}else{
				alert('登录成功！')
				window.location='index.html';
			}
			if(_keep.checked){
				$('#userName').val(_username);
				$('#pwd').val(_userpwd);
			}
		});
		var shopBlock=null;
		$('.shopClearRemove').click(function(){
			var _index=$(this).index();
			$(this).parent().parent().fadeToggle();
			shopBlock=1;
			sessionStorage.block=JSON.stringify(shopBlock);
		});
		//价格
		//减少商品购买
		$('.shopS1').click(function(){
			var _txt=$(this).parent().find('span:nth-child(2)').html();
			var _num=parseInt(_txt);
			if(_num>1){
				_num=_num-1;
			}else{
				_num=1;
			}
			$(this).parent().find('span:nth-child(2)').html(_num);
			var _shopPrice=parseInt($('.shopPrice').html());
			var priceNum=168*_num;
			$('.shopPrice').html(priceNum+'.00');
			$('.shopTotal').html(priceNum+'.00');
			$('.shopTotalSum').html(priceNum+'.00');
		});
		//增加商品购买
		$('.shopS3').click(function(){
			var _txt=$(this).parent().find('span:nth-child(2)').html();
			var _num=parseInt(_txt);
			if(_num>4){
				alert('商品缺货，最多购买五件');
			}else{
				_num++;
			}
			$(this).parent().find('span:nth-child(2)').html(_num);
			var _shopPrice=parseInt($('.shopPrice').html());
			var priceNum=168*_num;
			$('.shopPrice').html(priceNum+'.00');
			$('.shopTotal').html(priceNum+'.00');
			$('.shopTotalSum').html(priceNum+'.00');
		});
		var shopBlock=null;
		
		$('dl').click(function(){
			var _index=$(this).index();
			$('.shopClearCenter').eq(_index).fadeIn();
			shopBlock=2;
			sessionStorage.block=JSON.stringify(shopBlock);
		});
		$('.checkAll').click(function(){
			if(this.checked){
				if($('.shopClearCkb')[0].checked){
					$('.shopClearCkb').attr('checked',true)
				}else{
					$('.shopClearCkb').attr('checked',true)
				}
			}else{
				if($('.shopClearCkb')[0].checked){
					$('.shopClearCkb').attr('checked',false)
				}else{
					$('.shopClearCkb').attr('checked',false)
				}
			}
		});
		if(sessionStorage.block){
			var _block=JSON.parse(sessionStorage.block);
			if(_block==1){
				$('.shopClearCenter').fadeOut();
			}else if(_block==2){
				$('.shopClearCenter').fadeIn();
			}
		}
});
