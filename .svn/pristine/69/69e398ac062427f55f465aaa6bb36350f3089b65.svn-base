$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	        this.bid = getParamVal('bid');
//	        this.bid = 713;
	        if(!this.bid){
	        	alertMsg('id不可为空');
	        }
			//app环境内不显示横幅
			if(window.tf56){
				$('.bodtom-box').hide();
				$('.introduce').hide();
			}
	        //用于详情
	        this.initData();
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click #loadBtn': 'goload'
	    },
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
	    	var _this = this;//_this方便callback中调用
	    	var param = {};
		    param.url = com_server+"/tradeView/tradecs/get?cmd=banner.getBanner20151207&datasource=lujingh5&token="+app_stoken;//获取banner详情
		    param.data ={
		    	'bannerid':this.bid
		    }
		    param.callback = function(data){
		        if(data.status != 200){
		            alertMsg("系统异常");
		            return;
		        }else{
					flag = true;
		        	if(!data.result){
		        		return;
		        	}
		        	inputdate = data.timestamp;
		        	title=data.result.title;
		        	content=data.result.content;
		        	$('.bd-tit').html(data.result.title);
		        	$('.nvtt').text(data.result.title);
//		        	document.title=data.result.title;
		        	var $body = $('body');
					document.title = data.result.title;
					// hack在微信等webview中无法修改document.title的情况
					var $iframe = $('<iframe src="../../css/img/favicon.ico"></iframe>').on('load', function() {
					setTimeout(function() {
						$iframe.off('load').remove()
					}, 0)
					}).appendTo($body);
		        	if(data.result.publishdate){
		        		$('.bd-time').html(data.result.publishdate+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;陆鲸');
		        	}
					$('.bd-con').html(data.result.content);
//					var countvisit = data.result.countvisit?data.result.countvisit:0;
//					var countpraise = data.result.countpraise?data.result.countpraise:0;
//					$('#countvisit').html('阅读 '+countvisit);
//					$('#countpraise').html(countpraise);
//					if("false"==data.result.canpraise){
//						$('#zan').removeClass();
//						$('#zan').addClass('zan_icon1');
//					}
					//dopraise();
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
							window.location.href = "http://e.lujing56.com/mobile.html?source=banner-"+getParamVal('bid');
						} else {
							window.close();
						}
					},
					25);
				window.location = 'lujingdriver.com://lujingdriver:8080';
			} else {
				window.location.href = "http://e.lujing56.com/mobile.html?source=banner-"+getParamVal('bid');
			}
		}
	})
	var obj = new objfun({
		$el:$('.body-content')
	});
})
