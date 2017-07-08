 /**************host地址**************/
 //到控制层
 apiServer.broadcastcs = com_server + '/driverTradeApi/broadcastcs'; //会员/partycs

 apiServer.creditcs = com_server+'/driverTradeApi/creditcs';//诚信等级

 apiServer.trafficstatisticscs = com_server + '/driverTradeApi/trafficstatisticscs';//流量
 apiServer.trafficrechargecs = com_server + '/driverTradeApi/trafficrechargecs';//流量
 apiServer.partycs = com_server + '/driverTradeApi/partycs';//流量
 apiServer.tradeevaluatedetailcs = com_server+'/driverTradeApi/tradeevaluatedetailcs';//评价



 /**
  * 完整url
  */
 //broadcastcs广播详情
 apiUrl.getBroadcastDetail = apiServer.broadcastcs + '/getBroadcastDetail?app_stoken=' + app_stoken;

 //checkIfPraised是否点赞
 apiUrl.checkIfPraised = apiServer.broadcastcs + '/checkIfPraised?app_stoken=' + app_stoken;

 //praise点赞
 apiUrl.praise = apiServer.broadcastcs + '/praise?app_stoken=' + app_stoken;

 //unpraise取消点赞
 apiUrl.unpraise = apiServer.broadcastcs + '/unpraise?app_stoken=' + app_stoken;

//诚信等级查看
 apiUrl.getCreditAndTradeStatisticsByDriver = apiServer.creditcs + '/getCreditAndTradeStatisticsByDriver?app_stoken='+app_stoken + getEnd;
 apiUrl.selectMyTradeEvaluate = apiServer.tradeevaluatedetailcs + '/selectMyTradeEvaluate?datasource=driverapp&sourcecode=0101010101&app_stoken='+app_stoken;

 //trafficstatisticscs
 apiUrl.selectTrafficStatisticsCurrent = apiServer.trafficstatisticscs +'/selectTrafficStatisticsCurrent?datasource=driverapp&app_stoken='+app_stoken;//当月流量
 apiUrl.selectTrafficStatisticsHistory = apiServer.trafficstatisticscs +'/selectTrafficStatisticsHistory?datasource=driverapp&app_stoken='+app_stoken;//历史流量

 //trafficrechargecs
 apiUrl.instanceRecharge = apiServer.trafficrechargecs +'/instanceRecharge?datasource=driverapp&app_stoken='+app_stoken;//领取
 //trafficrechargecs
 apiUrl.getPartyInfo = apiServer.partycs +'/getPartyInfo?datasource=driverapp&app_stoken='+app_stoken;//取会员详情

 apiUrl.getCreditAndTradeStatisticsByDriver = apiServer.creditcs + '/getCreditAndTradeStatisticsByDriver?app_stoken='+app_stoken;


 // 会员等级
apiUrl.selectPartyLevelForDriver = apiServer.partycs + '/selectPartyLevelByPartyIdAndRole'
