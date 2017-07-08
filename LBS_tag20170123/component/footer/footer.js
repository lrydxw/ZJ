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


require( ['jquery','template','base','getJsonp'], function( $,template,transfar,fn ) {
	//功能对象
	var topFun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	        this.data = {
				list: [
					{name:'产品中心',url:'../product/index.html'},
					{name:'解决方案',url:'../solution/index.html'},
					{name:'友情合作',url:'../cooperation/index.html'},
					{name:'关于我们',url:'../aboutUs/index.html'}
				]
			};
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
	    	'<div class="footer-box">'+
				'<i class="footer-img"></i>'+
				'<ul class="footer-menu">'+
					'{{each list as n i}}'+
				        '<li class="d-click" data-url="{{n.url}}">{{n.name}}</li>'+
				   	'{{/each}}'+
				'</ul>'+
				'<div class="footer-recordcode">浙公网安备33010902000631号 | 浙ICP备14026855号-4</div>'+
			'</div>';
	    	var render = template.compile(source);
	        var html = render(this.data);  
	        $('.body-footer').html(html);
	    },
		goUrl:function(e){
			var domThis = $(e.currentTarget);//当前元素
			var dataurl = domThis.attr('data-url');
			if(dataurl&&dataurl!='#'){
				window.location.href = dataurl;
			}
		}
	})
	var topObj = new topFun({
		$el:$('.body-footer')
	});
});
