var _shtml = '<div id=fg1 class="heightFg h50"><div class=fgTop><div class="fgTop left iback" onclick="hidefg(1)"></div><div class="fgTop right posr" style="float:left; width: 84%;"><i class="iconbox l6 start small_icon"></i><input type=email id=copyFg1 class="commonInput fgInput  fg addressInput" value="" placeholder="搜索城市(中文/拼音)" onpropertychange="to_search(this)" oninput="to_search(this)"><span class=delbtn></span></div><button class="right surebtn choiceara" style="display: none" id=chooseDestination>选择</button></div></div><div id=fg2 class="heightFg h50"><div class=fgTop><div class="fgTop left iback" onclick="hidefg(2)"></div><div class="fgTop right posr" style="float:left; width: 84%;"><i class="iconbox l6 end small_icon"></i><input type=email id=copyFg2 class="commonInput fgInput fg addressInput" value="" placeholder="搜索城市(中文/拼音)" onpropertychange="to_search(this)" oninput="to_search(this)"><span class=delbtn></span></div><button class="right surebtn choiceara" style="display: none" id=chooseStarting>选择</button></div></div><div id=J_noMobile></div><ul class=address_list id=J_address_list></ul><div id=alertmsgbg1 class="alertDivBG bgwhite"></div>';
document.write(_shtml);

var s = '<style>.area-wrap{z-index:999;position: absolute;top:50px;width: 100%;min-height:100%;background: #fff;}.area-wrap p{padding:20px 40px 20px 15%; background:#FFF;font-size:16px;border-bottom: 1px solid #e5e5e5; position:relative;}.area-wrap p:active{color: #444}.area-wrap p .icon{ width: 15px;height:20px;background: url(address/address_icon2x.png) no-repeat; position:absolute; left:5%; top: 50%;margin-top: -10px;-webkit-background-size: 100%;background-size: 100%}.area-wrap div{z-index:9999;position:relative;top:10px;background: #fff}</style>';

var d = '<div class="area-wrap" id="area-wrap" style="display: none"><div id="pro"></div><div id="city" style="display: none"></div><div id="area" style="display: none"></div></div>';

var scriptNode1 = document.createElement('script');
scriptNode1.src = 'address/areadata-v2.0.js'
document.body.appendChild(scriptNode1);
var scriptNode2 = document.createElement('script');
scriptNode2.src = 'address/area_yasuo.js'
document.body.appendChild(scriptNode2);
$('body').append(s+d);

var chioceAreaFn = {};
/**
 *该方法用于省市区的三级联动，为了节省字节，部分做了简写如下：
 * 基于jquery或zepto,原生js写法另有；
 *s=state,c=city,n=name,r=region
 */
