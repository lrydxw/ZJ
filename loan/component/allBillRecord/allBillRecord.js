$(function() {
  //功能对象
  var ObjFun = transfar.Base.extend({
    //初始化,继承Base内的方法（貌似只用到了loading方法）
    initialize: function() {
      this.base = new transfar.Base();
      this.count = 1; //初始化分页参数,当前页数
      this.maxCount = ''; //初始化分页参数，总页数
      this.initData(); //初始化加载数据
      this.ajaxIng = false; //发起ajax请求的前置条件
    },
    //添加事件（基于委托，绑定动态加载元素）
    events: {},

    initData: function() {
      //初始化,从接口取回数据
      var _this = this; //_this方便callback中调用
      var param = {};
      param.url = apiUrl.loanBillList; //ajax请求的url，apiUrl定义在api-com.js内
      param.dataType = "json";
      param.data = {
        //分页参数，pageNo=页数，pageSize=单页加载数据量
        pageNo: this.count,
        pageSize: 20
      };
      param.callback = function(data) {
        //ajax返回的数据在callback中进行处理，拼装每个【月份账单】的dom元素
        _this.base.loading("hide");
        _this.ajaxIng = false;
        _this.count++;
        if (data.result != 'success') {
          alertMsg(data.msg); //调用消息弹窗通用方法
          return;
        } else {
          //数据返回成功
          if (!data.data) {
            return;
          }
          var r = data.data;
          _this.maxCount = Math.ceil(data.count / 20); //count为接口返回字段，记录数据总条数
          if (_this.maxCount > 1) {
            _this.scrolldown();
          }
          var loanYearItem = [];
          var obj = {};
          for (var i = 0; i < r.length; i++) {
            //根据yearMonth字段的前4位（例：2017-04）做数据分类
            var billYear = r[i].yearMonth.substring(0, 4); //截取年份字段
            if (!obj[billYear]) {
              obj[billYear] = [];
            }
            obj[billYear].push(r[i]); //将最新的数组放在数组的第一位
          }

          for (var x in obj) {
            var yearBillItem = ""; //拼装年份账单字符串
            var monthBillItem = ''; //拼装月份账单字符串
            var billStatus = ''; //账单状态，根据接口返回的不同状态值（数字）转译为汉字
            var color = ''; //状态字颜色，每种状态字都有不同的颜色，
            for (var i = 0; i < obj[x].length; i++) {
              var billDate = obj[x][i].yearMonth.substring(5, 7); //账单所属月份
              if (obj[x][i].billStatus == '1') { //根据billStatus字段返回不同的账单状态，以及对应状态文本显示的颜色
                billStatus = '未还清';
                color = '#ff8966';
              } else if (obj[x][i].billStatus == '2') {
                billStatus = '已逾期';
                color = '#68758e';
              } else if (obj[x][i].billStatus == '3') {
                billStatus = '已还清';
                color = '#35b084';
              } else if (obj[x][i].billStatus == '4') {
                billStatus = '无记录';
                color = '';
              }
              //拼装月份账单字符串
              monthBillItem += '<a href="../billDetail/index.html?show=false&record=true&loanBillNo=' + obj[x][i].loanBillNo + '"><div class="billItem"><div class="billItemLeft"><p class="billDate">' + billDate + '月账单</p><p class="billCount"><span class="billCount0">￥' + obj[x][i].repaymentAmount + '</span><span class="billCount1">（含利息￥' + obj[x][i].interest + '）</span></p></div><div class="billItemRight"><span  style="color:' + color + ';line-height:14px;font-size:14px;">' + billStatus + '</span><span class="toBillDetail"></span></div></div></a>';
            }
            if ($('[data-value="' + x + '"]').length < 1) {
              //按年分隔，如果页面中没有该年（x）的dom，则创建此dom
              yearBillItem = '<div><div class="billTotal" data-value="' + x + '"><span class="bilDdateAndCount">' + x + '年</span></div>';
              monthBillItem += '</div>';
            }
            //将月份账单dom和年份dom拼装在一起
            var loanMonth = '';
            loanMonth += yearBillItem + monthBillItem;
          }
          $('.loanItem').append(loanMonth); //loanItem为html里预留放置账单dom的div
          $('.loading').remove(); //将账单dom添加到html后，移除等待动画
        }
      };
      param.errorCallback = function() {
        alertMsg('网络不给力,请检查网络连接');
      };
      if (this.ajaxIng) {
        return;
      }
      this.ajaxIng = true;
      getJsonp(param);
    },

    scrolldown: function() {
      //上滑分页插件，监测到滑动的当页的末尾时，判断是否为最后一页，不是则继续发起ajax请求，是则显示对应文案
      var _this = this;
      var scrollLoading = new transfar.ScrollLoading();
      scrollLoading.bind('fetch', function(type) {
        if (type === 'BOTTOM') {
          if (_this.count > _this.maxCount) { //划至底部时进行判断，如果当前页数大于最大页数，则说明没有更多数据了
            $('.loanItem').after('<p class="loading" >没有更多了</p>');

            scrollLoading.trigger('turn', 'off');
            return;
          }

          scrollLoading.trigger('turn', 'on');
          if ($(".loading").length < 1) {
            $('.loanItem').after('<p class="loading" >加载中...</p>');
          }
          _this.initData();

        } else {
          scrollLoading.trigger('turn', 'on');
        }
      });
    }
  });
  var obj = new ObjFun({
    //$el规定当前DOM的作用范围
    $el: $('.body-content')
  });
});
