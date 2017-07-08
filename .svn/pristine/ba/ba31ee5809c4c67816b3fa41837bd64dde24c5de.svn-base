//param{'url':url,'callback':callback, 'errorCallback':errorCallback}
/*
* @url : 参数拼接完成之后的url
* @callback ： 请求成功之后的处理方法
* @errorCallback： 接口请求失败异常处理
*/
var _time;
var _noLoadingBz;//不关闭加载
function getJsonp(param){
    var now = new Date().getTime();
    var ajaxConf = {}
    if(_time){
    	var miao = (now-_time)/1000;
    	if(miao>2){
    		window.tf56&&window.tf56.showLoadingDialog&&window.tf56.showLoadingDialog("正在加载");
    	}
    }else{
    	window.tf56&&window.tf56.showLoadingDialog&&window.tf56.showLoadingDialog("正在加载");
    }
    _time=now;

    ajaxConf = {
        type:"get",
        url: param.url,
        data: param.data||{},
        async:true,
	    dataType: param.dataType||"jsonp",
        timeout: 10000,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success:function(data){
            try{
            	if(!_noLoadingBz)window.tf56&&window.tf56.dismissDialog();
            }catch(e){
            	//TODO handle the exception
            }
            if(typeof param.callback=='function'){
                param.callback(data);
            }
        },

        error: function(r){
            try{
            	if(!_noLoadingBz)window.tf56&&window.tf56.dismissDialog();
            }catch(e){
            	//TODO handle the exception
            }
            if(typeof param.errorCallback=='function'){
                param.errorCallback(r);
            }else{
            	window.tf56 && window.tf56.alertMessage&& window.tf56.alertMessage('网络不给力,请检查网络连接');
            }
        }
    }
    if(!ajaxConf.data){
    	ajaxConf.data={}
    }
    
    if("jsonp"==ajaxConf.dataType)ajaxConf.callback="callback";
    
    if(param.url.indexOf('knowledge')=='-1'){
        var extraParams = getExtraParams();
    	ajaxConf.data = $.extend({}, ajaxConf.data,extraParams);

        var j_datasource = 'lujingh5',j_sourcecode='0100010002';//来源区分   产品 角色 设备 系统 载体：陆鲸 未知 phone 未知 浏览器

    	if(window.tf56 && window.tf56.getSourceCode){
    		j_sourcecode = window.tf56.getSourceCode();
    	}
        if(!ajaxConf.url.match('datasource')&&!ajaxConf.data.datasource){
        	ajaxConf.data.datasource=j_datasource;
        }//记录源
        if(!ajaxConf.url.match('sourcecode')&&!ajaxConf.data.sourcecode){
        	ajaxConf.data.sourcecode=j_sourcecode;
        }//记录源
    }

    $.ajax(ajaxConf);
}
//设备指纹
setTimeout(function(){
	var script = document.createElement('script');
	script.src = '../js/weiget/frms-finger-origin-min.js';
	document.querySelector('head').appendChild(script);
}(),300);

//打点
function getExtraParams(){
    var url = location.href
    var param = getParamVal('type')
    var role
    if(role == 0 || url.indexOf('driver')!==-1 ){
        role = 'driver'
    }else{
        role = '货主'
    }
    var extra_source = getUrlParam('extra_source')||''
    return {
        extra_networktype: navigator.connection||'', //网络状况 2g、3g、4g、wifi
        extra_device: getPhoneType(),//设备 phone、pad、pc、touch
        extra_terminal: '浏览器',//载体 浏览器|桌面
        extra_os: detectOS(),//操作系统 ios android
        extra_core: getExplorer(), //浏览器内核
        extra_source: extra_source,//分享来源 app、微信、微信朋友圈
        extra_domain: getFrom(),//来路域名，www.baidu.com
        extra_cookie: '',//cooki_name _ga=1.2.17184633.1172761150.1374069301
        extra_requesttime: Date.now(),//发起请求时客户端时间
        extra_role: role, //角色  driver/shipper(司机/货主)
        clientdfp:(window.tf56 && window.tf56.getClientDfp&& window.tf56.getClientDfp())||getCookie("BSFIT_DEVICEID")||''//设备指纹
    }
}



