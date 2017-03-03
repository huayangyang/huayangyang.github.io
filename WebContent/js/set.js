$(function() {
	mui.init();
	$('#navWrap').load('../module/nav.html#nav');
	//上传头像
	/*
	 判断登录类型*/
	if(window.localStorage.userType == 'buy') {
		document.getElementById('zhifubao').style.display = 'none';
		document.getElementById('bank').style.display = 'none';
	}
	$('#duserName-wrap').attr('style','display:none;');
	//头像设置
	var mask = mui.createMask(function() {
		$('#fixImg').attr('class', 'fixHeader zc-hidden')
	});
	$('#fixImageHeader')[0].addEventListener('tap', function() {
		//头像上传
		$('#fixImg').attr('class', 'fixHeader');
		mask.show();
	}, false);
	$('#fixImg-off')[0].addEventListener('tap', function() {
		$('#fixImg').attr('class', 'fixHeader zc-hidden');
		mask.close();
	}, false);

	$("#upfile").change(function() {
		$.ajaxFileUpload({
			url: '/wxomi2/pub/upload/UploadPhoto_ajaxSavePhoto.action',
			secureuri: false,
			fileElementId: 'upfile', //file控件id
			dataType: 'json',
			success: function(data) {
				console.log(data);
				$('#preview').attr('src','/wzomifiles/ftpfile'+data.item.url);
				sessionStorage.previewUrl=data.item.url;
			},
			error: function(data) {
				console.log(data);
			}
		});
		return false;
	});
	$('#fixImg-sure')[0].addEventListener('tap',function(){
		$.ajax({
			type: "post",
			url: "/wxomi2/wx2/home/home_updatePersonalPir.action",
			dataType: 'json',
			data: {
				dheadPortrait:sessionStorage.previewUrl
			},
			success: function(data) {
				console.log(data);
				if(data.opState=='success'){
					window.location.reload();
				}
			},
			error: function() {
				console.log('请求失败');
			}
		});
		return false;
	},false);
	/*
	 
	 * 个人设置*/
	$('.setlist').not('.setlist-first').each(function(i, set) {
		if(i == 0) {
			set.addEventListener('tap', function(e) {
				e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
				var btnArray = ['取消', '确定'];
				mui.prompt('', $('#dname').html(), '请输入真实姓名', btnArray, function(e) {
					if(e.index == 1) {
						$('#dname').html(e.value);
					} else {
						console.log('你点了取消按钮')
					}
				})
			})
		} else if(i == 1) {
			set.addEventListener('tap', function(e) {
				$('#sex-fix').removeClass('zc-hidden');
				$('#sexMask').attr('class', '');
			})
		} else if(i == 2) {
			set.addEventListener('tap', function(e) {
				var optionsJson = this.getAttribute('data-options');
				var options = JSON.parse(optionsJson);
				//var id = this.getAttribute('id');
				/*
				 * 首次显示时实例化组件
				 * 示例为了简洁，将 options 放在了按钮的 dom 上
				 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
				 */
				var picker = new mui.DtPicker(options);
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
					$('#dbirthday').html(rs.y.value + '/' + rs.m.value + '/' + rs.d.value);
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
			})
		} else if(i == 3) {
			set.addEventListener('tap', function(e) {

				e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
				var btnArray = ['取消', '确定'];
				mui.prompt('', $('#dqq').html(), '请输入常用QQ', btnArray, function(e) {

					if(e.index == 1) {
						if(isQQ.test(e.value)) {
							$('#dqq').html(e.value);
						} else {
							mui.toast('请输入正确的qq号')
						}

					} else {
						console.log('你点了取消按钮')
					}
				})
			})
		} else if(i == 4) {
			set.addEventListener('tap', function(e) {
				e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
				var btnArray = ['取消', '确定'];
				mui.prompt('', $('#demail').html(), '请输入常用邮箱', btnArray, function(e) {
					if(e.index == 1) {
						if(isEmail.test(e.value)) {
							$('#demail').html(e.value);
						} else {
							mui.toast('请输入正确邮箱')
						}
					} else {
						console.log('你点了取消按钮')
					}
				})
			})
		} else if(i == 5) {
			set.addEventListener('tap', function(e) {
				$('#set').attr('class', 'set zc-hidden');
				$('#telePhone').attr('class', 'phone');
				$('#pnoneNum').val($('#dmobile').html());
				clearInterval(timer);
			})
		} else if(i == 6) {
			set.addEventListener('tap', function(e) {
				e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
				var btnArray = ['取消', '确定'];
				mui.prompt('', '请输入支付宝账号', '请输入支付宝账号', btnArray, function(e) {
					if(e.index == 1) {
						set.innerHTML = '<span class=first>' + e.value + '</span>' + '<span class="last">支付宝<i class="iconfont">&#xe60c;</i></span>';
					} else {
						console.log('你点了取消按钮')
					}
				})
			})
		} else if(i == 7) {
			set.addEventListener('tap', function(e) {
				alert(i)
			})
		}
	});
	//性别选择
	$('.sexperson').each(function(i, item) {
		item.addEventListener('tap', function() {
			console.log(i)
			if(i == 0) {
				$('#dsex').html('男')
				$('#sex-fix').addClass('zc-hidden');
				$('#sexMask').attr('class', 'zc-hidden');
			} else {
				$('#sex-fix').addClass('zc-hidden');
				$('#sexMask').attr('class', 'zc-hidden');
				$('#dsex').html('女')
			}
		}, false);
	});
	//保存个人信息
	$('#setSave')[0].addEventListener('tap', function() {
		var dsex=$('#dsex').html();
		if(dsex=='男'){
			dsex=0;
		}else{
			dsex=1;
		};
		$.ajax({
			type: "post",
			url: "/wxomi2/wx2/home/home_alterShDistributor.action",
			dataType: 'json',
			data: {
				vcId: sessionStorage.vcid,
				dbirthday: $('#dbirthday').html(),
				demail: $('#demail').html(),
				dname: $('#dname').html(),
				dqq: $('#dqq').html(),
				dsex: dsex
			},
			success: function(data) {
				console.log(data);
				if(data.opState=='success'){
					window.location.reload();
				}else{
					mui.toast('保存失败')
				}
			},
			error: function() {
				console.log('请求失败');
			}
		});
	}, false);
	//手机号管理，发送验证码
	$('#setPhoneCheck').stop().get(0).addEventListener('tap', function() {
		var regPhone = $('#pnoneNum').val();
		console.log(regPhone);
		if(reg_phone.test(regPhone)) {
			clearInterval(timer);
			countDown('#setPhoneCheck');
			$.ajax({
				type: "get",
				url: "/wxomi2/wx2/home/home_sendMobileChkCode.action",
				dataType: 'json',
				success: function(data) {
					console.log(data);
					mui.toast(data.opInfo);
					sessionStorage.opStatus = data.opState;
				},
				error: function() {
					console.log('发送失败');
				}
			});
		} else {
			mui.toast('手机号输入错误');
		}
	}, false);
	//下一步
	$('#phoneNext')[0].addEventListener('tap', function() {
		var checkNum = $('#checkNum').val();
		if(sessionStorage.opStatus == 'success') {
			console.log(checkNum);
			$.ajax({
				type: "get",
				url: "/wxomi2/wx2/home/home_checkMobileCode1.action",
				dataType: 'json',
				data: {
					mobileChkCode: checkNum
				},
				success: function(data) {
					console.log(data);
					sessionStorage.opStatus = data.opState;
					$('#telePhone').attr('class', 'phone zc-hidden');
					$('#newPhone').attr('class', 'phone')
				},
				error: function(data) {
					console.log(data);
				}
			});
			clearInterval(timer);

		} else {
			mui.toast('验证码错误')
		}

	}, false);
	//newPhone

	//newphon,发送验证码
	$('#newPhoneCheck').stop().get(0).addEventListener('tap', function() {
		var regPhone = $('#newPhoneNum').val();
		if(reg_phone.test(regPhone)) {
			console.log(regPhone);
			$.ajax({
				type: "get",
				url: "/wxomi2/wx2/home/home_checkMobile.action",
				data: {
					mobile: regPhone
				},
				dataType: 'json',
				success: function(data) {
					console.log(data);
					mui.toast(data.opInfo);
					sessionStorage.opStatus = data.opState;

					if(sessionStorage.opStatus == 'success') {
						clearInterval(timer);
						countDown('#newPhoneCheck');
						$.ajax({
							type: "get",
							url: "/wxomi2/wx2/home/home_sendMobileChkCode.action",
							data: {
								mobile: regPhone
							},
							dataType: 'json',
							success: function(data) {
								console.log(data);
								mui.toast(data.opInfo);
								sessionStorage.opStatus = data.opState;
							},
							error: function() {
								console.log('出错了');
							}
						});
					}
				},
				error: function() {
					console.log('出错了');
				}
			});
		} else {
			mui.toast('手机号输入错误');
		}
	}, false);
	//提交新验证码
	$('#subNewPhone')[0].addEventListener('tap', function() {
		if(sessionStorage.opStatus == 'success') {
			$.ajax({
				type: "get",
				url: "/wxomi2/wx2/home/home_checkMobileCode2.action",
				data: {
					mobileChkCode: $('#newCheckNum').val()
				},
				dataType: 'json',
				success: function(data) {
					console.log(data);
					mui.toast(data.opInfo);
					sessionStorage.opStatus = data.opState;
					//					$('#newPhone').attr('class', 'phone zc-hidden');
					//					$('#set').attr('class', 'set');
					if(data.opState == 'success') {
						window.location.reload(); //页面刷新
					}
				},
				error: function() {
					console.log('验证码错误');
				}
			});
		}
	}, false);
	//数据加载
	$.ajax({
		type: "get",
		beforeSend: function() {
			// mui.toast('加载中...');
		},
		dataType: 'json',
		url: "/wxomi2/wx2/home/home_personal.action",
		success: function(data) {
			console.log(data);
			//出生日期
			// console.log(data[0].dbirthday);
			var birthday = new Date().toLocaleDateString();
			// console.log(birthday);
			$('#dbirthday').html(birthday);
			//邮箱
			// console.log(data[0].demail);
			$('#demail').html(data[0].demail);
			//头像
			// console.log(data[0].dheadPortrait);
			$('#imgHeader').attr('src', '/wzomifiles/ftpfile'+ data[0].dheadPortrait);
			//手机号码
			// console.log(data[0].dmobile);
			$('#dmobile').html(data[0].dmobile);
			//真实姓名
			// console.log(data[0].dname);
			$('#dname').html(data[0].dname);

			//扣扣号

			// console.log(data[0].dqq);
			$('#dqq').html(data[0].dqq);
			// 性别
			console.log(data[0].dsex);
			if(data[0].dsex=='0'){
				$('#dsex').html('男');
			}else if(data[0].dsex=='1'){
				$('#dsex').html('女');
			}
			//用户名
			// console.log(data[0].duserName);
			$('#duserName').html(data[0].duserName);
			//本地保存列表
			sessionStorage.cityNo = data[0].cityNo;
			sessionStorage.coutyNo = data[0].countyNo;
			sessionStorage.didNumber = data[0].didNumber;
			sessionStorage.dshopAddress = data[0].dshopAddress;
			sessionStorage.dshopName = data[0].dshopName;
			sessionStorage.proviceNo = data[0].proviceNo;
			sessionStorage.dtownNo = data[0].townNo;
			sessionStorage.vcid = data[0].vcId;
		},
		error: function() {
			console.log('出错了');
		}

	});
	//

});