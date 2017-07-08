/**
 * @file 文件说明
 * @author XieZhendong
 * @date 15/9/14
 */
hideMenu();
var _partyid=window.tf56 && window.tf56.getPartyId();
var mobile = '';
$('.on-bt').on('touchstart',function(){
	var fDom =$(this).parent().parent().children('.i-footer');
	if(!$(this).hasClass('off-bt')){
		$(this).addClass('off-bt');
		if(fDom.length>0){
			$('.clear').hide();
			fDom.hide();
			openGoodsVoice('false','00:00','00:00');
		}else{
			openTradeVoice('false');
		}
	}else{
		$(this).removeClass('off-bt');
		if(fDom.length>0){
			$('.clear').show();
			fDom.show();
			var times = $('.if-time').text().split('-');
			openGoodsVoice('true',times[0],times[1]);
		}else{
			openTradeVoice('true');
		}
	}
})
//货源提醒
function openGoodsVoice(state,time1,time2){
	if(time1>time2){
		alertMsg("开始时间不能大于结束时间！")
		return
	}
	window.tf56 && window.tf56.openGoodsVoice(state, time1,time2);
}
//运单提醒
function openTradeVoice(state){
	window.tf56 && window.tf56.openTradeVoice(state);
}
initVoice();
function initVoice(){
	var voice = window.tf56 && window.tf56.getVoiceMsg();
//	voice = '{"goodsVoice":"true","goodsStartTime":"08:20","goodsEndTime":"19:40","tradeVoice":"false"}';
	if(voice){
		voice = JSON.parse(voice);
		if(voice.goodsVoice=="true"){
			$('.on-bt').eq(0).removeClass('off-bt');
			$('.if-time').text(voice.goodsStartTime+"-"+voice.goodsEndTime);
			$('.clear').show();
			$('.i-footer').show();
			var goodsStartTimes = voice.goodsStartTime.split(":");
			var goodsEndTimes = voice.goodsEndTime.split(":");
			$('.if-time').attr("value",goodsStartTimes[0]+'+'+goodsStartTimes[1]+'+'+goodsEndTimes[0]+'+'+goodsEndTimes[1]);
		}
		if(voice.tradeVoice=="true"){
			$('.on-bt').eq(1).removeClass('off-bt');
		}
	}
}
var J_noMobile = $('#J_noMobile').tfpop({
    title: '您的帐号尚未绑定手机号，可能存在风险!',
    open: false,
    footer: [
        {
            text: '以后再说'
        },
        {
            text: '立即绑定',
            click: function(){
                location.href = 'my_bindphone1.html?jumpfrom=fg_logistics&jumpto=my_setApp';
            }
        }
    ]
});

var J_dw = $('#J_dw');

//是否显示一键开通定位
function init() {
    var S = window.tf56;
    mobile = S && S.getMobilenumber();
//  mobile = '17757188050';
//  _partyid = '565617305';
    //1.是否绑定手机号码
    if (!mobile) {
        J_noMobile.tfpop('show');
        return;
    }
    //2.查询是否在白名单中
    var ajaxConfig = {
        url: apiUrl.queryLocationOffer,
        data: {
            'mobile': mobile
        },
        callback: function (data) {
            //yes
            if (data.result == 'success') {
                $('#J_dw .i-right').html('<span class="dw-span mr15">已开通</span></i>');
                J_dw.on('click', function () {
                    alertMsg('已开通');
                });
            } else {
                //发送授权短信
                setTimeout(function () {
                    $('#J_dw .i-right').html('<span class="dw-span">待开通</span><i class="go-icon">');
                    sendMsg();
                }, 50);
            }
        },
        errorCallback: function (e) {
//          alertMsg('网络异常');
            $('#J_dw .i-right').html('<span class="dw-span mr15">点击重试</span>');
            J_dw.on('click', function () {
                location.reload();
            });
        }
    }
    getJsonp(ajaxConfig);

    //发送授权短信
    function sendMsg() {
        var config = {
            url: apiUrl.sendLocationOffer,
            data: {
                'mobile': mobile,
                'partyid':_partyid
            },
            callback: function (data) {
                //if (data.result == 'success') {
                //    J_dw.show();
                //}
                //else {
                //    J_dw.hide();
                //}
                //点击
                J_dw.on('click', function () {
                    var serviceMobile = extend.mobileServiceJudge(mobile).mobile,
                        service = extend.mobileServiceJudge(mobile).service,
                        content = 'Y';
                    if(service == 'DX'||serviceMobile==''){
                        alertMsg('请打开定位授权短信，回复Y开通定位');
                    }else{
                        window.tf56 && window.tf56.sendSmsMessage(serviceMobile, content);
                    }
                });
            },
            errorCallback: function (e) {
//              alertMsg('网络异常');
                $('#J_dw .i-right').html('<span class="dw-span mr15">点击重试</span>');
                J_dw.on('click', function () {
                    location.reload();
                });
            }
        }
        getJsonp(config);
    }
}
init();
