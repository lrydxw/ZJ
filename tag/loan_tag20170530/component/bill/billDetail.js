
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
	        this.loanId = ''
	        //this.getData();
	        //用于详情
	        this.initData();
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        
	    },
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
	    	console.log( 'loanBillNo',GetQueryString('loanBillNo'))
	    	var isDone;
	    	if(GetQueryString('loanBillNo') != '0'){
	    		isDone = true;
	    		var billMonth = GetQueryString('month');
	    		document.getElementsByTagName("title")[0].innerHTML = billMonth+'月已出帐';
	    	}else{
	    		isDone = false;
	    		document.getElementsByTagName("title")[0].innerHTML = '未出账单';
	    	}
			try{
				window.tf56.setTitle(document.getElementsByTagName("title")[0].innerHTML)
			}catch(e){
				console.log(e)
			}
	    	var _this = this;//_this方便callback中调用
	    	var param = {};
	    	var loanId =  GetQueryString('loanBillNo') || 0
		    param.url  = apiUrl.getLoanBillDetail;
		    param.dataType="json"
			param.data ={
		    	loanBillNo:loanId
		    }
//		    this.base.loading("show","加载中")
		    param.callback = function(data){
		    	_this.base.loading("hide")
		        if(data.result != 'success'){
		            alertMsg(data.msg);
		            return;
		        }else{
		        	if(!data.data){
		        		return;
		        	}
		        	var r = data.data;
		        	var billRecord='';
		        	for(var i=0;i<r.loanRecordList.length;i++){
		        		var loanRecordItem = r.loanRecordList[i]
		        		var billStatus = '';
		        		var color = '';
		        		if(loanRecordItem.status == '1'){
		        			billStatus = '已还'
		        			color = '#35b084'
		        		}else if(loanRecordItem.status == '2'){
		        			billStatus = '未还'
		        			color = '#ff8966'
		        		}else{
		        			billStatus = '逾期'
		        			color = '#ff8966'
		        		}
		        		var billDateNoTime = loanRecordItem.loanDate.substring(2,10);//借款时间
		        		billRecord += '<div class="billItem"><div class="billItemLeft"><p class="billDate">'+billDateNoTime+'</p><p class="billCount"><span class="billCount0">￥'+loanRecordItem.repaymentAmount+'</span><span class="billCount1">(含利息￥'+loanRecordItem.interest+')</span></p></div><div class="billItemRight"><span class="billState" style="color:'+color+'">'+billStatus+'</span></div></div>'				
		        	}
					
		        	var billDateStart = r.billStartDate.substring(5,10).replace('-','月')
		        	var billDateEnd = ''
		        	if(isDone){
		        		billDateEnd = r.billEndDate.substring(5,10).replace('-','月')
		        	}else{
		        		billDateEnd = '至今'
		        	}
		        	var billItem = '<div class="billTotal"><span class="bilDdateAndCount">'+billDateStart+'日-'+billDateEnd+'共'+r.billCount+'笔 , ￥'+r.unRepaymentAmount+'</span></div><div class="billList1">'+billRecord+'</div>'
		        	
		        	$('.billList').append(billItem)
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


function GetQueryString(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}