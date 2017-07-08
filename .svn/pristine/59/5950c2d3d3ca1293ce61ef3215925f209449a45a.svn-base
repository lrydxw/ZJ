
$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	    	this.base=new transfar.Base();
	        //用于详情
	        this.initData();
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
		    param.url  = apiUrl.firstPage;
		    //apiUrl.firstPage
		    param.dataType="json"
		    this.base.loading("show","加载中")
		    param.callback = function(data){
 
		    	var userStatus={2:"已冻结",3:"已过期"};
		    	_this.base.loading("hide")
		        if(data.code!=200){
		            alertMsg(data.msg);
		            return;
		        }else{
		        	var userInfo = data.data;
		        	//r=test(r);//测试专用
		        	//账户状态
		        	if(userInfo.status!="正常"){
		    			$("#moneyStatus").show()
		    				.attr("href","../help/index.html?type=1")
		    				.append("账户"+userInfo.status+"，查看原因");
		    		}
		    		//是否有逾期
		    		if(userInfo.hasExpire==0){
		    			$("#weekBill").append("<label class='overdue'>有逾期</label>");
		    		}
		        	userInfo=_this.clean(userInfo);
		        	//给页面特定位置赋值
		        	$("[init]").forEach(function(e,i){
		        		$(e).html(userInfo[$(e).attr("init")])
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
	    	//数据整理
	    	d.availAmount="¥ "+d.availAmount;//可用额度
	    	d.totalMoney="总额度：¥"+d.amount;//总额度
	    	d.weekRepayAmount="¥"+d.weekRepayAmount;//近7日应还
	    	d.allRepayAmount="¥"+d.allRepayAmount;//所有应还
	    	
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