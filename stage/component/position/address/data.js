﻿﻿
/******************测试配置*******************/
var com_server = "https://sitetest.tf56.com";//配置主入口 测试
var party_server = com_server;//配置主入口 会员测试

/******************生产配置*******************/
if (G.envType === G.PRODUCT) {
    com_server = "https://www.tf56.com";//配置主入口 生产
    party_server = "https://partyApi.tf56.com";//配置主入口 会员生产
}

//统计
//获取手机型号
G.getPhoneType = function(){
    var pattern_phone = new RegExp("iphone", "i");
    var pattern_android = new RegExp("android", "i");
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
        var wigth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (wigth > 400) {
            phoneType = "iphone6 plus";
        } else if (wigth > 370) {
            phoneType = "iphone6|inpone6s";
        } else if (wigth > 315) {
            phoneType = "iphone5|iphone5s";
        } else {
            phoneType = "iphone 4s";
        }
    } else {
        phoneType = "未知机型";
    }
    return phoneType;
};
var _gsystem = G.getMobileSystem();
if(_gsystem.iPhone||_gsystem.ios||_gsystem.iPad){
    G.sourcecode = '0103010203';
}
else if(_gsystem.android){
    G.sourcecode = '0103010103';
}else{
    G.sourcecode = '0103010003'; //如果识别不到设备
}
/***********************host地址***********************/
var apiServer = {};//到控制层 3.0新结构
var apiUrl = {};//完整url 3.0新结构
var apiEnd = '?datasource=weChatDriver&imei=&mac=&version=' + G.version + '&channel=weChat&model=' + G.getPhoneType() + '&serialNumber=&sourcecode='+ G.sourcecode;

//到控制层
apiServer.driverTradeApi = com_server + '/driverTradeApi';//会员
apiServer.partyApi = party_server + '/partyApi';
apiServer.tradeView = com_server + '/tradeView'

//完整url
//driverTradeApi
apiUrl.selectGoodsSourceListByConditions = apiServer.driverTradeApi + '/goodssourcecs/selectGoodsSourceListByConditions' + apiEnd;//货源大厅
apiUrl.selectGoodsSourceListByConditionsWithoutLogin = apiServer.driverTradeApi + '/goodssourcecs/selectGoodsSourceListByConditionsWithoutLogin' + apiEnd;//货源大厅

//tradecs
apiUrl.getClientLongitudeAndLatitude = apiServer.tradeView + '/tradecs/get' + '?cmd=poi.getClientLongitudeAndLatitude';//获取地理位置信息

//partyApi
apiUrl.selectBusinessPermissionByPartyId = apiServer.partyApi + '/businesspermissioncs/selectBusinessPermissionByPartyId' + apiEnd;
apiUrl.selectPartyPermissionByKeywords = apiServer.partyApi + '/partycs/selectPartyPermissionByKeywords' + apiEnd; //认证信息
apiUrl.selectImageByPartyIdAndKeyName = apiServer.partyApi + '/partyimagecs/selectImageByPartyIdAndKeyName' + apiEnd;//查看图像

//http://site.test.tf56.com/tradeView/tradecs/get?cmd=poi.getClientLongitudeAndLatitude&datasource=webkit&token=5c8ae3d9d33d69e46995438345d4b359&callback=jQuery183014073569560423493_1448417100204&_=1448417119120
