/**
 * Created by xiezd on 15/4/21.
 */

$.fn.tfpop = function () {
    var _this = $(this),
        params = arguments[0];
    if(typeof params==='object'){
        init();
    }
    else if(typeof params==='string'){
        var list = Array.prototype.slice.call(arguments);
        eval(params+'('+list.slice(1)+')');
    }
    /*弹出框初始化操作:begin*/
    function init(){
        var html = '<div class="tf-pop_content">';
        if(typeof params.title==="string"){
            var iconClass = '',
                title = params.title.replace(/#/g,'<span class="tf-pop-orange"></span>');
            if(typeof params.icon==="string")
                iconClass = params.icon;
            html += '<div class="tf-pop_title"><i class="' + iconClass + '"></i><span>'+ title +'</span></div>';
        }

        if(typeof params.type==="string"){
            var pwdString = '<div class=tf-pop-pwd id=J_pop_pwd style="margin: 16px 16px 22px 16px;"><input type=tel class=psw_input maxlength=6 autofocus autocomplete=off><div class=psw_div><div class=psw_div1><i class="psw_point hid"></i></div><div class=psw_div1><i class="psw_point hid"></i></div><div class=psw_div1><i class="psw_point hid"></i></div><div class=psw_div1><i class="psw_point hid"></i></div><div class=psw_div1><i class="psw_point hid"></i></div><div class=psw_div1><i class="psw_point hid"></i></div></div></div>';
            if(params.type==='pwd'){
                html += pwdString;
            }
            else if(params.type==='pwdWithAmonut'){
                html += '<div class="tf-pop-num" style="color:#ff6230;">&yen;&nbsp;<span class="tf-pop-orange">#</span></div>';
                html += pwdString;
            }
        }

        var btn,len;
        if(params.footer instanceof Array){
            btn = params.footer,
                len = btn.length;
            html += '<div class="tf-pop_foot">';
            if(len===1){
                html += '<div class="tf-pop_btn" style="width: 100%;border-right: none;">' + btn[0].text + '</div>';
            }
            else if(len===2){
                html += '<div class="tf-pop_btn">' + btn[0].text + '</div>';
                html += '<div class="tf-pop_btn">' + btn[1].text + '</div>';
            }
            html += '</div>';
        }
        _this.addClass('tf-pop_ground');
        html+= "</div>";
        _this.html(html);

        //初始化操作
        if(typeof params.type==="string"&&(params.type==='pwd'||params.type==='pwdWithAmonut')){
            inputPwdInit();
            _this.find('.tf-pop_content').css('background-color','#f7f7f7').css('top','50px');
        }
        //是否默认打开弹出框
        if(!params.open){
            _this.hide();
        }

        //为底部btn添加事件
        _this.find('.tf-pop_btn').each(function(i,obj){
            if(typeof btn[i].click==='function'){
                $(this).on('click',btn[i].click);
            }
            else{
                $(this).on('click',function(){
                    _this.hide();
                });
            }
        });
    }
    /*弹出框初始化操作:end*/

    /*弹出框函数:begin*/
     function show(){
         $('.tf-pop_ground').hide();
         _this.find('.psw_input').val('');
         _this.find('.psw_point').addClass('hid');
         _this.show();
     }
    function hide(){
        _this.hide();
    }
    //填出页面预留的#
    //用法 obj.tfpop('fill',[1,2]);
    function fill(){
        var ar = Array.prototype.slice.call(arguments);
        _this.find('.tf-pop-orange').each(function (i,obj) {
            $(this).text(ar[i]||'');
        })
    }
    /*弹出框函数:end*/

    //关闭密码框
    function closePwdDiv(){
        _this.find('.psw_input').val('');
        _this.find('.psw_point').addClass('hid');
        _this.css('display','none');
    }

    function closeAll(){
        $('.tf-pop_ground').hide();
        _this.find('.psw_input').val('');
        _this.find('.psw_point').addClass('hid');
    }

    /*inputPwdInit:初始化密码输入框:begin*/
    function inputPwdInit(){
        $('.psw_input').on('click',function(){
            var psw = $('.psw_input').val();
            $('.psw_input').val(psw);
            $('.psw_input').focus();
            var num = (psw.length-1)*17;
            if(num==0){
                num=5
            }
            $('.psw_input').css('padding-left',num+'%');
            setTimeout(function(){
                $('.psw_input').css('padding-left','10px');
            },4000);
        })
        $('.psw_input').on('input', showPoint);
        function showPoint(){
            var psw = $('.psw_input').val();
            if(isNaN(psw)||psw.match(/[.]/)){
                window.tf56&&window.tf56.alertMessage("支付密码只能是数字！");
                $('.psw_input').val(psw.replace(/[^\d]/g,''));
            }
            var len = 6-$('.psw_div1 .hid').length;
            if(len>psw.length){
                $($('.psw_point')[len-1]).addClass('hid');
                showPoint();
            }else if(len<psw.length){
                $($('.psw_point')[len]).removeClass('hid');
                showPoint();
            }else{
                if(psw.length==6){
                    if($('.psw_input').hasClass('ing'))return;
                    $('.psw_input').addClass('ing');
                }
                return;
            }
        }
    }
    /*inputPwdInit:初始化密码输入框:end*/
    return _this;
}



