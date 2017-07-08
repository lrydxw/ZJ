/**
 * Created by Biao.jin on 14-7-11.
 * 依赖 chinajson.js
 * 找货-选择地址
 */
/**初始化清空input value*/
var _index = 0;
function openfg(type,obj){
    //window.tf56&&window.tf56.setInfoFlag("open");
    $('.car-list').hide();
    isshowAll=$(obj).attr('data-upselect');
	listNum=$(obj).attr('data-list');
    _index = type;
    var fg = "fg"+type;
    document.getElementById(fg).style.display='block';
    document.getElementById('alertmsgbg1').style.display='block';
    $('.bodyMain').hide();
    // window.tf56 && window.tf56.setOpenFlag('open',type);

    $("#copyFg"+type).val('')
    $("#copyFg"+type).focus()
    showChoicearea();
    $("#copyFg"+type).on('input',function(){
        // console.log($(this).val().length)
        if($(this).val().length ==0){
            showChoicearea()
        }else{
            $('#area-wrap').hide();
        }
    })
    document.getElementsByTagName("body")[0].scrollTop=0;
}

function hideChoiceArea(){
    $('#area-wrap').hide();
    $('#area').html('');
    $('#city').html('');
    $('#pro').html('');
}

function hidefg(type){
    if(type-3==0){
        $('#J_notmember1').tfpop('hide');
        $('#J_notmember2').tfpop('hide');
        return;
    }
    $('.car-list').show();
    var fg = "fg"+type;
    document.getElementById(fg).style.display='none';
    document.getElementById('alertmsgbg1').style.display='none';
    $('.bodyMain').show();
    delli();
    hideChoiceArea();
    $('#address_list').html('');
    $('#address_list').hide();
}

//显示地址选择组件
function showChoicearea(){
    $('#area-wrap').show();
    chioceAreaFn.initPro();
}
var oAddressList = $('#J_address_list');
function cede(val){
    return encodeURIComponent(val);
}
$('.addressInput').on('input',function(){
    var _this = $(this),
            delbtn = _this.parents('.posr').find('.delbtn');
    if(_this.val().length> 0){
        delbtn.show();
    }else{
        delbtn.hide();
        oAddressList.hide();
    }
})
$('.delbtn').on('tap',function(){
    var _this = $(this),
            _input = _this.parents('.posr').find('input');
    _input.val('');
    _this.hide();
    oAddressList.html('');
    oAddressList.hide();
    showChoicearea();
})

$("#chooseDestination").chioceArea();
$("#chooseStarting").chioceArea();
$('.iback').on('click',function(){
    $('#area-wrap').hide();
})
function getId(id){
    return document.getElementById(id);
}
function isOnlyChinese(s){
    var re = new RegExp("^[\\u4e00-\\u9fa5]+$", "");
    if(re.test(s))
        return true;
    else
        return false;
}

function isOnlyEnglish(s){
    var re = new RegExp("^[a-zA-Z]+$", "");
    if(re.test(s))
        return true;
    else
        return false;
}
/*
* 是否匹配成功
* */
function isHave(name,reg){
    if(name.indexOf(reg)!=-1)
        return true;
    else
        return false;
}
/*
* 清空选择器
**/
function delli(){
    $('.address_list').html('');
    $('.address_list').hide();
}

