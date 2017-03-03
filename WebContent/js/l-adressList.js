$(function(){
	
$.ajax({
	type:"post",
	url:"/wxomi2/wx2/home/home_address.action",
	async:true,
	success:function(data){
		var data1 = $.parseJSON(data);
		console.log(data1);
//		console.log(data1.length); //2

		for(var i in data1){
			
			//遍历动态添加
			if(data1[i].isdefaultAdd == 1){
			var oDiv = $('<div class="adressList mui-row"><div class="mui-col-sm-10 mui-col-xs-10"><p class="adress-person"><span>收货人 : '+data1[i].consigneeName+'</span><span class="adress-call">'+data1[i].consigneeMobile+'</span></p><p class="adress-ads"><span class="adressDefault">默认</span>'+data1[i].consigneeArea+data1[i].consigneeAdd+'</p></div><div class="mui-col-sm-2 mui-col-xs-2"><div class="adress-right"><a class = "l-change"><i class="iconfont">&#xe61b;</i>修改</a><a class = "l-delect"><i class="iconfont">&#xe61c;</i>删除</a></div></div></div>')
			$('#L-adress').prepend(oDiv);
			}else{
			var oDiv = $('<div class="adressList mui-row default"><div class="mui-col-sm-10 mui-col-xs-10"><p class="adress-person"><span>收货人 : '+data1[i].consigneeName+'</span><span class="adress-call">'+data1[i].consigneeMobile+'</span></p><p class="adress-ads"><span class="adressDefault">默认</span>'+data1[i].consigneeArea+data1[i].consigneeAdd+'</p></div><div class="mui-col-sm-2 mui-col-xs-2"><div class="adress-right"><a class ="l-change"><i class="iconfont">&#xe61b;</i>修改</a><a class = "l-delect"><i class="iconfont">&#xe61c;</i>删除</a></div></div></div>')	
			$('#L-adress').append(oDiv);
			}
			sessionStorage.setItem('vcId'+i,data1[i].vcId);
		}
		//点击删除		
		$('.l-delect').each(function(i){
			$(this).on('tap',function(){
				console.log(i);
				var nowvcId = 'vcId'+parseInt(i);
				var vcIDdel = sessionStorage.getItem('vcId'+i);
				$.ajax({
					type:"get",
					url:" /wxomi2/wx2/home/home_deleteAddress.action?vcId="+vcIDdel,
					async:true,
					success:function(data){
//						alert(vcIDdel);
//						console.log(data);
						window.location.reload();
					}
				});
			})
		})
			
	
	
		//点击修改
		$('.l-change').each(function(i){
			$(this).on('tap',function(){
			var index = i;
			console.log(index);
			window.location.href = "adress.html?id="+index;	
			})
		})
	}
});


	
	
	
	//	点击添加地址
	
	$('.addAdress button').on('tap',function(){
		window.location.href = "l-addadress.html";
	})

})
