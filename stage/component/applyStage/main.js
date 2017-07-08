$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	        this.xx = 'xx';
	        //用于列表
	        this.loadData = {};
	        this.loadData.data = {};//记录已加载数据 结构与返回data一致
	        //this.getData();
	        //用于详情
	        //this.initData();
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click .li-btn': 'getData',
	        'click #submitApply': 'submitApply'
	    },
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
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
		        	var r = data.data;
		        	//具体实现
		        }
		    }
		    param.errorCallback = function(){
		    	alertMsg('网络不给力,请检查网络连接');
		    }
		    getJsonp(param);
	    },
	    submitApply:function(){
	    	var data=serializeObject($("#form"))
	    	if(!isMobile(data.phone)){
	    		return;
	    	}
	    	console.log(data)
	    },
		dosomething:function(e){
			var domThis = $(e.currentTarget);//当前元素
		}
	})
	var obj = new objfun({
		$el:$('body')
	});
})