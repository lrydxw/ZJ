
$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	    	this.base=new transfar.Base();
	        this.xx = 'xx';
	        //用于列表
	        this.loadData = {};
	        this.loadData.data = {};//记录已加载数据 结构与返回data一致
	        //this.getData();
	        //用于详情
	        this.count = 1;
			this.maxCount = '';
	        this.initData();
	        this.ajaxIng=false;
	        
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click .tabRight' : 'alertRepay'
	    },
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
	    	var _this = this;//_this方便callback中调用
	    	var param = {};
		    param.url  = apiUrl.queryLoanRecordList;
		    param.dataType="json"
			
		    param.data ={
		    	pageNo:this.count,
		    	pageSize :20
		    }
		    
//		    this.base.loading("show","加载中")
			param.callback = function(data){
		    	_this.base.loading("hide")
				_this.ajaxIng=false;
				_this.count++;
		        if(data.result != 'success'){
		            alertMsg(data.msg);
		            return;
		        }else{
		        	if(!data.data){
		        		return;
		        	}
		        	var r = data.data;
		        	_this.maxCount = Math.ceil(data.count/20);
		        	if(_this.maxCount>1){
	        			_this.scrolldown();
		        	}
		        	var loanYearItem=[]
		        	var obj={}
		        	for(var i =0;i<r.length;i++){
						if(!obj[r[i].yearMonth]){
							obj[r[i].yearMonth]=[]
						}
						obj[r[i].yearMonth].push(r[i])
					}
		        	
		        	var loanMonth=''
		        	for(var x in obj){
		        		var bill1=""
						var bill2 = ''
						
						for(var i=0;i<obj[x].length;i++){
							bill2 += '<div class="billList"><div class="billItem"><div class="billItemLeft"><p class="billDate">'+obj[x][i].loanDate.substring(5,10)+'</p></div><div class="billItemRight"><span class="billCount">￥'+obj[x][i].amount+'</span></div></div></div>'
						}
		        		
		        		if($('[data-value="'+x+'"]').length<1){
		        			bill1 = '<div><div class="billTotal" data-value="'+x+'"><span class="bilDdateAndCount">'+x+'</span></div>'
		        			bill2+='</div>'
		        		}
				        loanMonth += bill1+bill2
				         				
				         			
				    }  
		        	$('.loanItem').append(loanMonth)
		        	$('.loading').remove();
		        	//具体实现
		        	
		        	
		        }
		    }
		    param.errorCallback = function(){
		    	alertMsg('网络不给力,请检查网络连接');
		    }
		    if(this.ajaxIng){
				return
			}
			this.ajaxIng=true;
		    getJsonp(param);
	    },
	    alertRepay:function(){
	    	alertMsg('敬请期待')
	    },
	    scrolldown:function(){
	    	var _this = this;
	    	var scrollLoading = new transfar.ScrollLoading();
			scrollLoading.bind('fetch', function(type) {
					if(type === 'BOTTOM') {
						if(_this.count > _this.maxCount){
							$('.loanItem').after('<p class="loading" >没有更多了</p>');
							
							scrollLoading.trigger('turn', 'off');
							return
						}
						
						scrollLoading.trigger('turn', 'on');
						if($(".loading").length<1){
							$('.loanItem').after('<p class="loading" >加载中...</p>');
						}
						_this.initData()
						
					}else{
						scrollLoading.trigger('turn', 'on');
					}
						
	   		 })
	  	}
	})
	var obj = new objfun({
		$el:$('.body-content')
	});
})
	