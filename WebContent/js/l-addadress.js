$(function(){
	
	var areaNox = null;
	var areaNoy = null;
	var areaNoz = null;
	var areaNoo = null;
	
	var proviceNo = null;
	var cityNo = null;
	var countyNo = null;
	var townNo = null;
	
	var isdefaultAdd = 0;
	$.ajax({
		type:"post",
		url:'/wxomi2/pub/util/xtArea_getComboProviceJson.action?selectOption=true',
		async:true,
		success:function(data){
			$('.adsfix-adress .mui-col-sm-9 #select0').text('');
			var data1 = $.parseJSON(data);
	//					console.log(data1);
			for(var i in data1){
				var $oDiv = $('<option value = "'+data1[i].areaNo+'">'+data1[i].areaName+'</option>');
				$('#select0').append($oDiv);
			}
			$('.adsfix-adress .mui-col-sm-9 #select0').on('change',function(){
				areaNox = $(this).find('option').eq($('#select0').prop('selectedIndex')).attr('value');
				proviceNo = areaNox;
	//				console.log('aarea'+areaNox);
				if(areaNox != ''){
					$.ajax({
						type:"post",
						url:"/wxomi2/pub/util/xtArea_getComboCityJson.action",
						async:true,
						data:{
							selectOption : true,
							areaNo : areaNox
						},
						success:function(data){
							$('.adsfix-adress .mui-col-sm-9 #select1').text('');
							var data2 = $.parseJSON(data);
	//									console.log(data2.length);
							for(var i in data2){
								var $oDivx = $('<option value = "'+data2[i].areaNo+'">'+data2[i].areaName+'</option>');
								$('.adsfix-adress .mui-col-sm-9 #select1').append($oDivx);
							}
						}
					});
				}
			})
		}
	});
	
	//当城市变化的时候
	$('.adsfix-adress .mui-col-sm-9 #select1').on('change',function(){
		areaNoy = $(this).find('option').eq($('#select1').prop('selectedIndex')).attr('value');
		cityNo = areaNoy;
		console.log('aarey'+areaNoy);
		if(areaNoy != ''){
			$.ajax({
				type:"post",
				url:"/wxomi2/pub/util/xtArea_getComboCountyJson.action",
				async:true,
				data:{
					selectOption : true,
					areaNo : areaNoy
				},
				success:function(data){
					$('.adsfix-adress .mui-col-sm-9 #select2').text('');
					var data3 = $.parseJSON(data);
//					console.log(data3);
					for(var i in data3){
						var $oDivy = $('<option value = "'+data3[i].areaNo+'">'+data3[i].areaName+'</option>');
						$('.adsfix-adress .mui-col-sm-9 #select2').append($oDivy);
					}
				}
			});
		}
	});
	
	
	
	//当区县发生改变时
	$('#select2').on('change',function(){
		areaNoz = $(this).find('option').eq($('#select2').prop('selectedIndex')).attr('value');
		countyNo = areaNoz;
		if(areaNoy != ''){
			$.ajax({
				type:"post",
				url:"/wxomi2/pub/util/xtArea_getComboTownJson.action",
				async:true,
				data:{
					selectOption : true,
					areaNo : areaNoz
				},
				success:function(data){
					$('.adsfix-adress .mui-col-sm-9 #select3').text('');
					var data4 = $.parseJSON(data);
//					console.log(data4);
					for(var i in data4){
						var $oDivz = $('<option value = "'+data4[i].areaNo+'">'+data4[i].areaName+'</option>');
						$('.adsfix-adress .mui-col-sm-9 #select3').append($oDivz);
					}
				}
			});
		}
	});
	
	
	//当乡镇发生变化
	$('#select3').on('change',function(){
		areaNoo = $(this).find('option').eq($('#select2').prop('selectedIndex')).attr('value');
		townNo = areaNoo;
	})
	
	
	//是否默认
	$('.adress-fix .mui-switch-mini').on('toggle',function(){
		if($('.adress-fix .mui-switch-mini').hasClass('mui-active')){
		    isdefaultAdd = 1;
		}else{
		    isdefaultAdd = 0;
		}
	})
	

	//点击提交
	$('.adsfix-tijiao button').on('tap',function(){
		//省市区镇拼接
		var Area1 = $('#select0').find("option:selected").text();
		var Area2 = $('#select1').find("option:selected").text();
		var Area3 = $('#select2').find("option:selected").text();
		var Area4 = $('#select3').find("option:selected").text();
		var consigneeArea = Area1 + Area2 + Area3 + Area4;
		//详细地址
		var consigneeAdd = $('.adress-fix .adsfix-adress1 textarea').val();
		//姓名
		var consigneeName = $('.adress-fix .adsfix-person input').val();
		//手机号
		var consigneeMobile = $('.adress-fix .adsfix-phone input').val();
		//调用接口  传入参数 
		if(Area1 && Area2 && Area3 && Area4 && consigneeAdd && consigneeName && consigneeMobile){
			if(/^1[34578]\d{9}$/.test(consigneeMobile)){ 
				$.ajax({
					type:"post",
					url:"/wxomi2/wx2/home/home_addAddress.action",
					data:{
						'consigneeAdd':consigneeAdd,
						'consigneeArea':consigneeArea,
						'consigneeName':consigneeName,
						'proviceNo':proviceNo,
						'consigneeMobile':consigneeMobile,
						'cityNo':cityNo,
						'countyNo':countyNo,
						'townNo':townNo,
						'isdefaultAdd':isdefaultAdd
					},
					async:true,
					success:function(data){
						
						var data1 =  $.parseJSON(data);
						console.log(data1);
						
						if(data1.status){
							window.location.href = 'adressList.html';
						}else{
							mui.toast(data1.message);
						}
					}
				});
			}else{
				mui.toast('请填写有效的手机号码');
			}
		}else{
			mui.toast('请填写完整信息');
		}		
	})
})
