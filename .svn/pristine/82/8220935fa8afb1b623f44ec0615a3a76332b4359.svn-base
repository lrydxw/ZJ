/**
 *
 * @authors tianyanrong
 * @date    2015-9-10
 * @version
 * 2015-11-11 update by xiezhendong
 *
 * 提供的通用方法,依赖zepto.js
 * requireCss    设置meta标签，默认引入通用css,加载CSS
 * requireJs     引入调试工具，加载JS
 * getUrlParam   获取参数,如?name=12
 * getHashParam  获取Hash参数值，如#key=12&value=12
 * jsonToUrlParam 转换为页面传参形式,如{k:12,id: 23} --> 'k=12&id=23'
 * getJsonp 封装jsonp请求
 * ajax 封装ajax请求
 * decrypted 解密手机号码，依赖 lib/crypto-js.js
 * setItem 本地缓存，localStorage.setItem(key,value)
 * getItem
 * toast 通用信息提示框，模仿安卓的toast
 * arrayFill 数组填充，如G.arrayFill([1,2,3],[a,b]) == [a,b,3]
 * goBack 回退网页
 * static 静态资源链接（url,phone）配置
 * phoneCall 拨打电话通用处理，参数为号码数组，依赖weiget/tfpop/
 * log 日志打印，调用debug工具，通过G.isLog 配置是否显示，依赖 debug.js
 * getToken 获取登录的用户信息（存储在G.userInfo）及token
 */
