$(function(){
	
	
	document.getElementById("confirmBtn").addEventListener('tap', function() {
		var btnArray = ['取消', '确认'];
		mui.confirm('您确定要移除么？', '提示', btnArray, function(e) {
			if (e.index == 1) {
				console.log('111')
			} else {
			console.log('222')
			}
		})
	});
	
	
	
	
	//点击－号
	$('.mui-btn-numbox-minus').each(function(i){
		$(this).on('tap',function(){
			var num = $('.mui-input-numbox').eq(i).val();
			if(num <= 1){
				num = 2;
			}
			$('.mui-input-numbox').eq(i).val(num);
		})
	})
})
