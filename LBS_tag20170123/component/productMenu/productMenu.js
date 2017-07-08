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
	    	/*data:{
				list: [
					{name:'XXXX',url:'#',checked:''},
				]
			}*///外部调用菜单格式
	        if(this.options.data){
	        	this.data = this.options.data;
	        }else{
	        	return false;
	        }
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
			'<ul class="lt-menu">'+
			    '{{each list as n i}}'+
			        '<li class="d-click {{n.checked}}" data-url="{{n.url}}">{{n.name}}</li>'+
			   ' {{/each}}'+
			'</ul>';
	    	var render = template.compile(source);
	        var html = render(this.data);  
	        $('.left-menu').html(html);
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

	return productMenu;
	
});
