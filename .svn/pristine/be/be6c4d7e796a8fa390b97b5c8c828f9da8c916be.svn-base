require.config({
    baseUrl: "../../common",
    paths: {
        'jquery': 'js/lib/jquery-1.11.3.min',
        'template': 'js/lib/template',
        'base': 'js/weiget/base',
        'getJsonp': 'js/weiget/getJsonp',
        'lbsSiteView': 'js/weiget/lbsSiteView'
    },
    shim : {
        'template': ['jquery']
    }
});

define(['jquery','template','base','getJsonp','lbsSiteView'],  function( $,template,transfar,fn,lbsSiteView) {
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
	    	'click .mess-sub': 'saveMessage',
	    	'click .mess-res': 'resetMessage',
	    	'focus #mess-title input': 'valueNone',
	    	'focus #mess-text textarea': 'valueNone',
	    	'focus #mess-phone input': 'valueNone',
	    },
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
	    	var source = 
	    	'<div class="right-head">意见反馈</div>'+
	    	'<div class="message-tl">意见标题</div>'+
	    	'<div class="message-bor" id="mess-title">'+
				'<input type="text" placeholder="请输入意见标题" />'+
	    	'</div>'+
	    	'<div class="message-tl">意见内容</div>'+
	    	'<div class="message-bor" id="mess-text">'+
	    		'<textarea name="message" rows="10" cols="30" placeholder="您的每一个意见都十分的宝贵"></textarea>'+
	    	'</div>'+
	    	'<div class="message-tl">联系方式</div>'+
	    	'<div class="message-bor" id="mess-phone">'+
				'<input type="text" placeholder="留下您的手机号，或者是邮箱。方便我们联系您" />'+
	    	'</div>'+
	    	'<div class="message-button">'+
		    	'<input type="submit" value="提交" class="mess-sub" />'+
		    	'<input type="reset" value="取消" class="mess-res" />'+
	    	'</div>'

	    	var render = template.compile(source);
	        var html = render(this.data);
	        $('.right-dom').html(html);

	        this.messTitle = $('#mess-title').find('input');
	        this.messText = $('#mess-text').find('textarea');
	        this.messPhone = $('#mess-phone').find('input');

	    },
	    saveMessage:function(){
	    	var phoneVal = this.messPhone.val();

	    	if(this.messTitle.val() == ''){
	    		$('#mess-title').addClass('sh');
	    		this.messTitle.addClass('red');
	    		return false;
	    	}
	    	if(this.messText.val() == ''){
	    		$('#mess-text').addClass('sh');
	    		this.messText.addClass('red');
	    		return false;
	    	}
	    	if(!(/^1\d{10}$/.test(phoneVal)) && !(/^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/.test(phoneVal))){
	    		$('#mess-phone').addClass('sh');
	    		this.messPhone.addClass('red');
	    		return false;
	    	}

	    	var param = {
				url: lbsSiteView.apiUrl.uploadData,
				type: 'post',
				dataType: 'json',
				data: {
					title: this.messTitle.val(),
					content: this.messText.val(),
					contacts: this.messPhone.val()
				},
				callback: function(data) {
					if (data.result != 'success') {
						alertMsg(data.msg);
						return;
					} else {
						alert('留言成功')
					}
				}
			};
	    	fn.getJsonp(param);
	    },
	    resetMessage:function(e){
	    	$('.message-bor').children().val('');
	    },
	    valueNone:function(e){
	    	var domThis = $(e.currentTarget);
	    	if(domThis.attr('class') == 'message-bor sh'){
	    		domThis.removeClass('sh');
	    		domThis.children().val('');
	    		domThis.children().removeClass('red');
	    	}
	    },
	})
	return page;
	
});