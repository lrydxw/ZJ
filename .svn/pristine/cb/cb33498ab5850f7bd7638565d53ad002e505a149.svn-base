$(function() {
  //功能对象
  var ObjFun = transfar.Base.extend({
    //初始化
    initialize: function() {
      this.base = new transfar.Base();
      this.count = 1; //初始化分页参数，当前页数
      this.maxCount = ''; //分页参数，最大页数
      this.sourceCode = window.tf56 && window.tf56.getSourceCode && window.tf56.getSourceCode() || '0103010201';
      this.dataSource = '';
      this.initData(); //初始化数据
      this.ajaxIng = false; //发起ajax请求时的标识，为true时才发起
      this.target = true;
    },
    //添加事件（基于委托，绑定动态加载元素）
    events: {
      'click .scoreDetailMore':'checkScoreDetail',//跳转积分详情
      'click .scoreMissionItem':'showMissionItem',//折叠积分任务栏
      'click .checkGoodsMission':'jumpToGoodsHall',//跳转货源大厅
      'click .publicGoodsMission':'jumpToPublicGoods',//跳转发布货源
      'click .scoreRulesText':'jumpToScoreRules',//跳转积分规则
      'click .authDetailItem':'jumpToRedirt',//跳转会员认证
    },
    initData: function() {
      //初始化数据
      var _this = this; //_this方便callback中调用
      var param = {};
      var socurceData = _this.sourceCode.substring(2,4) + _this.sourceCode.substring(6,8)
      // console.log(_this.sourceCode,socurceData)
      switch (socurceData) {
        case '0101':
          _this.dataSource = 'driverapp';
          break;
        case '0301':
          _this.dataSource = 'adApp';
          break;
        case '0102':
          _this.dataSource = 'iosDriverApp';
          break;
        case '0302':
          _this.dataSource = 'isApp';
          break;
      }
      param.url = apiUrl.integralAndDetails; //数据请求的url，apiUrl定义在api-com.js
      param.dataType = "jsonp";
      param.data = { //传递分页参数
        sourcecode: _this.sourceCode,
        pageSize: 20,
        datasource:_this.dataSource,
      }
      param.callback = function(data) {
        if (data.success != true) {
          alertMsg(data.msg);
          return;
        } else {
          if (!data.result) {
            return;
          }
          //积分账户首页的积分明细
          var r = data.result.details;
          var scoreItem='';
          for(var i=0;i<r.length;i++){
            var type = r[i].tradeType;
            var scoreType = '';
            var inOrOut='';
            if (type == 'in') {
              inOrOut = '+'
              scoreType = '#ff553c';
            }else {
              inOrOut = '-'
              scoreType = '#68758e';
            }
            scoreItem += '<div class="scoreItem"><div class="scoreName">'+r[i].description+'</div><div class="scoreDate">'+r[i].date+'</div><div class="score"><span style="color:'+scoreType+'">'+inOrOut+r[i].intergral+'</span></div></div>'
          }

          $('.scoreItemIndex').append(scoreItem);
          //积分账户【当前积分】
          var currentScore = data.result.totalIntergral;
          $('.scoreIndex2').html(currentScore);
        }
      }

      var paramMission = {};
      paramMission.url = apiUrl.integralTaskList; //数据请求的url，apiUrl定义在api-com.js
      paramMission.dataType = "jsonp";
      paramMission.data = { //传递分页参数
        sourcecode: _this.sourceCode,
        datasource: _this.dataSource,
      }
      paramMission.callback = function(data) {
        if (data.success != true) {
          alertMsg(data.msg);
          return;
        } else {
          if (!data.result) {
            return;
          }
          //积分账户首页的积分任务
          var r = data.result;
          var loginApp ={};
          var authParty = {};
          var chekGoods = {};
          var publishGoods = {};
          for(var i =0;i<r.length;i++){
            if (r[i].taskEvent === 'login') {
              loginApp = r[i]
            }else if(r[i].taskEvent === 'auth'){
              authParty = r[i]
            }else if(r[i].taskEvent === 'viewGoods'){
              chekGoods = r[i]
            }else if(r[i].taskEvent === 'publishGoods'){
              publishGoods = r[i]
            }
          }
          //【积分任务】登录模块
          var loginAppItem='';
          if (!$.isEmptyObject(loginApp)) {
             loginAppItem = '<div class="loginMission"><div class="scoreMissionItem"><span><i class="loginMissionIcon"></i><span class="loginText">登陆</span></span><i class="arrow arrowDown"></i></div><div class="missionDetail">'+_this.outModel(loginApp.condition,'login')+'</div></div>';
          }

          //【积分任务】会员认证
          var authItem = '';
          if (!$.isEmptyObject(authParty)) {
             authItem = '<div class="authMission"><div class="scoreMissionItem"><span><i class="authMissionIcon"></i><span class="loginText">会员认证</span></span><i class="arrow arrowDown"></i></div><div class="missionDetail">'+_this.outModel(authParty.condition,'auth')+'</div></div>';

          }

          //【积分任务】查找货源模块
          var checkGoods = '';
          if (!$.isEmptyObject(chekGoods)) {
             checkGoods = '<div class="checkGoodsMission positionMissionBox"><i class="checkGoodsIcon"></i>'+_this.outModel(chekGoods.condition,'chekAndPublicGoods')+'</div>';
          }
          //【积分任务】发布货源模块
          var publicGoods = '';
          if (!$.isEmptyObject(publishGoods)) {
            publicGoods = '<div class="publicGoodsMission positionMissionBox"><i class="publicGoodsIcon"></i>'+_this.outModel(publishGoods.condition,'chekAndPublicGoods')+'</div>';
          }
          //更多积分任务
          var moreMissionBox = '<div class="moreMission">－更多积分任务即将推出－</div>'

          var allMissionItem = '';
          if(_this.sourceCode.substring(2,4) == '01'){
             allMissionItem = loginAppItem + authItem + checkGoods + moreMissionBox
          }else {
             allMissionItem = loginAppItem + authItem + publicGoods + moreMissionBox
          }
          $('.missionDetailBox').append(allMissionItem);
        }
      }
      param.errorCallback = function() {
        alertMsg('网络不给力,请检查网络连接');
      }
      if (this.ajaxIng) {
        return
      }
      this.ajaxIng = true;
      getJsonp(param);
      getJsonp(paramMission);
    },
    checkScoreDetail: function() {//跳转积分明细
      // window.tf56 && window.tf56.jump && window.tf56.jump(staticSever + '/marketingScore/component/scoreDetail/scoreDetail.html?sourceCode='+this.sourceCode+'&socurceData='+this.dataSource+'');
      location.href = staticSever + '/marketingScore/component/scoreDetail/scoreDetail.html?sourceCode='+this.sourceCode+'&socurceData='+this.dataSource+''
    },
    jumpToGoodsHall:function(){//跳转货源大厅
      window.tf56 && window.tf56.findGoodsList && window.tf56.findGoodsList() ;
    },
    jumpToPublicGoods:function(){//跳转发布货源
      window.tf56 && window.tf56.jumpToPublishGoods && window.tf56.jumpToPublishGoods() ;
    },
    jumpToScoreRules:function(){//跳转积分规则
      if(this.sourceCode.substring(2,4) == '01'){//司机端
        window.tf56 && window.tf56.jump && window.tf56.jump(staticSever + '/marketingScore/component/scoreRules/scoreRulesDriver.html');
      }else {//货主端
        window.tf56 && window.tf56.jump && window.tf56.jump(staticSever + '/marketingScore/component/scoreRules/scoreRulesOwner.html');
      }
    },
    jumpToRedirt:function(){//跳转会员认证
      window.tf56 && window.tf56.redirtUserRealAuths && window.tf56.redirtUserRealAuths() ;
    },
    showMissionItem:function(e){
      $(e.currentTarget).next().slideToggle();

      if (this.target) {
        $(e.currentTarget).find('.arrow').removeClass('arrowDown');
        $(e.currentTarget).find('.arrow').addClass('arrowUp');
        this.target = false
      }else {
        $(e.currentTarget).find('.arrow').removeClass('arrowUp');
        $(e.currentTarget).find('.arrow').addClass('arrowDown');
        this.target = true
      }
    },
    outModel:function(data,type){
      var currentItem ='';
      var dataSort = data.sort(function(a,b){
        return parseInt(a.sortNum) - parseInt(b.sortNum)
      })
      for(var i=0;i<dataSort.length;i++){
        var indexItemStatus = '';
        var scoreType = '';//积分状态，每天登陆，周连续，月连续需要区别拼装
        var scoreText = '';
        var indexStatus = dataSort[i].status;//该任务的当前状态，finish，init，partilyFinish
        var indexScoreType = dataSort[i].cycle;//该任务的周期，day,week,month
        var missionTypeClass = '';
        var authClass = '';
        //任务名称下的具体积分说明
        if(type === 'login'){
          if(indexScoreType === 'day'){
            scoreType = dataSort[i].integral+'积分';
            scoreText = '';
            missionTypeClass = 'scoreMissionItemDetail';
          }else if(indexScoreType === 'week'){
            scoreText = '<div class="missionTypeLogin missionText">本周已连续登录'+dataSort[i].progress+'天</div>';
            scoreType = '连续'+dataSort[i].count+'天送'+dataSort[i].integral+'积分';
            missionTypeClass = 'scoreMissionItemDetail1'
          }else {
            scoreText = '<div class="missionTypeLogin missionText">本月已连续登录'+dataSort[i].progress+'天</div>';
            scoreType = '连续'+dataSort[i].count+'天送'+dataSort[i].integral+'积分';
            missionTypeClass = 'scoreMissionItemDetail1';
          }
        }else if(type === 'auth'){
          missionTypeClass = 'scoreMissionItemDetail';
          authClass = 'authDetailItem';
          scoreType = '认证'+dataSort[i].level+'  &nbsp'+dataSort[i].integral+'积分';
        }else if (type === 'chekAndPublicGoods') {
          scoreText = '<div class="missionTypeCheck missionText">'+dataSort[i].progress+'/'+dataSort[i].max+'次</div>';
          scoreType = '每次'+dataSort[i].integral+'积分，每天最高'+dataSort[i].max+'次';
          missionTypeClass = 'scoreMissionItemDetail1';
        }

        //当前任务状态，分为已完成，未完成，部分完成
        if (indexStatus === 'finish') {
          indexItemStatus = '<div class="missionStatus missionStatusDone"><span>完成</span></div>';
        }else if(indexStatus === 'partilyFinish') {
          indexItemStatus = '<div class="missionStatus missionStatusPartily"><span>部分完成</span></div>';
        }else {
          indexItemStatus = '<div class="missionStatus missionStatusInit"><span>未完成</span></div>';
        }
        currentItem += '<div class="missionDetailItem '+authClass+'"><div class='+missionTypeClass+'><div class="detailText">'+dataSort[i].name+'</div><div class="detailScore">'+scoreType+'</div>'+scoreText+'</div>'+indexItemStatus+'</div>';
      }
      return currentItem
    }
  })
  var obj = new ObjFun({
    $el: $('.body-content')
  });
})
