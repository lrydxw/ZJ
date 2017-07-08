$(function(){
	//功能对象
	var helpFun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	         //去除点击等待 基于fastclick.js
			FastClick&&FastClick.attach(document.body);
	        this.imgurl = this.getUrlParam('imgurl');
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
	    	this.initPage();
//	    	var _this = this;//_this方便callback中调用
//	    	$.getJSON("../js/page/p_help.json",function(data){
//				_this.pdata = data;
//				_this.initPage();
//			});
	    },
	    //初始化页面
	    initPage:function(){
	    	var sys =  this.getMobileSystem();
	    	var img = this.imgurl;
//	    	alert(sys)
	    	if(sys.ios==true){
	    		var imgs= img.split('-');
	    		img=imgs[0]+'-ios-'+imgs[1]+'-'+imgs[2];
	    	}
	    	if(img){
//	    		alert(img)
	    		$('.p-img').attr('src',img);
	    	}
	    },
	    getMobileSystem:function () {
	        var u = navigator.userAgent,
	            app = navigator.appVersion;
	        return { //移动终端浏览器版本信息
	            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
	            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
	            iPad: u.indexOf('iPad') > -1 //是否iPad
	        };
	    }
	})
	var helpObj = new helpFun({
		$el:$('.body-content')
	});
})
