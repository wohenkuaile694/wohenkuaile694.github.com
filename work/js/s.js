/****运动框架开始***************************************************************************************/
//取样式
function getStyle(obj,name){
	return window.getComputedStyle?getComputedStyle(obj,false)[name]:obj.currentStyle[name];
}
//运动
function move(obj,json,options){
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
		start[i]=parseFloat(getStyle(obj,i));
		dis[i]=parseInt(json[i])-start[i];
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
		}
	},30)
}//end
/****运动框架结束***************************************************************************************/
/****弹性运动开始***************************************************************************************/
function elastic(obj,name,value){
	//存储坐标
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
		}
	},30);
}
/****弹性运动结束**********************************************************************************/
/****拖拽开始*********************************************************************************/
function drag(obj){
	obj.onmousedown=function(ev){
		ev=ev||event;
		var disX=ev.clientX-obj.offsetLeft;
		var disY=ev.clientY-obj.offsetTop;
		document.onmousemove=function(ev){
			ev=ev||event;
			obj.style.left=ev.clientX-disX+'px';
			obj.style.top=ev.clientY-disY+'px';
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			obj.releaseCapture&&obj.releaseCapture();
		};
		obj.setCaputure&&obj.setCaputure();
		return false;
	};
}
/****拖拽结束**********************************************************************************/
/****投掷运动开始**********************************************************************************/
function toss(obj){
	obj.onmousedown=function(ev){
		this.style.opacity='1';
		this.style.filter='alpha(opacity:100)';
		ev=ev||event;
		redOnlyIndex=window.redOnlyIndex||0;
		redOnlyIndex++;
		obj.style.zIndex=redOnlyIndex;

		var preX=obj.offsetLeft;
		var preY=obj.offsetTop;
		var disX=ev.clientX-preX;
		var disY=ev.clientY-preY;
		var speedX=0;
		var speedY=0;
		clearInterval(obj.timer);

		document.onmousemove=function(ev){
			ev=ev||event;
			var l=ev.clientX-disX;
			var t=ev.clientY-disY;
			speedX=l-preX;
			speedY=t-preY;
			preX=l;
			preY=t;
			if(l<0){
				l=0;
			}else if(l>document.documentElement.clientWidth-obj.offsetWidth){
				l=document.documentElement.clientWidth-obj.offsetWidth;
			}else if(t<0){
				t=0;
			}else if(t>document.documentElement.clientHeight-obj.offsetHeight){
				t=document.documentElement.clientHeight-obj.offsetHeight;
			}
			obj.style.left=l+'px';
			obj.style.top=t+'px';
		};

		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				speedY+=3;
				var l=obj.offsetLeft;
				var t=obj.offsetTop;
				l+=speedX;
				t+=speedY;
				if(t>document.documentElement.clientHeight-obj.offsetHeight){
					t=document.documentElement.clientHeight-obj.offsetHeight;
					speedY*=-0.8;
					speedX*=0.8;
				}else if(t<0){
					t=0;
					speedY*=-0.8;
					speedX*=0.8;
				}else if(l>document.documentElement.clientWidth-obj.offsetWidth){
					l=document.documentElement.clientWidth-obj.offsetWidth;
					speedX*=-0.8;
					speedY*=0.8;
				}else if(l<0){
					l=0;
					speedX*=-0.8;
					speedY*+0.8;
				}
				if(Math.abs(speedX)<1){
					speedX=0;
				}
				if(Math.abs(speedY)<1){
					speedY=0;
				}
				if((t==document.documentElement.clientHeight-obj.offsetHeight)&&speedX==0&&speedY==0){
					clearInterval(obj.timer);
					obj.style.opacity='0.3';
					this.style.filter='alpha(opacity:30)';
				}
				console.log(l,t);
				obj.style.left=l+'px';
				obj.style.top=t+'px';
			},30);
			obj.releaseCapture&&obj.releaseCapture();
		};

		obj.setCapture&&obj.setCapture();
		return false;
	};
}
/****投掷运动结束**********************************************************************************/
/****滚轮事件绑定开始**********************************************************************************/
function addMouseWheel(obj,fn){
	if(navigator.userAgent.toLowerCase().indexOf('firefox')>-1){
		obj.addEventListener('DOMMousescroll',fnWheel,false);//ff
	}else{
		obj.onmousewheel=fnWheel;
	}

	function fnWheel(ev){
		ev=ev||event;
		var bDown=ev.wheelDelta?ev.wheelDelta<0:ev.detail>0;

		fn&&fn(bDown);
	}
}
/****滚轮事件绑定结束**********************************************************************************/