S.fn.nav=function(){
	var stage=S.pub.sClass(document,'stage')[0];
	var wrap=S.pub.sClass(stage,'wrap')[0];
	var divs=S.pub.tag(wrap,'div');
	var prom=['技能','作品','联系我','首页','经历'];
	var eng=['Arts','Works','Contact','Talks','Story'];
	S.pub.count++;
	nav(divs);
	logo();
	footer();



	var content=S.pub.sClass(document,'content')[0];
	var oUl=S.pub.tag(content,'ul')[0];
	var aLi=S.pub.tag(oUl,'li');
	var x=aLi[0].offsetWidth;

	if(S.pub.count==1){oUl.innerHTML+=oUl.innerHTML;}

	function logo(){
		var logo=S.pub.sClass(document,'logo')[0];
		var img=logo.children[0];

		img.onmouseover=function(){
			if(parseInt(S.pub.getStyle(img,'top'))!=10){
				return;
			}
			S.pub.move(img,{top:25},{fn:function(){
				S.pub.move(img,{top:10});
			}});
		};
	}

	function footer(){
		var foot=S.pub.id('footer');
		var img=S.pub.tag(foot,'img')[0];

		img.onmouseover=function(){
			if(parseInt(S.pub.getStyle(img,'bottom'))!=0){
				return;
			}
			S.pub.move(img,{bottom:15,opacity:0},{fn:function(){
				S.pub.move(img,{bottom:0,opacity:1});
			}});
		};
	}

	function mv(obj,i){
		var n=i;
		if(n==3){
			if(oUl.offsetLeft==0){
				n=0;
			}else{
				n=5;
			}
		}else if(n==4){
			n=1
		}else if(n==0){
			n=2;
		}else if(n==1){
			n=3;
		}else if(n==2){
			n=4;
		}
		var value=-1*n*x;

		S.pub.move(obj,{left:value},
			{
				time:1000,
				fn:function(){
					S.pub.index=n;
					if(n!=2){
						var base=S.pub.sClass(document,'base');
						var aScale=[];
						var value=['90%','90%','80%','70%'];
						for(var i=0,len=base.length;i<len;i++){
							aScale.push(S.pub.tag(base[i],'div')[0]);
							aScale[i].style.width='0';
						}
					}
					if(n!=1){
						var left=S.pub.sClass(document,'left2')[0];
						var right=S.pub.sClass(document,'right2')[0];
						left.style.opacity=0;
						right.style.opacity=0;
						left.style.right='0px';
						right.style.left='0px';

					}
					if(n==5){
						oUl.style.left=0+'px';
					}else if(n==1){
						item2();
					}else if(n==2){
						item4();
					}
				}
			}
			);
	}


	function nav(divs){
		for(var i=0,len=divs.length;i<len;i++){
			(function(i){
				divs[i].onclick=function(){
					for(var j=0,max=divs.length;j<max;j++){
						divs[j].style.color='white';
						divs[j].style.webkitTransform='rotateY('+((j-i+3)*72+60)+'deg) translateZ(199px)';
					}
					divs[i].style.color='aqua';
					setTimeout(function(){
						mv(oUl,i);
					},1000);
				};
				divs[i].onmouseover=function(){	
						this.innerHTML=prom[i];
				};
				divs[i].onmouseout=function(){	
						this.innerHTML=eng[i];
				};
			})(i);
		}
	}

	function item2(){
		var thread=S.pub.sClass(document,'thread')[0];
		
		if(S.pub.getStyle(thread,'top')=='10px'){
			S.pub.move(thread,{top:0},{fn:function(){
				S.pub.move(thread,{top:10},{fn:function(){
					story();
				}});
			}});
		}else{
			S.pub.move(thread,{top:0},{fn:function(){
				S.pub.elastic(thread,'top',15,function(){
					S.pub.move(thread,{top:5},{fn:function(){
						S.pub.elastic(thread,'top',10,function(){
							story();
						});
					}});
				});
			}});
		}

		function story(){
			var left=S.pub.sClass(document,'left2')[0];
			var right=S.pub.sClass(document,'right2')[0];

			S.pub.move(left,{'right':400,opacity:1},{fn:function(){
				S.pub.move(right,{'left':300,opacity:1});
			}});
		}
	}

	function item4(){
		var base=S.pub.sClass(document,'base');
		var aScale=[];
		var value=['90%','90%','80%','70%'];
		for(var i=0,len=base.length;i<len;i++){
			aScale.push(S.pub.tag(base[i],'div')[0]);
			aScale[i].style.width=value[i];
		}
	}
};

S.fn.work=function(){
	itemwork();


	function itemwork(){
		var aLi=S.pub.sClass(document,'work');
		var aPos=[];

		for(var i=0,len=aLi.length;i<len;i++){
			aPos.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop});
			aLi[i].style.left=aPos[i].left+'px';
			aLi[i].style.top=aPos[i].top+'px';
		}

		for(var i=0,len=aLi.length;i<len;i++){
			(function(i){
				aLi[i].style.position='absolute';
				aLi[i].onmouseover=function(){
					var img=this.children[0].children[0];;
					img.style.webkitTransform='scale(1.3,1.3)';
					var span=this.children[0].children[1];
					span.style.height='186px';
					
				};
				aLi[i].onmouseout=function(){
					var img=this.children[0].children[0];
					img.style.webkitTransform='scale(1,1)';
					var span=this.children[0].children[1];
					span.style.height='0px';
				};
			})(i);
		}

	}
};

