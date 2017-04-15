$(function() {
	//常用链接
	$.ajax({
		type: "get",
		url: "json/suerLink.json",
		async: true,
		dataType: 'json',
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$('#userLink').append('<li>' +
					'<a target="_blank" href="' + data[i].url + '" class="tm-text-link">' + data[i].text + '</a>' +
					' </li>')
			}

		}
	});
	//博文列表-无详情
	$.ajax({
		type: "get",
		url: "json/wBlogList.json",
		async: true,
		dataType: 'json',
		success: function(data) {
			console.log(data)
			for(var i = 0; i < data.length; i++) {
				$('#wBlogList').append('<li>' +
					'<a data-id="' + data[i].id + '" href="blogDetail.html" class="tm-text-link">' + data[i].title + '</a>' +
					'</li>')
			}

		}
	});
	//生活列表-无详情
	$.ajax({
		type: "get",
		url: "json/wLifeList.json",
		async: true,
		dataType: 'json',
		success: function(data) {
			console.log(data);
			if(data.length > 3) {
				for(var i = 0; i < 3; i++) {
					$('#wLifeList').append('<div class="media tm-related-post">'+
												'<div class="media-left media-middle">'+
													'<a href="javascript:void(0)">'+
														'<img class="media-object" src="'+data[i].imgUrl+'" alt="Generic placeholder image">'+
													'</a>'+
												'</div>'+
												'<div class="media-body">'+
													'<a data-id="'+data[i].id+'" href="lifeDetail.html">'+
														'<h4 class="media-heading tm-gold-text tm-margin-b-15">'+data[i].title+'</h4></a>'+
													'<p class="tm-small-font tm-media-description">'+data[i].explain+'</p>'+
												'</div>'+
											'</div>')
				}
			} else {
				for(var i = 0; i < data.length; i++) {
					$('#wLifeList').append('<div class="media tm-related-post">'+
												'<div class="media-left media-middle">'+
													'<a href="javascript:void(0)">'+
														'<img class="media-object" src="'+data[i].imgUrl+'" alt="Generic placeholder image">'+
													'</a>'+
												'</div>'+
												'<div class="media-body">'+
													'<a data-id="'+data[i].id+'" href="lifeDetail.html">'+
														'<h4 class="media-heading tm-gold-text tm-margin-b-15">'+data[i].title+'</h4></a>'+
													'<p class="tm-small-font tm-media-description">'+data[i].explain+'</p>'+
												'</div>'+
											'</div>')
				}
			}

		}
	});

});