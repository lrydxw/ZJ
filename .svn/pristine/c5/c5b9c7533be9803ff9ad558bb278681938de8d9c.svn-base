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
	var productMenu = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	        this.data = {
				list: [
					{
						title: '概述',
						list: [
							'1.  提供全面的路网数据。',
							'2.  对物流园区、货运市场、集货点的重点标注。',
							'3.  更贴合行业的需求，打造物流专属地图。'
						]
					},
					{
						title: '使用场景',
						list: [
							'1.  提供全面的路网数据。',
							'2.  对物流园区、货运市场、集货点的重点标注。',
							'3.  更贴合行业的需求，打造物流专属地图。</li>'
						]
					}
				]
			}
			this.data.list[this.options.checkedIndex||0].checked='checked';
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
	    	'<div class="right-title">物流地图</div>'+
			'<div class="right-map marT-20"><img src="map.jpg" alt=""></div>'+
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
	        $('.right-bor').html(html);
	    }
	})

	return productMenu;
	
});
