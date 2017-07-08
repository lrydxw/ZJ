/******************测试配置*******************/

var com_server ="http://site.test.tf56.com";//配置主入口 测试
com_server="";
var party_server ="http://site.test.tf56.com";//配置主入口 会员测试
var static_server = "";
/******************生产配置*******************/
if (!location.href.match('test')&&(location.href.match('tf56')||location.href.match('lujing56'))) {
    com_server ="https://www.lujing56.com";//配置主入口 生产
	party_server ="https://partyApi.tf56.com";//配置主入口 会员生产
}

/***********************host地址***********************/
var apiServer = {};//到控制层 3.0新结构
var apiUrl = {};//完整url 3.0新结构

var app_stoken = window.tf56 && window.tf56.getToken&& window.tf56.getToken();//token 3.0新结构
   //app_stoken = app_stoken?app_stoken:"aa97604556d5db2566aba5347ab3c8e9_567954955";
if(!app_stoken&&!window.tf56){
	app_stoken = localStorage.token;
}

apiServer.loanUser=com_server+"/loanApi/loanUser";
apiServer.loanBill = com_server+'/loanApi/loanBill';
apiServer.loanRecord = com_server+'/loanApi/loanRecord';

apiUrl.getLoanBillDetail = apiServer.loanBill+'/getLoanBillDetail?app_stoken='+app_stoken;//账单详情
apiUrl.queryLoanRecordList = apiServer.loanRecord+'/queryLoanRecordList?app_stoken='+app_stoken;//还款记录

apiUrl.queryLoanUserInfo=apiServer.loanUser+"/queryLoanUserInfo?app_stoken="+app_stoken
try{
	console.log(document.getElementsByTagName("title")[0].innerHTML)
	window.tf56.setTitle(document.getElementsByTagName("title")[0].innerHTML)
}catch(e){
	console.log(e)
}