var _allChinaBz='',_chooseProBz='';
$.fn.chioceArea = function (){
    //通过id获取对象
    var _this = this;
    var proName = "",
        cityName = "",
        areaName = "",
        wrapTarget = $("#area-wrap"),
        proTarget = $("#pro"),
        cityTarget = $("#city"),
        areaTarget = $("#area");

    //点击省市区选框后，出现省级列表
    _this.on("click",function (){

        chioceAreaFn.initPro();
    });

    chioceAreaFn.initPro = function(){
        var pro=ALP.DATA.areaData.province
        var clarr=[]
        var ckarr=[]

        wrapTarget.show();
        var proList = '';

        if(isshowAll=='0'){
        	proList+='<p class="zoneparent" onclick="chioceAreaFn.setAddressNonZone(this)"><i class="icon"></i><span>选择全国</span></p>';
        }

        //for(var i in window.LocalList){
        //    proList+='<p  class="zonechild" onclick="chioceAreaFn.getCity(this)" data-code="'+i+'"><i class="icon"></i><span>'+window.LocalList[i].r.n+'</span></p>';
        //}


        for(var i in pro){
            for(var j in pro[i]){
                clarr.push(pro[i][j])
                ckarr.push(j)
            }
        }
        var endarr=[]
        var end2arr=[]
        var shunxu=[1,12,13,19,20,22,24,28,3,7,8,10,14,16,17,18,21,4,5,6,9,15,23,27,29,30,2,11,25,26,31]
        for(var i=0;i<clarr.length;i++){
            endarr[shunxu[i]-1]=clarr[i]
            end2arr[shunxu[i]-1]=ckarr[i]
        }
        for(var i=0;i<endarr.length;i++){
            proList+='<p  class="zonechild" onclick="chioceAreaFn.getCity(this)" data-code="'+end2arr[i]+'"><i class="icon"></i><span>'+endarr[i]+'</span></p>';
        }

        proTarget.show();
        proTarget.html(proList);
    }

    //通过设置在省级p标签上的‘data-code’属性遍历市级列表
    chioceAreaFn.getCity = function (obj){
        var ct=ALP.DATA.areaData.city
        var cityList = '';
        proObj = obj.getAttribute("data-code");
        proName = obj.children[1].innerHTML;
        if(isshowAll=='0'||isshowAll=='1'){
        	cityList+='<p class="zoneparent" onclick="chioceAreaFn.setAddressNonZone(this)"><i class="icon"></i><span>选择'+proName+'</span></p>';
        }
        if(listNum==2){

            for(var i in ct[proObj]){

                cityList+='<p  class="zonechild" onclick="chioceAreaFn.setAddress(this)" data-code="'+i+'"><i class="icon"></i><span>'+ct[proObj][i]+'</span></p>';

            }
        }else{
            for(var i in ct[proObj]){

                cityList+='<p  class="zonechild" onclick="chioceAreaFn.getArea(this)" data-code="'+i+'"><i class="icon"></i><span>'+ct[proObj][i]+'</span></p>';

            }
        }



        cityTarget.show();
        cityTarget.html(cityList);
        proTarget.hide();
    };

    //通过设置在省级p标签上的‘data-code’属性遍历区级列表
    chioceAreaFn.getArea = function (obj){
        var cu=ALP.DATA.areaData.county
        var areaList = '';
        cityObj = obj.getAttribute("data-code");
        cityName = obj.children[1].innerHTML;
        if(cu[cityObj].length == 0){
        	cityTarget.hide();
	        wrapTarget.hide();
	        $("#copyFg1").val(proName+" "+cityName);
	        return;
        }
        if(isshowAll=='0'||isshowAll=='1'||isshowAll=='2'){
            areaList+='<p class="zoneparent" onclick="chioceAreaFn.setAddressNonZone(this)"><i class="icon"></i>选择'+cityName+'</p>';
        }

        for(var i in cu[cityObj]){
            areaList+='<p  class="zonechild" onclick="chioceAreaFn.setAddress(this)" data-code="'+i+'"><i class="icon"></i><span>'+cu[cityObj][i]+'</span></p>';
        }
        console.log(areaList)
        areaTarget.show();
        areaTarget.html(areaList);
        cityTarget.hide();
    };

    //非三级选择
    chioceAreaFn.setAddressNonZone = function(obj){
    	var zone = [];
    	//areaName = obj.childNodes[0].nodeValue;
    	areaTarget.hide();
        wrapTarget.hide();
        if(proName){
			zone.push(proName)
        }
        if(cityName){
			zone.push(cityName)
        }
        if(areaName){
        	zone.push(areaName)
        }

        if(zone.length ==0){
        	zone.push(obj.children[1].innerHTML.replace('选择',''));
        }
        this.getAddress(zone.join('-'));
        proName = '';
        cityName ='';
        areaName ='';

    }

    //通过传递的全局变量来取得省市区的值并传入input标签内
    chioceAreaFn.setAddress = function (obj){
        areaName = obj.children[1].innerHTML;
        console.log(obj)
        areaTarget.hide();
        wrapTarget.hide();
        if(cityName){
            cityName = '-'+cityName;
        }
        if(areaName){
            areaName = '-'+areaName
        }
        console.log(proName)
		this.getAddress(proName+cityName+areaName);
        //this.getAddress(proName+'-'+cityName);
        proName = '';
        cityName ='';
        areaName ='';

    };

	chioceAreaFn.getAddress = function(val){
        if($('#fgInput'+_index).attr('data-source')=='phz'){
            var cl_val=val.split('-')[1]
            if(cl_val.substr(-1)=='市'){
                cl_val=cl_val.substr(0,cl_val.length-1)
            }
            $('#fgInput'+_index).html(cl_val);
            getListObj.cityname=cl_val
            _skipCount=0
            $('.demo-cont').html('')
            getMerchantList(getListObj)
        }else{
            $('#fgInput'+_index).val(val);

        }

        var val = val;
        var tempVal = val.split('-');
        if(tempVal[2]){
            val = tempVal[0]+'-'+tempVal[1];
        }
        if(tempVal[0].indexOf('市')>-1){
            val = tempVal[0];
        }

        if(window.pageName && window.pageName == 'address'){
            // window.tf56 && window.tf56.selectCityCompany(val);
        }
		hidefg(_index);
		$('.address_list').html('');

	}


    //点击后滚动条始终在顶部
    document.getElementById("area-wrap").onclick = function (){
        document.getElementsByTagName("body")[0].scrollTop=0;
    };
};
