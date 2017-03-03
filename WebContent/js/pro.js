$(function () {
	//测试
	$(".lunbo").mouseenter(function () {
		$.ajax({
			type:"get",
			url:"../../json/pro-lunbo.json",
			async:true,
			dataType:"json",
			
			success:function (data) {
				
				var abab = data.url1;
				
				$(".img-lb").attr("src",'../../img/'+abab+'.jpg')
				
			}
			
		});
	})
	
	$(".lunbo").mouseleave(function () {
		$(".img-lb").attr("src","../../img/prodownshop/product-414x250.jpg")
	})
	
	
	
	
 //店铺价钱的测试
 $.ajax({
			type:"get",
			url:"../../json/pro-shop.json",
			async:true,
			dataType:"json",
			
			success:function (data) {
				var price = data.productPrice;
				
				$(".price").html('￥'+price);
				
			}
			
		});
		
var str = '<a href="#">''<img src="../../img/index/shop-title-192x80px-1.jpg" />'
'<div><p class="proList-p1">'+朵朵雨+'</p><p class="proList-p2">'+河南省郑州市金水区轻工业学院+'</p><p class="proList-p3">''<span class="first price">'+￥725+'</span><span class="last">'+销量:163+'</span></p></div></a>'
		
	$(".add").append(str);
})