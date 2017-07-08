$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	    	this.init();
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click .qa-tool': 'showCont',
	    },
	    //自定义方法
	    //demo方法 详情型
	    init:function(){
	    	var base=new transfar.Base();
	    	var type=base.getUrlParam("type")||0
	    	setTimeout(function(){
	    		$(".qa-tool").eq(type).click();
	    	},100)
	    },
	    showCont:function(e){
	    	var $this=$(e.currentTarget);
	    	if($this.hasClass("qa-on")){
	    		$this.removeClass("qa-on")
	    		$this.next(".qa-cont").removeClass("qa-cont-show")
	    	}else{
	    		$this.addClass("qa-on")
	    		$this.next(".qa-cont").addClass("qa-cont-show")

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