$(function() {
	//功能对象
	var objfun = transfar.Base.extend({
		//初始化
		initialize: function() {
			this.initData();
		},
		//添加事件（基于委托，绑定动态加载元素）
		events: {
			'click #J_top': 'loadNav',
			/*'click ul.menu>li': 'hideNav'*/
		},
		//自定义方法
		//demo方法 详情型
		initData: function() {

		},

		loadNav: function(e) {
			var domThis = $(e.currentTarget); //当前元素
			var $dis = $('div.nav');
			if ($dis.css('display', 'none')) {
				$dis.css('display', 'block');

			}

			e.stopPropagation();
		},
		/*hideNav: function(e) {
			var domThis = $(e.currentTarget);
			$('div.nav').css('display', 'none');
		}*/

	})
	$(document).click(function() {
		var wid = $(window).width();
		if (wid < 480) {
			$('div.nav').css('display', 'none');
		}
	})
	var obj = new objfun({
		$el: $('.body-content')
	});
})