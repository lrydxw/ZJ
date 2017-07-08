/**
 * 
 * @authors tianyanrong
 * @date    2014-12-22
 * @version 
 */
;(function($) {
	var DateSelectGroup = window.SelectGroup.extend({
		rowLength: 4,
		isBindChange: true,
		getDefaultValue: function() {
			var defaultValue = this.options.$value.attr('value') || '';
			if(defaultValue) {
				defaultValue = defaultValue.split(/\D+/g);
				var values = [], value;
				var i, k;
				for(i = 0, k = defaultValue.length; i < k; i++) {
					value = parseInt(defaultValue[i], 10);
					value = value < 10 ? '0' + value : value;
					values.push({
						id: value,
						name: value
					});
				}
				this.options.value = values;
				this.value = values;
			}
		},
		render: function() {
			this.getDefaultValue();
			var now = new Date();

			var hourData = [],hour;
			var i, k;
			for(i = 0; i <= 23; i++) {
				hour = i < 10 ? '0' + i : i;
				hourData.push({
					id: hour,
					name: hour
				});
			}
			var minData = [], min;
			for(i = 0; i <= 59; i++) {
				min = i < 10 ? '0' + i : i;
				minData.push({
					id: min,
					name: min
				});
			}

			this.buildOption(hourData, this.$rows[0]);
			this.buildOption(minData, this.$rows[1]);

			this.buildOption(hourData, this.$rows[2]);
			this.buildOption(minData, this.$rows[3]);
		},
		getData: function(data, id) {
			var newData, i, k;
			for(i = 0, k = data.length; i < k; i++) {
				if(data[i].id === id) {
					newData = data[i].list;
				}
			}
			return newData
		},
		bindChange: function(rowId, id, name) {
			if(this.value && this.value[2] && this.value[2].name) {
				var value = this.value[0].name + ':' + this.value[1].name + '-' + this.value[2].name+ ':' +this.value[3].name;
				this.$target.html(value);
				this.options.$value.text(value);
				this.options.$value.attr('value', value);
			}
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
			//调用安卓方法开启方法
			openGoodsVoice('true',this.value[0].name + ':' + this.value[1].name,this.value[2].name+ ':' +this.value[3].name);
		},
		getDisabled: function() {
			isDisabled = this.options.$value.attr('disabled') || this.options.$value.attr('readonly');
			if(isDisabled && 'false' !== isDisabled) {
				return true;
			}
			else {
				return false;
			}
		}
	});
	
	$.fn.dateGroup = function() {
		var selectGroup = new DateSelectGroup({
			$target: $(this),
			$value: $(this),
			value: ["","","",""]
		});
	}
	
	$(document).ready(function() {
		$('[data-role="dateGroup"]').dateGroup();
	});
	
})(Zepto);