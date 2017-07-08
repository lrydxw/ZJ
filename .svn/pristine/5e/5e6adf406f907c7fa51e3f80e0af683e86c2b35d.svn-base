/******************测试配置*******************/

var com_server = "http://site.test.tf56.com"; //配置主入口 测试
com_server = "";
var party_server = "http://site.test.tf56.com"; //配置主入口 会员测试
var static_server = "";
/******************生产配置*******************/
if (!location.href.match('test') && (location.href.match('tf56') || location.href.match('lujing56'))) {
  com_server = "https://www.lujing56.com"; //配置主入口 生产
  party_server = "https://partyApi.tf56.com"; //配置主入口 会员生产
}

/***********************host地址***********************/
var apiServer = {}; //到控制层 3.0新结构
var apiUrl = {}; //完整url 3.0新结构

var app_stoken = window.tf56 && window.tf56.getToken && window.tf56.getToken(); //token 3.0新结构
//app_stoken = app_stoken ? app_stoken : "f7597faf17bb728bf393f37d8ad6cd9f_567953939";
if (!app_stoken && !window.tf56) {
  app_stoken = localStorage.token;
}

apiServer.loanUser = com_server + "/loanApi/loanUser";
apiServer.loanBill = com_server + '/loanApi/loanBill';
apiServer.loanRecord = com_server + '/loanApi/loanRecord';
apiServer.loanRepayment = com_server + '/loanApi/loanRepayment';

apiUrl.getLoanBillDetail = apiServer.loanBill + '/getLoanBillDetail?app_stoken=' + app_stoken; //账单详情
apiUrl.loanBillList = apiServer.loanBill + '/loanBillList?app_stoken=' + app_stoken; //历史账单列表
apiUrl.queryLoanRecordList = apiServer.loanRecord + '/queryLoanRecordList?app_stoken=' + app_stoken; //还款记录

apiUrl.queryLoanUserInfo = apiServer.loanUser + "/queryLoanUserInfo?app_stoken=" + app_stoken;
apiUrl.queryLoanUser = apiServer.loanUser + "/queryLoanUser?app_stoken=" + app_stoken; //授信查询

apiUrl.loanBillList = apiServer.loanBill + "/loanBillList?app_stoken=" + app_stoken; //账单列表

apiUrl.insertLoanRepayment = apiServer.loanRepayment + "/insertLoanRepayment?app_stoken=" + app_stoken; //付款
