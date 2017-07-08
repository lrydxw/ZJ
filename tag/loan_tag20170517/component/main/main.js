
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
	        this.initData();
	        $(".no-detail").hide().append("快去使用陆鲸白条<br>支付运费吧！");
	        $(".money-bar").show();

	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click .li-btn': 'getData'
	    },
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
	    	var _this = this;//_this方便callback中调用
	    	var param = {};
		    param.url  = apiUrl.queryLoanUserInfo;
		    //param.url="/mock/requestOnServer.do?url=http://10.7.28.166/mockjs/35/loanApi/loanUser/queryLoanUserInfo?"
		    param.dataType="json"
		    param.data ={
		    	'xxid':'xxid'
		    }
		    this.base.loading("show","加载中")
		    param.callback = function(data){
		    	_this.base.loading("hide")
		        if(!data.data){
		            alertMsg(data.msg);
		            return;
		        }else{
		        	var r = data.data;
		        	//r=test(r)
		        	//是否有账单
		        	if(r.unsettledLoanBill.isUsed=="0"){
		        		//没有使用
		        		$(".no-detail").show();
		        	}else{
		        		$(".money-detail").show();
		        		//是否还清账单
			        	//if(r.settledLoanBill.repayAmout!="0.00"){
			        	/*if(r.settledLoanBill.repayAmout!="0.00"){
			        		//未还清
			        		$(".money-msg").show();
				        	var repaymentDay=new Date(r.settledLoanBill.repaymentDay+" 23:59:59");
				        	var now=new Date();
				        	if(repaymentDay>now){
				        		//未逾期
				        		$(".time-limit").show();
				        	}else{
				        		$(".tips").show();
				        	}
				        	$(".money-btn").attr("href","../bill/billDetail.html?loanBillNo="+r.settledLoanBill.loanBillNo)
			        	}else{
			        		$(".money-subtitle").html("账单已还清")
			        		$(".money-ok").show();
			        	}*/
			        	//是否有已出账单
			        	var string=(r.settledLoanBill.repaymentDay+"-23-59-59").split("-")
			        	var repaymentDay=new Date();
			        		repaymentDay.setFullYear(string[0],string[1]-1,string[2]);
                             repaymentDay.setHours(string[3],string[4],string[5]);
				        var now=new Date();
			        	if(r.settledLoanBill.loanBillNo){
			        		//有
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
			        		}
			        	}else{
			        		$(".money-msg").show();
			        		$(".money-btn").click(function(e){
			        			e.preventDefault();
			        			alertMsg("暂无账单明细")
			        		})
					        		$(".time-limit").show();
			        	}
		        	}
		        	r=_this.clean(r);
				    $(".money-btn").attr("href","../bill/billDetail.html?month="+r.nextTitle+"&loanBillNo="+r.settledLoanBill.loanBillNo)
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
	    clean:function(d){
	    	d.useableM="¥"+d.loanInfo.availAmount;
	    	d.totalM="¥"+d.loanInfo.amount;
	    	d.nextBill=(d.unsettledLoanBill.repayAmout=="0.00"&&d.unsettledLoanBill.recordCount!="0")?"已还清":("¥"+(d.unsettledLoanBill.repayAmout))
	    	d.nextTitle=parseInt(d.settledLoanBill.yearMonth.split("-")[1])
	    	d.month=d.nextTitle+"月账单&nbsp;&nbsp;"+
	    	(d.settledLoanBill.billStartDate.split("-")[1]+"月"+d.settledLoanBill.billStartDate.split("-")[2]+"日")+"-"
	    	+(d.settledLoanBill.billEndDate.split("-")[1]+"月"+d.settledLoanBill.billEndDate.split("-")[2]+"日")
	    	d.billM=d.settledLoanBill.repayAmout!="0.00"?("¥ "+d.settledLoanBill.repayAmout):"¥ 0.00"
	    	d.day="最后还款日："+d.settledLoanBill.repaymentDay

	    	if(d.unsettledLoanBill.recordCount>0&&d.unsettledLoanBill.repayAmout=="0.00"){
	    		$('[init="nextBill"]').addClass("money-next-bill")
	    	}
	    	return d;
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
	r.settledLoanBill.loanBillNo="1"
	r.settledLoanBill.repayAmout="100.00"
	r.unsettledLoanBill.repayAmout="0.00"
	r.unsettledLoanBill.recordCount=0
	return r
}