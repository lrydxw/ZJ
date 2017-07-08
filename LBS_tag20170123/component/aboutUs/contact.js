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
	    	//'click .d-click': 'goUrl',
	    },
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
	    	var source = 
	    	'<div class="right-head">公司位置</div>'+
	    	'<div class="au-con marT-20">'+
				'<div class="au-box"><div id="allmap"></div></div>'+
				'<div class="au-box"></div>'+
				'<div class="au-box"></div>'+
			'</div>'+
			'<div class="about-text">'+
				'<p>公司地址：<span style="color:#151515">浙江省杭州市萧山区钱江世纪城民和路945号传化大厦</span>'+	
				'<p>邮政编码：<span style="color:#151515">311200</span></p>'+	
			'</div>'

	    	var render = template.compile(source);
	        var html = render(this.data);
	        $('.right-dom').html(html);

	        // 百度地图API功能
			var map = new BMap.Map("allmap");
			map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
			var point = new BMap.Point(120.247204,30.246152);
			var marker = new BMap.Marker(point);  // 创建标注
			map.addOverlay(marker);              // 将标注添加到地图中
			map.centerAndZoom(point, 18);
			var opts = {
			  width : 280,     // 信息窗口宽度
			  height: 50,     // 信息窗口高度
			  title : "传化大厦" , // 信息窗口标题
			  enableMessage:true,//设置允许信息窗发送短息
			  message:"传化！你的家~"
			}
			var infoWindow = new BMap.InfoWindow("地址：杭州市萧山区民和路民和路945号", opts);  // 创建信息窗口对象 
			marker.addEventListener("click", function(){          
				map.openInfoWindow(infoWindow,point); //开启信息窗口
			});
	    }
	})
	return page;
	
});