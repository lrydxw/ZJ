//var com_server ='http://10.3.11.40:8186';//配置主入口 本地
/**************host地址**************/
//到控制层
apiServer.creditcs = com_server+'/ownerTradeApi/creditcs';//诚信等级
apiServer.tradeevaluatedetailcs = com_server+'/ownerTradeApi/tradeevaluatedetailcs';//评价
apiServer.partycs = com_server + '/ownerTradeApi/partycs'

/**
 * 完整url
 */
apiUrl.getCreditAndTradeStatisticsByOwner = apiServer.creditcs + '/getCreditAndTradeStatisticsByOwner?app_stoken='+app_stoken + getEnd;

apiUrl.selectMyTradeEvaluate=apiServer.tradeevaluatedetailcs+'/selectMyTradeEvaluate?datasource=adApp&app_stoken='+app_stoken;//司机评价

// 会员认证等级
apiUrl.selectPartyLevelForOwner = apiServer.partycs + '/selectPartyLevelByPartyIdAndRole'
