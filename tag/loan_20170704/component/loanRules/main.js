$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	        this.tradeid =getParamVal('tradeid');  //运单id tradeid=2839962&tradenumber=17062808582020001用于获取toaccountnumber和topartyrealname
	        this.amount =getParamVal('amount');  //运费
	        this.tradenumber =getParamVal('tradenumber');  //用于获取toaccountnumber和topartyrealname
	        this.amountitem = '运费';  //信息费,运费「写死」用于获取toaccountnumber和topartyrealname
	        this.fetchNum=0		//记录两个接口获取数据完全
			this.loanData=''	//放款信息接口数据
			this.tradeData=''	//收款方信息接口数据
			this.getData();  //获取收款方信息
	        //用于详情
	        this.initData(); //获取放款信息

		},
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click .li-btn': 'getData',
	        'click .month-btn': 'initData'
	    },
	    //自定义方法
	    //获取放款信息
	    initData:function(){
	    	var _this = this;//_this方便callback中调用
	    	var param = {};
			param.type='GET'
		    param.url = apiUrl.selectLoanRecord;
		    param.dataType = 'json'
		    param.callback = function(data){
		        if(data.result != 'success'){
		            alertMsg(data.msg);
		            return;
		        }else{
		        	if(!data.data){
		        		return;
		        	}
					_this.loanData=data.data
					++_this.fetchNum
					if(_this.fetchNum>1){
						_this.setValue()
					}
		        }
		    }
		    param.errorCallback = function(){
		    	alertMsg('网络不给力,请检查网络连接');
		    }
		    getJsonp(param);
	    },
		//获取收款方信息
	    getData:function(){
			var _this = this;//_this方便callback中调用
			var param = {};
		    var data = {
	            'tradeid': this.tradeid,
	            'tradenumber':this.tradenumber,
	        }
		    param.url  = apiUrl.selectAccountNumberByTradeId
		    param.data = data;
		    param.callback = function(data){
		        if(data.result != 'success'){
		            alertMsg(data.msg);
		            return;
		        }else{
					if(!data.data){
						return;
					}

					_this.tradeData=data.data
					++_this.fetchNum
					if(_this.fetchNum>1){
						_this.setValue()
					}
		        }
		    }
		    param.errorCallback = function(){
		    	alertMsg('网络不给力,请检查网络连接');
		    }
		    getJsonp(param);
		},
		setValue:function(){
			if(!this.loanData||!this.tradeData){
				alertMsg('接口出错,请刷新重试')
				return
			}
			// this.loanData=[
			// 	{
			// 		"loanRecordCompany": "陆鲸",//融资人
			// 		"loanAmount": "100000",//陆鲸白条总额度
			// 		"rate": "8",//年利率
			// 		"loanDate": "",//放款日期
			// 		"repayDate": "100.00",//还款日期
			// 		"contractCode":"21312",//合同号
			// 		"loanCount":"12"//序号
			// 	}
			// ]
			var table=[
				'<table class="table-print">',
					'<tbody>',
						'<tr>',
							'<td colspan="4" class="toptd">“陆鲸白条”放款申请书</td>',
						'</tr>',
						'<tr>',
							'<td>执行保理<br/>合同号</td>',
							'<td colspan="3">'+this.loanData.contractCode+'</td>',
						'</tr>',
						'<tr>',
							'<td>序号</td>',
							'<td colspan="3">'+this.loanData.loanCount+'</td>',
						'</tr>',
						'<tr>',
							'<td>融资人</td>',
							'<td colspan="3">'+this.tradeData.realname+'</td>',
						'</tr>',
						'<tr>',
							'<td >融资用途</td>',
							'<td colspan="3">企业名称</td>',
						'</tr>',
						'<tr>',
							'<td>融资金额</td>',
							'<td colspan="3">',
								'<table class="table-clear" >',
									'<tr>',
										'<td style="width:66%;border-right:1px solid #c3c9d5;border-bottom:1px solid #c3c9d5" colspan="2" >陆鲸白条总额度(元)</td>',
										'<td style="border-bottom:1px solid #c3c9d5" >'+this.loanData.loanAmount+'</td>',
									'</tr>',
									'<tr>',
										'<td style="width:66%;border-right:1px solid #c3c9d5"  colspan="2">本笔申请放款金额(元)</td>',
										'<td >'+this.amount+'</td>',
									'</tr>',
								'</table>',
							'</td>',
						'</tr>',
						'<tr>',
							'<td>年利率</td>',
							'<td colspan="3">'+this.loanData.rate+'%</td>',
						'</tr>',
						'<tr>',
							'<td>放款日期</td>',
							'<td colspan="3">'+this.loanData.loanDate+'</td>',
						'</tr>',
						'<tr>',
							'<td>到期日期</td>',
							'<td colspan="3">'+this.loanData.repayDate+'</td>',
						'</tr>',
						'<tr>',
							'<td rowspan="3">指定收款<br/>账户(本笔)</td>',
							'<td >账户名</td>',
							'<td colspan="2">'+this.tradeData.topartyrealname+'</td>',
						'</tr>',
						'<tr>',
							'<td >支付账号</td>',
							'<td colspan="2">'+this.tradeData.accountnumber+'</td>',
						'</tr>',
						'<tr>',
							'<td >开户行</td>',
							'<td colspan="2">传化支付</td>',
						'</tr>',
						'<tr>',
							'<td colspan="4">',
								'<p class="td-p"><b>免责声明：</b>上述支付信息，我已核对无误</p>',
							'</td>',
						'</tr>',
					'</tbody>',
				'</table>']
			$('.body-content').html(table.join(''))
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