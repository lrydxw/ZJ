/**
 * @file 文件说明
 * @author XieZhendong
 * @date 15/7/13
 */
(function(){
    var inviteCode = $('#J_invitecode'),
        sureBtn = $('#J_sure_btn');
    inviteCode.on('input',function(){
        var val = inviteCode.val(),
            val = $.trim(val);
        if(val!=''&&val.length==6){
            sureBtn.removeClass('black');
        }else{
            sureBtn.addClass('black');
        }
    });

    sureBtn.on('click',function(){
        var _this = $(this);
        if(_this.hasClass('black'))
            return;
        sendInviteCode();
    });

    function sendInviteCode(){
        var invitationcode = $.trim(inviteCode.val());
        var param = {};
        param.url = apiUrl.inputUsedInvitationCode + getEnd;
        param.data={
        	'invitationcode':invitationcode,
        	'isauthflag':'1'
        }
        param.callback = function(r){
            var status = r.result;
            if(status!='success'){
                alertMsg(r.msg);
            }else{
              alertMsg('认证邀请码成功！');
              //location.href = 'my_Promotion.html';
            //    backFun();
			   window.tf56&&window.tf56.finishPage&&window.tf56.finishPage()
            }
        };
        getJsonp(param);
    }
})();