/*货物URL里面的参数*/
var getParamVal = function(key) {
    var reg = new RegExp("(^|&|\\?)"+ key +"=([^&]*)(&|$)");
    if (ret = location.search.match(reg)) {
        return decodeURIComponent(ret[2]);
    }
    return '';
}

/*提示消息*/
var alertMsg   = function(msg){
    if(window.tf56 && window.tf56.alertMessage){
        window.tf56.alertMessage(msg);
    }else{
        if(typeof $.tfpop == 'function'){
			$.tfpop({
		        title: '',
		        content: msg,
		        coverClick: false,//点击背景是否关闭弹窗，默认为false
		        footer: [{
		            text: '确定'
		        }]
		    });
		}else{
			alert(msg)
		}
    }
}
//返回上一页
function backFun(){
   	if (window.tf56&&window.tf56.webBack) {
		window.tf56.webBack();
	} else{
		history.back();
	}
 }

var _wigth,_height,_source,_machinetype,_screensize,_os,_browser,_sourcetype,openid;
//获取手机型号函数begin
function getPhoneType() {
    //正则,忽略大小写
    var pattern_phone = new RegExp("iphone", "i");
    var pattern_android = new RegExp("android", "i");
    var userAgentInfo = navigator.userAgent;
    var userAgent = navigator.userAgent.toLowerCase();
    var isAndroid = pattern_android.test(userAgent);
    var isIphone = pattern_phone.test(userAgent);
    var phoneType = "phoneType";
    if (isAndroid) {
        var zh_cnIndex = userAgent.indexOf("-");
        var spaceIndex = userAgent.indexOf("build", zh_cnIndex + 4);
        var fullResult = userAgent.substring(zh_cnIndex, spaceIndex);
        phoneType = fullResult.split(";")[1];
    } else if (isIphone) {
        //6   w=375    6plus w=414   5s w=320     5 w=320
        var wigth = _wigth;
        if (wigth > 400) {
            phoneType = "iphone6 plus";
        } else if (wigth > 370) {
            phoneType = "iphone6";
        } else if (wigth > 315) {
            phoneType = "iphone5 or iphone5s";
        } else {
            phoneType = "iphone 4s";
        }
    } else if(userAgentInfo.indexOf('iPad') > -1){
        phoneType = "iPad";
    } else if(userAgentInfo.indexOf('SymbianOS') > -1){
        phoneType = "SymbianOS";
    }else if(userAgentInfo.indexOf('Windows Phone') > -1){
        phoneType = "Windows Phone";
    }else if(userAgentInfo.indexOf('iPod') > -1){
        phoneType = "iPod";
    }else {
        phoneType = "PC";
    }
    return phoneType;
}

//获取浏览器
function getExplorer() {
    var explorer = window.navigator.userAgent;
    //ie
    if (explorer.indexOf("MSIE") >= 0) {
        return "ie";
    }
    //firefox
    else if (explorer.indexOf("Firefox") >= 0) {
        return "Firefox";
    }
    //Chrome
    else if (explorer.indexOf("Chrome") >= 0) {
        return "Chrome";
    }
    //Opera
    else if (explorer.indexOf("Opera") >= 0) {
        return "Opera";
    }
    //uc
    else if (explorer.indexOf("UCBrowser") >= 0) {
        return "UC";
    }
    //qq
    else if (explorer.indexOf("qq") >= 0) {
        return "qq";
    }
    //WeChat
    else if (explorer.indexOf("MicroMessenger") >= 0) {
        return "WeChat";
    }
    //Safari 移动端浏览器
    else if (explorer.indexOf("Safari") >= 0) {
        return "Safari";
    }else{
        return "pcWeb";
    }
}
//操作系统
function detectOS() {
    var sUserAgent = navigator.userAgent;

    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) return "Mac";
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return "Unix";
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);

    var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android";
    if (isLinux) {
        if (bIsAndroid) return "Android";
        else return "Linux";
    }
    if (isWin) {
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 ||
            sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
    }
    if(!!sUserAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
        return "IOS";
    }
    return "other";
}
//获取文件指纹cookie
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}

function getFrom(){
    var url = document.referrer;
    if(url=="")
    {
        url="直接输入网址";
    }
    try {
		if (url.length == 0 && opener.location.href.length > 0) {
		   url = opener.location.href;
		}
	} catch (e) {}

	return url;
//  var localUrl=window.location.href.toString();
//  window.alert("来源："+url+" 本页地址："+localUrl);
}
