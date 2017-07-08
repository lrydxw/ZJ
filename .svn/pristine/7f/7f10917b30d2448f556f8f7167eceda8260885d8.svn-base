/**
 * @file 文件说明
 * @author XieZhendong
 * @date 15/4/24
 */

var extend = {
    //如果str为无效值，用re替代
    isNull: function(str,re){
        if(typeof str === 'undefined' || str==null || str==''){
            if(typeof re === 'undefined')
                return '-';
            else
                return re;
        }
        else{
            return str;
        }
    },
    timeFormat: function(time){
        return time + '分';
    },
    timeFormatSpecial: function(time){
        if(!time)
            return '';
        var date = new Date(time),
            curDate = new Date(),
            str = '';
        var m1 = date.getMonth() + 1,
            d1 = date.getDate(),
            m2 = curDate.getMonth() + 1,
            d2 = date.getDate();
        if(m1==m2&&d1==d2){
            str = date.getHours() + ':' +date.getMinutes();
        }else{
            str = m1 + '月' + d1 +'日';
        }
        return str;
    },
    round: function(v){
        v = parseFloat(v);
        if(typeof  v == 'number'){
            return Math.round(v);
        }else{
            return 0;
        }
    },
    secondToMinute: function(v){
        v = parseInt(v);
        var min = '',
            sec = '',
            des = '';
        if(typeof v == 'number'&&v > 0){
            min = Math.floor(v/60);
            sec = v%60;
            if(min>0)
                des += min + '分';
            if(sec>0)
                des += sec + '秒';
            return des;
        }
        else{
            return '0秒';
        }
    },
    substringMobilenumber: function(v){
        if(!v)
            return '';
        else{
            var des = '';
            des += v.substring(0,2) + '***' + v.substring(9);
            return des;
        }
    },
    regJudge: function(v){
        var flag = false;
       if(v.indexOf('个人身份证认证')!=-1&& v.indexOf('驾驶证认证')!=-1&& v.indexOf('行驶证认证')!=-1){
            flag = true;
        }
        return flag;
    },
    getHashParam: function(key){
        var reg = new RegExp("(^|&|\\#)"+ key +"=([^&]*)(&|$)");
        if (ret = location.hash.match(reg)) {
            return decodeURIComponent(ret[2]);
        }
        return '';
    },
    mobileServiceJudge: function(mobile){
        var yd = /^(134)|(135)|(136)|(137)|(138)|(139)|(150)|(151)|(152)|(157)|(158)|(159)|(182)|(183)|(184)|(187)|(188)|(147)|(178)/,
            lt = /^(130)|(131)|(132)|(155)|(156)|(185)|(186)|(176)/,
            dx = /^(133)|(153)|(180)|(181)|(189)|(177)/;
        var obj = {};
        if(yd.test(mobile)){
            obj.service = 'YD';
            obj.mobile = '10658012809';
        }
        else if(lt.test(mobile)){
            obj.service = 'LT';
            obj.mobile = '106550101874224261';
        }
        else{
            obj.service = 'DX';
            obj.mobile = '';
        }
        return obj;
    },
    //从安卓获取认证信息
    getPermission: function(){
        var permission = window.tf56&&window.tf56.getPermission(),
            status = false;
        if(permission){
            var data1 = JSON.parse(permission);
            if(data1.yphsyxk){
                status = true;
            }
            if(data1.sfzrz=="已认证"&&data1.xszrz=="已认证"&&data1.jszrz=="已认证"){
                status = true;
            }
        }
        return status;
    },
    //获取用户信息
    getUserInfo: function(){
        //存储的用户信息，暂没有operatorId accountNumber
        var user = {},
            _W = window.tf56;
        user.operatorId = _W&&_W.getOperatorId&&_W.getOperatorId(),
        user.partyId = _W&&_W.getPartyId();
        user.realName = _W&&_W.getRealName();
        user.mobileNumber = _W&&_W.getMobilenumber();
        user.partyType = _W&&_W.getPartyType();
        return user;
    },
    //拨打电话通用处理
    phoneCall: function (remainTime,callphone,freecall,mobilenumber,telphone) {
        $('#J_noSmrz,#J_freePhoneTip,.show-phone,.show-phone-bg').remove();
        var status = extend.getPermission(),
            user = extend.getUserInfo(),
            html = '';
        html += '<div id="J_noSmrz"></div>'
             + '<div id="J_freePhoneTip"></div>';
        $('body').append($(html));
        //未认证
        if(!status){
            $('#J_noSmrz').tfpop({
                title: '您尚未会员认证，不可拨打电话',
                open: true,
                footer: [{
                    text: '取消'
                },{
                    text: '立即认证',
                    click: function(){
                        $('#J_noSmrz').tfpop('hide');
                        window.tf56&&window.tf56.jumpToUserCertificate();
                    }
                }]
            });
            return;
        }
        //未绑定手机
        if(!mobilenumber&&!telphone){
            alertMsg('该货主没有预留联系方式！');
            return;
        }     
        //电话确认
        var htmlP = '';
        if(mobilenumber){
        	htmlP +=  '<p class="phone-mob">'+mobilenumber+'</p>';
        }
        if(telphone){
        	htmlP +=  '<p class="phone-tel">'+telphone+'</p>';
        }
        var showHtml =
        '<style>'+
			'.show-phone-bg{display: block;position: fixed;background-color: #000000;opacity: 0.6;top: 0;left: 0;width: 100%;height: 100%;z-index: 101;}'+
			'.show-phone{display: block;position: fixed;bottom: 0;left: 0;width: 100%;z-index: 102;}'+
			'.show-phone p{background-color: #FFFFFF;text-align: center;margin:10px 20px;padding: 10px;color: #3B98E0;font-size: 18px;}'+
			'.show-phone p:last-child{margin-top: 20px;}'+
		'</style>'+
		'<div class="show-phone">'+
			htmlP+
			'<p class="phone-cancel">取消</p>'+
		'</div>'+
		'<div class="show-phone-bg"></div>';
        $('body').append($(showHtml));
        
//      //如果该货主只预留了电话号码，不能使用免费电话
//      if(telphone&&!mobilenumber){
//          callphone();
//      }
        //确认拨打
        $('.phone-mob,.phone-tel').on('click',function(){
        	var phonenumber = $(this).text();
        	if(remainTime>0){
	            if(remainTime<5){
	                $('#J_freePhoneTip').tfpop({
	                    title: '您的免费通话时间仅剩余' + remainTime+ '分钟，是否继续使用？',
	                    open: true,
	                    footer: [{
	                        text: '普通电话',
	                        click: function(){
	                            $('#J_freePhoneTip').tfpop('hide');
	                            callphone(phonenumber);
	                        }
	                    },{
	                        text: '免费电话',
	                        click: function(){
								$('#J_freePhoneTip').tfpop('hide');
	                            freecall(phonenumber);
	                        }
	                    }]
	                });
	            }
	            else{
	                freecall(phonenumber);
	            }
	        }
	        else{
	            callphone(phonenumber);
	        }
	        closeShow();
        })
        //取消
        $('.show-phone .phone-cancel').on('click',function(){
        	closeShow();
        })
        function closeShow(){
        	$('.show-phone-bg').hide();
        	$('.show-phone').hide();
        }
    } 
};
