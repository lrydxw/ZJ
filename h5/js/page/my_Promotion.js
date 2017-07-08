$(function(){
	//功能对象
	var objfun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	    	this.invitation();
			
			$('.p_btn2').on('click',function(){
				if(window.tf56 && window.tf56.shareQQandWeixin){
					$('.bc_all').removeClass('hid');
					$('.bc_bg1').removeClass('hid');
				}else{
					window.location.href='p_help.html?ios=invited'
				}
			})
			$('.bc_bg1,.bc_all').on('click',function(){
				$('.bc_all').addClass('hid');
				$('.bc_bg1').addClass('hid');
			})
			$('.p_btn3').on('click',function(){
				window.location.href='my_PromotionDetail.html';
			})
	    	
	    	
	    	var _index;
			$('#touxiang').showHeader({ 
			   	src: '../css/img/hz1-icon.png',
			   	clickimg:true,//点击图片是否关闭
				init:true,//false 回执行update
				fun:function(){
					$().showHeader('show');
					window.tf56&&window.tf56.setOpenFlag&&window.tf56.setOpenFlag('open',"3");
					_index=3;
				}
			});
			var imgSrc = window.tf56&&window.tf56.getHeaderImg&&window.tf56.getHeaderImg()
//			||'http://file.tf56.com:5683/party/imgs/201509/08/GXTX150908145502.jpg';
			if(imgSrc){
				showHeadImg(imgSrc);
			}
			function showHeadImg(imgUrl){
				if(imgUrl){
			    	$('#touxiang').css('background-image','url('+imgUrl+')');
			        $('#touxiang').showHeader({ 
					   	src: imgUrl,
						init:false,//false 回执行update
					});
				}
			}
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click .p_btn1': 'doshow1'
	    },
	    //自定义方法
	    //demo方法 详情型
		doshow1:function(e){
			var domThis = $(e.currentTarget);//当前元素
			if(window.tf56 && window.tf56.shareQQandWeixin){
			}else{
				window.location.href='p_help.html?ios=share'
			}
		},
		invitation: function() { //邀请好友
			var _this = this;
			param = {
				url: apiUrl.getPartyInvitationCodeByPartyId,
				callback: function(data) {
					if (data.result != 'success') {
						alertMsg(data.msg);
						return;
					} else {
						var url;
						if (com_server.match(/test/)) {
							url = 'http://static.test.tf56.com/partyCenter/view/my_regist1.html?invitationcode=';
							_this.shortUrl = "http://stest.tf56.com/contactLink/";
						} else {
							url = 'http://static.tf56.com/partyCenter/view/my_regist1.html?invitationcode=';
							_this.shortUrl = 'http://s.tf56.com/';
						}
						if (data.data) {
							$('#inviteCode').text(data.data);
							var code = url + data.data,
								_param = {
									url: apiUrl.shortlinkinsert,
									data: {
										'originalLink': code
									},
									callback: function(data) {
										if (data.result == 'success' && data.data.createlink) {
											_this.shortUrl = _this.shortUrl + data.data.createlink;
											_this.makeQRCode(_this.shortUrl);
										} else {
											_this.makeQRCode(code);
										}
									},
									errorCallback: function() {
										_this.makeQRCode(code);
									}
								};
							getJsonp(_param);
						}
					}
				},
				errorCallback: function() {
					alertMsg(msg.netError);
				}
			};
			getJsonp(param);
		},
		makeQRCode: function(url) { //生成二维码
			var qrcode = new QRCode(document.getElementById('qrcode'));
			qrcode.makeCode(url);
			$('.p_btn1').on('click',function(){
				if(new Date().getTime()-this.currenttime<2000)return;
				this.currenttime = new Date().getTime();
				var sourcecode = window.tf56 && window.tf56.getSourceCode&& window.tf56.getSourceCode();
				if(sourcecode=='0103020201'||sourcecode=='0103010201'||sourcecode=='0101010201'||sourcecode=='0101020201'){
					window.tf56 && window.tf56.shareQQandWeixin();
				}else{
					window.tf56 && window.tf56.shareQQandWeixin(url,'装这个试试，货很多，现在送红包','fromActivities','','这个货运软件感觉还不错，上面货很多，现在注册、认证还送红包，来试试吧');
				}
			})
		}
	})
	var obj = new objfun({
		$el:$('.body-content')
	});
})
