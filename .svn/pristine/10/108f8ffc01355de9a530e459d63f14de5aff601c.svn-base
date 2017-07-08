/**
 * Created by hcm on 15/7/10
 */
//调用
//$('#touxiang').showHeader({ 
// 	src: 'http://file.tf56.com:5683/party/imgs/201509/08/GXTX150908145502.jpg',
// 	clickimg:true,//点击图片是否关闭
//	fun:function(){
//		$('.tf-sh-box').show();
//		$('.tf-sh-bg').show();
//		window.tf56.setOpenFlag('open',"3");
//		_index=3;
//		hideMenu();
//	}
//});

$.fn.showHeader = function () {
    var _this = $(this),
    	_src = '',
        params = arguments[0],
		_clickimg = params.clickimg||true;
    if(typeof params==='object'){
        if(params.init==false){
        	update();
        }else{
        	init();
        }
        
    }
    else if(typeof params==='string'){
        var list = Array.prototype.slice.call(arguments);
        eval(params+'('+list.slice(1)+')');
       //eval(params+'()');
        console.log(params+'('+list.slice(1)+')');
    }
    /*弹出框初始化操作:begin*/
    function init(){
        if(typeof params.src==="string"){
        	_src = params.src;
        }
        //处理点击与长按
        var timeout ;
		var html =	'<div class="tf-sh-box">'+
						'<img class="tf-sh-img" src="'+_src+'"/>'+
					'</div>'+
					'<div  class="tf-sh-bg"></div>';
		$('body').append(html);
		_this.on('click',function(){
			if(typeof params.fun==='function'){
				params.fun.apply($(this));//执行函数，并把指定this
			}
			return false;
		})
		if(_clickimg){
			$('.tf-sh-img').on('click',function(){
				hide();
			})
		}
		$('.tf-sh-bg').on('click',function(){
			hide();
		})
    }
    function update(){
        if(typeof params.src==="string"){
        	_src = params.src;
        	$('.tf-sh-img').attr('src',_src);
        }
       	if(typeof params.fun==='function'){
			_this.unbind();
			_this.on('click',function(){
				params.fun.apply($(this));//执行函数，并把指定this
				return false;
			})
		}
        
    }
    /*弹出框初始化操作:end*/

    /*弹出框函数:begin*/
    function show(){
        if($('.tf-sh-img').attr('src')=='../css/img/hz1-icon.png')return;
        $('.tf-sh-box').css('display','block');
		$('.tf-sh-bg').css('display','block');
    }
    function hide(){
        $('.tf-sh-box').hide();
		$('.tf-sh-bg').hide();
    }
    return _this;
}



