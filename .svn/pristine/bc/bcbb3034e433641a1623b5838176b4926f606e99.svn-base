/**
 * @file 文件说明
 * @author XieZhendong
 * @date 15/4/24
 */

var extend = {
    //如果str为无效值，用re替代
    isNull: function(str,re){
        if(typeof str === 'undefined' || str==null || str==''){
            if(typeof re === 'undefined')
                return '-';
            else
                return re;
        }
        else{
            return str;
        }
    },
    numberFormat: function(v){
        return v<10 ? '0' + v : v;
    },
    timeFormat: function(time){
        return time + '分';
    },
    timeFormatSpecial: function(time){
        if(typeof time != 'string'&&typeof time != 'number')
            return '';
        var date = new Date(time),
            curDate = new Date(),
            str = '';
        var m1 = date.getMonth() + 1,
            d1 = date.getDate(),
            m2 = curDate.getMonth() + 1,
            d2 = curDate.getDate();
        if(m1==m2&&d1==d2){
            str = extend.numberFormat(date.getHours()) + ':' + extend.numberFormat(date.getMinutes());
        }else{
            str = m1 + '月' + d1 +'日';
        }
        return str;
    },
    round: function(v){
        v = parseFloat(v);
        if(typeof  v == 'number'){
            return Math.round(v);
        }else{
            return '';
        }
    },
    secondToMinute: function(v){
        v = parseInt(v);
        var min = '',
            sec = '',
            des = '';
        if(typeof v == 'number'&&v > 0){
            min = Math.floor(v/60);
            sec = v%60;
            if(min>0)
                des += min + '分';
            if(sec>0)
                des += sec + '秒';
            return des;
        }
        else{
            return '0秒';
        }
    },
    substringMobilenumber: function(v){
        if(!v)
            return '';
        else{
            var des = '';
            des += v.substring(0,2) + '***' + v.substring(9);
            return des;
        }
    },
    regJudge: function(v){
        var flag = false;
        if(v.indexOf('法人身份证认证')!=-1&&v.indexOf('营业执照认证')!=-1){
            flag = true;
        }
        else if(v.indexOf('个人身份证认证')!=-1&& v.indexOf('个人图片认证')!=-1){
            flag = true;
        }
        return flag;
    },
    getHashParam: function(key){
        var reg = new RegExp("(^|&|\\#)"+ key +"=([^&]*)(&|$)");
        if (ret = location.hash.match(reg)) {
            return decodeURIComponent(ret[2]);
        }
        return '';
    },

    umengCustom: function(str,mobile){
        var yd = /^(134)|(135)|(136)|(137)|(138)|(139)|(150)|(151)|(152)|(157)|(158)|(159)|(182)|(183)|(184)|(187)|(188)|(147)|(178)/,
            lt = /^(130)|(131)|(132)|(155)|(156)|(185)|(186)|(176)/,
            dx = /^(133)|(153)|(180)|(181)|(189)|(177)/;
        var obj = {};
        var _str = '';
        if(yd.test(mobile)){
            _str = 'yd' + str;
            window.tf56&&window.tf56.umengCustomEvent(_str);
        }
        else if(lt.test(mobile)){
            _str = 'lt' + str;
            window.tf56&&window.tf56.umengCustomEvent(_str);
        }
        else{
            _str = 'dx' + str;
            window.tf56&&window.tf56.umengCustomEvent(_str);
        }

    }
};
