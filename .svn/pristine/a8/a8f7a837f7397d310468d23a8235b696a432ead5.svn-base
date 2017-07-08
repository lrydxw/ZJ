$(function() {
  //功能对象
  var objfun = transfar.Base.extend({
    //初始化
    initialize: function() {
      this.base = new transfar.Base();
      //用于列表
      //this.loadData = {};
      //this.loadData.data = {}; //记录已加载数据 结构与返回data一致
      //this.getData();
      //用于详情
      this.count = 1;
      this.maxCount = '';
      this.initData();
      this.ajaxIng = false;

    },
    //添加事件（基于委托，绑定动态加载元素）
    events: {

    },

    //初始化 从接口取回数据
    initData: function() {
      var _this = this; //_this方便callback中调用
      var param = {};
      param.url = apiUrl.loanBillList;
      param.dataType = "json";

      param.data = { //分页参数，pageNo=页数，pageSize=单页加载数据量
        pageNo: this.count,
        pageSize: 20
      };

      //this.base.loading("show","加载中")
      param.callback = function(data) {
        _this.base.loading("hide");
        _this.ajaxIng = false;
        _this.count++;
        if (data.result != 'success') {
          alertMsg(data.msg);
          return;
        } else {
          if (!data.data) {
            return;
          }
          var r = data.data;
          _this.maxCount = Math.ceil(data.count / 20);
          if (_this.maxCount > 1) {
            _this.scrolldown();
          }
          var loanYearItem = [];
          var obj = {};
          for (var i = 0; i < r.length; i++) { //根据yearMonth字段的前4位（2017-04）做数据分类
            var billYear = r[i].yearMonth.substring(0, 4);
            if (!obj[billYear]) {
              obj[billYear] = [];
            }
            obj[billYear].push(r[i]); //将最新的数组放在数组的第一位
          }

          var loanMonth = '';
          for (var x in obj) {
            var bill1 = ""; //拼装年份账单字符串
            var bill2 = ''; //拼装月份账单字符串
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
              bill2 += '<a href="../billDetail/index.html?show=false&record=true&loanBillNo=' + obj[x][i].loanBillNo + '"><div class="billItem"><div class="billItemLeft"><p class="billDate">' + billDate + '月账单</p><p class="billCount"><span class="billCount0">￥' + obj[x][i].repaymentAmount + '</span><span class="billCount1">（含利息￥' + obj[x][i].interest + '）</span></p></div><div class="billItemRight"><span  style="color:' + color + ';line-height:14px;font-size:14px;">' + billStatus + '</span><span class="toBillDetail"></span></div></div></a>';
            }
            //按年分隔，如果页面中没有该年（x）的dom，则创建此dom
            if ($('[data-value="' + x + '"]').length < 1) {
              bill1 = '<div><div class="billTotal" data-value="' + x + '"><span class="bilDdateAndCount">' + x + '年</span></div>';
              bill2 += '</div>';
            }
            //将月份账单dom和年份dom拼装在一起
            loanMonth += bill1 + bill2;
          }
          $('.loanItem').append(loanMonth);
          $('.loading').remove();
          //具体实现
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
    //上滑分页插件
    scrolldown: function() {
      var _this = this;
      var scrollLoading = new transfar.ScrollLoading();
      scrollLoading.bind('fetch', function(type) {
        if (type === 'BOTTOM') {
          if (_this.count > _this.maxCount) {
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
  var obj = new objfun({
    $el: $('.body-content')
  });
});
