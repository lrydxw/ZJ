/**
 * 
 * @authors tianyanrong
 * @date    2015-08-06
 * @param $el 分页组件显示在此DOM下
 * @event turn-on
 * @version 
 */
;(function($) {
	window.transfar = window.transfar || {};
	var ScrollLoading = transfar.Base.extend({
		initialize: function(options) {
			this.$el = options.$el||$(document);
			this.bindEvents = {};
			this.minHeight = 40;
			this.type = options.type;
			this.$loading = this.render(this.type);

			this.bindScrollEvent();			

			var _this = this;
			this.bind('turn', function(status) {
				switch(status) {
					case 'on':
						_this.showLoading(false);
						_this.bindScrollEvent();
						break;
					case 'off':						
						_this.showLoading(false);
						break;						
				}				
			});			
		},

		render: function(type) {
			var $loading = $(this.getTemplate());
			switch(type) {
				case 'BOTTOM':
					$('body').append($loading);
					break;
				case 'TOP':
					$('body').prepend($loading);
					break;
			}			
			return $loading;
		},

		bindScrollEvent: function() {
			var _this = this;

			this.$el.bind('touchmove', function(e) {
				_this.triggerScrollEvent(e);
			});/*
			this.$el.bind('scroll', function(e) {
				_this.triggerScrollEvent(e);
			});*/
		},

		triggerScrollEvent: function(e) {
			if(this.type === 'BOTTOM') {
				this.scrollBottom(e);
			}
			else if(this.type === 'TOP') {
				this.scrollTop(e);
			}
			else {
				this.scrollBottom(e);
				this.scrollTop(e);
			}			
		},

		unbindScrollEvent: function() {
			this.$el.unbind('touchmove');
			//this.$el.unbind('scroll');
		},

		scrollTop: function(e) {
			
			if(window.scrollY === 0) {
				this.unbindScrollEvent();
				this.showLoading(true);
				this.trigger('fetch', 'TOP');
			}
		},

		scrollBottom: function(e) {
			var height = document.body.clientHeight, //页面总高度
				viewHeight = window.scrollY+window.screen.height; //页面已显示的高度 

			if(this.minHeight > (height-viewHeight)){
				this.unbindScrollEvent();
				this.showLoading(true);
				this.trigger('fetch', 'BOTTOM');
			}
		},

		getTemplate: function() {
			return '<div class="wg-scrollLoading" style="display:none;"><i></i><span>正在加载...</span></div>';
		},

		showLoading: function(isShow) {
			if(isShow) {
				this.$loading.css('display', '');
			}
			else {
				this.$loading.css('display', 'none');
			}
			
		}
	});

	transfar.ScrollLoading = ScrollLoading;
})(Zepto);