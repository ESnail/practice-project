$(function(){
	var index = 0;
	var winH = $(window).height();
	var Time = new Date();//网页加载完时的时间
	
	/*延时，使刷新有效*/
	setTimeout(function(){
		$(document).scrollTop(0);
	},30);
	
	/*点击按钮*/
	$("#btn ul li").click(function(){
		index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$("html,body").animate({"scrollTop":index*winH+"px"},1000);		
	});
	
	/*鼠标滚轮滚动*/
	$(document).mousewheel(function(e,dir){
		//dir表示鼠标滚轮滚动的方向，向下为负数，向上为正数
		if( new Date() - Time > 1000){ //滚轮滚动的时间 - 上一次滚动的时间
			Time = new Date();
			if(dir < 0){
			index++;
			index%=7;
			}else{
				index--;
				if(index < 0) index = 6;
			}
			$("#btn ul li").eq(index).addClass("active").siblings().removeClass("active");
			$("body").animate({"scrollTop":index*winH+"px"},1000);
		};	
	});
});