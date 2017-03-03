$(function(){
	var proviceNo = null;
	var cityNo = null;
	var countyNo = null;
	var townNo = null;
	var id = GetQueryString('id');
//	console.log(id);
	var vcIDdel = sessionStorage.getItem('vcId'+id);
	var isdefaultAdd;
	$.ajax({
		type:"get",
		url:"/wxomi2/wx2/home/home_selectAddress.action?vcId="+vcIDdel,
		async:true,
		success:function(data){
			
			var data1 = $.parseJSON(data);
			console.log(data1);
			//得到省得编号
			proviceNo = data1[0].proviceNo;
			//得到市的编号
			cityNo = data1[0].cityNo;
			//得到区的编号
			countyNo = data1[0].countyNo;
			//得到乡镇的编号
			townNo = data1[0].townNo;
			//得到是否默认
			isdefaultAdd = data1[0].isdefaultAdd;
			var oInput = $('.adress-fix input');
//			console.log(oInput.length);//2
			$('.adress-fix .adsfix-person input').val(data1[0].consigneeName);
			$('.adress-fix .adsfix-phone input').val(data1[0].consigneeMobile);
			$('.adress-fix .adsfix-adress1 textarea').val(data1[0].consigneeAdd);
			if(data1[0].isdefaultAdd == 1){
				//判断是否为默认的
				$('.adress-fix .mui-switch-mini').addClass('mui-active');
			}
			$('.adress-fix .mui-switch-mini').on('toggle',function(){
				 if($('.adress-fix .mui-switch-mini').hasClass('mui-active')){
				    isdefaultAdd = 1;
				}else{
				    isdefaultAdd = 0;
				}
			})
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
						if(data1[i].areaNo == proviceNo){
							$('#select0').find('option').eq(i).attr("selected","selected");
						}
					}
//					console.log($('.adsfix-adress .mui-col-sm-9 #select0 option').length);
					$('.adsfix-adress .mui-col-sm-9 #select0').on('change',function(){
						areaNox = $(this).find('option').eq($('#select0').prop('selectedIndex')).attr('value');
						proviceNo = areaNox;
		//				console.log('aarea'+areaNox);
						if(areaNox != ''){
							$.ajax({
								type:"post",
								url:"/wxomi2/pub/util/xtArea_getComboCityJson.action?selectOption=true&areaNo="+areaNox,
								async:true,
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
			
			$.ajax({
				type:"post",
				url:"/wxomi2/pub/util/xtArea_getComboCityJson.action?selectOption=true&areaNo="+proviceNo,
				async:true,
				success:function(data){
					var data2 = $.parseJSON(data);
					$('.adsfix-adress .mui-col-sm-9 #select1').text('');
					for(var i in data2){
						var $oDivx = $('<option value = "'+data2[i].areaNo+'">'+data2[i].areaName+'</option>');
						$('.adsfix-adress .mui-col-sm-9 #select1').append($oDivx);
						if(data2[i].areaNo == cityNo){
							$('#select1').find('option').eq(i).attr("selected","selected");
						}
					}
				}
			});
			
			
			$.ajax({
				type:"post",
				url:"/wxomi2/pub/util/xtArea_getComboCountyJson.action?selectOption=true&areaNo="+cityNo,
				async:true,
				success:function(data){
					$('.adsfix-adress .mui-col-sm-9 #select2').text('');
					var data3 = $.parseJSON(data);
					for(var i in data3){
						var $oDivy = $('<option value = "'+data3[i].areaNo+'">'+data3[i].areaName+'</option>');
						$('.adsfix-adress .mui-col-sm-9 #select2').append($oDivy);
						if(data3[i].areaNo == countyNo){
							$('#select2').find('option').eq(i).attr("selected","selected");
						}
					}
				}
			});
			
			$.ajax({
				type:"post",
				url:"/wxomi2/pub/util/xtArea_getComboTownJson.action?selectOption=true&areaNo="+countyNo,
				async:true,
				success:function(data){
					$('.adsfix-adress .mui-col-sm-9 #select3').text('');
					var data4 = $.parseJSON(data);
					console.log(data4);
					for(var i in data4){
						var $oDivz = $('<option value = "'+data4[i].areaNo+'">'+data4[i].areaName+'</option>');
						$('.adsfix-adress .mui-col-sm-9 #select3').append($oDivz);
						if(data4[i].areaNo == townNo){
							$('#select3').find('option').eq(i).attr("selected","selected");
						}
					}
				}
			});
			
		}
	});
	
	
		//select选项
	var areaNox = null;
	var areaNoy = null;
	var areaNoz = null;
	
	
	$('.adsfix-adress .mui-col-sm-9 #select1').on('change',function(){
		areaNoy = $(this).find('option').eq($('#select1').prop('selectedIndex')).attr('value');
		cityNo = areaNoy;
		console.log('aarey'+areaNoy);
		if(areaNoy != ''){
			$.ajax({
				type:"post",
				url:"/wxomi2/pub/util/xtArea_getComboCountyJson.action?selectOption=true&areaNo="+areaNoy,
				async:true,
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
	})
	
	
	$('#select2').on('change',function(){
		areaNoz = $(this).find('option').eq($('#select2').prop('selectedIndex')).attr('value');
		countyNo = areaNoz;
		if(areaNoy != ''){
			$.ajax({
				type:"post",
				url:"/wxomi2/pub/util/xtArea_getComboTownJson.action?selectOption=true&areaNo="+areaNoz,
				async:true,
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
	})
	
	$('#select3').on('change',function(){
		
		var areaNoo = $(this).find('option').eq($('#select2').prop('selectedIndex')).attr('value');
		townNo = areaNoo;
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
					url:"/wxomi2/wx2/home/home_updateAddress.action",
					data:{
						'consigneeAdd':consigneeAdd,
						'consigneeArea':consigneeArea,
						'consigneeName':consigneeName,
						'proviceNo':proviceNo,
						'vcId':vcIDdel,
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
						}
					}
				});
			}
		}else{
			mui.toast('请填写完整信息');
		}		
	})
	
	function GetQueryString(name)
		{
		    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		    var r = window.location.search.substr(1).match(reg);
		    if(r!=null) return  unescape(r[2]);
		    return null;
		}
	
	
})
