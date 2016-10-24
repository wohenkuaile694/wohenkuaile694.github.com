//版权 北京智能社©, 保留所有权利

function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

/*
type——运动类型

0		匀速
1		加速
2		减速

'a'		匀速
'b'		加速
'c'		减速

'linear'	匀速
'ease-in'	加速
'ease-out'	减速
*/

function move(obj, json, options)
{
	//time, type, fn
	options=options||{};
	options.time=options.time||700;
	options.type=options.type||'ease-out';
	
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
	
	var count=Math.round(options.time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		for(var name in json)
		{
			
			switch(options.type)
			{
				case 'linear':
					var cur=start[name]+dis[name]*n/count;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*a*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
			}
			
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
			
			options.fn && options.fn();
		}
	}, 30);
}

