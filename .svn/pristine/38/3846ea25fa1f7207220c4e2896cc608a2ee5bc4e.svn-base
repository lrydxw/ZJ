require.config({
    baseUrl: "../../common",
    paths: {
        'jquery': 'js/lib/jquery-1.11.3.min',
        'template': 'js/lib/template',
        'base': 'js/weiget/base',
        'getJsonp': 'js/weiget/getJsonp',
        'header': '../component/header/header',
        'footer': '../component/footer/footer',
        'productMenu': '../component/productMenu/productMenu',
        'aboutText': '../component/aboutUs/aboutText',
        'contact': '../component/aboutUs/contact',
        'message': '../component/aboutUs/message',
    },
    map  : {
        '*': {
            'css' : 'js/lib/css.min'
        }
    },
    /**
     * 样式按照需要加载加载 键值名和加载模块的名称一致，目的是加载模块时加载对应的css样式
     */
    shim : {
        'template': ['jquery'],
        'header': ['css!../component/header/main.css'],
        'footer': ['css!../component/footer/main.css'],
        'productMenu': ['css!../component/productMenu/main.css'],
    }
});


require( ['jquery','template','base','getJsonp','header','footer','productMenu','aboutText','contact','message'], function( $,template,transfar,fn,topFun,footer,productMenu,aboutText,contact,message) {	
	var page =  parseInt(fn.getParamVal('index')) || 0;
	//初始化头部
    var topObj = new topFun({
		$el:$('.body-top'),
		checkedIndex:4 //选中菜单
	});

	var leftObj = new productMenu({
		$el:$('.left-menu'),
		checkedIndex:page, //选中菜单
		data:{
			list: [
				{name:'关于我们',url:'./index.html?index=0',checked:''},//about
				{name:'联系我们',url:'./index.html?index=1',checked:''},//contact
				{name:'意见反馈',url:'./index.html?index=2',checked:''}//message
			]
		}
	});
	
	//功能对象
	var mainFun = transfar.Base.extend({		
	    //初始化
	    initialize: function () {
	        this.data = {
				
			};
	        //用于详情
	        this.initData();
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
//	        'click .tm-problem-btn': 'checkBtn'
	    },
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
			switch(page){
	    		case 0:
				var aboutTextObj = new aboutText({
					$el:$('.right-dom')
				});
				break;

				case 1:
				var contactObj = new contact({
					$el:$('.right-dom')
				});
				break;

				case 2:
				var messageObj = new message({
					$el:$('.right-dom')
				});
				break;
	    	}
	    },
	})
	var mainObj = new mainFun({
		$el:$('.body-main')
	});
});

