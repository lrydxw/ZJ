var bz;
 try {
	bz = window.tf56.getWebAppFlag();
 } catch (e) {
	bz = "web";
 }
 function hideMenu(){
 	if (bz=="webApp") {
		// window.tf56&&window.tf56.hideButtom();
	}
 }
 function showMenu(){
 	if (bz=="webApp") {
		// window.tf56.showButtom();
	}
 }
 function showMenuOrUpdteIndex(){
 	if (bz=="webApp") {
		window.tf56.showButtom();
	}
 }
 function openUrl(url){
	if(url=="indexMenu.html"){
		if (bz=="webApp") {
			window.tf56.setUserInfoData('4738152','fc2d169cbb6e0e54b5cdc7a64e0d8122','');
		} else{
			window.location.href=url;
		}
	}else{
		window.location.href=url;
	}
}
 function backFun(){
// 	$('.bodyTop .nvbt').addClass('checked');
// 	setTimeout(function(){
// 		$('.bodyTop .nvbt').removeClass('checked');
// 	},100);
   	if (bz=="webApp") {
		window.tf56.webBack();
	} else{
		history.back();
	}
 }
//传入时间戳
function getTimeToShow(time){
	var time = parseInt(time),
            now = new Date().getTime(),
            min1 = 1000*60;
            hours1 = 1000*60*60;
            hours24 = hours1*24;
            spaceTime = now - time;

    if(spaceTime < min1){
        tempTime = '1分钟前';
    }else if(spaceTime > min1 && spaceTime <= hours1){
        tempTime = parseInt(spaceTime/min1)+'分钟前';
    }else if(spaceTime > hours1 && spaceTime <=hours24){
        tempTime = parseInt(spaceTime/hours1)+'小时前';
    }else{
    	time = new Date(time);
        tempTime = (time.getMonth()+1)+'-'+time.getDate()+' '+doTime(time.getHours())+':'+doTime(time.getMinutes());
    }
    return tempTime;
}
//传入时间戳
function getTimeToShow1(time,i){
	var tempTime= '';
	if(time){
		var time = parseInt(time);
		time = new Date(time);
		if(i==1){
			tempTime = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate();
		}else if(i==2){
			tempTime = time.getFullYear()+'-'+doTime(time.getMonth()+1)+'-'+doTime(time.getDate())+' '+doTime(time.getHours())+':'+doTime(time.getMinutes())+':'+doTime(time.getSeconds());
		}
	}else{
		tempTime= ' ';
	}
    return tempTime;
}
//传入时间戳
function getTimeToShow2(time){
	var time = parseInt(time),
            now = new Date().getTime(),
            min1 = 1000*60;
            hours1 = 1000*60*60;
            hours24 = hours1*24;
            spaceTime = now - time;
	time = new Date(time);
    tempTime = time.getMonth()+1+'月'+time.getDate()+'日 '+doTime(time.getHours())+':'+doTime(time.getMinutes());
    return tempTime;
}
function doTime(num){
	num = num+'';
	var l= num.length;
	if(l==1){
		num = '0'+num;
	}
	return num;
}
/*
 * 将第二个数组合并到第一个数组中，同jQuery中merge使用方法相同
 * 返回合并后的数组，不去重
 */
function arrayMerge(first,second){
	if(!first instanceof Array)
		return null;
	if(!second instanceof Array)
		return first;
	var len = second.length;
	for(var i = 0;i<len;i++){
		first.push(second[i]);
	}
//	console.log(first)
	return first;
}

//长按避免出现复制
window.onload = function(){
	document.getElementsByTagName('body')[0].setAttribute("onselectstart","return false");
};
