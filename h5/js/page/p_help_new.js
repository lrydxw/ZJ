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
	        this.pdata = {};
	        this.pNewDate = [];
	        this.label = [];
	        this.category = [];
	        this.titleFlag = [];
	        this.menuHeight = 0;
	        this.fotHeight= 0;
	        this.domFlag = true;
	        this.winHeight = $(window).height();
	        this.listHeight = $('#body-content').height();
	        this.menuFlag = true;
	        //用于详情
	        this.initData();
	        this.menuGet();
	    },
	    //添加事件（基于委托，绑定动态加载元素）
	    events: {
	        'click .p-li': 'checkShow',
	        'click .go-li2': 'goListNew'
	        //'click #menu-tl': 'menuShowHid'
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
			var param = {
				url: apiUrl.knowledgepointcs,
				data:{
					'tagCode':this.tagType
				},
				callback: function(data) {
					console.log(data)
					if (data.result != 'success') {
						alertMsg(data.msg);
						return;
					} else {
						var _data = data.data;
						_this.dataPush(_data);
						_this.initNewPage(_data);
					}
				}
			};
			getJsonp(param);
	    },
	    dataPush:function(data){
	    	for(var i = 0;i < data.length;i++){
				var labelArray = data[i].tagname.split(",");
				for(var x = 0;x < labelArray.length;x++){
					//console.log(labelArray[x])
					/*if(this.type==0){
						if(mobileSystem.android){
							if(labelArray[x]=="安卓司机APP"){
								this.pNewDate.push(data[i])
							}
						}else{
							if(labelArray[x]=="iOS司机APP"){
								this.pNewDate.push(data[i])
							}
						}
					}else if(this.type==1){
						if(mobileSystem.android){
							if(labelArray[x]=="安卓货主APP"){
								this.pNewDate.push(data[i])
							}
						}else{
							if(labelArray[x]=="iOS货主APP"){
								this.pNewDate.push(data[i])
							}
						}
					}*/
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
			console.log(this.label)
	    },
	    //初始化页面
	    initNewPage:function(data){
			var dom = $("#body-content"),
				index = -1;
			if(data.length > 0){
				for (var i = 0; i < this.label.length; i++) {
					this.titleFlag[i] = true;
					for (var x = 0; x < data.length; x++) {
						var labelArray = data[x].tagname.split(",");
						for (var y = 0; y < labelArray.length; y++) {
							if (this.label[i] == labelArray[y]){
								if (this.titleFlag[i]) {
									this.titleFlag[i] = false;
									dom.append("<div class='p-tit'>" + this.label[i] + "</div>");
									dom.append("<div class='p-data'></div>");
									index++;
								}
								var newDom = data[x].content;
								var knowledgepointId = "";
								if(newDom.split('<img').length==1){
									newDom = this.delHtmlTag(newDom);
									newDom = newDom.replace(/[ ]|[&nbsp;]/g,'');
									newDom = "<p class='p-con'>"+newDom+"</p>";
								}else{
									knowledgepointId = data[x].knowledgepointid;
									newDom = '';
								}
								dom.find(".p-data").eq(index).append(
									"<div class='p-li' pointid="+ knowledgepointId +">" +
									"<p class='p-question'><i class='help-go'></i>" + data[x].title + "</p>" +
									newDom +
									"</div>"
								)
							}
						}
					}
		    	}
		    	/*if(this.domFlag){
		    		this.domFlag = false;
		    		for(var i = 0;i < this.category.length;i++){
			    		if(i==0){
			    			$('#body-main').before(
			    				"<div class='fot-menu' id='fot-menu'>" +
									"<div class='p-tit' id='menu-tl'><i class='help-down'></i><span>展开</span>问题分类</div>"	+
									"<div id='p-menu'></div>" +
			    				"</div>"
			    			)
			    		}
			    		$('#p-menu').append("<p class='p-li2 go-li2' menu-id="+i+"><i class='help-go'></i>"+this.category[i]+"</p>");
			    		if(this.category.length % 2 == 1)$('#p-menu').append("<p class='p-li2'></p>");
			    	}
			    	this.menuHeight = $('#p-menu').height();
			    	this.fotHeight = $('#menu-tl').height();
			    	if(this.listHeight >= this.winHeight){
			    		$('#fot-menu').css("-webkit-transform", "translate3d(0," + this.fotHeight + "px,0)");
			    		this.menuFlag = false;
			    	}
		    	}*/
	    		
	    	}
	    	
	    },
	    menuGet:function(){
	    	var _this = this;//_this方便callback中调用
			var param = {
				url: apiUrl.selectParentNodeByPrimaryKey,
				callback: function(data) {
					if (data.result != 'success') {
						alertMsg(data.msg);
						return;
					} else {
						var _data = data.data;
						for(var i = 0;i < _data.length;i++){
							console.log(_data.length)
				    		if(i==0){
				    			$('#body-main').append(
				    				"<div class='fot-menu' id='fot-menu'>" +
										"<div class='p-tit' id='menu-tl' style='border-top:0'><i class='help-down' style='display:none'></i><span style='display:none'>展开</span>问题分类</div>"	+
										"<div id='p-menu'></div>" +
				    				"</div>"
				    			)
				    		}
				    		$('#p-menu').append("<p class='p-li2 go-li2' menu-id="+_data[i].categoryid+"><i class='help-go'></i>"+_data[i].name+"</p>");
				    	}
				    	if(_data.length % 2 == 1)$('#p-menu').append("<p class='p-li2'> </p>");
				    	_this.menuHeight = $('#p-menu').height();
				    	_this.fotHeight = $('#menu-tl').height();
				    	if(_this.listHeight >= _this.winHeight){
				    		_this.menuFlag = false;
				    		$('#fot-menu').css("-webkit-transform", "translate3d(0," + _this.menuHeight + "px,0)");
				    		$('#menu-tl').find('i').addClass('cur');
				    		$('#menu-tl').find('span').text('展开');
				    	}else{
				    		_this.menuFlag = true;
				    		$('#fot-menu').css("-webkit-transform", "translate3d(0,0,0)");
				    		$('#menu-tl').find('i').removeClass('cur');
				    		$('#menu-tl').find('span').text('隐藏');
				    	}
					}
				}
			};
			getJsonp(param);
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
		menuShowHid:function(e){
			if(this.menuFlag){
				$('#fot-menu').css("-webkit-transform", "translate3d(0," + this.menuHeight + "px,0)");
				$('#menu-tl').find('i').addClass('cur');
				$('#menu-tl').find('span').text('展开');
				this.menuFlag = false;
			}else{
				$('#fot-menu').css("-webkit-transform", "translate3d(0,0,0)");
				$('#menu-tl').find('i').removeClass('cur');
				$('#menu-tl').find('span').text('隐藏');
				this.menuFlag = true;
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
		delHtmlTag:function(str){
			return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
		},
		goListNew:function(e){
			var domThis = $(e.currentTarget);//当前元素
			var titNum = domThis.attr('menu-id');
//			alert(titNum)
			window.location.href='p_helpList.html?menuId='+titNum+'&type='+this.type;
		},
		checkShowNew:function(e){
			var domThis = $(e.currentTarget);//当前元素
			var titNum = domThis.attr('pointid');
//			alert(titNum)
			window.location.href='p_helpDetail.html?titNum='+titNum+'&type='+this.type;
		}
	})
	var helpObj = new helpFun({
		$el:$('body')
	});
})