/*
*选择操作
*/
function to_search(obj){
     var htmlarr=[]
     delli();
     var _val = obj.value;
     var _ul = document.querySelector('#J_address_list');
     _ul.style.display = 'block';
     if(_val){
         outerfor:
             for(var i= 0,k=area_yasuo.length;i<k;i++){
                 var shi=area_yasuo[i].ctList
                 for(var j= 0;j<shi.length;j++){
                     var qu=shi[j].cnList
                     for(var l=0;l<qu.length;l++){
                         if(_val.toLowerCase()===qu[l].fullpinyin.substring(0,_val.length)){
                             var li="<li class='address_item'   data-fullname='"+area_yasuo[i].name+"-"+shi[j].name+"-"+qu[l].name+"' show-name='"+area_yasuo[i].name+shi[j].name+qu[l].name+"' ><i class='icon'></i>"+"<span class='zone'>"+qu[l].name+"</span>"+"<span>"+area_yasuo[i].name+shi[j].name+"</span>"+"</li>"
                             htmlarr[htmlarr.length]=li
                             if (htmlarr.length > 9) {
                                 break outerfor
                             }
                             continue
                         }
                         if(_val===qu[l].name.substring(0,_val.length)){
                             var li="<li class='address_item'   data-fullname='"+area_yasuo[i].name+"-"+shi[j].name+"-"+qu[l].name+"' show-name='"+area_yasuo[i].name+shi[j].name+qu[l].name+"' ><i class='icon'></i>"+"<span class='zone'>"+qu[l].name+"</span>"+"<span>"+area_yasuo[i].name+shi[j].name+"</span>"+"</li>"
                             htmlarr[htmlarr.length]=li
                             if (htmlarr.length > 9) {
                                 break outerfor
                             }
                             continue
                         }
                         if(_val.toLowerCase()===qu[l].simplepinyin.substring(0,_val.length)){
                             var li="<li class='address_item'   data-fullname='"+area_yasuo[i].name+"-"+shi[j].name+"-"+qu[l].name+"' show-name='"+area_yasuo[i].name+shi[j].name+qu[l].name+"' ><i class='icon'></i>"+"<span class='zone'>"+qu[l].name+"</span>"+"<span>"+area_yasuo[i].name+shi[j].name+"</span>"+"</li>"
                             htmlarr[htmlarr.length]=li
                             if (htmlarr.length > 9) {
                                 break outerfor
                             }
                             continue
                         }
                     }
                     if(_val.toLowerCase()===shi[j].fullpinyin.substring(0,_val.length)){
                         var li="<li class='address_item'   data-fullname='"+area_yasuo[i].name+"-"+shi[j].name+"' show-name='"+area_yasuo[i].name+shi[j].name+"' ><i class='icon'></i>"+"<span class='zone'>"+shi[j].name+"</span>"+"<span>"+area_yasuo[i].name+"</span>"+"</li>"

                         htmlarr[htmlarr.length]=li
                         if (htmlarr.length > 9) {
                             break outerfor
                         }
                         continue
                     }
                     if(_val===shi[j].name.substring(0,_val.length)){
                         var li="<li class='address_item'   data-fullname='"+area_yasuo[i].name+"-"+shi[j].name+"' show-name='"+area_yasuo[i].name+shi[j].name+"' ><i class='icon'></i>"+"<span class='zone'>"+shi[j].name+"</span>"+"<span>"+area_yasuo[i].name+"</span>"+"</li>"
                         htmlarr[htmlarr.length]=li
                         if (htmlarr.length > 9) {
                             break outerfor
                         }
                         continue
                     }
                     if(_val.toLowerCase()===shi[j].simplepinyin.substring(0,_val.length)){
                         var li="<li class='address_item'   data-fullname='"+area_yasuo[i].name+"-"+shi[j].name+"' show-name='"+area_yasuo[i].name+shi[j].name+"' ><i class='icon'></i>"+"<span class='zone'>"+shi[j].name+"</span>"+"<span>"+area_yasuo[i].name+"</span>"+"</li>"
                         htmlarr[htmlarr.length]=li
                         if (htmlarr.length > 9) {
                             break outerfor
                         }
                         continue
                     }
                 }
             }
         $("#J_address_list").html(htmlarr.join(""))

     }
 }

/*
* 选择地址操作
*
*/
$('.address_list').delegate('.address_item','click',function(){
    var _this = $(this),
        addressInput =  $('#copyFg'+_index);
        input  = $('#fgInput'+_index);
    hidefg(_index);
    addressInput.val(_this.attr('data-fullname'));
    input.val(_this.attr('data-fullname'));
    checkedCity(_this.attr('data-fullname'));
    $('#area-wrap').hide();
    //_this.parents('.posr').find('.addressInput').addClass('isunempty');
    $('.address_list').html('');
    //window.tf56&&window.tf56.setInfoFlag("open");
})
//取地址
chioceAreaFn.getAddress = function(val){
	$('#fgInput'+_index).val(val);
	checkedCity(val);
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

function checkedCity(val){
    if(_index == 1){
        findGoods.address.from = val;
    }
    else{
        findGoods.address.to = val;
    }
}


$('.delbtn').on('click',function(){
    $('.addressInput').val('').trigger('input');
});

$('.J_address_to').on('click',function(){
    openfg(2,this);
});
