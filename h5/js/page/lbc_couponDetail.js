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
		//优惠券详情
		initData  : function () {
			var id = getParamVal('id');
			var param = {};
			param.url = apiUrl.getMerchantCouponDetail;
			param.data = {
				"free_key":hex_md5(id),
				"merchantcouponid":id
				//"free_key=":hex_md5("2049"),
				// "merchantcouponid=":2049
			}
			param.callback = function (data) {
					var status = data && data.result;
					if (status == 'error') {
						alertMsg(data.msg);
						//跳转为找
					} else if (status == 'success') {
						if (data.count != '1') {
							var r = data.data;
							if (!r.perconsume || r.perconsume <= 0) {
								$('#s-money').hide();
							}
							$('#J-quota').html(getCouponInfo(r.coupontype, r.quota, r.quotanote).quota);
							if (getCouponInfo(r.coupontype, r.quota, r.quotanote).type == '折扣券') {
								var a = '', b = ''
								if (r.quotanotevalue / 1 != 0) {
									var a = '满' + r.quotanotevalue + '元可用'
								}
								if (r.quotanote / 1 != 0) {
									var b = '最高可减' + r.quotanote + '元'
								}
								if (r.quotanotevalue / 1 != 0 && r.quotanote / 1 != 0) {
									$('#coupon-zhekou').html(a + ',' + b).show()
								} else {
									$('#coupon-zhekou').html(a + b).show()
								}

							} else if (getCouponInfo(r.coupontype, r.quota, r.quotanote).type == '满减券' && r.quotanote / 1 != 0 && r.quota / 1 != 0) {
								$('#coupon-zhekou').html('满' + r.quota + '元减' + r.quotanote + '元').show()
							} else if (getCouponInfo(r.coupontype, r.quota, r.quotanote).type == '礼品劵') {
								$('#coupon-zhekou').html('满' + r.quota + '元,赠送价值' + r.quotanote + '元' + '的礼品').show()
							} else {
								$('#coupon-zhekou').hide()
							}
							//$('#J_quota').text(r.merchantcouponname);
							//checkMan();
							_isonlineuse = r.isonlineuse;
							$('#getCoupon2').attr('data-inonline', _isonlineuse)
							if ('1' == r.isonlineuse) {
								$('._coupon-online').html('线上买单专用');
							} else {
								$('._coupon-online').html('支持线下扫码买单');
							}
							if (r.receiverules) {
								var receiverules = JSON.parse(r.receiverules)
								$('._coupon-num i').html(receiverules.totalNum - judge(r.receivednumber))
							}

							if (!(r.telephone && typeof(r.telephone) == "string")&&!(r.mobilenumber && typeof(r.mobilenumber) == "string")) {
								$('#J-telephone').addClass('telno')
							} else {
								$('#J-telephone').removeClass('telno')

							}
							if (r.usestarttime == '' && r.useendtime == '') {
								$('.time-dd').hide()
							}
							if (r.receivedesc == '') {
								$('.rule').hide()
							}
							if (r.applicabledesc == '') {
								$('.use').hide()
							}
							fcode = r.fcode
							if (r.summarypics) {
								var url = r.summarypics.split(',')[0]
								var houzhui = '_160x120' + url.substr(url.lastIndexOf('.'), url.length)
								var url2 = url.substr(0, url.lastIndexOf('.')) + houzhui
							} else {
								var url2 = '../css/img/b_zone6.png'
							}
							$('#J_merchantname').text(judge(r.merchantname)),
								$('#J-coupontype').text(getCouponInfo(r.coupontype, r.quota, r.quotanote).type),
								$('._coupon-type').text(getCouponInfo(r.coupontype, r.quota, r.quotanote).type),
								$('#J-usestarttime').text(getTimeToShow1(r.usestarttime, 1)),
								$('#J-useendtime').text(getTimeToShow1(r.useendtime, 1)),
								$('#J-receivednumber').text(judge(r.receivednumber)),
								$('#J-receivedesc').html(judge(r.receivedesc).replace(/\n/g, '<br/>')),
								$('#J-applicabledesc').html(judge(r.applicabledesc).replace(/\n/g, '<br/>')),
								$('#J-perconsume').text(judge(r.perconsume)),
								$('#J-address').text(judge(r.address));
								$('#J-lo-la').attr('data-lo', (r.longitude));
								$('#J-lo-la').attr('data-la', (r.latitude));
								$('#J-lo-la').attr('data-name', (r.merchantname));
								$('#J-telephone').attr("data-tel", judge(r.telephone)),
								$('#J-telephone').attr("data-phone", judge(r.mobilenumber)),
								$('#J-merchantcode').attr('data-url', judge(r.merchantcode));
							$('#J-merchantname-1').text(judge(r.merchantcouponname));
							$('#J-merchantname-2').text(judge(r.merchantname));
							$('.coupon-img').find('img').attr('src', url2)
							$('#J-merchantcouponid').val(judge(r.merchantcouponid));
							$('#J-merchantaccountnumber').val(r.merchantaccountnumber);
							var receivestatus = r.receivestatus;
							r_merchantcode = r.merchantcode
							r_merchantname = r.merchantname
							//优惠券状态
							var jt = '', //状态码
								bt = '',//按钮提示文案
								data = '',
								btn = $('#getCoupon');//按钮
							if (receivestatus) {
								jt = receivestatus.code;
								bt = receivestatus.msg;
								flag = receivestatus.result;//success
								console.log(flag)
								data = receivestatus.data;
							}

							if (jt == "C1") //优惠券尚未启用
								bt = '活动未开始';
							else if (jt == "RAL001") { //认证限制
//				   		$('#J_nocertificate').show();
								btn.removeClass('black');
								btn.addClass('blue');
								btn.text('立即领取');
								certificatestatus = false;

								return;
							}
							else if (jt == "RMAN001") {//持有可用优惠券已达到上限
								bt = '已领取';
								$('#getCoupon2').show()
							}


							else if (jt == "RRL001") {//领取限制
								bt = '已领取';
								$('#getCoupon2').show()
							}

							else if (jt == "RTL001") { //活动尚未开始
//				   		setRemainderTimeInfo(btn,data,new Date().getTime());
								if (data == '-1') {
									bt = "抢光了";
									btn.text(bt);
								}
								else {
									setRemainderTimeInfoSpecial(btn, data);
									setInterval(function () {
//							setRemainderTimeInfo(btn,data,new Date().getTime());
										loop += 1;
										setRemainderTimeInfoSpecial(btn, data - loop * 1000);
									}, 1000);
								}
							}
							else if (jt == "RTL002") {//已被抢光，下次再来
								if (data == "-1") {
									bt = "抢光了";
									btn.text(bt);
								}
								else {
//					   		setRemainderTimeInfo(btn,data,new Date().getTime());
									setRemainderTimeInfoSpecial(btn, data);
									setInterval(function () {
//								setRemainderTimeInfo(btn,data,new Date().getTime());
										loop += 1;
										setRemainderTimeInfoSpecial(btn, data - loop * 1000);
									}, 1000);
								}

							}
							else if (jt == "RTN001") {//总优惠券已领完
								bt = '抢光了';
							}
							else {
								//其他情况，暂时不做处理
							}
							if (jt != "RTL001" && jt != "RTL002")
								btn.text(bt);

						}
						else {
							alertMsg('未查找到优惠券信息！');//需要跳转到优惠券列表
						}
					}

			};
			getJsonp(param);
		},
		goload:function(e){
			var domThis = $(e.currentTarget);//当前元素
			if (navigator.userAgent.match(/android/i)) {
				var loadDateTime = new Date();
				window.setTimeout(function() {
						var timeOutDateTime = new Date();
						if (timeOutDateTime - loadDateTime < 5000) {
							window.location.href = "http://e.lujing56.com/mobile.html?source=coupon-"+getParamVal('id');
						} else {
							window.close();
						}
					},
					25);
				window.location = 'lujingdriver.com://lujingdriver:8080';
			} else {
				window.location.href = "http://e.lujing56.com/mobile.html?source=coupon-"+getParamVal('id');
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

	//自定义方法
	//couponType deduction: 代金 discount：折扣 fullcutcoupon：满减 giftcoupon：礼品
	function getCouponInfo(coupontype, quota, quotanote) {
		var obj = {type: '', quota: ''};
		if (coupontype == 'deduction') {
			obj.type = '代金券';
			obj.quota = (quota - 0) + '<span style="font-size: 20px;">元</span>';
		} else if (coupontype == 'discount') {
			obj.type = '折扣券';
			obj.quota = (quota * 10).toFixed(2) / 1 + '<span style="font-size: 20px;">折</span>';
		} else if (coupontype == 'fullcutcoupon') {
			obj.type = '满减券';
			obj.quota = quotanote / 1 + '<span style="font-size: 20px;">元</span>';
		} else if (coupontype == 'giftcoupon') {
			obj.type = '礼品劵';
			obj.quota = quotanote / 1 + '<span style="font-size: 20px;">元</span>';
//		obj.quota = '满'+quota/1+'有礼';
		}
		return obj;
	}

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




