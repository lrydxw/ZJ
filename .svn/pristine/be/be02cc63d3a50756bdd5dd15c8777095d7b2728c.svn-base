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
        'rightFotText': '../component/product/rightFotText',
        'productWldt': '../component/product/productWldt',
        'productClgj': '../component/product/productClgj',
        'productXzqb': '../component/product/productXzqb',
        'productPoi': '../component/product/productPoi',
        'productHcdh': '../component/product/productHcdh',
        'productJzdw': '../component/product/productJzdw',
        'productDzwl': '../component/product/productDzwl',
        'productDzjx': '../component/product/productDzjx',
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


require( ['jquery','template','base','getJsonp','header','footer','productMenu','rightFotText','productWldt','productClgj','productXzqb','productPoi','productHcdh','productJzdw','productDzwl','productDzjx'], function( $,template,transfar,fn,topFun,footer,productMenu,rightFotText,productWldt,productClgj,productXzqb,productPoi,productHcdh,productJzdw,productDzwl,productDzjx) {	
	var page =  parseInt(fn.getParamVal('index')) || 0;

	var textList = [
		{
			list:[{
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
					'3.  更贴合行业的需求，打造物流专属地图。'
				]
			}]
		},{
			list:[{
				title: '概述',
				list: [
					'1.  轨迹的形成和绘制，轨迹纠偏等。',
					'2.  结合业务场景，离线查看和使用轨迹。',
					'3.  风险控制，进行数据分析。'
				]
			},
			{
				title: '使用场景',
				list: [
					'1.  查看轨迹：在货运过程中实时轨迹的查看及离线轨迹的查看。',
					'2.  轨迹分析：轨迹大数据展示，根据常用路线的分析，推荐最优选择。',
					'3.  轨迹服务：轨迹纠偏，里程计算，驾驶行为分析等。'
				]
			}]
		},{
			list:[{
				title: '概述',
				list: [
					'1.  轨迹的形成和绘制，轨迹纠偏等。',
					'2.  结合业务场景，离线查看和使用轨迹。',
					'3.  风险控制，进行数据分析。'
				]
			},
			{
				title: '使用场景',
				list: [
					'1.  查看轨迹：在货运过程中实时轨迹的查看及离线轨迹的查看。',
					'2.  轨迹分析：轨迹大数据展示，根据常用路线的分析，推荐最优选择。',
					'3.  轨迹服务：轨迹纠偏，里程计算，驾驶行为分析等。'
				]
			}]
		},{
			list:[{
				title: '概述',
				list: [
					'1.  提供丰富有效的的POI信息点。',
					'2.  对POI信息点的采集，交流和确认，提供奖励政策。',
					'3.  有效利用POI信息点提供服务。'
				]
			},
			{
				title: '使用场景',
				list: [
					'1.  POI信息点的采集：用户在使用产品中具体标注公司，活动范围位置。',
					'2.  POI信息点的使用：对有效POI信息点进行筛选，为用户的周边提供更多生活服务。',
				]
			}]
		},{
			list:[{
				title: '概述',
				list: [
					'1.  拥有货运属性的货车导航，结合实时路况，规划最优路线。',
					'2.  智能规划路线，多点路径的规划及导航。',
					'3.  采集更多的有效数据。'
				]
			},
			{
				title: '使用场景',
				list: [
					'1.  货车导航：为司机提供清晰明确的的路线，优化服务质量。',
					'2.  数据的采集：提供服务的同时，丰富数据的采集与应用。',
				]
			}]
		},{
			list:[{
				title: '概述',
				list: [
					'1.  获取用户实时位置信息，以便提供服务，信息的及时推送。',
					'2.  了解用户分布情况，通过数据分析，实现高效的资源配置。',
					'3.  实时的监控，实现运力的高效调度。'
				]
			},
			{
				title: '使用场景',
				list: [
					'1.  实时位置的展示及分享：分享实时位置，记录并展示运行轨迹。',
					'2.  定位服务：为第三方提供定位服务，对运输全过程的有效把控。',
				]
			}]
		},{
			list:[{
				title: '概述',
				list: [
					'1.  地理区域被网格化，根据一个地理区域内的业务聚类的，而不是纯粹的经纬度和城市地图的匹配。',
					'2.  电子围栏判断，满足条件后触发一系列活动，区域范围内的通知和提醒。'
				]
			},
			{
				title: '使用场景',
				list: [
					'1.  判断位置：在司机达到指定区域后，自动提醒装卸货服务。',
					'2.  触发条件：各类活动的通知，禁止条件的提示，位置变化导致的价格变化。',
				]
			}]
		},{
			list:[{
				title: '概述',
				list: [
					'1.  地理编码和逆地理编码，实现坐标经纬度和地址名称间相互转换。',
				]
			},
			{
				title: '使用场景',
				list: [
					'1.  逆地址解析：坐标位置的描述，由坐标到坐标所在位置的文字描述的转换，输入坐标返回地理位置信息和附近poi列表。',
					'2.  地址解析：地址转坐标，地址描述到所述位置坐标的转换。',
				]
			}]
		}
	]
	//初始化头部
    var topObj = new topFun({
		$el:$('.body-top'),
		checkedIndex:1 //选中菜单
	});

	var leftObj = new productMenu({
		$el:$('.left-menu'),
		checkedIndex:page, //选中菜单
		data:{
			list: [
				{name:'物流地图',url:'./index.html?index=0',checked:''},//wldt
				{name:'车辆轨迹',url:'./index.html?index=1',checked:''},//clgj
				{name:'行政区别',url:'./index.html?index=2',checked:''},//xzqb
				{name:'POI信息点',url:'./index.html?index=3',checked:''},//poi
				{name:'货车导航',url:'./index.html?index=4',checked:''},//hcdh
				{name:'基站定位',url:'./index.html?index=5',checked:''},//jddw
				{name:'电子围栏',url:'./index.html?index=6',checked:''},//dzwl
				{name:'地址解析',url:'./index.html?index=7',checked:''},//dzjx
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
	    	var rightFotTextObj = new rightFotText({
				$el:$('.right-text'),
				data: textList[page]
			});
	    	switch(page){
	    		case 0:
				var productWldtObj = new productWldt({
					$el:$('.right-dom')
				});
				break;

				case 1:
				var productClgjObj = new productClgj({
					$el:$('.right-dom')
				});
				break;

				case 2:
				var productXzqbObj = new productXzqb({
					$el:$('.right-dom')
				});
				break;

				case 3:
				var productPoiObj = new productPoi({
					$el:$('.right-dom')
				});
				break;

				case 4:
				var productHcdhObj = new productHcdh({
					$el:$('.right-dom')
				});
				break;

				case 5:
				var productJzdwObj = new productJzdw({
					$el:$('.right-dom')
				});
				break;

				case 6:
				var productDzwlObj = new productDzwl({
					$el:$('.right-dom')
				});
				break;

				case 7:
				var productDzjxObj = new productDzjx({
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
