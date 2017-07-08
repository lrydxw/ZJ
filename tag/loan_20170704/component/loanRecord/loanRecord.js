$(function() {
  //功能对象
  var ObjFun = transfar.Base.extend({
    //初始化
    initialize: function() {
      this.base = new transfar.Base();
      this.count = 1; //初始化分页参数，当前页数
      this.maxCount = ''; //分页参数，最大页数
      this.type="loan";//借款：loan,还款：repay
      this.initData(); //初始化数据
      this.ajaxIng = false; //发起ajax请求时的标识，为true时才发起
      this.creatScroll();//固定头部
    },
    //添加事件（基于委托，绑定动态加载元素）
    events: {
      'click .tab-option': 'tabChange'//借还款切换
    },
    initData: function() {
      //初始化数据
      //防止重复加载
      if (this.ajaxIng) {
        return
      }
      var _this = this; //_this方便callback中调用
      var param = {};
      param.url = this.type=="loan"?apiUrl.queryLoanFactorRecordList:apiUrl.queryRepaymentList; //数据请求的url，apiUrl定义在api-com.js
      param.dataType = "json";
      param.data = { //传递分页参数
        pageNo: this.count,
        pageSize: 20
      }
      param.callback = function(data) {
        _this.base.loading("hide");
        _this.ajaxIng = false;
        _this.count++;
        if (data.result != 'success') {
          alertMsg(data.msg);
          return;
        } else {
          if (!data) {
            return;
          }
          _this.maxCount = Math.ceil(data.count / param.data.pageSize); //单页20条数据，所以返回数据的最大页数为【数据总条数（count）/20】
          if (_this.maxCount > 1) {
            _this.scrolldown();
          }
          _this.creatHtml(data.data);//创建页面列表
        }
      }
      param.errorCallback = function() {
        alertMsg('网络不给力,请检查网络连接');
      }
      this.ajaxIng = true;
      getJsonp(param);
    
    },
    creatHtml:function(data){
      //创建页面列表
      var _this = this; 
      var obj = {}; //创建用于存放数据归类的对象
      if(data.length<1){
        $(".bill-no").show();
      }
      for (var i = 0; i < data.length; i++) {
        //根据yearMonth字段（例：2017-04）做数据分类，yearMonth相同则归入到同一个数组
        if (!obj[data[i].yearMonth]) { //如果该yearMonth不存在，则新创建以该yearMonth为key的空数组
          obj[data[i].yearMonth] = [];
        }
        obj[data[i].yearMonth].push(data[i]);
      }

      var loanMonth = ''; //定义拼装字符串，时间段可能有多个，将所有时间段及对应的借款记录dom拼装在一起
      var addI=0;
      for (var x in obj) {
        var bill1 = ""; //定义拼装字符串，多个借还记录对应同一个借款时间，将这些有相同时间的dom拼装起来
        var bill2 = ''; //定义拼装字符串，同一个借款时间下的所有借款记录dom

        for (var i = 0; i < obj[x].length; i++) {
          //拼装同一时间下的借款记录dom
          
          if(_this.type=="repay"){
            //还款
              bill2 += '<div class="billList"><div class="billItem">'
            +'<div class="billItemLeft">' 
          + obj[x][i].repaymentDate.substring(8, 16).replace(" ","日 ") + '</div>'+
          '<div class="billItemRight"><span class="billCount bill-aready">￥' + obj[x][i].repaymentAmount +
           '</span>'+
           '<span class="billEarn">(含利息 :￥'+obj[x][i].interest+')</span>'
           +'</div>'
           +'</div></div>'
          
          }else{
            //借款
             bill2 += '<div class="billList"><div class="billItem"><div class="billItemLeft">' 
          + obj[x][i].loanDate.substring(8, 16).replace(" ","日 ")  + '</div><div class="billItemRight"><span class="billCount">￥' + obj[x][i].amount +
           '</span></div></div></div>'
          }
        }

        if ($('[data-value="' + x + '"]').length < 1) {
          //将当前借款时间段和该时间段下的借款dom（bill2）拼装在一起
          bill1 = '<div><div class="billTotal" data-value="' + x+'"><span class="bilDdateAndCount">' + x.replace("-","年") + '月</span></div>'
         
          bill2 += '</div>'
        }
        loanMonth += bill1 + bill2; //将所有时间段下的借款记录dom拼装起来
        addI++;

      }
      $('.loanItem').append(loanMonth);
      $("#month span").html($(".billTotal").eq(0).data("value").replace("-","年") + '月')//显示月份
      $('.loading').remove();

      setInterval(function(){
        _this.showMonth();//展示顶部固定月份 手机在执行滚动操作时 js会停止执行 所以使用了轮训
      },100)
    },
    tabChange: function(e) {
      //借还款切换
      $(".tab-option").removeClass("tab-option-on")
      $(e.currentTarget).addClass("tab-option-on")
      $(".bill-no").hide();//隐藏无记录状态
      this.count = 1; //初始化分页参数，当前页数
      $('.loanItem').html("").scrollTop(0)
      this.type=$(e.currentTarget).data("type")
      this.initData();
    },
    scrolldown: function() {
      //上滑分页插件，监测到滑动的当页的末尾时，判断是否为最后一页，不是则继续发起ajax请求，是则显示对应文案
      var _this = this;
      var scrollLoading = new transfar.ScrollLoading({$el:$(".loanItem")});
      scrollLoading.bind('fetch', function(type) {
        if (type === 'BOTTOM') {
          if (_this.count > _this.maxCount) { //划至底部时进行判断，如果当前页数大于最大页数，则说明没有更多数据了
            if ($(".loading").length < 1) {
              $('.loanItem').append('<p class="loading" >没有更多了</p>');
            }else{
              $(".loading").html("没有更多了")
            }

            scrollLoading.trigger('turn', 'off');
            return
          }

          scrollLoading.trigger('turn', 'on');
          if ($(".loading").length < 1) {
            $('.loanItem').append('<p class="loading" >加载中...</p>');
          }
          _this.initData()

        } else {
          scrollLoading.trigger('turn', 'on');
        }

      })
    },
    creatScroll:function(){
      //固定头部
      var height=document.documentElement.clientHeight;
      $(".loanItem").css({
        "height":height-48,
        "overflow":"auto",
        "marginTop":"-31px"
      })
    },
    showMonth:function(){
      //滚动时显示当前账单月份
        $(".billTotal").each(function(i,e){
          var offTop=$(e).offset().top;
          if(offTop<60){
            $("#month span").html($(".billTotal").eq(i).data("value").replace("-","年") + '月')
          }
        })
    }
  })
  var obj = new ObjFun({
    $el: $('.body-content')
  });
})
