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
	var rightFotText = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	        if(this.options.data){
	        	this.data = this.options.data;
	        }else{
	        	return false;
	        }
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
			'{{each list as n i}}'+
				'<div class="right-title marT-20">{{n.title}}</div>'+
				'<div class="right-text">'+
					'<ul>'+
						'{{each n.list as m x}}'+
							'<li>{{m}}</li>'+
						'{{/each}}'+
					'</ul>'+
				'</div>'+
			'{{/each}}'
	    	var render = template.compile(source);
	        var html = render(this.data);
	        $('.right-text').html(html);
	    }
	})
	return rightFotText;
	
});
