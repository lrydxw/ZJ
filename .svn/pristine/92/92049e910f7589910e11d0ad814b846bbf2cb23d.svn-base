$(function(){
	//功能对象
	var helpFun = transfar.Base.extend({
	    //初始化
	    initialize: function () {
	        //去除点击等待 基于fastclick.js
			FastClick&&FastClick.attach(document.body);
	        this.type = this.getUrlParam('type');
	        this.tagType = 0;
	        this.typeGo();//选择端口类型
	        this.titNum = this.getUrlParam('titNum');
	        this.pdata = {};
	        this.pNewDate = [];
	        this.label = [];
	        this.category = [];
	        this.titleFlag = [];
	        this.menuHeight = 0;
	        //用于详情
	        this.initData();
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        //'click .p-li': 'checkShow'
	    },
	    typeGo:function(){
	    	if(this.type == 0){
	        	if(mobileSystem.android){
	        		this.tagType = '4';
	        	}else{
	        		this.tagType = '2';
	        	}
	        }else if(this.type == 1){
	        	if(mobileSystem.android){
	        		this.tagType = '3';
	        	}else{
	        		this.tagType = '1';
	        	}
	        }
	    },
	    //自定义方法
	    //demo方法 详情型
	    initData:function(){
	    	var _this = this;//_this方便callback中调用
	    	var url = "../js/page/p_help.json";//默认司机
	    	if(this.type==0){//司机
	    		url = "../js/page/p_help.json";
	    	}else if(this.type==1){//货主
	    		url = "../js/page/p_help1.json";
	    	}
	    	/*$.getJSON(url,function(data){
				_this.pdata = data;
				_this.initPage();
			});*/
			var param = {
				url: apiUrl.knowledgepointcs,
				data:{
					'knowledgepointid':_this.titNum,
					'tagCode':this.tagType
				},
				callback: function(data) {
					if (data.result != 'success') {
						alertMsg(data.msg);
						return;
					} else {
						$('#help-content').append(data.data[0].content)
					}
				}
			};
			getJsonp(param);

	    },
	    //初始化页面
	    initPage:function(){
	    	var hotquestion = this.pdata.hotquestion;
	    	var allquestion = this.pdata.allquestion;
	    	var hotHtml='';
	    	for(var i=0;i<hotquestion.length;i++){
	    		var code = hotquestion[i];
	    		//code找对应问题
	    		var titNum = code.substr(0,2)/1-1;
	    		var queNum = code.substr(2,2)/1-1;
	    		var question = allquestion[titNum];
	    		var r = question.data[queNum];
	    		
	    		hotHtml = hotHtml +
	    			'<div class="p-li" imgurl="'+r.imgurl+'">'+
                		'<p class="p-question"><i class="help-go"></i>'+r.quest+'</p>'+
                		'<p class="p-con">'+r.con+'</p>'+
                	'</div>';
	    	}
	    	$('.p-data').eq(0).html(hotHtml);
	    	var allHtml='';
	    	for(var i=0;i<allquestion.length;i++){
	    		var r = allquestion[i];
	    		var pClass = '';
	    		if(i%2==0){
	    			pClass = 'br';//左边的元素加右边框
	    		}
	    		allHtml = allHtml +
	    			'<p class="p-li2 '+pClass+'" titNum="'+(i+1)+'"><i class="help-go"></i>'+r.title+'</p>';
	    	}
	    	$('.p-data').eq(1).html(allHtml);
	    },
		functiondel_html_tags:function(str){
			var words = '';
			words =str.replace(/<[^>]+>/g,"");
			return words;
		},
		menuShowHid:function(e){
			var domMenu = $('#p-menu');
			var domThis = $(e.currentTarget);//当前元素
			if(parseInt(domMenu.css("height"))==0){
				domMenu.css('height',this.menuHeight+"px");
				$('#menu-tl').find('i').addClass('cur');
				$('#menu-tl').find('span').text('隐藏');
			}else{
				domMenu.css('height',0);
				$('#menu-tl').find('i').removeClass('cur');
				$('#menu-tl').find('span').text('展开');
			}
		},
		checkShow:function(e){
			var domThis = $(e.currentTarget);//当前元素
			var imgurl = domThis.attr('imgurl');
			if(imgurl){
				window.location.href='p_helpDetail.html?imgurl='+imgurl;
				return;
			}
			var domi = domThis.find('.p-question i');
			if(domi.hasClass('help-go')){
				domi.removeClass();
				domi.addClass('help-down');
				domThis.children('.p-con').show();
			}else{
				domi.removeClass();
				domi.addClass('help-go');
				domThis.children('.p-con').hide();
			}
			//定位暂不做，问题不多没必要
//			$("html,body").animate({scrollTop:$("#box").offset().top},1000)
		},
		goList:function(e){
			var domThis = $(e.currentTarget);//当前元素
			var titNum = domThis.attr('titNum');
//			alert(titNum)
			window.location.href='p_helpList.html?titNum='+titNum+'&type='+this.type;
		},
		goListNew:function(e){
			var domThis = $(e.currentTarget);//当前元素
			var titNum = domThis.text();
//			alert(titNum)
			window.location.href='p_helpList.html?titNum='+titNum+'&type='+this.type;
		}
	})
	var helpObj = new helpFun({
		$el:$('.body-content')
	});
})
