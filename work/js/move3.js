//版权 北京智能社©, 保留所有权利

function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

function move(obj, json, time, fn)
{
	var start={};
	var dis={};
	
	for(var name in json)
	{
		if(name=='opacity')
		{
			start[name]=parseFloat(getStyle(obj, name));
		}
		else
		{
			start[name]=parseInt(getStyle(obj, name));
		}
		dis[name]=json[name]-start[name];
	}
	
	/*
	console.log('起点', start);
	console.log('终点', json);
	console.log('距离', dis);
	*/
	
	var count=Math.round(time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		for(var name in json)
		{
			var cur=start[name]+dis[name]*n/count;
			
			if(name=='opacity')
			{
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}
			else
			{
				obj.style[name]=cur+'px';
			}
		}
		
		if(n==count)
		{
			clearInterval(obj.timer);
			
			fn && fn();
		}
	}, 30);
}

