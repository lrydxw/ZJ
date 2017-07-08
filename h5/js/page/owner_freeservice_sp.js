;
(function ($) {
    //页面公用数据
    var clientWidth = document.documentElement.clientWidth;
    var pageData = {
        innerR: 154 / 720 * clientWidth,
        R: 180 / 720 * clientWidth,
        regStatus: false
    };

    //免费电话：begin
    var Tel = transfar.Base.extend({
        initialize: function(){
            this.G = G;
            this.data = {
                regStatus: false,
                remainTime: 0,
                totalTime: 0,
                calledtime: 0,
                btnText: '',
                btnLink: ''
            };
//          this.
            console.log(pageData.R + " " +pageData.innerR)
            this.pie = new SimplePieChart('canvasTel');
            this.pie.init({
                R: pageData.R,//半径
                innerR: pageData.innerR//内半径
            });
        },
        drawChart: function(current,total,regStatus){
            if(regStatus==false){
                this.pie.setOption({
                    currentNumber: '',
                    totalNumber: 0,
                    color: '#fff',
                    unit: '更多优惠',
                    tipText: '活动期间认证可获'
                });
            }
            else{
				console.log(current, total)
                this.pie.setOption({
                    currentNumber: current,
                    totalNumber: total,
                    color: '#fff',
                    unit: '分钟',
                    tipText: '剩余可用'+(current)+'分钟'
                });
            }
        },
        loadData: function(regStatus){
            var param = {},
                _this = this;
            param.url = apiUrl.callList;
            param.data = {
                "datasource": "adApp",
                "skipCount": 0,
                "pageSize": 1,
                "timestamp": new Date().getTime()
            };
            param.callback = function(data){
                var result = data.data;
                if(data.result!='success'){
                    alertMsg(data.msg);
                    return;
                }
                //标记数据已加载
                tabObj.$tel.data('init','true');

                var record = result&&result.calledrecord,
                    len = record.length,
                    fc = result&&result.freecall;
                _this.data.remainTime = extend.round(fc&&fc.remaintime||0),//剩余时长
                    _this.data.totalTime  = extend.round(fc&&fc.totaltime||0);
                _this.data.calledtime  = extend.round(fc&&fc.calledtime||0);
                // var regStatus = extend.regJudge(result&&result.businessPermission);
                if(regStatus==false){
                    // $('.J_regInfo').show();
                }
                if(len>0){
                    _this.data.btnText =  '查看详情';
                    _this.data.btnLink = 'owner_freeserviceTelDetail.html';
                }else{
                    if(regStatus==false){
                        _this.data.btnText = '立即认证';
                        _this.data.btnLink = 'javascript:window.tf56&&window.tf56.jumpToUserCertificate()';
                    }
                    else{
                        _this.data.btnText = '立即体验';
                        _this.data.btnLink = 'javascript:void(0);';
                        $('.J_ty').on('click',function(){
                            window.tf56&&window.tf56.findGoodsList();
                        });
                    }

                }
                _this.$el.ngRender(_this.data);
                _this.drawChart(_this.data.remainTime,_this.data.totalTime,regStatus);
            }
            getJsonp(param);
        }
    });

    var telObj = new Tel({
        $el: $('.tel-box')
    });
    telObj.bind('init',function(){
		selectPartyLevel(function(level){
			var status = level === 'V3' ? true : false
			telObj.loadData(status);
		}, 'owner')
    });


    //免费流量：Bgein
    var Flow = transfar.Base.extend({
        initialize: function () {
            this.G = G;
            this.data = {
                usedTrafficText: '',
                trafficNextText: ''
            };
            this.skipCount = 0;
            this.pageSize = 4;
            this.history = $('.flow-history');
            this.loadMore = this.$el.find('.loadmorebtn');
            this.getPending = false;
        },
        events: {
            'click .li-btn': 'getFlow',
            'click .month-btn': 'getFlow',
            'click .loadmorebtn': 'loadMoreEvent'
        },
        loadMoreEvent: function () {
            this.skipCount += this.pageSize;
            this.loadHistoryData();
        },
        formatFLow: function (r) {
            r = r || 0;
            var f = parseFloat(r) / 1024;
            var result = new Number(f).toFixed(1) - 0;
            if (result < 0)
                result = 0;
            return result;
        },
        getFlow: function (ev) {
            var This = $(ev.currentTarget),
                param = {},
                _this = this;
            if (This.hasClass('gray')||This.parent().css('opacity')==0)
                return;
            param.url = apiUrl.instanceRecharge;
            param.data = {
                "datasource": "adApp",
                rechargesource:  This.attr('data-rechargesource'),
                trafficstatisticsid: This.attr('data-trafficstatisticsid')
            };
            param.callback = function (data) {
                var status = data.data&&data.data.status + '';
                if (data.result != 'success' && status!='7'){
                    alertMsg(data.msg);
                    return;
                }
                This.text('充值中').addClass('gray');
                _this.getPending = false;
            };
            param.errorCallback = function () {
                alertMsg('网络不给力,请检查网络连接');
                _this.getPending = false;
            }
            if (!_this.getPending) {
                _this.getPending = true;
                getJsonp(param);
            }
        },
        loadCurrentData: function () {
            var _this = this;
            var param = {};
            param.url = apiUrl.selectTrafficStatisticsCurrent;
            param.data = {
                timestamp: new Date().getTime(),
                datasource: "adApp"
            };
            param.callback = function (data) {
                if (data.result != 'success') {
                    alertMsg(data.msg || '系统异常');
                }
                var r = data && data.data || {},
                    hasPermission = r.hasPermission + '',
                    usedTraffic = _this.formatFLow(r.usedTraffic),
                    useTrafficNext = _this.formatFLow(r.useTrafficNext),
                    needToUseTraffic = _this.formatFLow(r.needToUseTraffic),
                    returnTrafficNext = _this.formatFLow(r.returnTrafficNext),
                    receiveTrafficCurrent = _this.formatFLow(r.receiveTrafficCurrent),//当月流量可领取流量
                    receiveStatus = r.receiveStatus, // 当月流量领取状态
                    rechargesource = r.rechargesource,
                    trafficstatisticsid = r.trafficstatisticsid,
                    tip = '',
                    currentGetHtml = '';
                _this.data.usedTrafficText = usedTraffic + 'M';
                if (hasPermission == 'false') {
                    $('.J_regInfo').show();
                    tip = '认证后';
                }
                _this.data.trafficNextText = '再使用' + needToUseTraffic + 'M流量，' + tip + '将享受' + returnTrafficNext + 'M流量优惠';

                if (receiveTrafficCurrent > 0 && (rechargesource == 'register_success' || rechargesource == 'traffic_restore')) {
                    //送上月30M流量<button class="month-btn">立即领取</button>
                    if (rechargesource == 'register_success') {
                        currentGetHtml += '注册送';
                    } else if (rechargesource == 'traffic_restore') {
                        currentGetHtml += '送上月';
                    }
                    currentGetHtml += receiveTrafficCurrent + 'M流量';
                    if (receiveStatus == '未领取') {
                        currentGetHtml += '<button class="month-btn" data-rechargesource="'+ rechargesource +'" data-trafficstatisticsid="'+ trafficstatisticsid +'">立即领取</button>';
                    } else if(receiveStatus){
                        currentGetHtml += '<button class="month-btn gray" >' + receiveStatus + '</button>';
                    }
                    var monthGet = _this.$el.find('.month-get');
                    monthGet.html(currentGetHtml).removeClass('opacity0');
                }

                _this.$el.ngRender(_this.data);
                var width = $('.fc-chart').width(),
                    _width = (usedTraffic > 30 ? 30 : usedTraffic) / 30 * width;
                $('.fc-bar').css('width', _width);
                setTimeout(function () {
                    _this.loadHistoryData();
                }, 200);
            }
            getJsonp(param);
        },
        loadHistoryData: function () {
            var _this = this;
            var param = {
                "timestamp": new Date().getTime(),
                "skipCount": this.skipCount,
                "pageSize": this.pageSize,
                datasource: "adApp"
            };
            var dataConf = {
                url: apiUrl.selectTrafficStatisticsHistory,
                data: param,
                callback: function (data) {
                    if (data.result != "success") {
                        alertMsg(data.msg);
                        return;
                    }
                    if('0'==_this.skipCount){
                        _this.history.empty();
                    }
                    tabObj.$flow.data('init', 'true');
                    var count = data&&data.count/1;
                    var r = data && data.data,
                        len = r.length || 0,
                        list = [],
                        month = '',
                        returnTrafficCurrent = '',
                        usedTraffic = '';
                    for (var i = 0; i < len; i++) {
                        month = r[i].month.split('-')[1] - 0;
                        returnTrafficCurrent = _this.formatFLow(r[i].returnTrafficCurrent),
                            usedTraffic = _this.formatFLow(r[i].usedTraffic),
                            receiveTrafficCurrent = _this.formatFLow(r[i].receiveTrafficCurrent),
                            receiveStatus = r[i].receiveStatus,//充值中  未领取  已领取 已过期
                            rechargesource = r[i].rechargesource,
                            trafficstatisticsid = r[i].trafficstatisticsid;
                        list.push('<li class="after-scale">');
                        list.push('<span class="fh-abs left ft-hidden-s">' + (r[i].copywriter_header||month) + '月</span>');
                        if(r[i].copywriter_content){
                            list.push('<div class="center fn-pl10 ft-hidden-s">' + r[i].copywriter_content + '</div>');
                        }else{
                            list.push('<div class="center fn-pl10 ft-hidden-s">使用' + usedTraffic + 'M,送上月' + receiveTrafficCurrent + 'M</div>');
                        }
                        if (receiveTrafficCurrent > 0) {
                            //var clazz = receiveStatus=='充值中'?'li-btn':'li-btn gray';
                            var clazz = '',
                                btnTxt = '';
                            if (receiveStatus == '未领取') {
                                clazz = 'li-btn';
                                btnTxt = '立即领取';
                            } else {
                                clazz = 'li-btn gray';
                                btnTxt = receiveStatus;
                            }
                            list.push('<span class="fh-abs right fn-tr"><button class="' + clazz + '" data-flow="' + receiveTrafficCurrent + '" data-rechargesource="' + rechargesource + '" data-trafficstatisticsid="' + trafficstatisticsid + '">' + btnTxt + '</button></span>');
                        }
                        list.push('</li>');
                    }
                    _this.history.append(list.join(''));
                    if (_this.skipCount == 0) {
                        _this.loadMore.on('click', function () {
                            _this.skipCount += _this.pageSize;
                            _this.loadHistoryData();
                        });
                    }
                    var parent = _this.history.parent();
                    if (_this.history.find('li').length == 0)
                        parent.hide();
                    else
                        parent.show();

                    if (count > _this.skipCount+_this.pageSize) {
                        _this.loadMore.show();
                    }
                    else {
                        _this.loadMore.hide();
                    }
                }
            }
            getJsonp(dataConf);
        }
    });

    var flowObj = new Flow({
        $el: $('.J_flow')
    });
    flowObj.bind('init', function () {
        flowObj.loadCurrentData();
    });
    //Flow： end

    //Tab:begin
    var Tab = transfar.Base.extend({
        initialize: function(){
            this.G = G;
            this.tabs = this.$el.find('.float_two');
            this.$tel = this.tabs.eq(0);
            this.$flow = this.tabs.eq(1);
            this.$item = $('.tab-item');
            // var index = extend.getHashParam('index');
            index = 0
            this.displayTab(index);
        },
        events:{
            'click div': 'tabChange'
        },
        displayTab: function(index){
            index = parseInt(index);
            var obj = this.tabs.eq(index);
            if(index==0)
                $('body').removeClass('body-bg');
            else
                $('body').addClass('body-bg');
            if(index!=2){
                //location.hash="index=" + index;
                obj.addClass('active').siblings().removeClass('active');
                this.$item.eq(index).show().siblings('.tab-item').hide();
                if(obj.data('init')=='true'){
                    return;
                }
            }
            switch(index){
                case 0:
                    telObj.trigger('init');
                    break;
                case 1:
                    flowObj.trigger('init');
                    break;
            }
        },
        tabChange: function(ev){
            var index = $(ev.currentTarget).index();
            this.displayTab(index);
        }
    });
    var tabObj = new Tab({
        $el: $('.fs-tab')
    });
    //Tab:end
})(Zepto);
