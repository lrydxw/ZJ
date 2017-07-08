﻿$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	    	//this.activeRule();
	    	//this.heartBeat();
	    	this.base=new transfar.Base();
	    	this.type=this.base.getUrlParam("type");
	    	this.from=this.base.getUrlParam("from");
	    	this.name=this.base.getUrlParam("name");

	    	if(this.type=="share"||this.from){
	    		$("#shareBox").show();
	    		$(".stageInv").html(unescape(this.name))
	    	}else{
	    		$("#stageBox").show();
	    	}
	    },
	    events: {
	    //添加事件（基于委托，绑定动态加载元素）
	        'click #activeRule': 'activeRule'
	        ,'click #ruleClose':"ruleClose"
	        ,"click #applyLink":"applyDetail"
	        ,"click #joinLink":"joinDetail"
	    },
	    activeRule:function(){
	    	this.modalShow("<img src='./statics/rule-text.png'>")
	    },
	    applyDetail:function(){
	    	this.modalShow("<img src='./statics/apply-text.png'>")
	    },
	    joinDetail:function(){
	    	this.modalShow("<img src='./statics/join-text.png'>")
	    },
	    heartBeat:function(){
	    	//心跳
	    	setInterval(function(){
	    		if($("#activeRule").css("width")=="66px"){
	    			$("#activeRule").css("width","73px")
	    		}else{
	    			$("#activeRule").css("width","66px")
	    		}
	    	},300);
	    },
	    modalShow:function(content){
	    	//活动规则弹窗
	    	var winHeight=$(window).height();
	    	var html='\
	    		<div id="ruleBox"  style="height:'+winHeight+'px">\
	    			<div class="rule-bg"></div>\
		    		<div id="ruleClose" class="rule-close"><img src="./statics/closed.png" alt="" /></div>\
		    		<div class="rule-cont" style="height:'+winHeight*0.6+'px;margin-top:'+winHeight*0.2+'px">'+content+'</div>\
	    		</div>\
	    		';

	    		$("#ruleBox").remove();
	    		this.$el.append(html);
	    },
	    ruleClose:function(){
	    	//关闭活动规则弹窗
	    	$("#ruleBox").hide();
	    }
	})
	var obj = new objfun({
		$el:$('.body-content')
	});
})