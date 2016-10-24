//版权 北京智能社©, 保留所有权利

function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

function move(obj, name, value, time)
{
	//1.opacity小数
	if(name=='opacity')
	{
		var start=parseFloat(getStyle(obj, name));
	}
	else
	{
		var start=parseInt(getStyle(obj, name));
	}
	var dis=value-start;
	
	var count=Math.round(time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		var cur=start+dis*n/count;
		//2.opacity是两份&&不能带px
		if(name=='opacity')
		{
			obj.style.opacity=cur;
			obj.style.filter='alpha(opacity:'+cur*100+')';
		}
		else
		{
			obj.style[name]=cur+'px';
		}
		
		if(n==count)
		{
			clearInterval(obj.timer);
		}
	}, 30);
}

