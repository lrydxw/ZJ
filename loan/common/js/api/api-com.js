/******************测试配置*******************/

var com_server = ""; //配置主入口 测试
var trade_server = "https://sitetest.tf56.com"; //配置主入口 货主api
/******************生产配置*******************/
if (!location.href.match('test') && (location.href.match('tf56') || location.href.match('lujing56'))) {
  trade_server = "https://www.tf56.com"; //配置主入口 生产
}

/***********************host地址***********************/
var apiServer = {}; //到控制层 3.0新结构
var apiUrl = {}; //完整url 3.0新结构

var app_stoken = window.tf56 && window.tf56.getToken && window.tf56.getToken(); //token 3.0新结构
//app_stoken = app_stoken ? app_stoken : "f7597faf17bb728bf393f37d8ad6cd9f_567953939";
if (!app_stoken && !window.tf56) {
  app_stoken = localStorage.token;
}
//loanApi 白条app接口
apiServer.loanApi=com_server + "/loanApi"

//控制层 loanApi
apiServer.loanUserFactor=apiServer.loanApi+"/loanUserFactor";
apiServer.loanFactorRecord=apiServer.loanApi+"/loanFactorRecord";
apiServer.loanFactorRepayment=apiServer.loanApi+"/loanFactorRepayment";
apiServer.loanRepayment =apiServer.loanApi+'/loanRepayment';

//具体api
apiUrl.firstPage=apiServer.loanUserFactor+"/firstPage?app_stoken=" + app_stoken;//白条首页详情
apiUrl.queryWaitRepqyList=apiServer.loanUserFactor+"/queryWaitRepqyList?app_stoken=" + app_stoken;//应还列表
apiUrl.queryLoanFactorRecordList=apiServer.loanFactorRecord+"/queryLoanFactorRecordList?app_stoken=" + app_stoken;//借款记录列表
apiUrl.queryRepaymentList=apiServer.loanFactorRepayment+"/queryRepaymentList?app_stoken=" + app_stoken;//还款记录列表
apiUrl.selectLoanRecord=apiServer.loanFactorRecord+"/selectLoanRecord?app_stoken=" + app_stoken;//放款申请书
apiUrl.insertContact=apiServer.loanUserFactor+"/insertContact?app_stoken=" + app_stoken;//插入联系人

apiUrl.insertLoanRepayment = apiServer.loanRepayment + "/insertLoanRepayment?app_stoken=" + app_stoken; //付款

//ownerTradeApi
apiServer.ownerTradeApi=trade_server + "/ownerTradeApi"


//控制层 ownerTradeApi
apiServer.tradeamountcs = apiServer.ownerTradeApi + '/tradeamountcs';//jsonp

apiServer.tradecs = apiServer.ownerTradeApi + '/tradecs';//jsonp

apiServer.partycs = apiServer.ownerTradeApi + '/partycs';//jsonp

apiUrl.getTradeAmountList=apiServer.tradeamountcs + "/getTradeAmountList?app_stoken=" + app_stoken; //接入保理

apiUrl.selectTradeDetail20160911=apiServer.tradecs + "/selectTradeDetail20160911?app_stoken=" + app_stoken; //接入保理

apiUrl.selectAccountNumberByTradeId=apiServer.partycs + "/selectAccountNumberByTradeId?app_stoken=" + app_stoken; //接入保理
