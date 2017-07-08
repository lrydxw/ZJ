/******************测试配置*******************/

var com_server = "https://sitetest.tf56.com"; //配置主入口 测试
var staticSever = 'https://statictest.tf56.com/lujing';//链接跳转页面资源 测试
// com_server = "";
var party_server = "https://sitetest.tf56.com"; //配置主入口 会员测试
var static_server = "";
/******************生产配置*******************/
if (!location.href.match('test') && (location.href.match('tf56') || location.href.match('lujing56'))) {
  com_server = "https://www.lujing56.com"; //配置主入口 生产
  staticSever = 'https://www.lujing56.com';//链接跳转页面资源 生产
  party_server = "https://partyApi.tf56.com"; //配置主入口 会员生产
}

/***********************host地址***********************/
var apiServer = {}; //到控制层 3.0新结构
var apiUrl = {}; //完整url 3.0新结构

var app_stoken = window.tf56 && window.tf56.getToken && window.tf56.getToken(); //token 3.0新结构
// app_stoken = app_stoken ? app_stoken : "05930b5f108ac049a154b69570065b40_567969321";
if (!app_stoken && !window.tf56) {
  app_stoken = localStorage.token;
}

apiServer.integral = com_server + '/lujingMarketingApi/integral';

apiUrl.details = apiServer.integral + '/details?app_stoken=' + app_stoken; //账单详情
apiUrl.integralAndDetails = apiServer.integral + '/integralAndDetails?app_stoken=' + app_stoken;//积分账户首页[总额及三条明细]
apiUrl.integralTaskList = apiServer.integral + '/integralTaskList?app_stoken=' + app_stoken;//积分账户首页【积分任务】
