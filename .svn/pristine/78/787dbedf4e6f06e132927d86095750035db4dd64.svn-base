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
	    	'click .xzqb': 'showColor',
	    },
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
	    	var source = 
	    	'<div class="right-head">行政区别</div>'+
			'<div class="right-map marT-20">'+
				'<div class="right-fillimg">'+
					'<ul class="right-qh">'+
						'<li class="xzqb li1"><i></i>华东大区</li>'+
						'<li class="xzqb li2"><i></i>北京直辖城市</li>'+
						'<li class="xzqb li3"><i></i>华北大区</li>'+
						'<li class="xzqb li4"><i></i>上海直辖城市</li>'+
						'<li class="xzqb li5"><i></i>西南大区</li>'+
						'<li class="xzqb li6"><i></i>杭州直辖城市</li>'+
					'</ul>'+
					'<iframe id="chinaMap" src="chinaMap.svg"></iframe>'+
				'</div>'+
			'</div>';
	    	var render = template.compile(source);
	        var html = render(this.data);
	        $('.right-dom').html(html);
	    },
	    showColor:function(e){
	    	var domThis = $(e.currentTarget);//当前元素
	    	var index = $('.xzqb').index(domThis);
	    	var colorStr = domThis.find('i').css('backgroundColor');
	    	var classList=['.hddq','.bjzx','.hbdq','.shzx','.xndq','.hzzx']
	    	var $_svg = $($('#chinaMap')[0].getSVGDocument());
	    	$_svg.find('.svgB').css('fill','#9D9D9D');
//	    	$_svg.find('.svgC').css('fill','#666666');//有白边文字颜色不需要与背景色区分
	    	$_svg.find(classList[index]).css('fill',colorStr);
	    }
	})
	return page;
	
});
