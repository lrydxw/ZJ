$(function(){
	//功能对象
	var helpFun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	         //去除点击等待 基于fastclick.js
			FastClick&&FastClick.attach(document.body);
	        this.titNum = this.getUrlParam('titNum')-1;
	        this.type = this.getUrlParam('type');
	        this.pdata = {};
	        //用于详情
	        this.initData();
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click .p-li': 'checkShow'
	    },
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
	    	var _this = this;//_this方便callback中调用
	    	var url = "../js/page/p_help.json";//默认司机
	    	if(this.type==0){//司机
	    		url = "../js/page/p_help.json";
	    	}else if(this.type==1){//货主
	    		url = "../js/page/p_help1.json";
	    	}
	    	$.getJSON(url,function(data){
				_this.pdata = data;
				_this.initPage();
			});
	    },
	    //初始化页面
	    initPage:function(){
	    	var hotquestion = this.pdata.hotquestion;
	    	var allquestion = this.pdata.allquestion;
	    	var question = allquestion[this.titNum];
	    	var title = question.title;
	    	$('.p-tit').text(title);
	    	var hotHtml='';
	    	for(var i=0;i<question.data.length;i++){
	    		var r = question.data[i];
	    		hotHtml = hotHtml +
	    			'<div class="p-li" imgurl="'+r.imgurl+'">'+
                		'<p class="p-question"><i class="help-go"></i>'+r.quest+'</p>'+
                		'<p class="p-con">'+r.con+'</p>'+
                	'</div>';
	    	}
	    	$('.p-data').eq(0).html(hotHtml);
	    },
		checkShow:function(e){
			var domThis = $(e.currentTarget);//当前元素
			var imgurl = domThis.attr('imgurl');
			if(imgurl){
				window.location.href='p_helpDetail.html?imgurl='+imgurl;
				return;
			}
			var domi = domThis.find('.p-question i');
			if(domi.hasClass('help-go')){
				domi.removeClass();
				domi.addClass('help-down');
				domThis.children('.p-con').show();
			}else{
				domi.removeClass();
				domi.addClass('help-go');
				domThis.children('.p-con').hide();
			}
		},
		goList:function(e){
			var domThis = $(e.currentTarget);//当前元素
			var titNum = domThis.attr('titNum');
			alert(titNum)
		}
	})
	var helpObj = new helpFun({
		$el:$('.body-content')
	});
})
