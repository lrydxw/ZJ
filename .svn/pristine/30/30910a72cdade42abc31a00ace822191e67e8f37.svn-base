
//_partyid = _partyid?_partyid:401;
$(document).ready(function(){
   	init();
 })
 function init(){
 	var param = {};
    param.url = apiUrl.getCreditAndTradeStatisticsByOwner+'&random=' + Math.random();
    param.callback = function(data){
        if(data.result != 'success'){
            alertMsg(data.msg);
            return;
        }else{
        	if(!data.data){
        		alertMsg("数据获取异常！");
        		return;
        	}
        	var o_data = data.data;
        	//诚信
        	if(o_data.creditscore&&o_data.creditlevel){
    			initStar(o_data.creditlevel,o_data.credittype);
    		}else{
    			initStar(0,'星');
    		}
    		//数据
    		evaluateNum(o_data);
    	}
    }
    getJsonp(param);
 }
 
function initStar(score,credittype){
	var html='';
	var userStar = 'honestlevel_icon';
	if(credittype=='星'){
		userStar = 'honestlevel_icon';
	}else if(credittype=='钻'){
		userStar = 'honestlevel_icon2';
	}else if(credittype=='冠'){
		userStar = 'honestlevel_icon3';
	}
	switch(score/1){
        case 0:
            // html='<span class="honestlevelno_icon"></span>';
            // $('.d-empty').show();
            // $('.d-emptyrule').show();
            html='';
            $('.d-empty').show();
            $('.d-emptyrule').show();
            $('.level_font').hide()
            $('.describe_icon').hide()
            $('.nowlevel').css('line-height','1.81rem')
            break;
        case 1:
            html='<span class="'+userStar+'"></span>';
            break;
        case 2:
            html='<span class="'+userStar+'"></span><span class="'+userStar+'"></span>';
            break;
        case 3:
            html='<span class="'+userStar+'"></span><span class="'+userStar+'"></span><span class="'+userStar+'"></span>';
            break;
        case 4:
            html='<span class="'+userStar+'"></span><span class="'+userStar+'"></span><span class="'+userStar+'"></span><span class="'+userStar+'"></span>';
            break;
        case 5:
            html='<span class="'+userStar+'"></span><span class="'+userStar+'"></span><span class="'+userStar+'"></span><span class="'+userStar+'"></span><span class="'+userStar+'"></span>';
            break;
    }
    $('.describe_icon .starNum').html(score)
	$('#iconbox').empty();
	$('#iconbox').html(html);	
}
//
//function evaluatedata(){
//	var param = {};
//  param.url = apiUrl.selectCreditLevel+'&random=' + Math.random();
//  param.callback = function(data){
//      if(data.result != 'success'){
//          alertMsg(data.msg);
//          return;
//      }else{
//      	if(!data.data){
//      		alertMsg("没有找到会员!");
//      		return;
//      	}
//      	var o_data = data.data;
//      	//名字
//      	if(o_data.traffictotal&&o_data.trafficmonth){
//      			evaluateNum(o_data.traffictotal,o_data.trafficmonth,o_data.highpraiseratetotal/1,o_data.differentialratetotal/1);
//      		}else{
//      			$('.evaluate').hide();
//      		}
//      	}
//  }
//  getJsonp(param);
//}
function evaluateNum(o_data){
	$('.trafficmonth').html(o_data.trafficmonth);
	$('.highpraiseratemonth').html(o_data.monthpositivetotalrate);
	$('.differentialratemonth').html(o_data.monthnegativetotalrate);
	$('.traffictotal').html(o_data.traffictotal);
	$('.highpraiseratetotal').html(o_data.positivetotalrate);
	$('.differentialratetotal').html(o_data.negativetotalrate);
	
}
