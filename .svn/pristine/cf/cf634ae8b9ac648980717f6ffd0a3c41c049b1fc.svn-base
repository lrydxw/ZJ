require.config({
    baseUrl: "../../common",
    paths: {
        'jquery': 'js/lib/jquery-1.11.3.min',
        'template': 'js/lib/template',
        'base': 'js/weiget/base',
        'getJsonp': 'js/weiget/getJsonp',
        'header': '../component/header/header',
        'footer': '../component/footer/footer'
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
    }
});


require( ['jquery','template','base','getJsonp','header','footer'], function( $,template,transfar,fn,topFun,footer) {	
	//初始化头部
    var topObj = new topFun({
		$el:$('.body-top'),
		checkedIndex:3 //选中菜单
	});
	
	//功能对象
	var mainFun = transfar.Base.extend({		
	    //初始化
	    initialize: function () {
	        this.bannerSilderTime=new Date().getTime();//设置刷新时间
			//自动滚动
	        var _this = this;
	        setInterval(function(){
	        	var nowTemp = new Date().getTime();
//	        	debugger
	        	if(nowTemp-_this.bannerSilderTime>=5000){
//	        		console.log(nowTemp/1000)
	        		_this.autoLeftFun()
	        		_this.bannerSilderTime=nowTemp;
	        	}
	        },1000)
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
//	        'click .tm-problem-btn': 'checkBtn'
	    },
	    autoLeftFun:function(){
			var _this = this;
			if(_this.moveBz==1)return;
			_this.moveBz=1;
			$('.shortScreen').removeClass('fadeOutLeft fadeInLeft fadeOutRight fadeInRight')
			
			var $_bannerList = $('.shortScreen');
			var $_banner=$('.image .checked');
//			debugger
			//处理滑动
			$_banner.addClass('fadeOutLeft');
			if($_bannerList.index($_banner)==$_bannerList.length-1){
				$_bannerList.eq(0).addClass('checked fadeInRight');
			}else{
//				debugger
				$_banner.next().addClass('checked fadeInRight');
			}
			setTimeout(function(){
				$_banner.removeClass('checked');
				_this.moveBz=0;
			},1000)
		},
	})
	var mainObj = new mainFun({
		$el:$('.body-main')
	});
});
