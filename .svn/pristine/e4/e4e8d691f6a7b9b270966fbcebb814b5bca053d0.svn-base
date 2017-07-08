$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	        this.bid = getParamVal('contactrichmediaid');
	        this.platform = getParamVal('platform');
	        this.contactadvertid = '';
	        if(!this.bid){
	        	alertMsg('id不可为空');
	        }
	        //用于详情
	        this.initData();
	        //app环境内不显示横幅
			if(window.tf56){
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
	    initData:function(){
	    	var inputdate, title, content, countvisit, countpraise, param = {},
				_this = this; //_this方便callback中调用
		    param.url = apiUrl.getRichMediaById;
			var extra_role = getParamVal('extra_role')||''
			var extra_os = getParamVal('extra_os')||''
			param.data ={
			    	'app_stoken':app_stoken||'',
			    	'contactrichmediaid':this.bid,
			    	'platform':this.platform ||'',
				'extra_os': extra_os,
				'extra_role': extra_role
		    }

		    param.callback = function(data){
		    	if (data.result != 'success') {
					alertMsg(data.msg);
					return;
				} else {
					flag = true;
					if (!data.data) {
						return;
					}
		        	_this.contactadvertid = data.data.contactadvertid;
		        	inputdate = data.data.inputdate;
		        	title=data.data.title;
		        	content=data.data.content;
		        	$('.bd-tit').html(data.data.title);
		        	$('.nvtt').text(data.data.title);
		        	var $body = $('body');
					document.title = data.data.title;
					var ua = window.navigator.userAgent.toLowerCase();
					if(ua.match(/micromessenger/)||ua.match(/qq/)){
					 	// hack在微信等webview中无法修改document.title的情况
						var $iframe = $('<iframe src="../../css/img/favicon.ico"></iframe>').on('load', function() {
						setTimeout(function() {
							$iframe.off('load').remove()
						}, 0)
						}).appendTo($body);
					}
		        	if(data.data.inputdate){
		        		$('.bd-time').html(data.data.inputdate+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;陆鲸');
		        	}
					$('.bd-con').html(data.data.content);
					countvisit = data.data.visitcount?data.data.visitcount:0;
//					countpraise = data.result.countpraise?data.result.countpraise:0;
					$('#countvisit').html('阅读 '+countvisit);
//					$('#countpraise').html(countpraise);
//					if("false"==data.result.canpraise){
//						$('#zan').removeClass();
//						$('#zan').addClass('zan_icon1');
//					}
					//_this.dopraise();
		        }
		    }
		    param.errorCallback = function(){
		    	alertMsg(commonMsg.net_error);
		    }
		    getJsonp(param);
	    },
		goload:function(e){
			var domThis = $(e.currentTarget);//当前元素
			if (navigator.userAgent.match(/android/i)) {
				var loadDateTime = new Date();
				window.setTimeout(function() {
						var timeOutDateTime = new Date();
						if (timeOutDateTime - loadDateTime < 5000) {
							window.location.href = "http://e.lujing56.com/mobile.html?source=contactadvert-"+this.contactadvertid;
						} else {
							window.close();
						}
					},
					25);
				window.location = 'lujingdriver.com://lujingdriver:8080';
			} else {
				window.location.href = "http://e.lujing56.com/mobile.html?source=contactadvert-"+this.contactadvertid;
			}
		}
	})
	var obj = new objfun({
		$el:$('.body-content')
	});
})
