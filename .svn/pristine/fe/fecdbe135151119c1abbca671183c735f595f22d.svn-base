/**
 *
 * @authors tianyanrong
 * @date    2015-9-10
 * @version
 */
;
(function () {
    window.G = {};

    //版本号
    G.version = '';

    //加载CSS
    G.requireCss = function (options) {
        var i, len;
        for (i = 0, len = options.length; i < len; i++) {
            document.write('<link rel="stylesheet" type="text/css" href="' + options[i] + '.css?v=' + G.version + '">');
        }
    };

    //加载JS
    G.requireJs = function (options) {
        var i, len;
        for (i = 0, len = options.length; i < len; i++) {
            document.write('<script type="text/javascript" src="' + options[i] + '.js?v=' + G.version + '"></script>');
        }
    };

    //获取参数
    G.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2];
        return null;
    }

    //根目录
    G.root = '..';


    G.setParam = function (options) {
        options = options || {};
        options.appid = G.appid;
        options.timestamp = (+new Date());
        return options;
    }

    //用户信息
    G.userInfo = {};

    //模块命名空间
    G.modules = {};

    //时间格式化
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()
            //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    G.loading = function (options) {
        var $el = options.$el;
        var $loading = $el.find('[name="ui-loading"]');
        if (!$loading.length) {
            $loading = $('<div class="loading" style="display:none;" name="ui-loading"></div>');
            $el.append($loading);
        }
        $el.css({
            position: 'relative'
        });

        if (options.isShow) {
            $loading.css({
                display: ''
            });
            $loading.css({
                position: 'absolute',
                left: '0px',
                top: '0px',
                width: $el.width() + 'px',
                height: $el.height() + 'px'
            })
        }
        else {
            $loading.css({
                display: 'none'
            });
        }

    }
})();