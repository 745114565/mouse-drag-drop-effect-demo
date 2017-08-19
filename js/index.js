window.onload = function(){
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
			
			g('dialog').style.left = moveX + 'px';
			g('dialog').style.top = moveY + 'px';
			
		}
	}
	//鼠标事件3
	document.onmouseup = function(){
		isDraging = false;
	}
	
}
