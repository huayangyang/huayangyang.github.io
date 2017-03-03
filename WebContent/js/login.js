function click1 () {
		var username =$(".userName").val();
		var password =$(".mui-input-password").val();
		console.log(username);
		$.ajax({
			type:"get",
			//url:"/wxomi2/wx2/login/WX2Login_login.action",
			url:"../../json/login.json",
			async:true,

			dataType:"json",
//			data:{
//			
//			username:username,
//			password:password
//			
//			},

			

			data:{
			username:username,
			password:password
			
			},

			success:function(data){

			var user = data.emptyIdentifier.message
             console.log(data.emptyIdentifier.message);
             if (user==username) {
             	window.location.href='../../index.html';
             }else{
             alert("请输入正确的账号")
             }
            			
			}
		

		});
		
		  
	}