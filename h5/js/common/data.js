/******************测试配置*******************/
var com_server ="https://sitetest.tf56.com";//配置主入口 测试
var party_server ="https://sitetest.tf56.com";//配置主入口 会员测试
var static_server = "";
/******************生产配置*******************/
if (!location.href.match('test')&&(location.href.match('tf56')||location.href.match('lujing56'))) {
    com_server ="https://www.tf56.com";//配置主入口 生产
	party_server ="https://partyApi.tf56.com";//配置主入口 会员生产
}

/***********************host地址***********************/
var apiServer = {};//到控制层 3.0新结构
var apiUrl = {};//完整url 3.0新结构
var app_stoken = window.tf56 && window.tf56.getToken&& window.tf56.getToken();//token 3.0新结构
//app_stoken = app_stoken?app_stoken:"236b5476f9d0c5d6f847d1ee126adc2e_565660816";
if(!app_stoken&&!window.tf56){
	app_stoken = localStorage.token;
}

var commonMsg ={};
commonMsg.net_error = '网络不给力,请检查网络连接';

//去除点击等待 基于fastclick.js
FastClick&&FastClick.attach&&FastClick.attach(document.body);

var _czc = [];
setTimeout(function(){
	var newNode = document.createElement("script");
	newNode.src ='https://s96.cnzz.com/z_stat.php?id=1258266082&web_id=1258266082';
	document.querySelector("head").appendChild(newNode);
	setTimeout(function(){_czc.push(["_setCustomVar",'包名','h5',1]);},500)
},500)


var mobileSystem =  (function () {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    return { //移动终端浏览器版本信息
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1 //是否iPad
    };
})();

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2]; return null;
}
var getEnd = '';
var phoneType = getUrlParam('type');//0司机1货主
if(phoneType == 0){
    getEnd+='&datasource=driverapp';
}else{
    getEnd+='&datasource=adApp';
}

/********货主头部 改造*********/
/*货物URL里面的参数*/
var getParamVal = function(key) {
    var reg = new RegExp("(^|&|\\?)"+ key +"=([^&]*)(&|$)");
    if (ret = location.search.match(reg)) {
        return decodeURIComponent(ret[2]);
    }
    return '';
}
var vCode = getParamVal('vCode');
if(vCode/1>=20170222){
	$('.bodyTop').hide()
	$('.bodyContent').css('marginTop','0');
}
/********货主头部*********/
// (function  changeOwnerBannerStyle(){
// 	if(location.href.indexOf('owner')!==-1){
// 		document.querySelector('.bodyTop').className = 'bodyTop bodyTopOld'
// 		document.querySelector('.iback').className = 'nvbt iback ibackOld'
// 		document.querySelector('.nvtt').className = 'nvtt nvttOld'
// 	}
// })()

// 依赖getJson.js, data.js


if(window.tf56&& window.tf56.getSourceCode&& '0101010101'==window.tf56.getSourceCode()){
    //HACK 安卓bug，data修复
    if('3.1.2'==window.tf56.getApkVersion()){
        window.tf56.umengCustomEvent('apkUpdate312')
		window.tf56.setAppData('update_json_obj', '{"result": "success","count": "1","data": {"product": "01","downloadurl": "https://down.tf56.com/01/01/01/01/2017052523/lujing_driver_V3.3.0_00_2017052523.apk","os": "01","filemd5": "eb87156166c78641116d729a0d3e8b0f","versionname": "陆鲸司机版_Android_V3.3.0_通用包","description": "升级说明：\n1、关注路线列表也有周边货源啦。\n2、找货时，其他车长录入方式调整。\n3、ETC充值更简单了，最快3步即可完成充值。\n4、ETC可以在线申请电子发票了，开票更方便。","isforceupdate": "0","device": "01","role": "01","code": "2017052523","sparedownloadurl": "","version": "V3.3.0"},"code": "200","msg": ""}')
	}
}
