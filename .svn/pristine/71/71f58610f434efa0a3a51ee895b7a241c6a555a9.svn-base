/**
 * 
 * @authors tianyanrong
 * @date    2014-12-22
 * @version 
 */
;(function($) {
	var SelectGroup = function(options) {
		this.options = options;
		this.value = options.value || ['', '', ''];
		this.$target = options.$target;
		this.$bodyCove = $('<div class="form_selects_body_cove"></div>');
		this.$el = $('<div class="form_selects" style="display:none;"></div>');
		this.$title = $('<div class="form_selects_title"></div>');
		this.$container = $('<div class="form_selects_container"></div>');
		this.$content = $('<div class="form_selects_content"></div>');
		this.$cover = $('<div class="form_selects_cover"></div>');
		this.$select = $('<div class="form_selects_select"><p>:</p><span>到</span><p>:</p></div>');
		this.$move = $('<div class="form_selects_move"></div>');
		this.$submit = $('<a class="btn_submit" href="javascript:void(0);">完成</a>');
		this.$rows = [];
		
		this.width = document.body.clientWidth;
		this.isShow = false;
		this.buildTemplate();
		this.bindEvents();
		this.render();

		this.isFocus = false;
		var _this = this;
		$('input').focus(function() {
			_this.isFocus = true;
		});
		$('input').blur(function() {
			setTimeout(function() {
				_this.isFocus = false;
			}, 1000);
			
		});
	};
	SelectGroup.extend = function(source) {
		var parent = this;
		var child = function(){
			return parent.apply(this, arguments);
		}
		var Surrogate = function(){
			this.constructor = child;
		};
    	Surrogate.prototype = parent.prototype;
    	child.prototype = new Surrogate;

    	var key;
		for(key in source) {
			child.prototype[key] = source[key];
		}

		child.__super__ = parent.prototype;
		return child;
	};
	SelectGroup.prototype = {
		rowLength: 1,
		isBindChange: false,
		render: function(data) {
					
		},
		bindChange: function() {

		},
		getEventNames: function() {

		},
		bindEvents: function() {
			var _this = this;

			this.bindMove();

			this.$submit.bind('touchstart', function() {
				_this.close();
			});
			this.$bodyCove.bind('touchstart', function() {
				_this.close();
			});
			this.$target.bind('touchstart ', function() {
				_this.show();
			});
		},
		bindMove: function() {
			var _this = this;
			var $activeUl;
			var startY;
			var activeStartY;
			var maxHeight;
			var startFn = function(event) {
				var offset = _this.getClient(event);
				$activeUl = _this.getActiveUl(offset.x);
				if(!$activeUl) {
					return;
				}

				_this.thenTop = _this.$select.offset().top;
				_this.thenHeight = _this.$select.height()/2;
				maxHeight = $activeUl.height() - _this.$move.height();
				startY = offset.y;
				activeStartY = parseInt($activeUl.css('top'), 10);
			};
			var moveFn = function(event) {
				if(!$activeUl) {
					return;
				}
				var offset = _this.getClient(event);
				var top = activeStartY  - (startY-offset.y);
				if(top > 0) {
					top = 0;
				}
				else if(top < -maxHeight) {
					top = -maxHeight;
				}
				$activeUl.css({
					'top': top + 'px'
				})
				window.event.preventDefault();
				event.stopPropagation();
				_this.setActive($activeUl);
			};
			var endFn = function(event) {
				if(!$activeUl) {
					return;
				}

				var data = _this.setActive($activeUl, true);

				if(!data.id) {
					var rowId = $activeUl.parents('div').attr('row_id');
					data = _this.value[rowId];
					var $active = $activeUl.find('li[value="'+data.id+'"]');
					$active.addClass('active');
					data.top = _this.getTopValue($active);
				}

				$activeUl.css({
					'top': parseInt($activeUl.css('top'), 10) + data.top + 'px'
				});				
				_this.triggerChange($activeUl.parent(), data);
				
			};
			this.$move.bind('touchstart', startFn);
			//this.$move.bind('mousedown', startFn);
			this.$move.bind('touchmove', moveFn);
			//this.$move.bind('mousemove', moveFn);
			this.$move.bind('touchend', endFn);
			//this.$move.bind('mouseup', endFn);

			this.$title.bind('touchmove', function() {
				window.event.preventDefault();
				event.stopPropagation();
			});
		},
		getClient: function(event) {
			if(event.touches && event.touches[0]) {
				return {
					x: event.touches[0].clientX,
					y: event.touches[0].clientY
				};
			}
			else{
				return {
					x: event.pageX,
					y: event.pageY
				};
			}
		},
		getActiveUl: function(x) {
			var $activeUl;
			this.$content.find('ul').each(function() {
				var startX = $(this).offset().left;
				var endX = startX + $(this).width();
				if(startX < x && endX > x) {
					$activeUl = $(this);
					return;
				}
			})
			return $activeUl;
		},

		setDefaultActive: function($content, selectId) {
			var data;
			this.thenTop = this.thenTop || this.$select.offset().top;
			var $ul = $content.find('ul');
			var $lis = $ul.find('li');
			var $active;
			if(selectId) {
				$active = $ul.find('li[value="'+selectId+'"]');
				if($active && $active.length) {
					$ul.css({
						top: - ($active.offset().top - this.thenTop) + 'px'
					});
				}
				else{
					$active = $lis.eq(0);
				}				
			}
			else {
				$active = $lis.eq(0);
			}
			$lis.removeClass('active');
			$active.addClass('active');

			return {
				id: $active.attr('value'),
				name: $active.html()
			}
		},

		//
		setDefaultActives: function() {
			var i, k, $active, data;
			for(i = 0, k = this.$rows.length; i < k; i++) {
				$active = this.$rows[i].find('li.active');
				if($active && $active.length) {
					return false;
				}

				if(this.value[i] && this.value[i].id) {
					data = this.setDefaultActive(this.$rows[i], this.value[i].id);
				}
				else {
					data = this.setDefaultActive(this.$rows[i]);
				}
				this.triggerChange(this.$rows[i], data);
			}
		},
		getTopValue: function($active) {
			this.thenTop = this.thenTop || this.$select.offset().top;
			var liTop = $active.offset().top;
			var top;
			if(liTop < this.thenTop) {
				top = this.thenTop - liTop;
			}
			else {
				top = this.thenTop - liTop;
			}
			return top;
		},
		setActive: function($content, isGetData, selectId) {
			var rowId = parseInt($content.parent('div').attr('row_id'), 10);
			var _this = this;
			this.thenTop = this.thenTop || this.$select.offset().top;
			this.thenHeight = this.thenHeight || this.$select.height()/2;
			var $lis = $content.find('li');
			var liTop;
			var top, select_id, select_name;
			var is_has_active = false;
			$lis.removeClass('active');
			$lis.each(function() {
				if(is_has_active) {
					return;
				}
				liTop = $(this).offset().top;

				if(liTop < (_this.thenTop + _this.thenHeight) && liTop > (_this.thenTop-_this.thenHeight)) {
					is_has_active = true;
					$(this).addClass('active');
					if(isGetData) {
						select_id = $(this).attr('value');
						select_name = $(this).html();
						top = _this.getTopValue($(this));
					}
					return;
				}
			})
			if(select_id) {
				this.value[rowId] = {
					top: top,
					id: select_id,
					name: select_name
				}
			}
			return {
				top: top,
				id: select_id,
				name: select_name
			};
		},
		buildTemplate: function() {
			this.$el.append(this.$title);
			this.$el.append(this.$container);			
			this.$title.append(this.$submit);
			this.$title.append('<p>开始</p><p>结束</p>');
			
			
			this.$container.append(this.$content);
			this.$content.addClass("form_selects_"+this.rowLength);
			$('body').append(this.$bodyCove);
			$('body').append(this.$el);

			this.$container.append(this.$cover);
			this.$container.append(this.$select);
			this.$container.append(this.$move);
			var i;
			for(i = 0; i < this.rowLength; i++) {
				this.$rows.push($('<div row_id="'+i+'"></div>'));
				this.$content.append(this.$rows[i]);
			}

		},
		triggerChange:function($active, data) {
			var rowId = $active.attr('row_id');
			this.value[rowId] = {
				id: data.id,
				name: data.name
			}

			if(this.isBindChange) {
				this.bindChange(rowId, data.id, data.name);
			}
		},
		buildOption: function(data, $ul) {
			if(!data || !$ul) {
				return;
			}
			var i, k;
			var li = ''
			for(i = 0, k = data.length; i < k; i++) {
				li += '<li value="'+data[i].id+'">'+data[i].name+'</li>';
			}
			$ul.html('<ul>'+li+'</ul>');
		},
		show: function() {
			if(this.isFocus) {
				$('input').blur();
				return;
			}
			var isDisabled = this.getDisabled();
			if(isDisabled) {
				return;
			}
			this.isShow = true;
			this.$el.css({
				display: 'block'
			});
			var _this = this;
			setTimeout(function() {
				_this.$el.addClass('form_selects_show');
			}, 0)
			
			this.$target.addClass('input_show');			
			
			this.setDefaultActives();
			this.$bodyCove.css({
				display: 'block'
			});
		},
		close: function() {
			this.isShow = false;
			this.$el.removeClass('form_selects_show');
			this.$target.removeClass('input_show');
			var _this = this;
			setTimeout(function() {
				_this.$el.css({
					display: 'none'
				});
			}, 500)
			this.$bodyCove.css({
				display: 'none'
			});
		},
		getDisabled: function() {
			return false;
		}
	};


	window.SelectGroup = SelectGroup;
	
})(Zepto);