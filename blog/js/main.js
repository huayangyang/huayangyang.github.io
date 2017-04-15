$(function(){
	$.ajax({
		type:"get",
		url:"json/suerLink.json",
		async:true,
		dataType:'json',
		success:function(data){
			for(var i=0;i<data.length;i++){
				$('#userLink').append('<li>'+
									'<a target="_blank" href="'+data[i].url+'" class="tm-text-link">'+data[i].text+'</a>'+
								 ' </li>')
			}
			
		}
	});
	
});