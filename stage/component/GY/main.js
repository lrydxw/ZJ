﻿$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	    	this.getData()
	    },
	    events: {
	    //添加事件（基于委托，绑定动态加载元素）
	        'click .li-btn': 'getData',
	        'click .btn-jr': 'joinStage'
	    },
	    //自定义方法
	    getData:function(){
	    	//获取详情
	    	var _this = this;//_this方便callback中调用
	    	var param = {};
		    param.url = 'apiUrl.xxx';      
		    param.data ={
		    	'xxid':'xxid'
		    }
		    param.callback = function(data){
		        if(data.result != 'success'){
		            alertMsg(data.msg);
		            return;
		        }else{
		        	if(!data.data){
		        		return;
		        	}
		        	_this.viewer(data)
		        	//具体实现
		        }
		    }
		    param.errorCallback = function(){
		    	alertMsg('网络不给力,请检查网络连接');
		    }
		    //getJsonp(param);
		    _this.viewer({
			    "result": "error",
			    "msg": "最多只能加入一个驿站",
			    "count": "",
			    "code": "801",
			    "data":{
			    	reason:"身份证信息不正确"
			    }
			})
	    },
	    viewer:function(r){
	    	//渲染页面
	    	alertMsg(r.code)
	    	if(r.data.reason){
	    		//$("#reason").html(r.data.reason)
	    	}
	    },
	    joinStage:function(){
	    	alert(1)
	    },
		dosomething:function(e){
			var domThis = $(e.currentTarget);//当前元素
		}
	})
	var obj = new objfun({
		$el:$('.body-content')
	});
})