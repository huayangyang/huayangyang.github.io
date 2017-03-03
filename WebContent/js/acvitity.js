$(function () {
	$("#active li").click(function () {
	
	
	$(this).click(function () {
		//点击的时候发送ajax请求
		$.ajax({
			type:"get",
			//url:"/wxomi2/wx2/login/WX2Login_login.action",
			url:"../../json/pro-down.json",
			async:true,

			dataType:"json",
//			data:{
//			
//			productId:productId,
//			password:password
//			
//			},

			
			success:function(data){
            console.log(data.emptyIdentifier);

			
			}
		

		});
		
		
		
		
	})
	
//		window.location.href ="../buy/pro-down-shop.html"; 
	})
	
	
	
	
})

