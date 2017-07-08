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
	var topFun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	        this.data = {
				title: 'LBS-物流地图API',
				list: [
					{name:'首页',url:'../main/index.html',checked:''},
					{name:'产品中心',url:'../product/index.html',checked:''},
					{name:'解决方案',url:'../solution/index.html',checked:''},
					{name:'友情合作',url:'../cooperation/index.html',checked:''},
					{name:'关于我们',url:'../aboutUs/index.html',checked:''}
				]
			};
			this.data.list[this.options.checkedIndex||0].checked='checked';
	        //用于详情
	        this.initData();
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	    	'click .d-click': 'goUrl',
	    },
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
	    	var source = 
	    	'<div class="tf-wrapper bgc-black">'+
				'<div class="th-top tf-layout">'+
					'<i class="th-tflogo"></i>'+
				'</div>'+
			'</div>'+
			'<div class="tf-wrapper">'+
				'<div class="th-top-menu tf-layout">'+
					'<i class="th-logo"></i>'+
					'<h1 class="th-tit">{{title}}</h1>'+
					'<ul class="th-menu">'+
					    '{{each list as n i}}'+
					        '<li class="d-click {{n.checked}}" data-url="{{n.url}}">{{n.name}}</li>'+
					   ' {{/each}}'+
					'</ul>'+
				'</div>'+
			'</div>';
	    	var render = template.compile(source);
	        var html = render(this.data);  
	        $('.body-top').html(html);
	    },
		goUrl:function(e){
//			debugger
			var domThis = $(e.currentTarget);//当前元素
			var dataurl = domThis.attr('data-url');
			if(dataurl&&dataurl!='#'){
				window.location.href = dataurl;
			}
		}
	})
	
	return topFun;
//	var topObj = new topFun({
//		$el:$('.body-top')
//	});
});
