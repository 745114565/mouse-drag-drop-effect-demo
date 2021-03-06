window.onload = function(){
	
	var mouseOffsetX = 0;
	var mouseOffsetY = 0;
	var isDraging = false;
	
	//鼠标事件1
	g('dialogTitle').addEventListener('mousedown',function(e){
		
		var e = e || window.event;
		mouseOffsetX = e.pageX - g('dialog').offsetLeft;
		mouseOffsetY = e.pageY - g('dialog').offsetTop;
		isDraging = true;
	})
	//鼠标事件2
	document.onmousemove = function(e){
		var e = e || window.event;
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		
		var moveX = 0;
		var moveY = 0;
		if(isDraging===true){
			moveX = mouseX - mouseOffsetX;
			moveY= mouseY - mouseOffsetY;
			
			//范围限定 
			//	moveX > 0  并且 moveX < (页面最大宽度 - 浮层宽度)
			//	moveY > 0  并且 moveY < (页面最大高度 - 浮层高度)
			
			//页面可视区域宽度和高度（页面最大宽度、高度）
			var pageWidth = document.documentElement.clientWidth;
			var pageHeight = document.documentElement.clientHeight;
			
			//浮层宽度和高度
			var dialogWidth = g('dialog').offsetWidth;
			var dialogHeight = g('dialog').offsetHeight;
			
			//横纵坐标可以动的最大值
			var maxX = pageWidth - dialogWidth;
			var maxY = pageHeight - dialogHeight;
			
			moveX = Math.min(maxX,Math.max(0,moveX));
			moveY = Math.min(maxY,Math.max(0,moveY));
			
			
			//移动浮层到指定的位置
			g('dialog').style.left = moveX + 'px';
			g('dialog').style.top = moveY + 'px';
			
		}
	}
	//鼠标事件3
	document.onmouseup = function(){
		isDraging = false;
	}
	
	//窗口变化后登陆浮层居中
	window.onresize = function(){
		autoCenter(g('dialog'));
		fillToBody(g('mask'));
	}
}


	//获取元素对象
	function g(id){return document.getElementById(id);}
	
	//自动居中 - 登录浮层
	function autoCenter(el){
		//得到屏幕可视区域的高度与宽度
		 var bodyW = document.documentElement.clientWidth;
		 var bodyH = document.documentElement.clientHeight;
		 
		 //获取元素的宽度与高度
		 var elW = el.offsetWidth;
		 var elH = el.offsetHeight;
		 
		 //居中设置
		 el.style.left = (bodyW - elW)/2 + 'px';
		 el.style.top = (bodyH - elH)/2 + 'px';
		 
	}
	//自动全屏 - 遮罩
	function fillToBody(el){
		el.style.width = document.documentElement.clientWidth + 'px';
		el.style.height = document.documentElement.clientHeight + 'px';
	}
	

	//展示登录浮层
	function showDialog(){
		g('dialog').style.display = 'block';
		g('mask').style.display = 'block';
		autoCenter(g('dialog'));
		fillToBody(g('mask'));
	}
	
	//隐藏遮罩层
	function hideDialog(){
		g('dialog').style.display = 'none';
		g('mask').style.display = 'none';
	}
	