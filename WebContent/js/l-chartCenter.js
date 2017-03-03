


$(function(){
	
	$('#navWrap').load('../module/nav.html#nav')
	mui.init({
		swipeBack: true //启用右滑关闭功能
	});
	var mySwiper = new Swiper('.swiper-container', {
		freeMode: true,
		slidesPerView: 'auto',
	});
	
	document.getElementById("chartCenter-search").addEventListener('tap', function() {
		if($('#chartCenter-input').hasClass('zc-hidden')){
			document.getElementById("chartCenter-input").className = 'chartCenter-search';
			document.getElementById("masklayer").className = '';
		}else{
			document.getElementById("chartCenter-input").className = 'chartCenter-search zc-hidden';
			document.getElementById("masklayer").className = 'zc-hidden';
		}
	});
	//选择时间
	var datacount=0;
	var btns = mui('.btn');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options');
			var options = JSON.parse(optionsJson);
			//var id = this.getAttribute('id');
			/*
			 * 首次显示时实例化组件
			 * 示例为了简洁，将 options 放在了按钮的 dom 上
			 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
			 */
			var picker = new mui.DtPicker(options);
			var target=$(this);
//			console.log(target);
			picker.show(function(rs) {
				/*
				 * rs.value 拼合后的 value
				 * rs.text 拼合后的 text
				 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
				 * rs.m 月，用法同年
				 * rs.d 日，用法同年
				 * rs.h 时，用法同年
				 * rs.i 分（minutes 的第二个字母），用法同年
				 */
				//							result.innerText = '选择结果: ' + rs.text;
//						console.log(rs.text);
				target.html('<i class="iconfont">&#xe622;</i>'+'<b>'+rs.text+'</b>');
				/* 
				 * 返回 false 可以阻止选择框的关闭
				 * return false;
				 */
				/*
				 * 释放组件资源，释放后将将不能再操作组件
				 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
				 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
				 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
				 */
				picker.dispose();
			});
		}, false);
	});
	
	//点击放大镜里面的确定之后
	$('.chartCenter-btn button').on('tap',function(){
		
	})



	//获取页面信息
	$.ajax({
		type:"post",
		url:"/wxomi2/wx2/order/order_searchOrder.action",
		async:true,
		dataType:'json',
		success:function(data){
			var OrderState = null;
			console.log(data);			
			for(var i in data){
				var Num = null;
				var totalPrice = null;
				if(data[i].orderState == '6'){
					var data1 = data[i].detailList;
					
					console.log(data1);
					for(var i in data1){
						Num += data1[i].productNum;
						totalPrice += data1[i].productNum*data1[i].productPrice;
					}
					OrderState = '待支付';
					var oDiv1 = $('<div class="chartCenter-shop"><p><a href="javascript:void(0);"><i class="iconfont">&#xe610;</i>'+data[i].agentShopname+'<i class="iconfont">&#xe60c;</i></a><a class="last" href="javascript:void(0);">'+OrderState+'</a></p></div><div class="chartCenter-proList"><ul class="proList-ul-1 '+data[i].vcId+'" value = "'+data[i].orderCode+'"></ul></div><div class="chartCenter-result"><p class="result-p1">共<span class = "l-totalNum">'+Num+'</span>件商品&nbsp;&nbsp; 合计 : ￥<span class = "l-totalPrice">'+totalPrice+'</span></p><p class="result-p2"><a class="l-server" href="##">取消订单</a><a class="zc-active l-pingjia" href="##">立即支付</a></p></div>');
					$('.chartCenter').append(oDiv1);
					for(var j in data1){
						var oLi = $('<li><a href="##"><img src="'+data1[j].productPicture+'"/><div><p class="proList-p1">'+data1[j].productName+'</p><p class="proList-p2">￥'+data1[j].productPrice+'<span class = "l-shopNum">x'+data1[j].productNum+'</span></p></div></a></li>');
						$('.'+data[i].vcId+'').append(oLi);
					}
				}else if(data[i].orderState == '0'){
					var data1 = data[i].detailList;
					console.log(data1);
					for(var i in data1){
						Num += data1[i].productNum;
						totalPrice += data1[i].productNum*data1[i].productPrice;
					}
					OrderState = '待审核';
					var oDiv1 = $('<div class="chartCenter-shop"><p><a href="javascript:void(0);"><i class="iconfont">&#xe610;</i>'+data[i].agentShopname+' <i class="iconfont">&#xe60c;</i></a><a class="last" href="javascript:void(0);">'+OrderState+'</a></p></div><div class="chartCenter-proList"><ul class="proList-ul-1 '+data[i].vcId+'" value = "'+data[i].orderCode+'"></ul></div><div class="chartCenter-result"><p class="result-p1">共<span class = "l-totalNum">'+Num+'</span>件商品&nbsp;&nbsp; 合计 : ￥<span class = "l-totalPrice">'+totalPrice+'</span> &nbsp;&nbsp;支付方式 : <span class = "l-totalPay">支付宝</span></p><p class="result-p2"><a class="zc-active l-pingjia" href="#">取消订单</a></p></div>');
					$('.chartCenter').append(oDiv1);
					console.log(data1.length);
					for(var j in data1){
						var oLi = $('<li><a href="##"><img src="'+data1[j].productPicture+'"/><div><p class="proList-p1">'+data1[j].productName+'</p><p class="proList-p2">￥'+data1[j].productPrice+'<span class = "l-shopNum">x'+data1[j].productNum+'</span></p></div></a></li>');
						$('.'+data[i].vcId+'').append(oLi);
					}
				}else if(data[i].orderState == '1'){
					var data1 = data[i].detailList;
					console.log(data1);
					for(var i in data1){
						Num += data1[i].productNum;
						totalPrice += data1[i].productNum*data1[i].productPrice;
					}
					if(data[i].payState == '0' || data[i].payState == '1' || data[i].payState == '2'){
						OrderState = '待发货';
						var oDiv1 = $('<div class="chartCenter-shop"><p><a href="javascript:void(0);"><i class="iconfont">&#xe610;</i>'+data[i].agentShopname+'<i class="iconfont">&#xe60c;</i></a><a class="last" href="javascript:void(0);">'+OrderState+'</a></p></div><div class="chartCenter-proList"><ul class="proList-ul-1 '+data[i].vcId+'" value = "'+data[i].orderCode+'"></ul></div><div class="chartCenter-result"><p class="result-p1">共<span class = "l-totalNum">'+Num+'</span>件商品&nbsp;&nbsp; 合计 : ￥<span class = "l-totalPrice">'+totalPrice+'</span> &nbsp;&nbsp;支付方式 : <span class = "l-totalPay">支付宝</span></p><p class="result-p2"><a class="l-server" href="##">取消订单</a><a class="zc-active l-pingjia" href="#">退款</a></p></div>');
						$('.chartCenter').append(oDiv1);
						for(var j in data1){
							var oLi = $('<li><a href="##"><img src="'+data1[j].productPicture+'"/><div><p class="proList-p1">'+data1[j].productName+'</p><p class="proList-p2">￥'+data1[j].productPrice+'<span class = "l-shopNum">x'+data1[j].productNum+'</span></p></div></a></li>');
							$('.'+data[i].vcId+'').append(oLi);
						}
					}//else{
//						var oDiv1 = $('<div class="chartCenter-shop"><p><a href="javascript:void(0);"><i class="iconfont">&#xe610;</i>芷云店铺 <i class="iconfont">&#xe60c;</i></a><a class="last" href="javascript:void(0);">'+OrderState+'</a></p></div><div class="chartCenter-proList"><ul class="proList-ul-1"></ul></div><div class="chartCenter-result"><p class="result-p1">共<span class = "l-totalNum">'+Num+'</span>件商品&nbsp;&nbsp; 合计 : ￥<span class = "l-totalPrice">'+totalPrice+'</span> &nbsp;&nbsp;支付方式 : <span class = "l-totalPay">支付宝</span></p></div>');
//						$('chartCenter').append(oDiv1);
//						for(var j in data1){
//							var oLi = $('<li><a href=""><img src="../../img/activity/product-img-192x192px.jpg" /><div><p class="proList-p1">华为 荣耀 畅玩 4 金色荣耀 畅玩 4 金色荣耀 畅玩 4金色</p><p class="proList-p2">￥725<span class = "l-shopNum">x1</span></p></div></a></li>');
//							$('.proList-ul-1').append(oLi);
//						}
//					}		
				}else if(data[i].orderState == '2'){
					var data1 = data[i].detailList;
					console.log(data1);
					for(var i in data1){
						Num += data1[i].productNum;
						totalPrice += data1[i].productNum*data1[i].productPrice;
					}
					OrderState = '待收货';
					var oDiv1 = $('<div class="chartCenter-shop"><p><a href="javascript:void(0);"><i class="iconfont">&#xe610;</i>'+data[i].agentShopname+' <i class="iconfont">&#xe60c;</i></a><a class="last" href="javascript:void(0);">'+OrderState+'</a></p></div><div class="chartCenter-proList"><ul class="proList-ul-1 '+data[i].vcId+'" value = "'+data[i].orderCode+'"></ul></div><div class="chartCenter-result"><p class="result-p1">共<span class = "l-totalNum">'+Num+'</span>件商品&nbsp;&nbsp; 合计 : ￥<span class = "l-totalPrice">'+totalPrice+'</span> &nbsp;&nbsp;支付方式 : <span class = "l-totalPay">支付宝</span></p><p class="result-p2"><a class="zc-active l-pingjia" href="#">确认收货</a></p></div>');
					$('.chartCenter').append(oDiv1);
					for(var j in data1){
						var oLi = $('<li><a href="##"><img src="'+data1[j].productPicture+'" /><div><p class="proList-p1">'+data1[j].productName+'</p><p class="proList-p2">￥'+data1[j].productPrice+'<span class = "l-shopNum">x'+data1[j].productNum+'</span></p></div></a></li>');
						$('.'+data[i].vcId+'').append(oLi);
					}
				}else if(data[i].orderState == '3'){
					var data1 = data[i].detailList;
					console.log(data1);
					for(var i in data1){
						Num += data1[i].productNum;
						totalPrice += data1[i].productNum*data1[i].productPrice;
					}
					OrderState = '待付款';
					if(data[i].payState == '0' || data[i].payState == '1' || data[i].payState == '2'){
						var oDiv1 = $('<div class="chartCenter-shop"><p><a href="javascript:void(0);"><i class="iconfont">&#xe610;</i>'+data[i].agentShopname+' <i class="iconfont">&#xe60c;</i></a><a class="last" href="javascript:void(0);">'+OrderState+'</a></p></div><div class="chartCenter-proList"><ul class="proList-ul-1 '+data[i].vcId+'" value = "'+data[i].orderCode+'"></ul></div><div class="chartCenter-result"><p class="result-p1">共<span class = "l-totalNum">'+Num+'</span>件商品&nbsp;&nbsp; 合计 : ￥<span class = "l-totalPrice">'+totalPrice+'</span> &nbsp;&nbsp;支付方式 : <span class = "l-totalPay">支付宝</span></p><p class="result-p2"><a class="l-server" href="##">退款退货</a><a class="zc-active l-pingjia" href="#">立即评价</a></p></div>');
						$('.chartCenter').append(oDiv1);
						for(var j in data1){
							var oLi = $('<li><a href="##"><img src="'+data1[j].productPicture+'" /><div><p class="proList-p1">'+data1[j].productName+'</p><p class="proList-p2">￥'+data1[j].productPrice+'<span class = "l-shopNum">x'+data1[j].productNum+'</span></p></div></a></li>');
							$('.'+data[i].vcId+'').append(oLi);
						}
					}	
				}else if(data[i].orderState == '5'){
					var data1 = data[i].detailList;
					console.log(data1);
					for(var i in data1){
						Num += data1[i].productNum;
						totalPrice += data1[i].productNum*data1[i].productPrice;
					}
					if(data[i].OrderOtherState != null && data[i].OrderOtherState != '0'){
						var oDiv1 = $('<div class="chartCenter-shop"><p><a href="javascript:void(0);"><i class="iconfont">&#xe610;</i>'+data[i].agentShopname+' <i class="iconfont">&#xe60c;</i></a><a class="last" href="javascript:void(0);">'+OrderState+'</a></p></div><div class="chartCenter-proList"><ul class="proList-ul-1 '+data[i].vcId+'" value = "'+data[i].orderCode+'"></ul></div><div class="chartCenter-result"><p class="result-p1">共<span class = "l-totalNum">'+Num+'</span>件商品&nbsp;&nbsp; 合计 : ￥<span class = "l-totalPrice">'+totalPrice+'</span> &nbsp;&nbsp;支付方式 : <span class = "l-totalPay">支付宝</span></p><p class="result-p2"><a class="zc-active l-pingjia" href="#">立即评价</a></p></div>');
						$('.chartCenter').append(oDiv1);
						for(var j in data1){
							var oLi = $('<li><a href="##"><img src="'+data1[j].productPicture+'" /><div><p class="proList-p1">'+data1[j].productName+'</p><p class="proList-p2">￥'+data1[j].productPrice+'<span class = "l-shopNum">x'+data1[j].productNum+'</span></p></div></a></li>');
							$('.'+data[i].vcId+'').append(oLi);
						}
					}else if(data[i].IsCanReturn == 'true'){
						
					}
				}
				
			}
		}
	});
	
	
	
	
	
})
