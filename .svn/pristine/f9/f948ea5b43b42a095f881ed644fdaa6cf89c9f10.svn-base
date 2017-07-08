// 依赖getJson.js, data.js, driverTradeApi, ownerTradeApi


// 查询会员等级
// role: driver(默认), owner
// partyid：非必传，用来查询他人的认证等级
// 货主最高：V3
// 司机最高：V5
function selectPartyLevel(callback, r, partyid){
	// alert(r)
	var role = '司机',
		url = apiUrl.selectPartyLevelForDriver,
		config = {
			data: {
				datasource: 'driverapp'
			}
		}
	if(r === 'owner'){
		role = '货主'
		url = apiUrl.selectPartyLevelForOwner,
		config.data.datasource = 'adApp'
	}

	config.url = url
	// 查询其他的会员等级
	if(role&&partyid){
		config.data.role = role
		config.data.partyid = partyid
	}

	config.data.app_stoken = app_stoken

	config.callback = function(res){
		res = res || {}
		if(res.result !== 'success'){
			alertMsg(res.msg)
			return
		}
		var data = res.data || {}
		// alert(data.level)
		callback(data.level)
	}

	config.errorCallback = function(){
		alertMsg('查询会员等级接口调用失败')
	}

	getJsonp(config)
}
