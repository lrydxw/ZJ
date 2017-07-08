/**
 * @file 文件说明
 * @author XieZhendong
 * @date 15/8/28
 */
//获取数据
var item  = getParamVal('item');
item = item.replace(/@/g,'"');
item = JSON.parse(item);
if(!item){
    backFun();
}
var reData = $('.re-data');

//计算滚动区域的高度
function getScrollHeight(){
    var clientHeight = document.documentElement.clientHeight;
    //bodyTop固定为49px

    //加入车队提示
    var tipHeight = 0,
        tipDom = $('.J_regInfo');
    if(tipDom.css('display')!='none')
        tipHeight = tipDom.height();
    //收件
    // 人高度
    var dataAreaPre = reData.prev('p'),
        dmt = parseFloat(dataAreaPre.css('margin-top')),
        dmb = parseFloat(dataAreaPre.css('margin-bottom')),
        dmh = parseFloat(dataAreaPre.css('height')) + dmb + dmt;

    //底部信息详情
    var msgDomHight = $('.send-msg').height();
    var dataAreaHeight = clientHeight - tipHeight - msgDomHight - 49 - dmh;

    reData.css('max-height',dataAreaHeight);
}

var arrowDown = $('.arrow-down');
arrowDown.click(function(){
    //获取状态
    if(arrowDown.hasClass('active')){
        reData.removeAttr('style');
        setTimeout(function(){
            arrowDown.removeClass('active');
        },200);
    }
    else{
        getScrollHeight();
        setTimeout(function(){
            arrowDown.addClass('active');
        },200);
    }
});
//设置数据
function setData(){
    var content = item.content,
        toparty = item.toparty,
        len = toparty.length,
        time = extend.timeFormatSpecial(new Date(item.createdate).getTime()),
        html = '';
    for(var i = 0;i < len;i++){
        var name = toparty[i].torealname;
        if(name){
            name = $.trim(name);
            if(name.length>4)
                name = name.substring(0,4) + '...';
        }else{
            name = extend.substringMobilenumber(toparty[i].sendee);
        }
        if(toparty[i].isinmyteam=="1")
            html+='<div class=item data-partyid="'+ toparty[i].topartyid +'"><span class=user-img></span><br><span class="ft-hidden-s name">'+ name +'</span></div>';
        else
            html+='<div class=item data-partyid="'+ toparty[i].topartyid +'"><span class=user-img><i class=add-icon></i></span><br><span class="ft-hidden-s name">'+ name +'</span></div>';
    }
    $('.receiver .rt').text('收件人('+ len +')');
    if(len>8){
        $('.send-msg .arrow-down').css('visibility','visible');
    }else{
        $('.send-msg .arrow-down').css('visibility','hidden');
    }
    reData.html($(html));
    reData.find('.item').on('click',function(){
        var partyid = $(this).attr('data-partyid');
        if(partyid){
        	window.tf56&&window.tf56.jumpToPartyInfoDetailActivity(partyid,'');
//          location.href = 'tf_userInfo.html?partyid=' + $(this).attr('data-partyid');
        }
        else{
            alertMsg('该司机不是陆鲸会员！');
        }
    });
    var msg = '<i class="dialog"></i>'
            +'<p class="sm-content">' + content + '</p>'
            + '<p class="sm-time">' + time + '已发送</p>';
    $('.send-msg .sm-right').html(msg);
}
var partyid = window.tf56&&window.tf56.getPartyId();
$('.J_regInfo i').on('click',function(){
    $('.J_regInfo').hide();
    localStorage.setItem('freeservice_msgdetail_' + partyid,'true');
})
if(localStorage.getItem('freeservice_msgdetail_' + partyid)!=='true')
    $('.J_regInfo').show();
setData();