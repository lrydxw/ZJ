$(function() {
	//功能对象
	var objfun = transfar.Base.extend({
		//初始化
		initialize: function() {
			this.bid = getParamVal('bid') || 860;
			this.ispraised = 0;
//			alert(1)
			this.sourcecode = window.tf56 && window.tf56.getSourceCode&& window.tf56.getSourceCode();
//			alert(this.sourcecode);
			if (!this.bid) {
				alertMsg('id不可为空');
			}
			//用于详情
			this.initData();
			//app环境内不显示横幅
			if (window.tf56) {
				$('.bodtom-box').hide();
				$('.introduce').hide();
			}
		},
		//添加事件（基于委托，绑定动态加载元素）
		events: {
			'click #loadBtn': 'goload'
		},
		//自定义方法
		//demo方法 详情型
		initData: function() {
			var inputdate, title, content, countvisit, countpraise, param = {},
				_this = this; //_this方便callback中调用
			param.url = apiUrl.getBroadcastDetail;
			param.data = {
				'broadcastid': this.bid,
				'sourcecode': _this.sourcecode,
				'datasource': 'driverapp'
			}
			param.callback = function(data) {
				if (data.result != 'success') {
					alertMsg(data.msg);
					return;
				} else {
					flag = true;
					if (!data.data) {
						return;
					}

					inputdate = data.data.broadcast.publishdate;
					title = data.data.broadcast.title;
					content = data.data.broadcast.content;
					_this.ispraised = data.data.statistics.ispraised;
					$('.bd-tit').html(title);
					$('.nvtt').text(title);
					var $body = $('body');
					document.title = title;
					var ua = window.navigator.userAgent.toLowerCase();
					if (ua.match(/micromessenger/) || ua.match(/qq/)) {
						// hack在微信等webview中无法修改document.title的情况
						var $iframe = $('<iframe src="../../css/img/favicon.ico"></iframe>').on('load', function() {
							setTimeout(function() {
								$iframe.off('load').remove()
							}, 0)
						}).appendTo($body);
					}
					if (data.data.broadcast.publishdate) {
						$('.bd-time').html(data.data.broadcast.publishdate + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;陆鲸');
					}
					$('.bd-con').html(content);
					countvisit = data.data.statistics.views ? data.data.statistics.views : 0;
					countpraise = data.data.statistics.praises ? data.data.statistics.praises : 0;
					$('#countvisit').html('阅读 ' + countvisit);
					$('#countpraise').html(countpraise);
					if (_this.ispraised) {
						$('#zan').removeClass();
						$('#zan').addClass('zan_icon1');
					}
					_this.dopraise();
				}
			}
			param.errorCallback = function() {
				alertMsg(commonMsg.net_error);
			}
			getJsonp(param);
		},
		goload: function(e) {
			var domThis = $(e.currentTarget); //当前元素
			if (navigator.userAgent.match(/android/i)) {
				var loadDateTime = new Date();
				window.setTimeout(function() {
						var timeOutDateTime = new Date();
						if (timeOutDateTime - loadDateTime < 5000) {
							window.location.href = "http://e.lujing56.com/mobile.html?source=broadcast-" + getParamVal('bid');
						} else {
							window.close();
						}
					},
					25);
				window.location = 'lujingdriver.com://lujingdriver:8080';
			} else {
				window.location.href = "http://e.lujing56.com/mobile.html?source=broadcast-" + getParamVal('bid');
			}
		},
		dopraise: function() {
			var _this = this;
			if (window.tf56) {
				$('.zan_btn').on('click', function() {
					var param;
					if (!_this.ispraised) {
						param = {
							url: apiUrl.praise,
							data: {
								'broadcastid': _this.bid,
								'sourcecode': _this.sourcecode,
								'datasource': 'driverapp'
							},
							callback: function(data) {
								if (data.result != 'success') {
									alertMsg(data.msg);
									return;
								} else {
									if (!$('#zan').hasClass('zan_icon1')) {
										$('#zan').removeClass();
										$('#zan').addClass('zan_icon1');
										$('.zan_btn span').text($('.zan_btn span').text() / 1 + 1);
										_this.ispraised = 1;
									}
								}
							},
							errorCallback: function() {
								alertMsg(commonMsg.net_error);
                                
							}
						}
					} else {
						param = {
							url: apiUrl.unpraise,
							data: {
								'broadcastid': _this.bid,
								'sourcecode': _this.sourcecode,
								'datasource': 'driverapp'
							},
							callback: function(data) {
								if (data.result != 'success') {
									alertMsg(data.msg);
									return;
								} else {
									if (!$('#zan').hasClass('zan_icon')) {
										$('#zan').removeClass();
										$('#zan').addClass('zan_icon');
										$('.zan_btn span').text($('.zan_btn span').text() / 1 - 1);
										_this.ispraised = 0;
									}
								}
							},
							errorCallback: function() {
								alertMsg(commonMsg.net_error);
							}
						}
					}
					getJsonp(param);
				})
			}
		},
	})
	var obj = new objfun({
		$el: $('.body-content')
	});
})