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
	    	'<div class="right-head">集团介绍</div>'+
			'<div class="about-text">'+
				'<p>&nbsp;&nbsp;&nbsp;&nbsp;传化集团创建于1986年，是知名的多元化现代民营企业集团,致力于化工、物流、农业、科技城、投资等事业领域。位列<span style="color:#151515">“中国企业500强”、“中国民营企业500强”、“中国最具价值品牌500强”</span>。</p></br>'+	
				'<p>&nbsp;&nbsp;&nbsp;&nbsp;传化集团现拥有“传化智联”（002010）、“新安股份”（600596）两家上市公司和“环特生物”（834413） 一家新三板挂牌公司、七家国家高新技术企业、两家国家级技术中心。</p></br>'+	
				'<p>&nbsp;&nbsp;&nbsp;&nbsp;传化人秉承<span style="color:#000000">“责任、诚信、务实、共赢”</span>的价值观，以<span style="color:#151515">“幸福员工、成就客户、引领产业”</span>为共同使命，长期立足于具有发展潜力的产业领域，通过创造充满活力的创新企业，为员工和客户建设共同发展的事业平台，致力于成为推动社会进步的重要力量。</p>'+	
			'</div>'
	    	var render = template.compile(source);
	        var html = render(this.data);
	        $('.right-dom').html(html);
	    }
	})
	return page;
	
});