﻿require.config({
    baseUrl: "../../common",
    paths: {
        'jquery': 'js/lib/jquery-1.11.3.min',
        'template': 'js/lib/template',
        'base': 'js/weiget/base',
        'getJsonp': 'js/weiget/getJsonp',
        'header': '../component/header/header',
        'footer': '../component/footer/footer',
        'banner': '../component/main/banner'
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
        'banner': ['css!../component/main/banner.css'],
    }
});


require( ['jquery','template','base','getJsonp','header','footer'], function( $,template,transfar,fn,topFun,footer) {	
	//初始化头部
    var topObj = new topFun({
		$el:$('.body-top'),
		checkedIndex:2 //选中菜单
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
	    	
	    },
	})
	var mainObj = new mainFun({
		$el:$('.body-main')
	});
});
