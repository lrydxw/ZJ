/**
 * 认证上传
 * Created by hcm on 15/11/4
 */
//调用 基于整个页面
//$().uploadShow({ 
//	title:'身份证示例',
//	con:'请按此格式拍照，务必内容完整、清晰。',
//	cancelBtn:true,
//	imgSrc:'../css/img/com-sfz-pic.png',
//	btn:[{
//		htmlStr:'拍照',
//		fun:function(){
//			alert(1)
//		}
//	},{
//		htmlStr:'相片选择',
//		fun:function(){
//			alert(2)
//		}
//	}]
//});
/*依赖tf-uploadShow.css*/

$.fn.uploadShow = function () {
    var _this=$(this),
    	_title = '',
    	_con = '',
    	_imgSrc ='',
        params = arguments[0];
    if(typeof params==='object'){//对象执行init
        if(params.init==false){
        	showChange();
        }else{
        	_this = init();
        }
    }else if(typeof params==='string'){//字符串执行对应方法
        var list = Array.prototype.slice.call(arguments);
        eval(params+'('+list.slice(1)+')');
        console.log(params+'('+list.slice(1)+')');
    }
    /*弹出框初始化操作:begin*/
    function init(){
        var btnList = params.btn;
        _title = params.title||'',
    	_con = params.con||'',
    	_imgSrc = params.imgSrc||'';
        if(typeof btnList !="object"||btnList.length<=0){
        	alert('初始化失败！');
        	return;
        }
        var topHtml = '<span class="tf-cancel">取消</span>';
    	if(params.cancelBtn==false){
    		topHtml = '<span class="tf-cancel hid">取消</span>';
    	};
        var tfBtn='';
        for(var i=0;i<btnList.length;i++){
        	var obj = btnList[i];
        	tfBtn = tfBtn+'<div class="tf-btn">'+obj.htmlStr+'</div>';
        }
        var html ='<div class="tf-box">'+
			'<div class="tf-top">'+
				topHtml+
				'<span class="tf-title">'+_title+'</span>'+
			'</div>'+
			'<div class="tf-con">'+
				'<div class="tf-div1">'+_con+'</div>'+
				'<div class="tf-div2">'+
					'<img class="tf-img" src="'+_imgSrc+'"/>'+
				'</div>'+
				tfBtn+
			'</div>'+
		'</div>'+
		'<div class="tf-bg"></div>';
		$('body').append(html);
		//绑定事件
		$('.tf-bg,.tf-cancel').on('click',function(){
			$('.tf-box').hide();
			$('.tf-bg').hide();
		})
		$('.tf-btn').on('click',function(){
			$('.tf-box').hide();
			$('.tf-bg').hide();
			var index = $('.tf-btn').index(this);
			if(typeof btnList[index].fun==='function'){
				btnList[index].fun.apply($(this));//执行函数，并把指定this
			}
		})
		return $('.tf-box');
    }
    /*弹出框初始化操作:end*/
   
	function showChange(){
		var btnList = params.btn;
        _title = params.title||'',
    	_con = params.con||'',
    	_imgSrc = params.imgSrc||'';
	    if(_this.length<=0){
	    	alert('请先初始化！');
        	return;
	    }
	    if(params.cancelBtn==true){
    		_this.find('.tf-cancel').show();
    	}else if(params.cancelBtn==false){
    		_this.find('.tf-cancel').hide();
    	}
	    if(_title)_this.find('.tf-title').html(_title);
	    if(_con)_this.find('.tf-con').html(_con);
	    if(_imgSrc)_this.find('.tf-img').attr('src',_imgSrc);
	    if(typeof btnList =="object"&&btnList.length>0){
        	_this.find('.tf-btn').unbind();
	    	$('.tf-btn').on('click',function(){
				$('.tf-box').hide();
				$('.tf-bg').hide();
				var index = $('.tf-btn').index(this);
				if(typeof btnList[index].fun==='function'){
					btnList[index].fun.apply($(this));//执行函数，并把指定this
				}
			})
        }
	}
    /*弹出框函数:begin*/
    function show(){
        $('.tf-box').show();
		$('.tf-bg').show();
    }
    function hide(){
        $('.tf-box').hide();
		$('.tf-bg').hide();
    }
    return _this;
}



