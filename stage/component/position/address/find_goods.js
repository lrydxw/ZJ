//过滤器一定要先注册再使用，否则抛异常[Vue warn]: Failed to resolve filter: substr
Vue.filter('sub',function(str){
    var arr = G.arrayFill(['','',''],str.split('-'));
    return arr[1] + arr[2];
});

function getUsertLocationByBaiduMap(callback){
    var params = {}
    params.url = 'https://api.map.baidu.com/location/ip?ak=ssWlegrLlRlOnzopOPB2ciAbED59RiTx&coor=bd09ll'
    params.callback = function(res){
        // console.log(res)
        res = res || {}
        var content = res&&res.content
        var address_detail = content&&content.address_detail
        var provice = address_detail&&address_detail.province
        var city = address_detail&&address_detail.city
        if(provice||city){
            callback(provice, city)
        }
    }
    params.errorCallback = function(){

    }
    G.getJsonp(params)
}

var findGoods = new Vue({
    el: "#app",
    data: {
        address: {
            from: '',
            to: ''
        },
        history: {
            key: G.localStorageKey.findGoodsHistory,
            size: 5,
            data: [],
            hasData: false
        }
    },
    methods: {
        getLocalData: function(){
            var _data =  G.getItem(this.history.key);
            return JSON.parse(_data);
        },
        setLocalData: function(obj){
            var _data = this.getLocalData() || [];
            //如果存在则删除
            for(var i= 0,len=_data.length;i<len;i++){
                if(_data[i].from == obj.from && _data[i].to == obj.to){
                    _data.splice(i,1);
                    break;
                }
            }
            _data.unshift(obj);
            var len = _data.length;
            if(len>5)
                _data = _data.slice(0,len-1);
            this.data = _data;
            G.setItem(this.history.key,JSON.stringify(_data));
        },
        jumpToList: function(param,type){
            if(type === 'record'){
                var judge = function(str){
                    return str&&(str!=='全国')&&(str.split('-').length>=2);
                }
                if(judge(param.from)&&judge(param.to)){
                    this.setLocalData(param);
                }
            }
            else{
                this.setLocalData(param);
            }
            var params = G.jsonToUrlParam(param);
            params = params.replace(/省/g,'').replace(/全国/g,'');
            location.href = './goods_list.html?' + params;
        },
        getLocation: function(callback){
            'use strict';
            var config = {};
            config.url = apiUrl.getClientLongitudeAndLatitude;
            config.data = {
                token: G.userInfo.app_stoken
            };
            config.callback = function(res){
                callback(res);
            }
            config.errorCallback = function(){
                G.toast('获取位置信息失败');
            }
            G.getJsonp(config);
        }
    },

    created: function() {
        var _this = this;
        $('body').removeClass('hid').addClass('fadeIn');
        // G.sdk.setSdkConfig(['getLocation','hideOptionMenu']);
        // G.sdk.hideOptionMenu();

        //从本地缓存中取数据
        this.history.data = this.getLocalData() || [];
        if(this.history.data.length > 0){
            this.history.hasData = true;
        }
        getUsertLocationByBaiduMap(function(province, city){
            // debugger
            province = province.replace('省', '')
            _this.address.from = province + '-' + city
        })

        //获取当前地址
        // G.sdk.getUserAddress(function(res){
        //     G.log(res);
        //     var data = res || [],
        //         provice = data.province,
        //         city = data.city,
        //         district = data.district;
        //     _this.address.from = provice.replace('省','') + '-' + city;
        // });

    }
});
