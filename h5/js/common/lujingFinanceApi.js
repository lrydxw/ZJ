/**
 * Created by hcm on 2017/3/15
 */

/**************host地址**************/
//到控制层
apiServer.freightInsuranceOrders=static_server+'/lujingFinanceApi/freightInsuranceOrders'//保单


//保单
apiUrl.queryOrderDetail = apiServer.freightInsuranceOrders +'/queryOrderDetail?app_stoken='+app_stoken;//保单详情
apiUrl.getPolicy = apiServer.freightInsuranceOrders +'/getPolicy?app_stoken='+app_stoken;//保单下载