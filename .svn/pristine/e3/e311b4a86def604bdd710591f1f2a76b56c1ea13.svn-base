/**
 * 
 * @authors tianyanrong
 * @date    2014-11-14
 * @example run: $(dom).ngRender(data);
 * 				 $(dom).ngRender('update', {});
 * @example html[ng-bind]: <div ng-bind="user_name"></div>
 * @example html[ng-src]: <img ng-src="img_src">
 * @example html[ng-href]: <a ng-href="item_href"></a>
 * @example html[ng-show]: <div ng-show="is_show"></div> || <div ng-show="!is_show"></div>
 * @example html[ng-repeat]: <ul><li ng-repeat="item in items"><span ng-bind="item.name"></span></li></ul>
 * @example html[ng-checked]: <input type="radio" ng-clecked="data.is_checked">
 * @example html[ng-model]: <input type="text" ng-model="form_data.name">
 * @example html[ng-class]: <input type="text" ng-class="{is_active: data.name, ...}">
 * @version 
 */
;(function($) {
	var NgRender = function(options) {
		this.$el = options.$el;
		this.data = {};
		this.initialize(options);
	};

	NgRender.prototype = {
		initialize: function(options) {
			this.bindEvents = {};
			this.ngElements = [];
			this.ngElements = this.getNgElements(this.$el);

			this.bindNgModelEvent('keyup');
			this.bindNgModelEvent('change');
			
		},

		getContainer: function() {
			return this.$el;
		},

		ngTypes: [
			'ng-repeat',
			'ng-bind',
			'ng-src',
			'ng-href',
			'ng-model',
			'ng-checked',
			'ng-show',
			'ng-class'
		],

		//获得元素的缓存，并把ngData数据绑定到当前元素的data中
		//ngData = {
		//	$el: "当前元素对像", 
		//	$parent: "当前元素父元素对像",
		//	scope: "当前作用范围数据",
		//	parentScope: "父作用范围数据",
		//	types: "ng属性的集合",
		//	index: 如果它是数组遍利的话，index表示在数组的位置
		//}
		getNgElements: function($parent) {
			var $els,
				$el,
				typeValue,
				ngElements = [],
				options,
				types;
	
			this.each(this.ngTypes, function(type, index) {

				$els = $parent.find('['+type+']');
				if('ng-repeat' === type) {
					$els.each(function(index) {
						if($(this).parents('[ng-repeat]').length) {
							$els.splice(index, 1);
						}
					})
				}
				$els.each(function() {
					$el = $(this);
					typeValue = $el.attr(type);
					typeValue = typeValue.replace(/(^\s+)|(\s+$)/g,"");

					types = $el.data('ngData') && $el.data('ngData').types ? $el.data('ngData').types : {};
					types[type] = typeValue;

					options = {
						$el: $el,
						$parent: $el.parent(),
						types: types,
						//type: type,
						//typeValue: typeValue,
						scope: null,
						parentScope: null,
						repeatNodes: []
					};
					$el.data('ngData', options);
					ngElements.push($el);
					$el.addClass(type);

					this.removeAttribute(type);
					if('ng-repeat' === type) {
						$el[0].style.display = '';
						$el[0].parentNode.removeChild($el[0]);
					}
				});
			});
			return ngElements;
		},		

		//渲染
		//data: 替换全局作用范围的数据
		render: function(data) {
			this.data = data;
			this.$el.data('ngData', {
				scope: this.data
			});
			this.renderNg(this.ngElements, data);
		},

		//重新渲染
		//data: 根据字段替换全局作用范围的相对字段的值
		update: function(data) {
			data = data || this.data;
			var key;
			for(key in data) {
				this.data[key] = data[key];
			}
			this.renderNg(this.ngElements, this.data);
		},

		//ngModel值发生变化时重新渲染当前作用范围
		updateScope: function(options, key) {
			var $el = options.$el;
			var scope = options.scope;
			var ngData = $el.data('ngData');
			key = key || ngData.types['ng-model'];
			this.updateScopeValue(key, ngData.parentScope, scope);
			this.renderNg(this.ngElements, this.data);
		},
		
		getKeys: function(keys, scopeData) {
			var subKey,
				sub,
				_this = this;
			sub = keys.match(/\[.*\]/);
			if(sub) {
				keys = keys.replace(/\[.*\]/, function(value) {
					value = value.replace('[', '');
					value = value.replace(']', '');
					subKey = parseInt(value, 10);
					if(!subKey && subKey !== 0) {
						subKey = _this.getScopeData(value, scopeData);
					}
					return '.'+subKey;
				});
			}	
			keys = keys.replace(/(^\s+)|(\s+$)/g,"");
			
			keys = keys.indexOf('.') ? keys.split('.') : [keys];
			this.each(keys, function(key, index) {
				keys[index] = Number(key) == key ? Number(key) : key;
			});
			return keys;
		},

		//更新作用范围里的数据
		updateScopeValue: function(keys, data, updateData) {
			if(!keys || !data) {
				return;
			}
			keys = this.getKeys(keys, data);	
			var i, k;
			var scopeData = data || this.data;
			for(i = 0, k = keys.length - 1; i < k; i++) {
				scopeData = scopeData[keys[i]];
			}
			scopeData[keys[keys.length - 1]] = updateData;
		},

		//获取数据
		//keys: ng属性的值，例：data.user_name || data.items.length
		//scopeData: 作用范围的数据
		getScopeData: function(keys, scopeData) {
			if(!keys || !scopeData) {
				return;
			}
			var i, k, isLength;
			var data = scopeData,
				subKey,
				sub,
				_this = this;
				
			keys = this.getKeys(keys, scopeData);
			
			for(i = 0, k = keys.length; i < k; i++) {
				if(data) {
					data = data[keys[i]];
				}
				else {
					data = '';
				}
			}

			return data;
		},

		//验证比较等表达示
		getValidate: function(values, scopeData) {
			values = values.replace(/(^\s+)|(\s+$)/g,"");
			var is_has_value, data, isValid = false, type = '';
			
			var operator = values.match(/\s*==|>|<\s*/);

			if(operator) {
				values = values.split(/\s*==|>|<\s*/);
				this.each(values, function(value, index) {
					if(!is_has_value) {
						if(value.match(/^\w+$/) || 
							(value.match(/\./) && value.match(/\w/))) {
							data = this.getScopeData(value, scopeData);
							if(data || data === undefined || data === 0) {
								if(data === undefined) {
									data = '';
								}
								if('string' === typeof data) {
									data = "'"+data+"'";
								}
								values[index] = data;
								is_has_value = true;
							}
						}
					}
				});
				values = values.join(operator[0]);
				isValid = eval(values);
				type = 'operator';
			}
			else if(values.match(/^\!/)) {
				data = this.getScopeData(values.replace('!', ''), scopeData);
				if(!data) {
					isValid = true;
				}
				type = '!';
			}
			else if(values.match(/^\w/)) {
				data = this.getScopeData(values.replace('!', ''), scopeData);
				if(data) {
					isValid = true;
				}
				type = 'has';
			}
			return {
				isValid: isValid,
				type: type,
				data: data
			}
		},

		renderNgShow: function(ngData, scopeData) {
			var data;
			var values = ngData.types['ng-show'];
			isShow = false;
			isShow = this.getValidate(values, scopeData).isValid;
			if(isShow) {
				ngData.$el[0].style.display = '';
			}
			else {
				ngData.$el[0].style.display = 'none';
			}
		},

		//判断值是否相同
		isDifferentValue: function(cacheData, data) {
			var isDifferentDate = false;
			if(data !== null && data !== undefined) {
				if(cacheData !== data) {
					isDifferentDate = true;
				}
			}
			return isDifferentDate;
		},

		//渲染DOM元素非ng-的属性，如id="item_{{index}}"
		renderAttributes: function(ngData, scopeData) {
			var el = ngData.$el[0];
			var attributes = el.attributes,
				name,
				value,
				newValue,
				scope,
				index = ngData.index,
				_this = this;
			scopeData = ngData.parentScope || scopeData;
			
			this.each(attributes, function(item) {
				value = item.value;
				name = item.name;
				if(value.match(/\{\{(\.|\w)+\}\}/g) && name.indexOf('ng-') < 0) {
					newValue = value.replace(/\{\{(\.|\w)+\}\}/g, function(key) {
						key = key.replace('{{', '');
						key = key.replace('}}', '');
						if('index' === key) {
							scope = index;
						}
						else {
							scope = _this.getScopeData(key, scopeData) || '';
						}
						return scope.toString();
					});
					el.setAttribute(name, newValue)
				}
			});
		},

		renderNg: function(ngElements, scopeData, $index) {
			this.$el.trigger('ngRender', scopeData);
			var _this = this,
			$el,
			key,
			data,
			ngData,
			type,
			typeValue,
			isValid;
			this.each(ngElements, function(item, index) {
				ngData = item.data('ngData');
				ngData.parentScope = scopeData;
				$el = ngData.$el;
				ngData.index = $index;

				this.renderAttributes(ngData);

				for(key in ngData.types) {
					type = key;
					typeValue = ngData.types[key];
					switch(key) {
					case 'ng-bind':
						data = _this.getScopeData(typeValue, scopeData);
						if(this.isDifferentValue(ngData.scope, data)) {
							ngData.scope = data;
							$el.html(data);
						}				
						break;
					case 'ng-src':
					case 'ng-href':
					case 'ng-data':
						data = _this.getScopeData(typeValue, scopeData);
						if(this.isDifferentValue(ngData.scope, data)) {
							ngData.scope = data;
							$el.attr(type.replace('ng-', ''), data);
						}
						break;
					case 'ng-class':
						_this.renderNgClass(ngData, scopeData);
						break;
					case 'ng-checked':
						isValid = this.getValidate(typeValue, scopeData).isValid;
						$el.attr('checked', isValid);
						break;
					case 'ng-model':
						data = _this.getScopeData(typeValue, scopeData);
						if(this.isDifferentValue(ngData.scope, data)) {
							ngData.scope = data;
							$el.val(data);
						}
						break;
					case 'ng-repeat':
						_this.renderNgRepeat(ngData, scopeData);
						break;
					case 'ng-show':
						_this.renderNgShow(ngData, scopeData);
						break;
					}
				}		
				
			})
		},

		renderNgClass: function(ngData, scopeData) {
			var typeValue = ngData.types['ng-class'],
				items,
				_this = this,
				isValid;
			var typeValues = typeValue.replace('{', '');
			typeValues = typeValues.replace('}', '');
			if(typeValues.indexOf(',') > 0) {
				typeValues = typeValues.split(',');
			}
			else {
				typeValues = [typeValues];
			}
			this.each(typeValues, function(item, index) {
				items = item.split(':');
				isValid = this.getValidate(items[1], scopeData).isValid
				if(isValid) {
					ngData.$el.addClass(items[0].replace(/(^\s+)|(\s+$)/g,""));
				}
				else {
					ngData.$el.removeClass(items[0].replace(/(^\s+)|(\s+$)/g,""));
				}
			});
		},

		renderNgRepeat: function(ngData, data) {
			var scopeData,
				subNgElement,
				$clone,
				differentArray = [],
				i,
				options,
				typeValues,
				newTypes,
				key;
			var $el = ngData.$el;
			var typeValue = ngData.types['ng-repeat'];
			typeValues = typeValue.split(/\s+in\s+/);

			var repeatsData = this.getScopeData(typeValues[1], data);
			ngData.scope = repeatsData;

			var cacheDataLength = ngData.repeatNodes ? ngData.repeatNodes.length : 0;
			var repeatsDataLength = repeatsData ? repeatsData.length : 0;
			if(repeatsDataLength < cacheDataLength) {
				this.each(ngData.repeatNodes, function(item, index) {
					if(index >= repeatsDataLength) {
						item.$el.remove();
					}					
				});
				ngData.repeatNodes.splice(repeatsDataLength, cacheDataLength - repeatsDataLength);
			};

			ngData.ngElements = [];
			this.each(repeatsData, function(itemData, index) {
				$clone = ngData.repeatNodes[index] ? ngData.repeatNodes[index].$el : null;
				if(!$clone) {
					$clone = $el.clone();
					ngData.$parent.append($clone);
					cloneNgData = this.getNgElements($clone);

					ngData.repeatNodes.push({
						$el: $clone,
						ngElements: cloneNgData
					});					
				}
				else {
					cloneNgData = ngData.repeatNodes[index].ngElements;
				}

				//给复制的元素绑定他的NG属性
				newTypes = {};
				for(key in ngData.types) {
					if(key !== 'ng-repeat') {
						newTypes[key] = ngData.types[key];
					}
				}
				options = {
					$el: $clone,
					$parent: $clone.parent(),
					types: newTypes,
					scope: itemData,
					parentScope: repeatsData,
					repeatNodes: [],
					index: index
				}
				$clone.data('ngData', options);

				scopeData = {};
				scopeData[typeValues[0]] = itemData;
				
				this.renderNg(cloneNgData, scopeData, index);
			});	
		},

		each: function(data, fn) {
			if(!data) {
				return;
			}
			var i, k;
			for(i = 0, k = data.length; i < k; i++) {
				fn.call(this, data[i], i);
			}
		},

		//对ngModel的事件绑定
		bindNgModelEvent: function(eventName) {
			var _this = this;
			this.$el.delegate('.ng-model', eventName, function() {
				var value = '';
				if(this.type === 'checkbox') {
					if(this.checked) {
						value = 'on';
					}
					else {
						value = '';
					}
				}
				else {
					var value = $(this).val();
				}
				_this.updateScope({
					$el: $(this),
					scope: value
				});
			});
		}
	};
	
	/**
	 * @options method:
	 * render--
	*/
	$.fn.ngRender = function(method, data) {
		var objectCache, $el = $(this);

		if('object' === typeof method && !data) {
			data = method;
			method = 'render';
		}		
		
		if(!$(this).data('ngRender')) {
			objectCache = new NgRender({
				$el: $el
			});
			$el.data('ngRender', objectCache)
		}

		$el.data('ngRender')[method](data);
	}
})(Zepto);