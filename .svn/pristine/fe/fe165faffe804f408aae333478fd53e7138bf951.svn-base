
$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	    	this.base=new transfar.Base();
	    	this.status={1:"已还清",2:"未还清",3:"已逾期",4:"无记录"}
	        //用于详情
	        this.initData();
	        this.getHistory()
	        //HACK: 为页面资源加载失败 预处理 no-detail元素默认显示
	        $(".no-detail").hide().append("快去使用陆鲸白条<br>支付运费吧！");
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click .li-btn': 'getData',
	        'click [bury]':'buryPoint'//所有需要埋点元素处理，添加bury属性 例如:bury="blankNoteDetailEventLabel"
	    },
	    initData:function(){
	    	//获取资金账户详情
	    	var _this = this;//_this方便callback中调用
	    	var param = {};
		    param.url  = apiUrl.queryLoanUserInfo;
		    param.dataType="json"
		    this.base.loading("show","加载中")
		    param.callback = function(data){
 
		    	var userStatus={2:"已冻结",3:"已过期"};
		    	_this.base.loading("hide")
		        if(!data.data){
		            alertMsg(data.msg);
		            return;
		        }else{
		        	var r = data.data;
		        	//r=test(r);//测试专用
		        	//账户状态
		        	if(data.data.loanInfo.status!=1){
		    			$("#moneyStatus").show()
		    				.attr("href","../help/index.html?type=1")
		    				.append("账户"+userStatus[data.data.loanInfo.status]+"，查看原因");
		    		}

		        	//是否初次使用
		        	if(r.unsettledLoanBill.isUsed=="0"){
		        		//没有使用
		        		$(".no-detail").show();
		        	}else{
		        		$(".money-detail").show();
		        		
			        	//是否有已出账单
			        	if(r.settledLoanBill.loanBillNo){
			        		//有
				        	/*var string=(r.settledLoanBill.repaymentDay+"-23-59-59").split("-")
				        	var repaymentDay=new Date();
				        		repaymentDay.setFullYear(string[0],string[1]-1,string[2]);
	                             repaymentDay.setHours(string[3],string[4],string[5]);
					        var now=new Date();
			        		if(r.settledLoanBill.repayAmout!="0.00"){
			        			//未还清
			        			$(".money-msg").show();
			        			if(repaymentDay>now){
					        		//未逾期
					        		$(".time-limit").show();
					        	}else{
					        		$(".tips").show();
					        	}
			        		}else{
			        			$(".money-subtitle").html("本期账单已还清")
			        			$(".money-ok").show();
			        		}*/
			        		//账单状态 1 未还清 2 已逾期 3 已还清 4无记录）
			        		switch(r.settledLoanBill.billStatus){
			        			case "1":

			        				$(".money-msg,.time-limit").show()
			        				$(".money-btn").html("立即还款")
			        			break;
			        			case "2":
			        				$(".money-msg,.tips").show()
			        				$(".money-btn").html("立即还款")
			        			break;
			        			case "3":
			        				$(".money-ok").show();
			        				$(".money-subtitle").html("本期账单已还清")
			        			break;
			        			case "4":
			        				$(".money-msg").show()
			        				$(".billM").css("marginBottom","44px")
			        			break;
			        		}
			        	}else{
			        		//无记录
			        		$(".money-msg").show()
			        		$(".billM").css("marginBottom","44px")
			        		$(".money-msg").show();
			        		$(".money-btn").click(function(e){
			        			e.preventDefault();
			        			alertMsg("暂无账单明细")
			        		})
			        	}

			        	//未出账单无记录
			        	$(".money-tool").attr("href","../billDetail/index.html?show=false&record=false&loanBillNo="+r.unsettledLoanBill.loanBillNo);
			        	if(r.unsettledLoanBill.billStatus==4){
			        		$(".money-tool").click(function(e){
			        			e.preventDefault();
			        			alertMsg("暂无账单明细")
			        		})
			        	}
		        	}
		        	r=_this.clean(r);
				    $(".money-btn").attr("href","../billDetail/index.html?show=true&record=true&loanBillNo="+r.settledLoanBill.loanBillNo)
		        	$("[init]").forEach(function(e,i){
		        		$(e).html(r[$(e).attr("init")])
		        	})
		        	
		        	//具体实现
		        }
		    }
		    param.errorCallback = function(){
		            alertMsg("FE400,请求失败!");
		    }
		    getJsonp(param);
	    },
	    getHistory:function(){
	    	//获取历史账单判断是否有逾期
	    	var param = {};
		    param.url  = apiUrl.loanBillList;
		    param.dataType="json";

		    param.callback = function(data){
		    	/*data.data=[{
		    		billStatus:3
		    	}]*/
		    	if(data.result=="success"){
		    		if(data.data.length>0){
		    			for(var i=0,l=data.data.length;i<l;i++){
		    				//有已逾期
		    				if(data.data[i].billStatus==2){
		    					$("#moneyBill").show()
			    				.attr("href","../billDetail/index.html?show=false&record=true&loanBillNo="+data.data[i].loanBillNo)
			    				.append("有逾期账单，立即还款！");
		    				}
		    			}
		    		}
		    	}
		    };
		    getJsonp(param);
	    },
	    clean:function(d){
	    	//数据整理
	    	d.useableM="¥"+d.loanInfo.availAmount;
	    	d.totalM="¥"+d.loanInfo.amount;
	    	d.nextBill=d.unsettledLoanBill.billStatus==3?"已还清":("¥"+(d.unsettledLoanBill.repayAmout))
	    	d.nextTitle=parseInt(d.settledLoanBill.yearMonth.split("-")[1])
	    	d.month=d.nextTitle+"月账单&nbsp;&nbsp;"+
	    	(d.settledLoanBill.billStartDate.split("-")[1]+"月"+d.settledLoanBill.billStartDate.split("-")[2]+"日")+"-"
	    	+(d.settledLoanBill.billEndDate.split("-")[1]+"月"+d.settledLoanBill.billEndDate.split("-")[2]+"日")
	    	d.billM=d.settledLoanBill.repayAmout!="0.00"?("¥ "+d.settledLoanBill.repayAmout):"¥ 0.00"
	    	d.day="最后还款日："+d.settledLoanBill.repaymentDay

	    	if(d.unsettledLoanBill.billStatus==3){
	    		$('[init="nextBill"]').addClass("money-next-bill")
	    	}
	    	return d;
	    },
	    buryPoint:function(e){
	    	//埋点处理
			var $this = $(e.currentTarget)
			var funName=$this.attr("bury")
			if(window.tf56){
    			window.tf56[funName]
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

function test(r){
	r.unsettledLoanBill.isUsed=1;
	r.settledLoanBill.loanBillNo=1;
	r.settledLoanBill.billStatus="4";
	r.settledLoanBill.repayAmout="100.00"

	r.unsettledLoanBill.billStatus=4;
	return r
}