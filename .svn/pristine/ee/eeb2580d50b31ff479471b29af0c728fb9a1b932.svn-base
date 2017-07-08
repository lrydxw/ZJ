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
                calledtime: ''
            };
            this.loadData();
        },
        events:{
            'click .loadmorebtn': 'loadMoreEvent'
        },
        loadMoreEvent: function(){
            this.skipCount += this.pageSize;
            this.loadData();
        },
        loadData: function () {
            var param = {},
                _this = this;
            param.url = apiUrl.callList;
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
                var data = data.data || {};
                    record = data.calledrecord,
                    _this.data.calledtime = extend.round(data.freecall && data.freecall.calledtime||0),
                    len = record.length,
                    html = '',
                    clazz = 'before-scale';
                for (var i = 0; i < len; i++) {
                    if(i==0) clazz = '';
                    else clazz = 'before-scale';
                    html += '<li class="'+ clazz +'">'
                         + '<div class="detail"><div class="dmr">'
                         + '<p class="dt-1">'+ extend.isNull(record[i].torealname,record[i].callee) +'</p>'
                         + '<p class="dt-2">通话时长' + extend.secondToMinute(record[i].durationsec) + '</p>'
                         + '</div></div>'
                         + '<div class="date">'
                         + '<p class="dt-3">' + extend.timeFormatSpecial(record[i].starttime) + '</p>'
                         + '</div></div></li>';
                }
                _this.$el.ngRender(_this.data);
                _this.history.append(html);
                if(len==_this.pageSize){
                    _this.loadMore.show();
                }else{
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