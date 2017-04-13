;
$(function() {
	//常用链接
	$.ajax({
		type: "get",
		url: "json/userLink/userLink.json",
		async: true,
		dataType: 'json',
		success: function(data) {
			var _len = data.length;
			for(var i = 0; i < _len; i++) {
				$('#userLink').append(' <li><a href="' + data[i].url + '" class="tm-text-link">' + data[i].text + '</a></li>')
			}
		}
	});
	
	
	//
	
	
	
	
});