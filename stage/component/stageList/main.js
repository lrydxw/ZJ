$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	        //this.getList();
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        "focus #stageKey":"search",
	        "click .cancel":"closeSearch",
	    },
	    search:function(){
	    	this.searchTaggle("show");
	    },
	    closeSearch:function(){
	    	this.searchTaggle("hide");
	    },
	    searchTaggle:function(type){
	    	var $inputBox=$(".input-box"),
		    	$cancel=$(".cancel"),
		    	$list=$("#list"),
		    	$icon=$(".input-box .icon"),
		    	$stageKey=$("#stageKey");
	    	if(type=="show"){
	    		$inputBox.addClass("input-box-on");
	    		$cancel.show();
	    		$list.hide();
	    		$icon.hide();
	    	}else{
	    		$inputBox.removeClass("input-box-on");
	    		$cancel.hide();
	    		$list.show();
	    		if(!$stageKey.val()){
	    			$icon.show();
	    		}
	    	}
	    },
	    getData:function(){
			var _this = this;//_this方便callback中调用
			var param = {};
		    var data = {
	            'skipcount': this.skipcount,
	            'pagesize' : this.pagesize
	        }
		    param.url  = apiUrl.seletxxx+'&random='+Math.random();
		    param.data = data;
		    param.callback = function(data){
		        if(data.result != 'success'){
		            alertMsg(data.msg);
		            return;
		        }else{
		            this.selectMsg(data);
		        }
		    }
		    param.errorCallback = function(){
		    	alertMsg('网络不给力,请检查网络连接');
		    }
		    getJsonp(param);
		}
	})
	var obj = new objfun({
		$el:$('body')
	});
})