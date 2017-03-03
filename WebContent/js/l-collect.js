$(function(){
	var typer = 'goods';
	$('#navWrap').load('../module/nav.html#nav');
	$('.collect-top a').on('tap',function(){
		$('.collect-top a').removeClass('zc-active');
		$(this).addClass('zc-active');
		var index = $(this).index();
		$('.collect-b ul').addClass('hide');
		$('.collect-b ul').removeClass('active');
		$('.collect-b ul').eq(index).removeClass('hide');
		$('.collect-b ul').eq(index).addClass('active');

		if(index == 0){
			typer = 'goods';
		}else{
			typer = 'store';
		}


	})


	$.ajax({
		type:"post",
		url:"/wxomi2/wx2/collect/collect.action?type="+typer,
		async:true,
		success:function(data){
			var data1 = $.parseJSON(data);
			console.log(data1);
			for(var i in data1){
				console.log(data1[i].vcId);
				var $oDiv = $('<li value = "'+data1[i].vcId+'"><a href="##"><div class="delete"><i class="iconfont">&#xe61c;</i><span>删除</span></div><img src="'+data1[i].picShow+'" /><div><p class="proList-p1">'+data1[i].productName+'</p><p class="proList-p2"><span class="jiage">￥'+data1[i].productPrice+'</span><span class="shop"><i class="iconfont">&#xe610;</i>'+data1[i].shopName+'<i class="iconfont">&#xe60c;</i></span></p></div></a></li>');
				$('.proList-ul-1').append($oDiv);
			}
			//点击编辑
			$('.right').on('tap',function(){
				if($('.collect-b .active li a .delete').prop('display') == 'none'){
					$('.collect-b .active li a .delete').prop('display','block');
				}else{
					$('.collect-b .active li a .delete').prop('display','none');
				}
			})
		}
	});
	
	
	$('.collect-b').on('tap','.delete',function(){
		var index = $(this).index();
		var vcId = $('.collect-b .active li').eq(index).attr('value');
		$.ajax({
			type:"post",
			url:"/wxomi2/mall/center/MemberCollect_getDelImDetailed.action",
			async:true,
			data:{
				'chkSelf' : vcId,
			},
			dataType:'json',
			success:function(data){
				console.log(data.opState);
				if(data.opState == 'success'){
					window.reload();
				}else{
					mui,toast('删除失败');
				}
			}
		});
	})
	
	$.ajax({
		type:"post",
		url:"/wxomi2/wx2/collect/collect.action",
		data:{
			'type' : 'store',
		},
		async:true,
		success:function(data){
			var data2 = $.parseJSON(data);
			console.log(data2);
			for(var i in data2){
				var picture = '/wzomifiles/ftpfile' + data2[i].picShow;
				var $oDiv = $('<li><a href="##"><div class="delete"><i class="iconfont">&#xe61c;</i><span>删除</span></div><img src="'+picture+'" /><div><p class="proList-p1">'+data2[i].shopName+'</p><p class="proList-p2">'+data2[i].townNo+'</p><p class="proList-p3">在售宝贝 ：'+data2[i].num+'件   <i class="iconfont">&#xe60c;</i></p></div></a></li>')
				$('.proList-ul-2').append($oDiv);
			}
			//点击编辑
			$('.right').on('tap',function(){
				if($('.collect-b .active li a .delete').css('display') == 'block'){
					$('.collect-b .active li a .delete').css('display','none');
				}else{
					$('.collect-b .active li a .delete').css('display','block');
				}
			})
		}
	});
	
	
	
	
	
	
})
