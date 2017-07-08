$(function() {
  //功能对象
  var ObjFun = transfar.Base.extend({
    //初始化
    initialize: function() {
      this.base = new transfar.Base();
      this.loanId = ''; //包含在url里的参数，由上个页面带过来
      this.initData(); //初始化加载数据
    },
    //添加事件（基于委托，绑定动态加载元素）
    events: {},
    initData: function() {
      //初始化数据，loanBillNo由函数GetQueryString从url中取得，
      //根据loanBillNo的有无，显示单月账单（例：4月账单）或着未出账单
      //设置html中<title>,用于app端显示
      var isDone;
      if (getQueryString('loanBillNo') != '0') {
        isDone = true;
        var billMonth = GetQueryString('month'); //取得url中的月份字段
        document.getElementsByTagName("title")[0].innerHTML = billMonth + '月已出帐'; //设置html中的<title>,IOS端直接读取<title>内容用于显示
      } else {
        isDone = false;
        document.getElementsByTagName("title")[0].innerHTML = '未出账单'; //设置html中的<title>,IOS端直接读取<title>内容用于显示
      }
      try { //异常处理
        window.tf56.setTitle(document.getElementsByTagName("title")[0].innerHTML)
      } catch (e) {
        console.log(e)
      }
      //ajax数据请求
      var _this = this; //_this方便callback中调用
      var param = {};
      var loanId = getQueryString('loanBillNo') || 0; //获取loanBillNo，如果没有则为查询未出账单，此时该字段传0
      param.url = apiUrl.getLoanBillDetail;
      param.dataType = "json"
      param.data = {
        loanBillNo: loanId
      }
      param.callback = function(data) {
        _this.base.loading("hide")
        if (data.result != 'success') {
          alertMsg(data.msg);
          return;
        } else {
          if (!data.data) {
            return;
          }
          var r = data.data;
          var billRecord = ''; //定义借款记录，用于遍历数据后进行字符串拼装
          for (var i = 0; i < r.loanRecordList.length; i++) {
            //遍历返回的月账单数据
            var loanRecordItem = r.loanRecordList[i]； //账单数据
            var billStatus = ''; //账单状态，根据接口返回的不同状态值（数字）转译为汉字
            var color = ''; //状态字颜色，每种状态字都有不同的颜色
            if (loanRecordItem.status == '1') {
              billStatus = '已还'
              color = '#35b084'
            } else if (loanRecordItem.status == '2') {
              billStatus = '未还'
              color = '#ff8966'
            } else {
              billStatus = '逾期'
              color = '#ff8966'
            }
            var billDateNoTime = loanRecordItem.loanDate.substring(2, 10); //截取loanDate字段，与UI稿保持一致
            //拼装账单字符串
            billRecord += '<div class="billItem"><div class="billItemLeft"><p class="billDate">' + billDateNoTime + '</p><p class="billCount"><span class="billCount0">￥' + loanRecordItem.repaymentAmount + '</span><span class="billCount1">(含利息￥' + loanRecordItem.interest + ')</span></p></div><div class="billItemRight"><span class="billState" style="color:' + color + '">' + billStatus + '</span></div></div>'
          }

          var billDateStart = r.billStartDate.substring(5, 10).replace('-', '月'); //截取billStartDate（账单开始时间）字段，与UI稿保持一致
          var billDateEnd = ''; //账单结束时间
          if (isDone) { //loanBillNo-》isDone-》billDateEnd
            billDateEnd = r.billEndDate.substring(5, 10).replace('-', '月') //isDone为true，截取billEndDate字段作为billDateEnd
          } else {
            billDateEnd = '至今'; //isDone为false，当前账单为未出账单，账单结束时间为【至今】
          }
          //构建账单时间dom
          var billItem = '<div class="billTotal"><span class="bilDdateAndCount">' + billDateStart + '日-' + billDateEnd + '共' + r.billCount + '笔 , ￥' + r.unRepaymentAmount + '</span></div><div class="billList1">' + billRecord + '</div>';

          $('.billList').append(billItem)
        }
      }
      param.errorCallback = function() {
        alertMsg('网络不给力,请检查网络连接');
      }
      getJsonp(param);
    },
  })
  var obj = new ObjFun({
    //$el规定当前DOM的作用范围
    $el: $('.body-content')
  });
})

/**
 *函数描述：用正则表达式从url中截取目标（name）字段
 *
 * @param {string} name 传入需要从url里截取的字段
 */
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
