$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click #regSubmit': 'submit',
	    },
	    submit:function(e){
	    	e.preventDefault()
	    	var _this = this;//_this方便callback中调用
	    	var param = {
	    		url:apiUrl.insertContact,
	    		type:"post",
	    		dataType:"json",
	    		data:$("#form").serialize()
	    	};
		    param.callback = function(data){
		        if(data.result != 'success'){
		            alertMsg(data.msg);
		            return;
		        }else{
		        	if(!data.data){
		        		return;
		        	}
		        	alertMsg(data.msg);
		        	//具体实现
		        }
		    }
		    param.errorCallback = function(){
		    	alertMsg('网络不给力,请检查网络连接');
		    }
		    getJsonp(param);
	    },
	})
	var obj = new objfun({
		$el:$('.body-content')
	});
})