S.fn.check=function(){
	var content=S.pub.sClass(document,'content')[0];
	S.pub.bindEvent(window,'resize',function(){
		var oUl=S.pub.tag(content,'ul')[0];
		var aLi=S.pub.tag(oUl,'li');
		var x=aLi[0].offsetWidth;
		mv(oUl,S.pub.index);

		function mv(obj,n){
			
			var value=-1*n*x;

			S.pub.move(obj,{left:value},
				{
					time:1000,
					fn:function(){
						if(n>5){n=0;}
						S.pub.index=n;
						if(n!=2){
							var base=S.pub.sClass(document,'base');
							var aScale=[];
							var value=['90%','90%','80%','70%'];
							for(var i=0,len=base.length;i<len;i++){
								aScale.push(S.pub.tag(base[i],'div')[0]);
								aScale[i].style.width='0';
							}
						}
						if(n!=1){
							var left=S.pub.sClass(document,'left2')[0];
							var right=S.pub.sClass(document,'right2')[0];
							left.style.opacity=0;
							right.style.opacity=0;
							left.style.right='0px';
							right.style.left='0px';

						}
						if(n==5){
							oUl.style.left=0+'px';
						}else if(n==1){
							item2();
						}else if(n==2){
							item4();
						}
					}
				}
			);
		}
		function item4(){
			var base=S.pub.sClass(document,'base');
			var aScale=[];
			var value=['90%','90%','80%','70%'];
			for(var i=0,len=base.length;i<len;i++){
				aScale.push(S.pub.tag(base[i],'div')[0]);
				aScale[i].style.width=value[i];
			}
			}	
		function item2(){
			var thread=S.pub.sClass(document,'thread')[0];
			
			if(S.pub.getStyle(thread,'top')=='10px'){
				S.pub.move(thread,{top:0},{fn:function(){
					S.pub.move(thread,{top:10},{fn:function(){
						story();
					}});
				}});
			}else{
				S.pub.move(thread,{top:0},{fn:function(){
					S.pub.elastic(thread,'top',15,function(){
						S.pub.move(thread,{top:5},{fn:function(){
							S.pub.elastic(thread,'top',10,function(){
								story();
							});
						}});
					});
				}});
			}

			function story(){
				var left=S.pub.sClass(document,'left2')[0];
				var right=S.pub.sClass(document,'right2')[0];

				S.pub.move(left,{'right':400,opacity:1},{fn:function(){
					S.pub.move(right,{'left':300,opacity:1});
				}});
			}
		}			
	});
};

S.fn.home=function(){
	var face=S.pub.sClass(document,'face')[0];
	var h1=S.pub.sClass(document,'h1')[0];
	var h2=S.pub.sClass(document,'h2')[0];
	var css3=S.pub.sClass(document,'css3')[0];
	var h5=S.pub.sClass(document,'h5')[0];
	var h3=S.pub.sClass(document,'h3')[0];
	var home1=S.pub.sClass(document,'home1')[0];
	var weather=S.pub.sClass(document,'weather')[0];
	var aLi=S.pub.tag(weather,'li');
	var level=[0.2,0.4,0.6,0.7,0.9];
	S.pub.move(face,{opacity:1,width:70,height:70},{time:2000,fn:function(){
		h1.onmouseover=function(){
			S.pub.move(h1,{left:250});
		};
		h1.onmouseout=function(){
			setTimeout(function(){
				S.pub.move(h1,{left:160});
			},600);
		}
		S.pub.elastic(h1,'left',160,function(){
			S.pub.move(h3,{width:250,height:250,opacity:1},{fn:function(){
				S.pub.move(h2,{width:200,height:200,opacity:1},{fn:function(){
					S.pub.move(css3,{width:230,height:230,opacity:1},{fn:function(){
						S.pub.move(h5,{width:230,height:230,opacity:1},{fn:function(){
							setTimeout(function(){
								change();
							},1000);
						},time:500});
					},time:500});
				},time:500});
			},time:500});
		});
	}});
	var scrollHeight=home1.clientHeight;
	var bottom=scrollHeight/10;
	mv(h2);
	mv(h3);
	mv(css3);
	mv(h5);


	function mv(obj){
		obj.onmouseover=function(){
		this.style.webkitTransform='scale(1.2,1.2)';
	};
		obj.onmouseout=function(){
		this.style.webkitTransform='scale(1,1)';
	};
	}

	function change(){
		S.pub.move(aLi[0],{opacity:1},{fn:function(){
			S.pub.move(aLi[0],{opacity:0.2},{time:4000});
			S.pub.move(aLi[1],{opacity:1},{fn:function(){
				S.pub.move(aLi[1],{opacity:0.4},{time:4000});
				S.pub.move(aLi[2],{opacity:1},{fn:function(){
					S.pub.move(aLi[2],{opacity:0.6},{time:4000});
					S.pub.move(aLi[3],{opacity:1},{fn:function(){
						S.pub.move(aLi[3],{opacity:0.7},{time:4000});
						S.pub.move(aLi[4],{opacity:0.8},{fn:function(){
							more();
						},time:2000});
					},time:2000});
					
				},time:2000});	
			},time:2000});
		},time:2000});
	}

	function more(){
		for(var i=0,len=aLi.length;i<len;i++){
			(function(i){
				aLi[i].onmouseover=function(){
					S.pub.move(this,{opacity:1},{time:3000});
					for(var j=0,max=aLi.length;j<max;j++){
						if(j==i)continue;
						S.pub.move(aLi[j],{opacity:0.3},{time:3000})
					}
				};
				aLi[i].onmouseout=function(){
					for(var j=0,max=aLi.length;j<max;j++){
						if(j==i)continue;
						S.pub.move(aLi[j],{opacity:level[j]},{time:3000})
					}
				};
			})(i);
		}
	}
}