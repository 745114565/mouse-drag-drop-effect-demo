# mouse-drag-drop-effect-demo
this is a demo imitate the Baidu login dialog
# 原理
* 鼠标按下 浮层元素表示为可以拖动。
* 鼠标开始移动时记录移动的距离，检验浮层是否可以拖动标志是不是可以拖动，是的话让浮层和鼠标一起移动，不是的话不让浮层移动。
* 鼠标松开后，浮层停止拖动，浮层可拖动标志变为不可以拖动。
# 步骤
* 添加背景图片
* 实现拖拽浮层视图
* 实现遮罩层视图
> onselectstart="return false"防止鼠标选中
``` html
<div class="ui-mask" id="mask" onselectstart="return false"></div>
```
* js编写
``` javascript
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

```
* 鼠标事件处理
> 鼠标在标题栏上按下时，要计算鼠标相对拖地元素的左上角的坐标，并且标记元素为可拖动

> 鼠标按下之后，鼠标开始移动，要检测登录浮层是否标记为可移动状态，如果是，则更新元素位置到当前鼠标的位置，将元素定位到鼠标所在的位置。
>（注意：要减去第一步中获得的偏移）

> 鼠标松开的时候，元素可拖动状态标记为不可拖动状态
``` javascript
 	var mouseOffsetX = 0;
	var mouseOffsetY = 0;
	var isDraging = false;
	
	//鼠标事件1
	g('dialogTitle').addEventListener('mousedwn',function(e){
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
	
```
* 优化 _不让浮层移动到可视区域外_
``` javascript
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
			
```
* 使用外部js文件**windown.onload**中定义的方法  [资料1](http://www.jb51.net/article/43166.htm "资料1") [资料2](http://blog.csdn.net/c_p_h/article/details/63684510 "资料2")
