$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {

	    	this.base=new transfar.Base();
	        this.type=this.base.getUrlParam("type")//type：all所有，week:近七天；
	    	this.winHeight=$(window).height();
	        this.init();
	        this.money=0;//选中付款金额
	        this.loansJson=[];//选中付款id
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click .item': 'chooseBill',//勾选账单
	        'click #billSumit':"submitBill",//立即付款
	        "click .status":"showBillTime"//显示使用时间
	    },
	    init:function(){
	    	//页面初始参数获取
    		//控制高度
			$(".bill-list").height(this.winHeight-58)
	    	this.getData();
	    },
	    getData:function(){
	    	//获取账单列表
			var _this = this;//_this方便callback中调用
		    var data = {
	            type:this.type
	        };
			var param = {
				dataType:"json",
				url:apiUrl.queryWaitRepqyList,
				data:data
			};

		    param.callback = function(data){
		        if(data.result != 'success'){
		            alertMsg(data.msg);
		            return;
		        }else{
		        	//展示应还界面
		            _this.loadView(data);
		        }
		    }
		    param.errorCallback = function(){
		    	alertMsg('网络不给力,请检查网络连接');
		    }
		    getJsonp(param);
		   
		},
		loadView:function(data){
			var _this=this;
			//页面数据填充
			
			//设置title
			$("title").html(this.type=="week"?"近7日应还":"所有应还")
			try{
			    window.tf56.setTitle(document.getElementsByTagName("title")[0].innerHTML)
			}catch(e){
			    console.log(e)
			}
			var billList=data.data;//账单数据
			var $repaymentDay=$("#repaymentDay")
			
			if(billList.dueList.length<1&&billList.repayList.length<1){
				//无记录
				$(".bill-no").show();
			}else{
				$("#billBtn,#billList").show();//显示列表
				//有逾期
				if(data.data.dueList.length>0){
					$("#moneyBill").show().html(data.data.dueList.length+"笔已逾期，请尽快还款");
					$(".bill-list").height(_this.winHeight-100)
				}
				_this.creatList(data.data.dueList,"overdue")//创建逾期列表
				_this.creatList(data.data.repayList,"undue")//创建未逾期记录列表
			}
		},
		/*
		@params {type} 类型overdue：逾期，undue:未逾期
		 */
	    creatList:function(data,type){
	    	//创建记录列表
	    	var template='<div class="item item_<%canCheck%>" data-check="<%canCheck%>" data-money="<%repayAmount%>" data-json=\'<%json%>\' >\
						<div class="radio-un"  style="display:<%canCheck%>"><img src="./statics/Select_no@3x.png" alt=""></div>\
						<div class="radio-check" style="display:none;"><img src="./statics/Select_yes@3x.png" alt=""></div>\
						<div class="money">¥ <%repayAmount%> <label>'+(type=="overdue"?"(含利息+罚息:￥<%interest%>)":"(含利息￥<%interest%>)")+'</label></div>\
						<div class="time '+(type=="overdue"?"overdue":"")+'">'+(type=="overdue"?"已逾期<%day%>天":"还剩<%day%>天")+'<%tips%></div>\
						<img class="status" src="./statics/bangzhu.png" data-time="<%loanDate%>" alt="">\
                		</div>';
            var expr = /<%([\s\S]+?)%>/g;
            var resultHtml=""

	    	for(var i=0,l=data.length;i<l;i++){
	    		var obj=data[i];
	    		//组装提交数据
	    		var json={};
			    for(var x in obj){
			    	if(x=="day"){
			    		json.dueDay=obj[x]
			    	}else{
			    		json[x]=obj[x]
			    	}
			    }
			    delete json.interest;
			    delete json.isToday;
	    		obj.json=JSON.stringify(json)
	    		//是否可以还款
	    		obj.canCheck=obj.isToday==1?"none":""
	    		obj.tips=obj.isToday==1?"【00:00之后可还款】":""
	    		resultHtml+=template.replace(expr, function(e,q){
	    			return obj[q]||"";
	    		});

	    		obj=null;
	    	}

	    	$("#billList").append(resultHtml)
	    },
	    chooseBill:function(e){
	    	//勾选单笔付款
	    	if(e.target.className=="status"||e.target.className=="status-img")return; //点击右侧帮助按钮时 不选中
	    	var $this=$(e.currentTarget);
	    	if($this.data("check")=="none")return;//当天记录不能还款
	    	if($this.find(".radio-un").css("display")=="none"){
	    		//取消
	    		$this.find(".radio-un").show();
	    		$this.find(".radio-check").hide();
	    		this.money-=$this.data("money")-0;
	    		for(var i=0,l=this.loansJson.length;i<l;i++){
	    			try{
	    			if($this.data("json").orderCode==this.loansJson[i].orderCode){
	    				this.loansJson.splice(i,1)
	    			}
	    			}catch(e){console.log(e)}
	    		}
	    	}else{
	    		//选中
	    		$this.find(".radio-un").hide();
	    		$this.find(".radio-check").show();
	    		this.money+=$this.data("money")-0;
	    		this.loansJson.push($this.data("json"));//存入选中的订单对象
	    	}
	    	$("#billMoney").val("¥ "+parseFloat(this.money).toFixed(2))
	    	if(this.money>0){
	    		$("#billBtn").addClass("bill-btn-can")
	    	}else{
	    		$("#billBtn").removeClass("bill-btn-can")
	    	}
	    },
	    submitBill:function(){
	    	//立即付款
	    	if(!$("#billBtn").hasClass("bill-btn-can")){
				return;
	    	}
	    	var _this = this;//_this方便callback中调用

		    var data = {
	            terminal:"H5",
	            amount:this.money.toFixed(2),
	            frontUrl:location.href.split("loan")[0]+"loan/component/main/index.html",
	            loans:JSON.stringify(this.loansJson)
	        }
			var param = {
				method:"post",
				dataType:"json",
				url:apiUrl.insertLoanRepayment,
				data:data
			};
		    param.callback = function(data){
		        if(data.result != 'success'){
		        	if(data.code=="800"){
		        		$.tfpop({
					        title: '',
					        content: data.msg,
					        coverClick: false,//点击背景是否关闭弹窗，默认为false
					        footer: [{
					            text: '确定',
					            click:function(){
					            	location.reload();
					            }
					        }]
					    });
		        	}else{
		            	alertMsg(data.msg);
		        	}
		            return;
		        }else{
		        	location.href=data.data.url;
		        }
		    }
		    param.errorCallback = function(){
		    	alertMsg('网络不给力,请检查网络连接');
		    }
		    getJsonp(param);
	    },
	    showBillTime:function(e){
	    	//点击显示借款时间
	    	if($(e.currentTarget).data("show")==true){
	    		$(".bill-time").hide();
	    		$(".status").data("show","");
	    	}else{
	    		$(".status").data("show","");
	    		$(".bill-time").show().css({"top":$(e.currentTarget).offset().top+47}).html("借钱时间："+$(e.currentTarget).data("time"))
	    		$(e.currentTarget).data("show","true")
	    	}
	    }
	})
	var obj = new objfun({
		$el:$('.body-content')
	});
})

