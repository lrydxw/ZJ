var skipcount = 0;
var pagesize = 10;
$(document).ready(function(){
	getEvaluateInfo();
})
function getEvaluateInfo(){
 	var param = {};
 	var data = {
 		'skipcount' : skipcount,
 		'pagesize' : pagesize
 	};
 	param.data = data;
    param.url = apiUrl.selectMyTradeEvaluate+'&random=' + Math.random();
    param.callback = function(data){
        if (data.code == "200") {
            selectMsg(data);
        } else {
          	alertMsg(data.msg);  
        }  
    }
    getJsonp(param);
}
function selectMsg(data) {
    var count = data.count;
    var params = '';
    var data = data.data;
    if (data.length == 0) {
        if (!($("#dataMsg")[0].hasChildNodes())) {
            $("#dataMsg").html('<div class="none_background">暂无评价记录</div>');
            return;
        } else {
           alertMsg("这是最后一条了！");
        }
    }
    var html='';
    for (var i = 0; i < data.length; i++) {
        var evaluate = data[i];  
         html = html+ '<div class="trade_data ">'+
        			'<div class="trade_evalaute">'+
        				'<div class="thephoto"></div>'+
        				'<div class="thename">'+showName(evaluate.frompartyname)+'</div>'+
        				'<div id="thestar">'+
        					'<span id="thestars">'+thestar(evaluate.score)+'</span>'+
        					'<span class="thetime">'+getTimeToShow1(evaluate.updatedate.time,2)+'</span>'+
        				'</div>'+
        				'<div class="theevaluate">'+evaluate.comment+'</div>'+
        			'</div>'+
        			'<div class="trade_detail">'+
        				'<div class="address_info">'+evaluate.fromaddress+'—'+evaluate.toaddress+'</div>'+
        				'<div class="goodsinfo">'+evaluate.goodsinfo+'</div>'+
        			'</div>'+
        		'</div>';
	}
    $('#dataMsg').append(html);
    skipcount = skipcount + pagesize;
    if (data.length == pagesize) {
        $("#loadmore").html("点击加载更多");
        $("#loadmore").show();
    } else {
        $("#loadmore").html("点击加载更多");
        $("#loadmore").hide();
    }
}
function thestar(star){
	var html='';
	var thestars='thestars';
	var thestarsno='thestarsno';
    switch(star/1){
		case 0:
			html='';
			break;
		case 1:
		    html='<span class="'+thestars+'"></span><span class="'+thestarsno+'"></span><span class="'+thestarsno+'"></span><span class="'+thestarsno+'"></span><span class="'+thestarsno+'"></span>';
		    break;
		case 2:
		    html='<span class="'+thestars+'"></span><span class="'+thestars+'"></span><span class="'+thestarsno+'"></span><span class="'+thestarsno+'"></span><span class="'+thestarsno+'"></span>';
		    break;
		case 3:
		    html='<span class="'+thestars+'"></span><span class="'+thestars+'"></span><span class="'+thestars+'"></span><span class="'+thestarsno+'"></span><span class="'+thestarsno+'"></span>';
		    break;
		case 4:
		    html='<span class="'+thestars+'"></span><span class="'+thestars+'"></span><span class="'+thestars+'"></span><span class="'+thestars+'"></span><span class="'+thestarsno+'"></span>';
		    break;
		case 5:
		    html='<span class="'+thestars+'"></span><span class="'+thestars+'"></span><span class="'+thestars+'"></span><span class="'+thestars+'"></span><span class="'+thestars+'"></span>';	            
		    break;
	    }
	//$('#thestars').html(html);	
	return html;
}
function showName(name){
	if(name.length==2){
		return name.substr(0,1)+'**';
	}else if(name.length==3||name.length==4){
		return name.match(/^.{1}/)+'**'+name.match(/.{1}$/);
	}else if(name.length>4){
		return (name.match(/^[^\u0000-\u00FF]{1}/)||name.match(/^.{2}/))+'****'+(name.match(/[^\u0000-\u00FF]{1}$/)||name.match(/.{2}$/));
	}else if(!name){
		return '匿名用户';
	}
	return name;
}
