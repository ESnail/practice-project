$(function(){
	//功能一:导航hover
	$("#nav ul li:gt(0)").hover(function(){
		$("#nav ul li:first").removeClass("current");
		$(this).toggleClass("current");
	},function(){
		$("#nav ul li:gt(0)").removeClass("current");
		$("#nav ul li:first").addClass("current");
		
	});
	
	//功能二：安卓下载hover
	$("#android").hover(function(){
		$("#android_pop").slideToggle("fast");
	});
	
	//功能三: 五色圆滚动动画
	//1.五色圆绝对定位层叠于页面外
	$("#product li").css({"left":"-500px","transform":"rotate(0deg)"});
	//2.利用定时器完成动画
		//所有圆同时从左向右移动到left为0的位置
		//此时第一个圆停下，第二个圆及后面的圆同时从左向右移动到left为149的位置，以此类推
		//循环实现5个圆的移动
	var index=1; 
	var left=0;
	var timer = setInterval(function(){
		for(var i=index; i<6; i++){
			$("#product .p"+i).css({
				"left":left+"px",
				"transition":"all 1s ease-out"
			});
		}
		index++;
		left+=149;
		if(left>596){
			window.clearInterval(timer);
			timer=null;
		};
		//3.最后一个圆滚动
		$("#product .p5 i").css({
			"-webkit-transform":"rotate(720deg)",
			"transition":"all 2s ease-out"
		});
	},200);

	//功能四:页面置顶
	//1.鼠标滚轮事件
	$(window).scroll(function() {       
        if($(window).scrollTop() >= 100){
            $('#up').fadeIn(300); 
        }else{    
            $('#up').fadeOut(300);    
        }  
    });
	//2.向上图标单击事件
	$("#up").click(function(){
		$('html,body').animate({scrollTop: '0px'}, 800);
	});
});