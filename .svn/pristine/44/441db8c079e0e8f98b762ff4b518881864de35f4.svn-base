;
(function ($) {
    var History = transfar.Base.extend({
        initialize: function () {
            this.G = G;
            this.history = this.$el.find('.history');
            this.skipCount = 0;
            this.pageSize = 6;
            this.loadMore = this.$el.find('.loadmorebtn');
            this.data = {
                sendednum: ''
            };
            this.loadData();
        },
        events: {
            'click .loadmorebtn': 'loadMoreEvent',
            'click li': 'goDetail'
        },
        goDetail: function(ev){
            var _this = $(ev.currentTarget);
            location.href = 'owner_messagedetail.html?item=' + _this.attr('data-item');
        },
        loadMoreEvent: function () {
            this.skipCount += this.pageSize;
            this.loadData();
        },
        loadData: function () {
            var param = {},
                _this = this;
            param.url = apiUrl.selectSmsRecordList;
            param.data = {
                "datasource": "adApp",
                "skipCount": this.skipCount,
                "pageSize": this.pageSize,
                "timestamp": new Date().getTime()
            };
            param.callback = function (data) {
                if (data.result != 'success') {
                    alertMsg(data.msg);
                    return;
                }
                var data = data.data || {},
                    r = data.smsrecoed,
                    len = r.length,
                    html = '';
                _this.data.sendednum = data.sendednum;
                _this.$el.ngRender(_this.data);
                r.forEach(function (v,i) {
                    var topartys = v.toparty,
                        _names = '',
                        len = topartys.length,
                        detail = JSON.stringify(v).replace(/"/g, '@'),
                        clazz = '';
                    if(i==0) clazz = '';
                    else clazz = 'before-scale';
                    for (var i = 0; i < len; i++) {
                        if (i == 0)
                            _names += (topartys[0].torealname || topartys[0].sendee);
                        else
                            _names += '、' + (topartys[i].torealname || topartys[i].sendee);
                    }
                    html += '<li class="'+ clazz +'" data-item="' + detail + '">'
                         + '<div class="detail"><div class="dmr">'
                         + '<p class="dt-1 ft-hidden">' + _names + '</p>'
                         + '<p class="dt-2 ft-hidden">' + v.content +'</p>'
                         + '</div></div>'
                         + '<div class="date">'
                         + '<p class="date-1">'+ extend.timeFormatSpecial(new Date(v.createdate).getTime()) +'</p>'
                         + '<p class="date-2"><i class="go-icon"></i></p>'
                         + '</div></li>';
                });
                _this.history.append(html);
                if (len == _this.pageSize) {
                    _this.loadMore.show();
                } else {
                    _this.loadMore.hide();
                }
            };
            getJsonp(param);
        }
    });
    var obj = new History({
        $el: $('.bodyMain')
    });
})(Zepto);