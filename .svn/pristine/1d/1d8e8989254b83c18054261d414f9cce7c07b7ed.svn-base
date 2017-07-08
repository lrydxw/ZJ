$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {

	    	this.base=new transfar.Base();
	        this.record=this.base.getUrlParam("record")//record：账单是否已出
	        this.init();
	        this.money=0;//选中付款金额
	        this.checkOrderId=[];//选中付款id
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click .item': 'chooseBill',//勾选账单
	        'click #billSumit':"submitBill"
	    },
	    init:function(){
	    	//页面初始参数获取
	    	var winHeight=$(window).height();
	    	/*if(this.record=="true"){
				$(".bill-list").height(winHeight-208)
	    	}else{
	    		$(".bill-list").height(winHeight-168)
	    	}*/
	    	
	    	var base=this.base;
	    	var show=base.getUrlParam("show");
	    	//show:是否显示账单列表入口
	    	if(show=="true"){
	    		$(".bill-tips").show();
				$(".bill-list").height(winHeight-208)
	    	}else{
	    		$(".bill-list").height(winHeight-168)
	    		
	    	}
	    	if(this.record=="true"){
	    		$(".bill-detail .time").show();
	    	}else{
	    		$("title").html("未出账单")
	    	}

	    	this.getData();
	    },
	    getData:function(){
	    	//获取账单列表
			var _this = this;//_this方便callback中调用
			var param = {};
	    	var base=this.base;
		    var data = {
	            'loanBillNo': base.getUrlParam("loanBillNo"),
	        }
	        param.dataType="json"
		    param.url  = apiUrl.getLoanBillDetail;
		    param.data = data;
		    param.callback = function(data){
		        if(data.result != 'success'){
		            alertMsg(data.msg);
		            return;
		        }else{
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
			var r=data.data;
			//r=test(r);//测试专用
			var month=r.settlementDay.split("-")[1]
			var $repaymentDay=$("#repaymentDay")
			
			$("title").html(month+"月账单")
			try{
			    window.tf56.setTitle(document.getElementsByTagName("title")[0].innerHTML)
			}catch(e){
			    console.log(e)
			}
			//账单状态（1 未还清 2 已逾期 3 已还清 4无记录）
			if(r.billStatus!=4){
				$("#billBtn,#billList").show();
				_this.creatList(r.loanRecordList)//创建记录列表
			}
			switch(r.billStatus){
				case "1":
	    		if(this.record=="true"){
    					$repaymentDay.html("最后还款日&nbsp;"+r.repaymentDay.split("-")[1]+"月"+r.repaymentDay.split("-")[2]+"日")
					}
    			break;
    			case "2":
    				$repaymentDay.html("已逾期")
    			break;
    			case "3":
    				$repaymentDay.html("已还清").show()
    				$("#billBtn").hide();
    				$("#billList").addClass("bill-list-success")
    			break;
    			case "4":
    				$repaymentDay.html("最后还款日&nbsp;"+r.repaymentDay.split("-")[1]+"月"+r.repaymentDay.split("-")[2]+"日")
    				$(".bill-no").show();
    			break;
			}
			
		    r=_this.clean(r);
			$("[init]").forEach(function(e,i){
        		$(e).html(r[$(e).attr("init")])
        	})
		},
	    clean:function(r){
	    	r.month=r.settlementDay.split("-")[0]+"年"+r.settlementDay.split("-")[1]+"月"+'<img src="./statics/right_sub.png" alt="">';//账单月
	    	r.money='剩余应还&nbsp;&nbsp;¥&nbsp;'+r.unRepaymentAmount;//未还金额
	    	r.billDetail=r.billStartDate.split("-")[1]+"月"+r.billStartDate.split("-")[2]+"日-"
	    	+r.billEndDate.split("-")[1]+"月"+r.billEndDate.split("-")[2]+"日共"+r.billCount+"笔，¥"+r.loanAmount;//账单总结
	    	//数据整理
	    	return r;
	    },
	    creatList:function(d){
	    	//创建记录列表
	    	var template='<div class="item <%itemSuccess%>" data-money="<%repaymentAmount%>" data-id="<%loanNo%>" >\
						<div class="radio-un"><img src="./statics/Select_no@3x.png" alt=""></div>\
						<div class="radio-check" style="display:none;"><img src="./statics/Select_yes@3x.png" alt=""></div>\
						<div class="time"><%time%></div>\
						<div class="money">¥ <%repaymentAmount%> <label>(含利息￥<%interest%>)</label></div>\
						<div class="status"><%billStatus%></div>\
                		</div>';
            var expr = /<%([\s\S]+?)%>/g;
            var resultHtml=""

	    	//d[0].status=d[1].status=d[2].status=1//测试专用
	    	for(var i=0,l=d.length;i<l;i++){
	    		var obj=d[i];

	    		obj.time=obj.loanDate.split(" ")[0]
	    		if(obj.status==1){
	    			obj.billStatus="已还"
	    			obj.itemSuccess="item-success"
	    		}
	    		resultHtml+=template.replace(expr, function(e,q){
	    			return obj[q]||"";
	    		});

	    		obj=null;
	    	}

	    	$("#billList").html(resultHtml)
	    },
	    chooseBill:function(e){
	    	//勾选单笔付款
	    	var $this=$(e.currentTarget);
	    	if($this.hasClass("item-success")){
				return;
	    	}
	    		
	    	if($this.find(".radio-un").css("display")=="none"){
	    		//取消
	    		$this.find(".radio-un").show();
	    		$this.find(".radio-check").hide();
	    		this.money-=$this.data("money")-0;
	    		for(var i=0,l=this.checkOrderId.length;i<l;i++){
	    			if($this.data("id")==this.checkOrderId[i]){
	    				this.checkOrderId.splice(i,1)
	    			}
	    		}
	    	}else{
	    		//选中
	    		$this.find(".radio-un").hide();
	    		$this.find(".radio-check").show();
	    		this.money+=$this.data("money")-0;
	    		this.checkOrderId.push($this.attr("data-id"))
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
	            loanNos: this.checkOrderId.join(","),
	            terminal:"H5",
	            amount:this.money.toFixed(2),
	            frontUrl:location.href.split("loan")[0]+"loan/component/main/index.html"
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
	    }
	})
	var obj = new objfun({
		$el:$('.body-content')
	});
})


function test(r){
	r.billStatus="2"
	return r
}