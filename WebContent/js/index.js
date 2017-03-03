$(function() {
	mui.init();
	$('#goHome').get(0).addEventListener('tap', function() {
		goUrl('index.html');
	});
	$('#chart')[0].addEventListener('tap', function() {
		goUrl('html/buy/order.html');
	});
	$('#personCenter')[0].addEventListener('tap', function() {
		if(localStorage.logined == 'true' && localStorage.userType == 'buy') {
			goUrl('html/center/center.html');
		} else if(localStorage.logined == 'true' && localStorage.userType == 'proxy') {
			goUrl('html/center/agentCenter.html');
		} else {
			goUrl('html/user/commonLogin.html');
		}
	});
	var cityData3=[{}];

	$.ajax({
		type: "get",
		url: "/wxomi2/wx2/main/QueryCondition_getCollegeTree.action",
		async: true,
		dataType: 'json',
		success: function(data) {
			console.log(data)
			cityData3[0].value=data.value;
			cityData3[0].text=data.text;
			cityData3[0].children=data.children;
		}
	});
	console.log(cityData3);

	//级联示例
	var cityPicker3 = new mui.PopPicker({
		layer: 3
	});
	cityPicker3.setData(cityData3);
	var showCityPickerButton = document.getElementById('showCityPicker3');
	//				var cityResult3 = doc.getElementById('cityResult3');
	showCityPickerButton.addEventListener('tap', function(event) {
		cityPicker3.show(function(items) {
			console.log("你选择的城市是:" + (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text)
				//							cityResult3.innerText = "你选择的城市是:" + (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
				//返回 false 可以阻止选择框的关闭
				//return false;
		});
	}, false);

});