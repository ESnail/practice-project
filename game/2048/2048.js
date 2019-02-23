var game={
	data:[[0,0,0,0],
		  [0,0,0,0],
		  [0,0,0,0],
		  [0,0,0,0]
	],
	PLAYING:1,//游戏进行状态
	GAME_OVER:0,//游戏结束状态
	state:1,//游戏开始时，是PLAYING状态
	score:0,//保存游戏分数，只要合并，就把合并后的数加到分数上
	//判断当前数组是否都不为0，
	//只要有任意一个==0，返回false
	//如果所有都！=0，返回true！
	isFull:function(){
		//遍历二维数组
		for(var row=0;row<this.data.length;row++){
			for(var col=0;col<this.data[row].length;col++){
				//检查当前元素==0
				if(this.data[row][col]==0){
					//如果==0 return false
					return false;
				}
			}
		}
		//遍历结束：return true
		return true;
	},
	/*向data中随机位置生成2或4*/
	randomNum:function(){
		if(!this.isFull()){//是否已满
			//死循环，直到生成数字并成功放入才退出
			while(true){
				//随机生成行号
				var row=parseInt(Math.random()*4);
				//随机生成列号
				var col=parseInt(Math.random()*4);
				//随机选择2或4
				var n=Math.random()<0.5?2:4;
				//判断当前单元格是否有数字
				if(this.data[row][col]==0){
					//如果为0，说明没有数字,可放入
					this.data[row][col]=n;
					break;
				}
			}	
		}
	},
	/*启动游戏*/
	start:function(){
		//启动游戏时,随机在2个位置生成随机数
		game.randomNum();
		game.randomNum();
		//将数组完整显示到div中
		game.showView();
	},
	/*将数组完整显示到div中*/
	showView:function(){
		//遍历二维数组
		for(var row=0;row<this.data.length;row++){
			for(var col=0;col<this.data[row].length;col++){
				//每变遍历一个元素,先判断元素是否为0
				var div=document.querySelector("#fc"+row+col);
				var n=this.data[row][col];
				//如果不等于0，才能写入页面
				div.innerHTML=n==0?"":n;
				//在div上追加与数字对应的样式类nxx
				div.className=n==0?"fcell":"fcell n"+n;
			}
		}
		var score=document.querySelector("#score");
		score.innerHTML=this.score;
	},
	/*左移*/
	moveLeft:function(){
		if(this.canLeft()){
			//每行都要调moveLeftInRow()方法
			for(var i=0;i<4;i++){
				game.moveLeftInRow(i);
			}
			animation.start();
			setTimeout(function(){
				//所有操作后，需要新生成一个数
				game.randomNum();
				//将数组完整显示到div中
				game.showView();
			},animation.interval*animation.times)
		}
	},
	/*任意一行内移动或合并元素*/
	moveLeftInRow:function(row){//比如：0202
		var cells=game.data[row];
		for(var i=0;i<cells.length-1;i++){
			//从当前位置向后找第一个!=0的数
			var nextI=game.getLeftNext(row,i);
			if(nextI!=-1){//只有找到才继续操作
				if(cells[i]==0){//如果自己为0
					//将下一个不为0的数换到自己位置
					cells[i]=cells[nextI];
					animation.addTask(""+row+nextI,""+row+i);
										//13        11
					//将nextI位置,置为0
					cells[nextI]=0;
					//交换后，向后退一步，重新检查当前位置
					i--;
				}else{
					//如果当前元素等于nextI位置的数
					if(cells[i]==cells[nextI]){
						//则将后面的数与自己相加
						cells[i]+=cells[nextI];
						animation.addTask(""+row+nextI,""+row+i);
										//13        11
						this.score+=cells[i];//分数累加
						//将nextI位置,置为0
						cells[nextI]=0;
					}
				}
			}else{
				break;
			}
		}
	},
	/*从当前位置向右找第一个不等于0的数*/
	getLeftNext:function(row,start){
		var cells=game.data[row];
		//当前位置不和自己比较，从之后开始比较
		for(var i=start+1;i<4;i++){
			//只要发现不等于0
			if(cells[i]!=0){
				return i;
			}
		}
		return -1;
	},
	/*右移*/
	moveRight:function(){
		if(this.canRight()){
			//每行都要调moveRightInRow()方法
			for(var i=0;i<this.data.length;i++){
				this.moveRightInRow(i);
			}
			animation.start();
			setTimeout(function(){
				//所有操作后，需要新生成一个数
				game.randomNum();
				//将数组完整显示到div中
				game.showView();
			},animation.interval*animation.times)
		}
	},
	/*某一行向右移*/
	moveRightInRow:function(row){
		//从最右侧元素开始，向左遍历
		//到>0结束
		for(var i=3;i>0;i--){
			//每遍历一个数，就找下一个不为0的
			var nextI=this.getRightNext(row,i);
			//如果找到
			if(nextI!=-1){
				//如果自己为0
				if(this.data[row][i]==0){
					//将下一个不为0的数保存到自己
					this.data[row][i]=this.data[row][nextI];
					animation.addTask(""+row+nextI,""+row+i);
					//将不为0的数原位置置0
					this.data[row][nextI]=0;
					//退下一个小标，重新检查自己位置
					i++;
				}else if(this.data[row][i]==this.data[row][nextI]){
				//如果自己和下一个数相等
					//将下一个数累加到自己身上
					this.data[row][i]+=this.data[row][nextI];
					animation.addTask(""+row+nextI,""+row+i);
					this.score+=this.data[row][i];//分数累加
					//将下一个数位置置0
					this.data[row][nextI]=0;
				}
			}else{
				break;
			}
		}
	},
	/*获取当前位置左侧第一个不为0的数*/
	getRightNext:function(row,start){
		//以start位置前一个位置开始
		for(var i=start-1;i>=0;i--){
		//到0位置结束
			if(this.data[row][i]!=0){
			//只要发现任意一个不为0的数
				//返回当前下标i
				return i;
			}
		}
		//如果循环结束退出，返回-1
		return -1;
	},
	/*上移*/
	moveUp:function(){
		if(this.canUp()){
			for(var col=0;col<4;col++){
				this.moveUpInCol(col);
			}
			animation.start();
			setTimeout(function(){
				//所有操作后，需要新生成一个数
				game.randomNum();
				//将数组完整显示到div中
				game.showView();
			},animation.interval*animation.times)
		}
	},
	moveUpInCol:function(col){
		for(var row=0;row<4;row++){
			var nextRow=this.getUpNext(col,row);
			if(nextRow!=-1){
				//当前单元格和下边单元格相比
				if(this.data[row][col]==0){
					this.data[row][col]=this.data[nextRow][col];
					animation.addTask(""+nextRow+col,""+row+col);
					this.data[nextRow][col]=0;
					row--;
				}else if(this.data[row][col]==this.data[nextRow][col]){
					this.data[row][col]+=this.data[nextRow][col];
					animation.addTask(""+nextRow+col,""+row+col);
					this.score+=this.data[row][col];//分数累加
					this.data[nextRow][col]=0;
				}
			}else{
				break;
			}
		}
	},
	getUpNext:function(col,startRow){
		//从startRow下一行开始向后遍历每一行
		for(var row=startRow+1;row<4;row++){
			if(this.data[row][col]!=0){
				return row;
			}
		}
		return -1;
	},
	/*向下*/
	moveDown:function(){
		if(this.canDown()){
			for(var col=0;col<4;col++){
				this.moveDownInCol(col);
			}
			animation.start();
			setTimeout(function(){
				//所有操作后，需要新生成一个数
				game.randomNum();
				//将数组完整显示到div中
				game.showView();
			},animation.interval*animation.times)
		}
	},
	moveDownInCol:function(col){
		//遍历col列中的每一列到第0行的下一行结束
		for(var row=3;row>0;row--){
			//调用getDownNext方法，获得下一个不为0的数的行号
			var nextRow=this.getDownNext(col,row);
			//如果行号!=-1
			if(nextRow!=-1){
				//当前单元格和下边单元格相比，如果当前位置==0
				if(this.data[row][col]==0){
					//将下一个位置替换到当前位置
					this.data[row][col]=this.data[nextRow][col];
					animation.addTask(""+nextRow+col,""+row+col);
					//将下一个位置置0
					this.data[nextRow][col]=0;
					//行号++
					row++;
				}else if(this.data[row][col]==this.data[nextRow][col]){
					//如果当前位置的数等于下一个位置的数
					//将下一个位置累加到当前位置
					this.data[row][col]+=this.data[nextRow][col];
					animation.addTask(""+nextRow+col,""+row+col);
					this.score+=this.data[row][col];//分数累加
					//下一个位置置为0
					this.data[nextRow][col]=0;
				}
			}else{
				break;
			}
		}
	},
	getDownNext:function(col,startRow){
		//从startRow上一行开始到第0行结束
		for(var row=startRow-1;row>=0;row--){
			//只要找到!=0的数，就返回 row
			if(this.data[row][col]!=0){
				return row;
			}
		}
		//循环结束，没找到，返回-1
		return -1;
	},
	/*判断是否可以向某个方向移动,可移动返回true,不可返回false*/
	canLeft:function(){
		//遍历二维数组
		for(var row=0;row<this.data.length;row++){
			for(var col=1;col<this.data[row].length;col++){
				//判断当前元素左侧元素是否==0或者是否==自己
				var curr=this.data[row][col];
				var left=this.data[row][col-1];
				if(curr!=0){
					if(left==0||curr==left){
						return true;
					}
				}
			}
		}
		return false;
	},
	canRight:function(){
		//遍历二维数组
		for(var row=0;row<this.data.length;row++){
			for(var col=0;col<this.data[row].length-1;col++){
				//判断当前元素左侧元素是否==0或者是否==自己
				var curr=this.data[row][col];
				var right=this.data[row][col+1];
				if(curr!=0){
					if(right==0||curr==right){
						return true;
					}
				}
			}
		}
		return false;
	},
	canUp:function(){
		//遍历二维数组
		for(var row=1;row<this.data.length;row++){
			for(var col=0;col<this.data[row].length;col++){
				//判断当前元素左侧元素是否==0或者是否==自己
				var curr=this.data[row][col];
				var up=this.data[row-1][col];
				if(curr!=0){
					if(up==0||curr==up){
						return true;
					}
				}
			}
		}
		return false;
	},
	canDown:function(){
		//遍历二维数组
		for(var row=0;row<this.data.length-1;row++){
			for(var col=0;col<this.data[row].length;col++){
				//判断当前元素左侧元素是否==0或者是否==自己
				var curr=this.data[row][col];
				var down=this.data[row+1][col];
				if(curr!=0){
					if(down==0||curr==down){
						return true;
					}
				}
			}
		}
		return false;
	},
	gameOver:function(){
		if(!this.isFull()){
			for(var row=0;row<this.data.length;row++){
				for(var col=0;col<this.data[row].length;col++){
					var curr=this.data[row][col];
					if(curr==8192){
						return true;
					}
				}
			}
			return false;
		}
		//数组是满的
		//遍历二维数组,判断当前元素的上下左右是否相等
		for(var row=0;row<this.data.length;row++){
			for(var col=0;col<this.data[row].length;col++){
				var curr=this.data[row][col];
				if(row!=0){
					if(this.data[row-1][col]==curr){
						false;
					}
				}
				if(row!=3){
					if(this.data[row+1][col]==curr){
						false;
					}
				}
				if(col!=0){
					if(this.data[row][col-1]==curr){
						false;
					}
				}
				if(col!=3){
					if(this.data[row][col+1]==curr){
						false;
					}
				}
			}
		}
		return true;
	},
	restart:function(){
		this.data=[[0,0,0,0],
				   [0,0,0,0],
				   [0,0,0,0],
				   [0,0,0,0]
		];
		this.state=1;
		this.score=0;
		var gameOver=document.querySelector("#gameOver");
		gameOver.style.display="none";
		this.start();
		document.onkeydown=function(){
		var evt=window.event||arguments[0];
		if(game.state==game.PLAYING){
			//左移
			if(evt.keyCode==37){//键盘左箭头 37
				game.moveLeft();
			}else if(evt.keyCode==39){//键盘右箭头 39
				game.moveRight();
			}else if(evt.keyCode==38){//键盘上箭头 38
				game.moveUp();
			}else if(evt.keyCode==40){//键盘下箭头 40
				game.moveDown();
			}
			if(game.gameOver()){
				game.state=game.GAME_OVER;
				//step1:找到gameOver div
				var gameOver=document.querySelector("#gameOver");
				//step2:显示出来
				gameOver.style.display="block";
				//step3:修改finalScore总innerHTML
				var finalScore=document.querySelector("#finalScore");
				finalScore.innerHTML=game.score;
				//step4:计算p元素的top和left
				//left=(屏幕的宽度-p元素的宽度)/2
				//top=(屏幕的高度-p元素的高度)/2
				var p=document.querySelector("#gameOver p");
				var pCSS=null;
				if(p.currentStyle){
					pCSS=p.currentStyle;
				}else{
					pCSS=getComputedStyle(p,null);
				}
				var width=parseInt(pCSS.width);
				var height=parseInt(pCSS.height);
				var screenWidth=window.innerWidth;
				var screenHeight=window.innerHeight;
				p.style.left=(screenWidth-width)/2+"px";
				p.style.top=(screenHeight-height)/2-40+"px";
				/*screen.availXXX  屏幕宽高，去除任务栏*/
			}
		}
	}
	}
}