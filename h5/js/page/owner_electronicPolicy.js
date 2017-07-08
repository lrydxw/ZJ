//时间格式化处理  date.Format("yyyy-MM-dd hh:mm:ss")
Date.prototype.Format = function(fmt)
{ //author: meizz
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {	        
	        this.freightinsuranceorderid = getParamVal('freightinsuranceorderid')||''
	        //用于详情
	        this.initData();
	        
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click .ep-btn': 'downLoad'
	    },
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
	    	var _this = this;//_this方便callback中调用
	    	var param = {};
		    param.url = apiUrl.queryOrderDetail;
		    param.dataType = "json";
		    param.data ={
		    	'freightinsuranceorderid':this.freightinsuranceorderid,
		    	'datasource':'adapp'
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
		        	if(r.tradeinfo){
		        		var time1 = new Date(r.tradeinfo.takedate/1).Format("MM-dd hh:mm");
		        		$('#address').text(r.tradeinfo.fromprovince+r.tradeinfo.fromcity+' - '+r.tradeinfo.toprovince+r.tradeinfo.tocity);
		        		$('#topartyrealname').text(r.tradeinfo.topartyrealname+' '+time1);
		        	}else{
		        		$('#tradeinfo').hide();
		        	}
		        	
		        	var time2 = new Date(r.ensurestarttime/1).Format("yyyy年MM月dd日 hh时mm分")
		        	$('#policyno').text(r.policyno);
		        	$('#premium').text(r.premium/1+' 元');
		        	$('#fromaddress').text(r.fromaddress||'&nbsp;');
		        	$('#toaddress').text(r.toaddress||'&nbsp;');
		        	$('#goodsname').text(r.goodsname||'&nbsp;');
		        	$('#goodstype').text(r.goodstype||'&nbsp;');
		        	$('#packagetype').text(r.packagetype||'&nbsp;');
		        	$('#goodsvalue').text(r.goodsvalue/1+' 万元');
		        	$('#ensurestarttime').text(time2||'&nbsp;');
		        	$('#carplatenumber').text(r.carplatenumber||'&nbsp;');
		        	$('#applicantname').text(r.applicantname||'&nbsp;');
		        	$('#insuredname').text(r.insuredname||'&nbsp;');
		        	$('#invatationcode').text(r.invatationcode);
		        }
		    }
		    param.errorCallback = function(){
		    	alertMsg(commonMsg.net_error);
		    }
		    getJsonp(param);
	    },
		downLoad:function(e){
			var domThis = $(e.currentTarget);//当前元素
//			window.open('http://sitetest.tf56.com/lujingFinanceApi/freightInsuranceOrders/getPolicy?app_stoken=bbef3fd084c2f2bdaf66fc44b67b8fbe_565612858&datasource=driverapp&freightinsuranceorderid=1175')
			window.open(apiUrl.getPolicy+'&freightinsuranceorderid='+this.freightinsuranceorderid+'&datasource=adapp')
			
		}
	})
	var obj = new objfun({
		$el:$('.body-content')
	});
})
