define(function(){
	var user = {
		ele:$('.user_nav li'),
		user_main:$('.user_main'),
		run: function(){
			var self = this;
			this.ele.click(function(){
				var aleft = 0 - $(this).attr('id')*870;
				$(this).siblings().removeClass('here');
				$(this).addClass('here');
				self.user_main.animate({left:aleft},500);
			});
		}
	}

	return user;
});