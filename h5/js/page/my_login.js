$(function(){
	//功能对象
	var loginfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
//	        this.xx = xx;
//	        //用于列表
//	        this.loadData = {};
//	        this.loadData.data = {};//记录已加载数据 结构与返回data一致
//	        this.getData();
//	        //用于详情
//	        this.initData();
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click #login': 'loginFun'
	    },
	    //自定义方法
	    //demo方法 详情型
	    loginFun:function(e){
			var domThis = $(e.currentTarget);//当前元素
			var partyname = $.trim($('#partyname').val());
			var passwords = $.trim($('#passwords').val());
			if(!partyname){
				alertMsg('账号不可为空！');
				return;
			}
			if(!passwords){
				alertMsg('密码不可为空！');
				return;
			}
	    	var _this = this;//_this方便callback中调用
	    	var param = {};
		    param.url = com_server+'/passport/loginJsonp?datasource=lujingh5&sourcecode=0100010002&loginflag=normal';      
		    param.data ={
		    	'partyname':partyname,
		    	'password':passwords
		    }
		    param.callback = function(data){
		        if(data.result != 'success'){
		            alertMsg(data.msg);
		            return;
		        }else{
		        	if(!data.data){
		        		return;
		        	}
		        	var r = data.data;
		        	//具体实现
		        	if(window.localStorage){
			           	localStorage.token = r.app_stoken;
			           	localStorage.sessionpartyid = r.partyid;
			           	
			        }
		        	$.tfpop({
			            title: '',
			            content: '登录成功！',
			            coverClick: false,//点击背景是否关闭弹窗，默认为false
			            footer: [{
		                    text: '确定',
		                    click: function () {
		                       history.back();
		                    }
		                }]
			        });
		        }
		    }
		    param.errorCallback = function(){
		    	alertMsg(commonMsg.net_error);
		    }
		    getJsonp(param);
	    }
	})
	var loginobj = new loginfun({
		$el:$('.body-content')
	});
})
