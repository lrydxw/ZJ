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
	        this.menuId = this.getUrlParam('menuId');
	        this.pdata = {};
	        this.pNewDate = [];
	        this.label = [];
	        this.category = [];
	        this.titleFlag = [];
	        this.menuHeight = 0;
	        this.domFlag = true;//类别标题开关
	        this.btnFlag = true;
	        this.pageSize = 10;
	        this.maxPage = 10;
	        this.newLen = 0;
	        this.oldLen = 0;
	        this.winHeight = $(window).height();
	        this.listHeigth = $('#body-content').height();
	        //用于详情
	        this.initData(this.pNewDate);
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click .p-li': 'checkShow'
	        //'click #load_text span':'getMore'
	    },
	    //自定义方法
	    //demo方法 详情型
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
	    initData:function(newData){
	    	var _this = this;//_this方便callback中调用
			var param = {
				url: apiUrl.knowledgepointcs,
				data:{
					'tagCode':this.tagType
				},
				callback: function(data) {
					if (data.result != 'success') {
						//alertMsg(data.msg);
						//$('#load_text').find('span').text('加载失败请重新加载');
						return;
					} else {
						//$('#load_text').find('span').text('点击加载更多');
						var _data = data.data;
						//_this.dataPush(_data,newData);
						_this.initNewPage(_data);
					}
				}
			};
			getJsonp(param);
	    },
	    dataPush:function(data,newData){
	    	for(var i = 0;i < data.length;i++){
				var labelArray = data[i].tagname.split(",");
				for(var x = 0;x < labelArray.length;x++){
					if(this.type==0){
						if(mobileSystem.android){
							if(labelArray[x]=="安卓司机APP"){
								newData.push(data[i])
							}
						}else{
							if(labelArray[x]=="iOS司机APP"){
								newData.push(data[i])
							}
						}
					}else if(this.type==1){
						if(mobileSystem.android){
							if(labelArray[x]=="安卓货主APP"){
								newData.push(data[i])
							}
						}else{
							if(labelArray[x]=="iOS货主APP"){
								newData.push(data[i])
							}
						}
					}
					var labelLen = this.label.length;
					var	labelNum = 0;
					for(var y = 0;y < labelLen;y++){
						if(labelArray[x]!=this.label[y]){
							labelNum++;	
						}
					}
					if(labelLen == labelNum){
						if(labelArray[x]!="安卓司机APP"&&labelArray[x]!="iOS司机APP"&&labelArray[x]!="安卓货主APP"&&labelArray[x]!="iOS货主APP"){
							this.label.push(labelArray[x])
						}
						
					}
				}
			}
			this.initNewPage(data.length,newData);
	    },
	    //初始化页面
	    initNewPage:function(newData){
	    	var dom = $("#body-content");
			if(newData.length > 0){	
				for (var x = 0; x < newData.length;x++) {
					if(newData[x].categoryid == this.menuId){
						//this.newLen++;
						if (this.domFlag){
							this.domFlag = false;
							dom.append("<div class='p-tit'>" + newData[x].name + "</div>");
							dom.append("<div class='p-data'></div>");
						}
						var newDom = newData[x].content;
						var knowledgepointId = "";
						if(newDom.split('<img').length==1){
							newDom = this.delHtmlTag(newDom);
							newDom = newDom.replace(/( )|(&nbsp;)/g,'');
							newDom = "<p class='p-con'>"+newDom+"</p>";
						}else{
							knowledgepointId = newData[x].knowledgepointid;
							newDom = '';
						}
						dom.find(".p-data").eq(0).append(
							"<div class='p-li' pointid="+ knowledgepointId +">" +
							"<p class='p-question'><i class='help-go'></i>" + newData[x].title + "</p>" +
							newDom +
							"</div>"
						)
					}
				}
			}
			/*if(dataLen % this.maxPage == 0){
				this.pageSize = this.pageSize + this.maxPage;
			}*/
			/*if(this.oldLen == this.newLen){
				this.btnFlag = false;
				//$('#load_text').find('span').text('暂无数据~');
				setTimeout(function(){
					$('#load_text').addClass('hid');
				},2000)
			}
			this.oldLen = this.newLen;*/
	    },
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
		delHtmlTag:function(str){
			return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
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
			var titNum = domThis.attr('pointid');
			if(titNum!=""){
				window.location.href='p_helpDetail.html?titNum='+titNum+'&type='+this.type;
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
		getMore:function(){
			if(this.btnFlag){
				$('#load_text').find('span').text('加载中...');
				var getData = [];
				this.initData(getData);
			}	
		},
		goList:function(e){
			var domThis = $(e.currentTarget);//当前元素
			var titNum = domThis.attr('titNum');
//			alert(titNum)
			window.location.href='p_helpList.html?titNum='+titNum+'&type='+this.type;
		},
		checkShowNew:function(e){
			var domThis = $(e.currentTarget);//当前元素
			var titNum = domThis.attr('pointid');
//			alert(titNum)
			window.location.href='p_helpDetail.html?titNum='+titNum+'&type='+this.type;
		}
	})
	var helpObj = new helpFun({
		$el:$('.body-content')
	});
})
