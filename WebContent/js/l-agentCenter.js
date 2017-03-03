$(function(){
	
	$('#navWrap').load('../module/nav.html#nav');
	
	$('.agentC-list .mui-row').each(function(i,item){
		item.addEventListener('tap',function(){
			if(i==0){
				window.location.href='brokerage.html'
			}else if(i==1){
				window.location.href='orderCenter.html'
			}else if(i==2){
				window.location.href='aftersaleCenter.html'
			}else if(i==3){
				window.location.href='set.html'
			}
		},false);
	});
	
	
	
	$.ajax({
		type:"post",
		url:"/wxomi2/wx2/home/home_statisticsData.action",
		async:true,
		dataType:'json',
		success:function(data){
//			console.log(data);   
			var oDivafter = $('<div class="agentC-result"><div class="agentC-resultList"><div><span class="first">'+data[0].orderNum+'</span><span class="last">订单数量</span></div><div class="center"><span class="first">￥'+data[0].pushMoney+'</span><span class="last">累计佣金</span></div><div><span class="first">'+data[0].goodsNum+'</span><span class="last">宝贝数量</span></div></div></div>');
			$('.agentCenter').prepend(oDivafter);
			var oDivpre = $('<div class="agentC-banner"><img src="../../img/shopIndex/shop-bg-414x180.jpg" /><div class="agentC-touxiang"><div id="agent_touxiang" class="touxiang"><img src="'+data[0].headPortrait+'" /></div><div class="agent-person"><span class="first">'+data[0].shopName+'</span><span class="last">'+data[0].name+'</span></div></div></div>');
			$('.agentCenter').prepend(oDivpre);
		}
	});
	
	
	//点击头像
	$(".agentCenter").on('tap','#agent_touxiang',function(){
		window.location.href='set.html'
	})
})
