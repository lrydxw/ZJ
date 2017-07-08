$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	        this.xx = xx;
	        //用于列表
	        this.loadData = {};
	        this.loadData.data = {};//记录已加载数据 结构与返回data一致
	        this.getData();
	        //用于详情
	        this.initData();
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click .li-btn': 'getData',
	        'click .month-btn': 'initData'
	    },
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
	    	var _this = this;//_this方便callback中调用
	    	var param = {};
		    param.url = apiUrl.xxx;      
		    param.data ={
		    	'xxid':xxid
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
		    	alertMsg(commonMsg.net_error);
		    }
		    getJsonp(param);
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
		    	alertMsg(commonMsg.net_error);
		    }
		    getJsonp(param);
		},
		selectMsg:function(data){
			if(!data.data||data.data.length==0){
				if(!($("#dataMsg"+index)[0].hasChildNodes())){
					$("#dataMsg"+index).html('<div class="none_background">暂无运单信息</div>');
					$("#loadmore"+index).hide();
					return;
				}else{
					alertMsg("这是最后一条了！");
				}
			}else{
				//把已加载数据记录
				Array.prototype.push.apply(this.loadData.data,data.data); 
			}
			var count =  data.count;
			var data =  data.data;
			for(var i = 0;i<data.length;i++){
				var r = data[i];
				//具体列表元素
				var html =  '<div>'+r.xx+'</div>';
				$("#dataMsg").append(html);
			}
			skipcount = skipcount+pagesize;
			if(data.length==pagesize){
				$("#loadmore").html("点击加载更多");
				$("#loadmore").show();
			}else{
				$("#loadmore").html("点击加载更多");
				$("#loadmore").hide();
			}
		},
		dosomething:function(e){
			var domThis = $(e.currentTarget);//当前元素
		}
	})
	var obj = new objfun({
		$el:$('.body-content')
	});
})
