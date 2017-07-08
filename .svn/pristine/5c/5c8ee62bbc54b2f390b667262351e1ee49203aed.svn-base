require.config({
    baseUrl: "../../common",
    paths: {
        'jquery': 'js/lib/jquery-1.11.3.min',
        'template': 'js/lib/template',
        'base': 'js/weiget/base',
        'getJsonp': 'js/weiget/getJsonp'
    },
    shim : {
        'template': ['jquery']
    }
});

define(['jquery','template','base','getJsonp'],  function( $,template,transfar,fn ) {
	//功能对象
	var page = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	        this.data = {};
	        //用于详情
	        this.initData();
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	    	//'click .d-click': 'goUrl',
	    },
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
	    	var source = 
	    	'<div class="right-head">地址解析</div>'+
			'<div class="right-map marT-20"><img src="jieximap.png" alt=""></div>'
	    	var render = template.compile(source);
	        var html = render(this.data);
	        $('.right-dom').html(html);
	    }
	})
	return page;
	
});
