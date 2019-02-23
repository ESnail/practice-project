//构造函数：定义每个对象，每次移动的属性和方法
//参数:obj 要移动的对象
//xxxStep:某个方向每次移动的距离
function Task(obj,topStep,leftStep){
	this.obj=obj;
	this.topStep=topStep;
	this.leftStep=leftStep;
	//让当前对象移动一步
	this.moveStep=function(){
		//获取当前对象的位置top、left
		var objCSS=null;
		if(this.obj.currentStyle){
			objCSS=this.obj.currentStyle;
		}else{
			objCSS=getComputedStyle(this.obj,null);
		}
		var top=parseInt(objCSS.top);
		var left=parseInt(objCSS.left);
		//设置当前对象移动一步后的位置
		obj.style.top=top+this.topStep+"px";
		obj.style.left=left+this.leftStep+"px";
	};
	this.clear=function(){
		this.obj.style.zIndex="";
		this.obj.style.top="";
		this.obj.style.left="";
	}
}

var animation={
	times:10,//移动的步数或次数，统一步伐
	interval:50,//每一秒钟迈一步
	timer:null,//保存定时器线程号
	tasks:[],//保存要移动的对象
	//source和target应仅传入行列下标
	addTask:function(source,target){
					//13     11
		var sourceCell=document.querySelector("#fc"+source);
		var targetCell=document.querySelector("#fc"+target);
		//获得原位置css样式
		var sourceCSS=null;
		if(sourceCell.currentStyle){
			sourceCSS=currentStyle;
		}else{
			sourceCSS=getComputedStyle(sourceCell,null);
		}
		//获得目标位置css样式
		var targetCSS=null;
		if(targetCell.currentStyle){
			targetCSS=currentStyle;
		}else{
			targetCSS=getComputedStyle(targetCell,null);
		}
		//(目标top-原top)/times
		var topStep=(parseInt(targetCSS.top)-parseInt(sourceCSS.top))/this.times;
		var leftStep=(parseInt(targetCSS.left)-parseInt(sourceCSS.left))/this.times;
		sourceCell.style.zIndex="1";
		//创建任务并添加
		var task=new Task(sourceCell,topStep,leftStep);
		this.tasks.push(task);
	},
	//启动动画
	start:function(){
		this.timer=setInterval(function(){
			//所有单元格移动一步,遍历每一个任务
			for(var i=0;i<animation.tasks.length;i++){
				var task=animation.tasks[i];
				task.moveStep();
			}
			animation.times--;
			if(animation.times==0){
				for(var i=0;i<animation.tasks.length;i++){
					var task=animation.tasks[i];
					task.clear();
				}
				//清空定时器
				clearInterval(animation.timer);
				animation.timer=null;
				//清空任务
				animation.tasks=[];
				//重置移动次数
				animation.times=10;
			}
		},this.interval);
	}
}