/************banner轮播改视频 舍弃***********/
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
	var bannerFun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	        this.data = {
				list: [
					{imgUrl:'../main/p-banner1.jpg',checked:'checked'},
					{imgUrl:'../main/p-banner2.jpg',checked:''},
				]
			};
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
	        //用于详情
	        this.initData();
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click .tm-switch-point': 'checkedBanner',
	    },
	    checkedBanner:function(e){//选中banner
	    	var domThis = $(e.currentTarget);//当前元素
			var oldIndex = $('.tm-switch-point').index($('.tm-banner-point .checked'));
			var newIndex = $('.tm-switch-point').index(domThis);
			if(newIndex==oldIndex){
				return;
			}
			//动画执行状态
			if(this.moveBz==1)return;
			this.moveBz=1;
			this.bannerSilderTime=new Date().getTime();//刷新自滑动时间
			if(newIndex>oldIndex){
				this.leftFun(oldIndex,newIndex);
			}else{
				this.rightFun(oldIndex,newIndex);
			}
			$('.tm-switch-point').removeClass('checked');
			domThis.addClass('checked');
	    },
		leftFun:function(oldIndex,newIndex){
			var _this = this;
			$('.tm-banner').removeClass('slideOutLeft slideInLeft slideOutRight slideInRight')
	    	$('.tm-banner').eq(oldIndex).addClass('slideOutLeft')
	    	$('.tm-banner').eq(newIndex).addClass('slideInRight checked')
	    	setTimeout(function(){
				$('.tm-banner').eq(oldIndex).removeClass('checked');
				_this.moveBz=0;
			},1000)
		},
		rightFun:function(oldIndex,newIndex){
			var _this = this;
			$('.tm-banner').removeClass('slideOutLeft slideInLeft slideOutRight slideInRight')
	    	$('.tm-banner').eq(oldIndex).addClass('slideOutRight')
	    	$('.tm-banner').eq(newIndex).addClass('slideInLeft checked')
	    	setTimeout(function(){
				$('.tm-banner').eq(oldIndex).removeClass('checked');
				_this.moveBz=0;
			},1000)
		},
		autoLeftFun:function(){
			var _this = this;
			if(_this.moveBz==1)return;
			_this.moveBz=1;
			$('.tm-banner').removeClass('slideOutLeft slideInLeft slideOutRight slideInRight')
			
			var $_bannerList = $('.tm-banner');
			var $_banner=$('.tm-bl .checked');
			var $_point=$('.tm-banner-point .checked');
//			debugger
			//处理滑动
			$_banner.addClass('slideOutLeft');
			$_point.removeClass('checked');
			if($_bannerList.index($_banner)==$_bannerList.length-1){
				$('.tm-switch-point').eq(0).addClass('checked');//选中点
				$('.tm-banner').eq(0).addClass('checked slideInRight');
			}else{
//				debugger
				$_point.next().addClass('checked');//选中点
				$_banner.next().addClass('checked slideInRight');
			}
			setTimeout(function(){
				$_banner.removeClass('checked');
				_this.moveBz=0;
			},1000)
		},
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
	    	var source = 
	    	'<div class="tm-banner-point">'+
				'<div class="tm-bp-list">'+
					'{{each list as n i}}'+
				        '<i class="tm-switch-point {{n.checked}}"></i>'+
				   	'{{/each}}'+
				'</div>'+
			'</div>'+
			'<div class="tm-bl">'+
				'{{each list as n i}}'+
			        '<img class="tm-banner animated {{n.checked}}" src="{{n.imgUrl}}" />'+
			   	'{{/each}}'+
			'</div>';
	    	var render = template.compile(source);
	        var html = render(this.data);  
	        $('.tm-banner-box').html(html);
	    }
	})
	var bannerObj = new bannerFun({
		$el:$('.tm-banner-box')
	});
});
