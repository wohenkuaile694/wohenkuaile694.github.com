function S(arg){
	if(typeof arg=='function'){
		S.pub.DOMReady(arg);
	}
}
S.pub={
	//id选择器
	id:function(id){
		return document.getElementById(id);
	},
	//类选择器
	sClass:function(oParent,sClass){
		if(document.getElementsByClassName){//高级浏览器
			return oParent.getElementsByClassName(sClass);
		}else{//ie678
			var ret=[];
			var all=oParent.getElementsByTagName('*');
			var re=new RegExp('\\b'+sClass+'\\b');

			for(var i=0,len=all.length;i<len;i++){
				if(re.test(all[i].className)){
					ret.push(all[i]);
				}
			}

			return ret;
		}
	},
	//标签选择器
	tag:function(oParent,tag){
		return oParent.getElementsByTagName(tag);
	},
	//取样式
	getStyle:function(obj,name){
		return window.getComputedStyle?getComputedStyle(obj,false)[name]:obj.currentStyle[name];
	},
	//运动
	move:function(obj,json,options){
		//缺省设置
		options=options||{};
		options.time=options.time||300;
		options.type=options.type||'ease-out';
		//计算步数
		var start={};
		var dis={};
		var count=Math.round(options.time/30);
		var n=0;
		//取起点，算距离
		for(var i in json){
			if(i=='opacity'){
				start[i]=parseFloat(S.pub.getStyle(obj,i));
				dis[i]=parseFloat(json[i])-start[i];
			}else{
				start[i]=parseFloat(S.pub.getStyle(obj,i));
				dis[i]=parseInt(json[i])-start[i];
			}
		}
		//每隔三十毫秒重新计算坐标
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;

			for(var i in json){
				switch(options.type){
					case 'linear':
						var cur=start[i]+dis[i]*n/count;
						break;
					case 'ease-in':
						var a=n/count;
						var cur=start[i]+dis[i]*a*a*a;
						break;
					case 'ease-out':
						var a=1-n/count;
						var cur=start[i]+dis[i]*(1-a*a*a);
						break;
				}

				if(i=='opacity'){
					obj.style.opacity=cur;
						obj.style.filter='alpha(opacity:'+cur*100+')';
				}else{
					obj.style[i]=cur+'px';
				}
			}

			if(n==count){
				clearInterval(obj.timer);
				options.fn&&options.fn();
			}
		},30);
	},//end for movement
	//DOMReady
	DOMReady:function(fn){
		if(document.addEventListener){
			document.addEventListener('DOMContentLoaded',function(){
				fn&&fn();
			},false);
		}else{
			document.attachEvent('onreadystatechange',function(){
				if(document.readyState=='complete'){
					fn&&fn();
				}
			});
		}
	},
	//弹性运动
	elastic:function(obj,name,value,fn){
		//存储坐标
		value=parseInt(value);
		obj.speed=obj.speed||0;
		obj.cur=obj.cur||0;
		obj.timer=null;
		//elastic
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			obj.speed+=(value-obj.cur)/5;
			obj.speed*=0.7;
			obj.cur+=obj.speed;
			obj.style[name]=Math.round(obj.cur)+'px';

			if(Math.round(obj.cur)==value&&Math.round(obj.speed)==0){
				clearInterval(obj.timer);
				fn&&fn();
			}
		},30);
	},
	bindEvent:function(obj,sEv,fn){
		if(obj.addEventListener){
			obj.addEventListener(sEv,fn,false);
		} else {
			obj.attachEvent("on" + sEv,fn);	
		}
	},
	count:0,
	zIndex:3
};
S.fn={};


