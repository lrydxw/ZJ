$(function() {
  //功能对象
    var ObjFun = transfar.Base.extend({
    //初始化
    initialize: function() {
      this.base = new transfar.Base();
      this.count = 1; //初始化分页参数，当前页数
      this.maxCount = ''; //分页参数，最大页数
      this.initData(); //初始化数据
      this.ajaxIng = false; //发起ajax请求时的标识，为true时才发起
      this.tabName = '';
    },
    //添加事件（基于委托，绑定动态加载元素）
    events: {
      'click .tabItem': 'changeTab'
    },
    initData: function(tabName) {
      //初始化数据
      if (tabName === 'in' || tabName === 'out') {
        $('.scoreDetail').html('')
        $('.loading').html('')
      }
      var tab = tabName || '';
      var sourceCode = this.base.getUrlParam('sourceCode');
      var dataSource = this.base.getUrlParam('socurceData');
      var _this = this; //_this方便callback中调用
      var param = {};
      var offset = (this.count-1)*10;
      if (_this.tabName != tab ) {
        offset = 0;
      }
      _this.tabName = tabName;
      param.url = apiUrl.details; //数据请求的url，apiUrl定义在api-com.js
      param.dataType = "jsonp";
      param.data = { //传递分页参数
        offset: offset,
        pageSize: 10,
        // datasource:dataSource,
        datasource:'driverapp',
        tradeType:tabName || '',
        // sourcecode:sourceCode
        sourcecode:01030101
      }
      param.callback = function(data) {
        _this.base.loading("hide");
        _this.ajaxIng = false;
        _this.count++;
        if (data.success != true) {
          alertMsg(data.msg);
          return;
        } else {
          if (!data.result) {
            return;
          }

          var r = data.result.details;
          if (r.length===0) {
            var winHeight = 0;
            if (window.innerHeight){
              winHeight = window.innerHeight -51;
            }else if((document.body) && (document.body.clientHeight)){
              winHeight = document.body.clientHeight;
            }
            var nonText = '<div class = "empty" style="height:'+winHeight+'px;"><i class="emptyImg"></i><p style="font-size:14px;color:#68758e;line-height:20px;">暂无积分明细</p></div>';
            $('.scoreDetail').html(nonText);
            return
          }
          _this.maxCount = Math.ceil(data.result.total / 10  ); //单页20条数据，所以返回数据的最大页数为【数据总条数（count）/20】
          if (_this.maxCount > 1) {
            _this.scrolldown();
          }
          var scoreItem='';
          for(var i=0;i<r.length;i++){
            var scoreType = '';
            var mathSymbol = '';
            if (r[i].tradeType === 'in') {
              mathSymbol = '+'
              scoreType = '#ff553c';
            }else {
              mathSymbol='-'
              scoreType = '#68758e';
            }

            scoreItem += '<div class="scoreItem"><div class="scoreName">'+r[i].description+'</div><div class="scoreDate">'+r[i].date+'</div><div class="score"><span style="color:'+scoreType+'">'+mathSymbol+r[i].intergral+'</span></div></div>'
          }

          $('.scoreDetail').append(scoreItem);
          $('.loading').remove();
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
    },
    changeTab: function(e) {
       var _this = this;
       var tabNameIndex = $(e.currentTarget).attr('data-value') || '';
       this.count = 1;
       $('.tab').children('.activeTarget').removeClass('activeTarget');
       $(e.currentTarget).addClass('activeTarget');
       $('.scoreDetail').children().remove();
       _this.initData(tabNameIndex)
    },
    scrolldown: function() {
      //上滑分页插件，监测到滑动的当页的末尾时，判断是否为最后一页，不是则继续发起ajax请求，是则显示对应文案
      var _this = this;
      var scrollLoading = new transfar.ScrollLoading();
      scrollLoading.bind('fetch', function(type) {
        if (type === 'BOTTOM') {
          if (_this.count > _this.maxCount) { //划至底部时进行判断，如果当前页数大于最大页数，则说明没有更多数据了
            if ($('.loading').length < 1) {
              $('.scoreDetail').after('<p class="loading" >－没有更多了－</p>');
            }
            scrollLoading.trigger('turn', 'off');
            return
          }
          scrollLoading.trigger('turn', 'on');
          if ($(".loading").length < 1) {
            $('.scoreDetail').after('<p class="loading" >加载中...</p>');

          }
          _this.initData()

        } else {
          scrollLoading.trigger('turn', 'on');
        }

      })
    }
  })
  var obj = new ObjFun({
    $el: $('.body-content')
  });
})
