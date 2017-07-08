$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click #regSubmit': 'submit',
	    },
	    submit:function(e){
			e.preventDefault()
			var company=$("input[name='company']").val()
			var proposer=$("input[name='proposer']").val()
			var phoneNumber=$("input[name='phoneNumber']").val()
			var address=$("input[name='address']").val()
			if(company==''||proposer==''||phoneNumber==''||address==''){
				alertMsg('请写入正确的数据')
				return
			}else{
				var reg=/^\d{11}$/
				if(!reg.test(phoneNumber)){
					alertMsg('必须是11位手机号')
					return
				}
			}

	    	var _this = this;//_this方便callback中调用
	    	var param = {
	    		url:apiUrl.insertContact,
	    		type:"post",
	    		dataType:"json",
	    		data:$("#form").serialize()
	    	};
		    param.callback = function(data){
		        if(data.result != 'success'){
		            alertMsg(data.msg);
		        }else{
		        	alertMsg('报名成功');
		        }
	        	setTimeout(function(){
	        		$(".pop-cover").remove()
	        	},3000)
		    }
		    param.errorCallback = function(){
		    	alertMsg('网络不给力,请检查网络连接');
		    }
		    getJsonp(param);
	    },
	})
	var obj = new objfun({
		$el:$('.body-content')
	});
})