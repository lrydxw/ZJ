$(function() {
	//功能对象
	var objfun = transfar.Base.extend({
		//初始化
		initialize: function () {
			//用于详情
			this.initData();
		},
		//添加事件（基于委托，绑定动态加载元素）
		events: {
			'click #loadBtn': 'goload',
			'click #J-telephone': 'popup',
			'click #cancle' : 'hid'
		},
		//demo方法 详情型
		initData  : function () {
			var _phone, _name;
			var merchantcode = getParamVal('merchantcode');
			var param = {};
			param.url = apiUrl.getMerchantDetail//finalNumber.jsonp_Server+ 'cmd='+cmd.getPoiDetail+'&random=' + Math.random();
			param.data = {
				'free_key'    : hex_md5(merchantcode),
				'merchantcode': merchantcode
				//'merchantcode':80007424,
				//'free_key':hex_md5("80007424")
			}
			param.callback = function (data) {
				if (data.result != 'success') {
					alertMsg("系统异常");
					return;
				} else {
					var data = data.data;
					_name = data.name;
					toattentionid = data.id;
					accountnumber = data.accountnumber;
					//if(data.merchanttype=='2'){
					//	$('.goshop_check').show()
					//}else{
					//	$('.goshop_check').hide()
					//}
					$('#z-name').html(data.name);
					$('#z-name').attr('data-id', data.id)
					if (data.perconsume && typeof(data.perconsume) != "Object" && data.perconsume / 1 > 0) {
						$('.money-span span').html(data.perconsume+'元');
						if ($('.money-span').hasClass('hid')) {
							$('.money-span').removeClass('hid');
						}
					} else {
						if (!$('.money-span').hasClass('hid')) {
							$('.money-span').addClass('hid');
						}
					}
					$('.introduction-div').html(data.address);
					if (typeof data.summary == 'string' || data.description == 'string') {
//      		$('.btm-div').html(data.description);
						$('.btm-div').html(data.summary || data.description);
					}
					if (data.summary==""){
						$('.btm-div').text("暂无简介");
					}
					_phone = data.telephone;
					_mobile = data.mobilenumber;
					if (!(_phone && typeof(_phone) == "string")&&!(_mobile && typeof(_mobile) == "string")) {
						$('#J-telephone').addClass('telno')
					} else {
						$('#J-telephone').removeClass('telno')

					}
					$('#J-telephone').attr("data-tel", judge(_phone));
					$('#J-telephone').attr("data-phone", judge(_mobile));


					var imgUrl = data.summarypics || data.bigphotos;
					if (imgUrl && typeof(imgUrl) == "string") {
						var imgUrls = imgUrl.split(',');

						_imgLen = imgUrls.length;
						$('.img1-div').html('<img src="' + imgUrls[0] + '" class="b-zone6" onerror="errorImg(this)"/>');

					} else {

						$('.img1-div').html('<img src="../../css/img/b_zone6.png" class="b-zone6" onerror="errorImg(this)"/>');

					}

				}
			}
			getJsonp(param);
		},
		goload:function(e){
			var domThis = $(e.currentTarget);//当前元素
			if (navigator.userAgent.match(/android/i)) {
				var loadDateTime = new Date();
				window.setTimeout(function() {
						var timeOutDateTime = new Date();
						if (timeOutDateTime - loadDateTime < 5000) {
							window.location.href = "http://e.lujing56.com/mobile.html?source=merchant-"+getParamVal('merchantcode');
						} else {
							window.close();
						}
					},
					25);
				window.location = 'lujingdriver.com://lujingdriver:8080';
			} else {
				window.location.href = "http://e.lujing56.com/mobile.html?source=merchant-"+getParamVal('merchantcode');
			}
		},
		popup:function(e){
			var domThis = $(e.currentTarget);//当前元素
			if($('#J-telephone').hasClass('telno')){
				return;
			}
			var jPhone = $('#J-telephone').attr('data-tel');
			var jMobile = $('#J-telephone').attr('data-phone');
			$('#jPhone').attr('href',"tel:"+jPhone).text(jPhone);
			$('#jMobile').attr('href',"tel:"+jMobile).text(jMobile);
			if (!(jPhone && typeof(jPhone) == "string")){
				$('#jPhone').parent('p').remove();
			}
			if (!(jMobile && typeof(jMobile) == "string")){
				$('#jMobile').parent('p').remove();
			}
			$('#jCall').show();
			$('.zheZhao').show();
		},
		hid:function(e){
			var domThis = $(e.currentTarget);//当前元素
			$('#jCall').hide();
			$('.zheZhao').hide();
		}
	})

	function judge(p) {
		if (!(typeof p === 'string'))
			return '';
		else
			return p;
	}

	var obj = new objfun({
		$el:$('.body-content')
	});
})