;(function() {
    'use strict';
    window.G = {};

	//运行环境
    G.TEST = 'test';
    G.PRODUCT = 'product';
    if(location.href.indexOf('static.tf56.com') !== -1 || location.href.indexOf('www.lujing56.com') !==-1){
        G.envType = G.PRODUCT;
    }else{
        G.envType = G.TEST;
    }

    if(G.envType === G.TEST){
        // G.version = new (Date).getTime();//版本号，测试环境动态生成，防止缓存
        G.version = '20160225';
        G.isLog = true; //是否显示日志,测试环境开启
        G.appId = 'wx0990b1f226506719';//wx0990b1f226506719
    }
    else{
        G.version = '20151223';
        G.isLog = false;
        G.appId = 'wxaf35ae3c383e581c';
    }

    //用户localStorage存储openId
    G.localStorageKey = {
        findGoodsHistory: 'findGoodsHistory_WeChat_1450402511898',
        openId:'lujing_weChat_Driver_openid_1450402511898'
    };


    //在生产机下开启日志
    G.isLog = false;

	//根目录
	G.root = '../..';

    //请求路径
    if(G.envType === G.TEST){
        G.host = 'http://weixintest.tf56.com';
        G.url = 'http://weixintest.tf56.com/action.yaws';
    }
    else{
        G.host = 'http://voice.tf56.com';
        G.url = 'http://voice.tf56.com/action.yaws';
    }

     //加载CSS
    G.requireCss = function(options) {
        var i,len,meta;

        //meta标签设置
    meta = '<meta content="yes" name="apple-mobile-web-app-capable">' +
            '<meta content="yes" name="apple-touch-fullscreen">' +
            '<meta content="telephone=no" name="format-detection">' +
            '<meta content="black" name="apple-mobile-web-app-status-bar-style">' +
            '<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>';
        document.write(meta);

        //测试环境下禁止浏览器缓存（微信浏览器缓存很严重）
        //g.js的时候需要手动加版本号
        if(G.envType === G.TEST){
            var noCache = '<meta http-equiv="pragram" content="no-cache">' +
                          '<meta http-equiv="cache-control" content="no-cache, must-revalidate">' +
                          '<meta http-equiv="expires" content="0">';
            document.write(noCache);
        }

		//引入通用CSS
        options.unshift(G.root + '/css/common/common');
		options.unshift(G.root + '/css/common/normalize');
        for (i = 0,len = options.length; i < len; i++) {
            document.write('<link rel="stylesheet" type="text/css" href="'+ options[i] + '.css?v=' + G.version+'">');
        }
    };

    //加载JS
    G.requireJs = function(options) {
        var i,len;
        //引入调试工具
        if(G.isLog){
            options.unshift(G.root + '/js_sp/lib/debug');
            options.unshift(G.root + '/js_sp/lib/debuggap');
        }
        for (i = 0,len = options.length; i < len ; i++) {
            document.write('<script type="text/javascript" src="'+ options[i] + '.js?v=' + G.version+'"></script>');
        }
    };

    //获取参数
    G.getUrlParam = function(key) {
        var reg = new RegExp("(^|&|\\?)"+ key +"=([^&]*)(&|$)"),
            ret = location.search.match(reg);
        if (ret) {
            return decodeURIComponent(ret[2]);
        }
        return '';
    }

    //获取哈希值，
    //即#key=12&value=122,比？key=12的好处在于可以使用JS进行修改，且页面不刷新
    G.getHashParam = function(name){
        var reg = new RegExp("(^|&|\\#)"+ name +"=([^&]*)(&|$)"),
            ret = location.hash.match(reg);
        if (ret) {
            return decodeURIComponent(ret[2]);
        }
        return '';
    };

    //将json对象转换为页面传参形式 如 {k:12,id: 23} --> 'k=12&id=23'
    //keyArr 需要转换的字段，如果不传，全部转化
    //不支持value为对象的，如{k:12,v:[1,2]}
    G.jsonToUrlParam = function (jsonObj,keyArr) {
        keyArr = keyArr || [];
        var len = keyArr.length,
            str = '',
            i = 0,
            temp = '';
        if(len===0){
            //在for in循环中使用Object.prototype.hasOwnProperty()来过滤原型链中的属性
            for(var key in jsonObj){
                if (jsonObj.hasOwnProperty(key)) {
                    if(G.getMobileSystem().iPhone){
                        keyArr.unshift(key);
                    }else{
                        keyArr.push(key);
                    }
                }
            }
        }

        keyArr.forEach(function(key){
            temp = i === 0 ? '' : '&';
            i++;
            str += temp + key + '=' + jsonObj[key];
        });
        return str;
    }

    //本地缓存存取简写
    G.setItem = function(key,value){
        localStorage.setItem(key,value);
    }
    G.getItem = function(key){
        return localStorage.getItem(key);
    }

    //封装jsonp请求
    G.getJsonp = function(param){
        var ajaxConf = {}
        ajaxConf = {
            type: "get",
            url: param.url,
            data: param.data,
            async: true,
            dataType: 'jsonp',
            callback: "callback",
            timeout: 10000,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (data) {
                G.loading('hide');
                if (typeof param.callback === 'function') {
                    param.callback(data);
                }
            },
            error: function (r) {
                G.loading('hide');
                if (typeof param.errorCallback === 'function') {
                    param.errorCallback(r);
                } else {
                   G.toast('网络不给力,请检查网络连接');
                }
            }
        }

        //当data中有密钥sign时写死jsonp
        if (param.data && param.data.sign) {
            ajaxConf.jsonpCallback = "jsonp"
        }
        G.loading('show','加载中');
        $.ajax(ajaxConf);
    }

    //封装ajax请求,默认Get请求
    G.ajax = function(param,type){
        var ajaxConf = {}
        ajaxConf = {
            type: type || 'get',
            url: param.url,
            data: param.data,
            async: true,
            dataType: 'json',
            timeout: 10000,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (data) {
                G.loading('hide');
                if (typeof param.callback == 'function') {
                    param.callback(data);
                }
            },

            error: function (r) {
                G.loading('hide');
                if (typeof param.errorCallback == 'function') {
                    param.errorCallback(r);
                } else {
                    G.toast('网络不给力,请检查网络连接');
                }
            }
        }
        G.loading('show','加载中');
        $.ajax(ajaxConf);
    }

    //数组复制 [1,2] [9] = [9,2]
    G.arrayFill = function(arr1,arr2){
        var len1 =  arr1.length;
        arr2.forEach(function(v,i){
            if(i>len1){
                arr1.push(v);
            }else if(v){
                arr1[i] = v;
            }
        });
        return arr1;
    }

    //DES解密手机号码
    G.decrypted = function(ciphertext){
        var key = '$&%@.!^~',
            iv = '70121455';
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var ivHex = CryptoJS.enc.Utf8.parse(iv);
        var decrypted = CryptoJS.DES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
        }, keyHex,{
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
            iv: ivHex
        });
        var code = decrypted.toString(),
            len = code.length,
            str = '';

        //这里有凑巧的嫌疑，目前解密的结果都正确
        for(var i=-1;i<len;i=i+2){
            str += code.charAt(i);
        }
        return str;
    }

    //toast提示
    G.toast = function(str){
        var html = '<div class="toast"><span class="text">' + str + '</span></div>',
            existToast = $('.toast');
        html = $(html);
        if(existToast.length > 0){
            setTimeout(function(){
                existToast&&existToast.remove();
                $('body').append(html);
            },500);
        }else{
            $('body').append(html);
        }
        setTimeout(function(){
            html&&html.remove();
        },4000);
    }

    //返回
    G.goBack = function() {
        window.history.back();
    };

    //算天数
    G.getDays = function(fromTimeStamp,toTimeStamp,type){
        toTimeStamp = toTimeStamp || Date.now();
        var sub = toTimeStamp/1 - fromTimeStamp/1,
            count = '';
        count = sub/(1000 * 60 * 60 *24);
        G.log(fromTimeStamp);
        G.log(toTimeStamp);
        if(count >= 1){
            count = Math.floor(count) + '天';
        }else{
            count = sub/(1000 * 60 * 60);
            if(count >=1 ){
                count = Math.floor(count) + '小时';
            }else{
                count = sub/(1000 * 60);
                G.log(count);
                if(count>=1){
                    count = Math.floor(count) + '分钟';
                }else{
                    count = '少于1分钟';
                }
            }
        }
        return count;
    }

    //静态资源配置
    if(G.envType === G.TEST){
        G.serverUrl = 'test.tf56.com';
    }else{
        G.serverUrl = 'tf56.com';
    }

    G.static = {
      url: {
          download: 'http://e.tf56.com/mobile.html?source=wechatlujing-driver' + '&openid=' + G.getItem(G.localStorageKey.openId),
          register: 'http://static.' + G.serverUrl + '/partyCenter/view/my_regist2.html?tradetype=司机&source=weChat',
          js_sdk: 'http://res.wx.qq.com/open/js/jweixin-1.0.0'
      }
    };
    //测试机处理
    if(G.envType === G.TEST){
        G.static.url.download = 'http://site.test.tf56.com/epeihuo/moblie.html?source=wechatlujing-driver' + '&openid=' + G.getItem(G.localStorageKey.openId);
    }

    //页面
    G.pages = {
        login: G.root + '/view/user/login.html',
        userInfo: G.root + '/view/user/user_info.html',
        findGoods: G.root + '/view/findgoods/find_goods.html',
        goodsList: G.root + '/view/findgoods/goods_list.html'
    };

    //拨打电话通用处理
    //传入电话号码数组
    G.phoneCall = function(numberArr){
        var arr = numberArr || [],
            len = arr.length;
        if(len === 0){
            G.log('G.phoneCall: 传入电话参数为空');
            return;
        }
        else if(len === 1){
            location.href = 'tel:' + numberArr;
        }else{
            var str = '<div class="tfpop-ul">';
            numberArr.forEach(function(v,index){
               var clazz = '';
               if(index !== numberArr.length - 1){
                   clazz =  ' thin-border thin-border-bottom';
               }
               str += '<a class="tfpop-li ' + clazz + '" href="tel:' + v + '">'+ v +'</a>'
            });
            str += '</div>';
            if(typeof $.tfpop === 'undefined'){
                G.log('G.phoneCall: 依赖文件[tfpop]未引入');
            }else{
                var tfpop = $.tfpop({
                    content: str,
                    coverClick: false//点击背景是否关闭弹窗，默认为false
                });
                tfpop.find('.tf-pop').css({
                    borderRadius: '0.38rem'
                });
                $('.tfpop-li').on('click',function(){
                    tfpop.hide();
                });
            }
        }
    }

    //日志处理
    G.log = function(obj){
        if(G.isLog){
            if(debug.log)
                debug.log(obj);
            else
                console.log(obj);
        }
    }

    G.userInfo = {
    };
    //获取token及用户信息
    //微信中有用，在该项目中已废弃
    G.getToken = function(callback,errorCallback){
        // var config = {};
        // config.url = G.url;
        // config.data = {
        //     action: 'message',
        //     timestamp: Date.now()
        // };
        // var code =  G.getUrlParam('code') || ''
        // var openId = G.getItem(G.localStorageKey.openId);
        // // var openId = G.getItem(G.localStorageKey.openId) || 'ozMODs3nbtGQRyl-I7es-0zDoRLA';
        // G.log(openId);
        // if(openId){
        //     config.data.openid = openId;
        // }
        // else if(code){
        //     config.data.code = code;
        // }
        //
        // config.callback = function(res){
        //     G.log(res);
        //     G.log(res.data);
        //     res = res || {};
        //     if(typeof res.data === 'string' &&res.data.indexOf('http')!==-1){
        //         // 请求授权
        //         var url = G.setAuthUrl(location.href);
        //         location.replace(url);
        //         return;
        //     }
        //     callback(res);
        // };
        // config.errorCallback = function(){
        //     if(errorCallback){
        //         errorCallback();
        //     }else{
        //         G.toast('获取登录信息失败');
        //     }
        // };
        // G.ajax(config);
    };

    //获取机型
    G.getMobileSystem =  function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1 //是否iPad
        };
    };

    //loading
    G.loading = function(method,text){
        var obj = {};
        if(method === 'show'){
            if($('.g-loading').length === 0) {
                var html = '<div class="g-loading"><div class="g-loading-box"><i class="icon"></i>' +
                    '<p>' + text+ '...</p>' +
                    '</div></div>';
                $('body').append($(html));
            } else{
                $('.g-loading').show();
            }
        }

        else{
            $('.g-loading').hide();
        }
    };

    //开发者key管理
    G.key = {
        tx_map: 'CMFBZ-Z5JH4-F4UUI-DQMJ4-N4KPV-FEBJD'//腾讯地图
    };

    // 授权Url
    G.setAuthUrl = function(url){
        // 为url添加
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
                  'appid=' + G.appId +
                  '&redirect_uri=' + encodeURIComponent(url) +
                  '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
        return url;
    };

    // 初始化,预加载
    G.init = function(){
        document.addEventListener('DOMContentLoaded',function(){
            // var preLoadImgs = [];
            // preLoadImgs.push(G.root + '/css/common/img/loading_128.gif');
        });
    };

    G.init();
    // localStorage.removeItem(G.localStorageKey.openId);
    // localStorage.removeItem(G.localStorageKey.findGoodsHistory);
})();
