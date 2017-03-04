;
(function($) {
	$.fn.extend({
		'menu': function(pa, ch, left, top) {
			var timer = null;
			$(pa).hover(function() {
				$(ch).show();
			}, function() {
				timer = setTimeout(function() {
					$(ch).hide();
				}, 200);
			});
			$(ch).mousemove(function() {
				clearTimeout(timer);
				$(ch).stop().fadeIn();
			});
			$(ch).mouseout(function() {
				clearTimeout(timer);
				$(ch).stop().fadeOut();
			});
			$(ch).css({
				'left': left + 'px',
				'top': top + 'px'
			});
		},
		'fadetog': function(e1, e2) {
			$(e1).menu(e1, e2);
			$(e2).hover(function() {
				$(e1).css({
					background: '#C40000'
				});
			}, function() {
				$(e1).css({
					background: '#333333'
				});
			});
		},
		'topa':function(e1,e2){
			$(e1).hover(function(){
			$(e2).css({
				background:'white'
			});
		},function(){
			$(e2).css({
				background:'#F2F2F2'
			});
		});
		},
		'indexbar': function(el) {
			$(el).hover(function() {
				$(el + '>a:first-child').animate({
					top: '-37px'
				}, 300);
				$(el + '>a:last-child').animate({
					top: 0
				}, 300);
			}, function() {
				$(el + '>a:last-child').animate({
					top: '37px'
				}, 300);
				$(el + '>a:first-child').animate({
					top: 0
				}, 300);
			});
		}
	});
})(jQuery);