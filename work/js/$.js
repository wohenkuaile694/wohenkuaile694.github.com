function getByClass(oPre,name){
	if(document.getElementsByClassName){//浏览器特性检测
		return oPre.getElementsByClassName(name);
	}else{
		var arr=oPre.getElementsByTagName('*');
		var ret=[];
		var re=new RegExp('\\b'+name+'\\b');

		for(var i=0;i<arr.length;i++){
			if(re.test(arr[i].className)){
				ret.push(arr[i]);
			}
		}

		return ret;
	}
}//类名选择器(最基础的三个选择器之一，ID以及TagName采用系统方法)

function getByStr(aPre,str){
	var ret=[];

	for(var i=0;i<aPre.length;i++){
		switch(str.charAt(0)){
			case '#'://ID
				ret.push(document.getElementById(str.substring(1)));
				break;
			case '.'://class
				var arr=getByClass(aPre[i],str.substring(1));
				for(var j=0;j<arr.length;j++){
					ret.push(arr[j]);
				}
				break;
			default://tag(h2 h2#rt h2.rt h2[index=rt] h2:eq(2) h2:first)
				if(/^[a-z]+([a-z]+[0-9]?)$/g){
					var arr=aPre[i].getElementsByTagName(str);
					for(var j=0;j<arr.length;j++){
						ret.push(arr[j]);
					}
				}//else if(){待续}
				break;
		}
	}

	return ret;
}//绞式

function getEle(str){
	var arr=str.replace(/^\s+|\s+$/g).split(/\s+/g);
	var pre=[document];
	var ret=[];

	for(var i=0;i<arr.length;i++){
		ret=getByStr(pre,arr[i]);
		pre=ret;
	}
	if(ret.length==1){
		ret=ret[0];
	}
	return ret;
}//链式

function DOMReady(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			fn&&fn();
		},false)
	}else{
		document.attach('onreadystatechange',function(){
			if(document.readyState=='complete'){
				fn&&fn();
			}
		})
	}
}

function red(arg){
	var ret=[];
	switch(typeof arg){
		case 'function':
			DOMReady(arg);
			break;
		case 'string':
			ret=getEle(arg);
			break;
		case 'object':
			ret.push(arg);//归队
			break;
	}

	return ret;
}

function $(arg){
	return red(arg);
}//包装

function e(arg){
	return red(arg);
}//包装

// function _(arg){
// 	red(arg);
// }//包装

// function $(arg){
// 	return  _(arg);
// }




