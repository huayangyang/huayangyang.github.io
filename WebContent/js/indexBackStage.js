//鼠标hover效果
function idHover1(el) {

	$(el).hover(function() {
		$(this).find('.backMask').attr('style', 'display: block;')
	}, function() {
		$(this).find('.backMask').attr('style', 'display: none;');
	});
};
$(function() {
	/**
	 * 隐藏所有的遮罩层
	 * */
	$(".backMask").attr('style', 'display: none;');
	/**
	 * 移进移出效果
	 * */
	idHover1('.backStage');
	$('.btnTitle').each(function(i, item) {
		item.addEventListener('tap', function(e) {
			e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
			var btnArray = ['<input style="opacity:0;width:100%;height:100%;position:absolute;left:0;" type=file />选择图片', '确定'];
			mui.prompt('', $('#dname').html(), 'URL', btnArray, function(e) {
				if(e.index == 1) {
					$('#dname').html(e.value);
				} else {
					console.log('你点了取消按钮')
				}
			})
		}, false);
	});
	//第一模块父模块删除
	$('#indexBackStage').on('click', '.clearBlock', function() {
		$(this).parent().parent().parent().remove();

	});
	//第一模块子模块删除
	$('#indexBackStage').on('click', '.clearChildItem1', function() {
		$(this).parent().parent().parent().parent().remove();

	});
	//增加第一父模块
	$('#indexBackStage').on('click', '.addBlock', function() {
		var str = '<div class="template">' +
			'<div class="cheap backStage">' +
			'<h3>—&nbsp;超实惠&nbsp;—</h3>' +
			'<div class="backMask">' +
			'<button type="button" class="left fixTitle"><i class="iconfont">&#xe62d;</i>修改标题</button>' +
			'<button class="clearBlock right" type="button"><i class="iconfont">&#xe61c;</i>删除模块</button>' +
			'</div>' +
			'</div>' +
			'<div class="cheap-wrap">' +
			'<div class="mui-row cheap-flex">' +
			'<div class="left">' +
			'<a href="#" class="backStage"><img class="" src="img/index/activity-left-1-194x104PX.jpg" />' +
			'<div class="backMask">' +
			'<button type="button" class="left fixChildPlateform"><i class="iconfont">&#xe62d;</i>修改</button>' +
			'<button type="button" class="right"><i class="iconfont">&#xe61c;</i>删除</button>' +
			'</div>' +
			'</a>' +
			'<a href="#" class="backStage"><img class="" src="img/index/activity-left-2-194x104PX.jpg" />' +
			'<div class="backMask">' +
			'<button type="button" class="left fixChildPlateform"><i class="iconfont">&#xe62d;</i>修改</button>' +
			'<button type="button" class="right"><i class="iconfont">&#xe61c;</i>删除</button>' +
			'</div>' +
			'</a>' +
			'</div>' +
			'<div class="right">' +
			'<a href="#" class="backStage"><img class="cheap-right-first" src="img/index/activity-right-max-194x213PX.jpg" />' +
			'<div class="backMask">' +
			'<button type="button" class="left fixChildPlateform"><i class="iconfont">&#xe62d;</i>修改</button>' +
			'<button type="button" class="right"><i class="iconfont">&#xe61c;</i>删除</button>' +
			'</div>' +
			'</a>' +
			'</div>' +
			'</div>' +
			'<div class="addItem1">' +
			'<button><i class="iconfont">&#xe62e;</i></button>' +
			'</div>' +
			'</div>' +
			'</div>';
		$(str).insertAfter('div.template:last');
		$(".backMask").attr('style', 'display: none;');
		idHover1('.backStage');
	});
	//增加第一子模块
	$('#indexBackStage').on('click', '.addItem1 button', function() {
		var str = '<div class="mui-row default">' +
			'<div class="left">' +
			'<a href="#" class="backStage"><img class="" src="img/index/activity-left-1-194x104PX.jpg" />' +
			'<div class="backMask">' +
			'<button type="button" class="left fixChildPlateform"><i class="iconfont">&#xe62d;</i>修改</button>' +
			'<button type="button" class="right clearChildItem1"><i class="iconfont">&#xe61c;</i>删除</button>' +
			'</div>' +
			'</a>' +
			'</div>' +
			'<div class="right">' +
			'<a href="#" class="backStage"><img class="cheap-left-last" src="img/index/activity-left-3-194x104PX.jpg" />' +
			'<div class="backMask">' +
			'<button type="button" class="left fixChildPlateform"><i class="iconfont">&#xe62d;</i>修改</button>' +
			'<button type="button" class="right clearChildItem1"><i class="iconfont">&#xe61c;</i>删除</button>' +
			'</div>' +
			'</a>' +
			'</div>' +
			'</div>'
		$(str).insertBefore($(this).parent('.addItem1'));
		idHover1('.backStage');
		$(".backMask").attr('style', 'display: none;');
	});
	//标题修改
	$('#indexBackStage').on('tap', '.fixTitle', function(e) {
		var thisObj = $(this);
		//			e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
		var btnArray = ['取消', '确定'];
		mui.confirm('<input type="text" id="title" placeholder="请输入标题" /><input type="text" id="color" value=' + thisObj.parent().parent().find("h3").css("color") + '/>', 'title/color', btnArray, function(e) {
			if(e.index == 1) {
				console.log('确定')
				thisObj.parent().parent().find('h3').attr('style', 'color: ' + $('#color').val() + ';').html('—&nbsp;' + $('#title').val() + '&nbsp;—');
			} else {
				console.log('取消')
			}
		})
	});
	//子模块修改
	$('#indexBackStage').on('click', '.fixChildPlateform', function(e) {
		var thisObj = $(this);
		//			e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
		var btnArray = ['取消', '确定'];
		mui.prompt('<button id="selectImg" style="position:relative;display:block;width:100%;height:26px;border: none;">请选择图片<input style="opacity:0;width:100%;height:100%;position:absolute;left:0;" type="file" id="upfile" name="upfile" /></button><img id="imgUrl" style="width: 100%;display:block;clear: both;" src="" />', '请输入URL', 'IMG AND URL', btnArray, function(e) {
			if(e.index == 1) {
				thisObj.parent().parent().find('img').attr('src', sessionStorage.previewUrl)
				return false;
			} else {
				console.log('你点了取消按钮');
			}
		})
	});
	//图片上传
	$(document).on('change', '#upfile', function() {
		$.ajaxFileUpload({
			url: '/wxomi2/pub/upload/UploadPhoto_ajaxSavePhoto.action',
			secureuri: false,
			fileElementId: 'upfile', //file控件id
			dataType: 'json',
			success: function(data) {
				console.log(data);
				$('#imgUrl').attr('src', data.item.url);
				sessionStorage.previewUrl = data.item.url;
			},
			error: function(data) {
				console.log("出错了");
			}
		});
		return false;
	});
	//修改标题颜色
	$(document).on('focus', '#color', function() {
		$('#color').bigColorpicker('#color', "L", 10);
	});
	//店铺推荐删除子模块
	$(document).on('click', '.clearChildItem3', function() {
		$(this).parent().parent().parent('.shopTj-ul').remove();
	});
	//店铺推荐添加子模块
	$('#indexBackStage').on('click', '.addItem3 button', function() {
		var str = '<ul class="shopTj-ul"><li class="backStage">' +
			'<a href="#">' +
			'<img class="" src="img/index/shop-title-192x80px-1.jpg">' +
			'<p class="shopTj-p1">幸福就是可以一起睡觉</p>' +
			'<p class="shopTj-p2">幸福就是可以一起睡觉</p>' +
			'</a>' +
			'<div class="backMask">' +
			'<button type="button" class="left"><i class="iconfont">&#xe62d;</i>修改</button>' +
			'<button type="button" class="right clearChildItem3"><i class="iconfont">&#xe61c;</i>删除</button>' +
			'</div>' +
			'</li>' +
			'<li class="backStage">' +
			'<a href="#">' +
			'<img class="" src="img/index/shop-title-192x80px-2.jpg">' +
			'<p class="shopTj-p1">幸福就是可以一起睡觉</p>' +
			'<p class="shopTj-p2">幸福就是可以一起睡觉</p>' +
			'</a>' +
			'<div class="backMask">' +
			'<button type="button" class="left"><i class="iconfont">&#xe62d;</i>修改</button>' +
			'<button type="button" class="right clearChildItem3"><i class="iconfont">&#xe61c;</i>删除</button>' +
			'</div>' +
			'</li></ul>';
		$(str).insertAfter($('.shopTj-ul:last'));
		idHover1('.backStage');
		$(".backMask").attr('style', 'display: none;');
	});
	//第二模块添加标题
	$('#indexBackStage').on('click', '.addTitle', function() {
		var thisObj = $(this);
		//			e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
		var btnArray = ['取消', '确定'];
		mui.confirm('<input type="text" id="title" placeholder="请输入标题" />', '小标题', btnArray, function(e) {
			if(e.index == 1) {\n
				
				console.log($('#title').val());
				var str = '<button class="btnList btnListHy">—&nbsp;' + $('#title').val() + '&nbsp;—' +
					'</button>';
				var str1 = '<ul class="newHot-list newHot-listHy zc-hidden">' +
					'<li class="newHot-li newHot-add">' +
					'<div class="mui-row addItem2">' +
					'<button><i class="iconfont">&#xe62e;</i></button>' +
					'</div>' +
					'</li>' +
					'</ul>';
				$(str).insertAfter($('.newHot .btnList:last'));
				$(str1).insertAfter($('.newHot .newHot-list:last'));
				idHover1('.backStage');
				$(".backMask").attr('style', 'display: none;');
			} else {
				console.log('取消')
			}
		});
	});
	//第二模块删除标题
	$(document).on('click', '.clearTitle', function() {
		$('.newHot .btnListHy:last').remove();
		$('.newHot .newHot-listHy:last').remove();
	});
	//第二模块子模块添加
	$('#indexBackStage').on('click', '.addItem2 button', function() {
		var str = '<li class="newHot-li backStage">' +
			'<a href="javascript:void(0);">' +
			'<img class="" src="img/index/porduct-100x100px.jpg">' +
			'<div class="">' +
			'<p class="newHot-p1">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>' +
			'<p class="newHot-p2">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>' +
			'</div>' +
			'</a>' +
			'<div class="backMask">' +
			'<button type="button" class="left fixChildPlateform2"><i class="iconfont">&#xe62d;</i>修改</button>' +
			'<button type="button" class="right clearChildItem2"><i class="iconfont">&#xe61c;</i>删除</button>' +
			'</div>' +
			'</li>';
		$(str).insertBefore($(this).parent().parent());
		idHover1('.backStage');
		$(".backMask").attr('style', 'display: none;');
	});
	//第二模块子模块删除
	$(document).on('click', '.clearChildItem2', function() {
		$(this).parent().parent().remove();
	});
	//第二模块tab切换
	$(document).on('click', '.btnList', function() {
		var index = $(this).index();
		console.log(index)
		$(this).addClass('isActive').siblings('.btnList').removeClass('isActive');
		$('.newHot .newHot-list').eq(index).removeClass('zc-hidden').siblings('.newHot-list').addClass('zc-hidden');
	});
	//数据保存
	$('#save1').on('click', function() {
		var str = $('#template1').html();
		console.log(str);
		$.ajax({
			type: "get",
			url: "/wxomi2/wx2/home/home_updatePersonalPir.action",
			dataType: 'json',
			data: {
				dheadPortrait: str
			},
			success: function(data) {
				console.log(data);
			},
			error: function() {
				console.log('请求失败');
			}
		});
		return false;
	});
	$('#save2').on('click', function() {
		var str = $('#template2').html();
		console.log(str);
		$.ajax({
			type: "get",
			url: "/wxomi2/wx2/home/home_updatePersonalPir.action",
			dataType: 'json',
			data: {
				dheadPortrait: str
			},
			success: function(data) {
				console.log(data);
			},
			error: function() {
				console.log('请求失败');
			}
		});
		return false;
	});
	$('#save3').on('click', function() {
		var str = $('#template3').html();
		console.log(str);
		$.ajax({
			type: "get",
			url: "/wxomi2/wx2/home/home_updatePersonalPir.action",
			dataType: 'json',
			data: {
				dheadPortrait: str
			},
			success: function(data) {
				console.log(data);
			},
			error: function() {
				console.log('请求失败');
			}
		});
		return false;
	});
});