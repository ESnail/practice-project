var mark=true;
var _index=0;
var _index2=0;
var _index3=0;
var _index4=0;
var st=null;
var timer="";
var timer2=null;
$("#flash .flash").eq(0).show().siblings("div").hide();
$(".hot-main2").eq(0).fadeIn().siblings().fadeOut();
$(".jg-big-list li").eq(0).show().siblings().hide();
/***********��������γ�Ч��**************/
$(".course").click(function(event){
   event.stopPropagation();
	if(mark)
	{
		$(".mod-drop").css({'height':'69px','border':'1px solid #ddd'});
		mark=false;
	}
	else
	{
		$(".mod-drop").css({'height':'34px','border':'1px solid #fff'});
		mark=true;
	}
	    
});
   
//��ֹð��
$(window).click(function(event)
{
   	$(".mod-drop").css({'height':'34px','border':'1px solid #fff'});
	mark=true;
});
/*************��תЧ��*****************/
$(".banner-right").hover(function(){
	$(this).find(".myCourse").css({'-webkit-transform':'rotate(180deg)'});
	$(".link-list").show();    
 },function(){
	$(this).find(".myCourse").css({'-webkit-transform':'rotate(0deg)'}); 
	$(".link-list").hide();   
});
/*************ͼƬ�ֲ�ͼ���********/
$("#flash").hover(function(){
	$(this).find(".ff").show(); //������ȥЧ�� 
	clearInterval(timer); 
	   
},function(){
	$(this).find(".ff").hide();   //����ƿ�Ч��
	autoPlay();
});
/********����滻ͼƬ*************/
$(".button2 li").hover(function(){
	_index=$(this).index();
	tplf();
});
/****************�Զ��ֲ�********************/
function autoPlay(){
	timer=setInterval(function(){
		_index++;
		if(_index>6){_index=0;}
		tplf();
	},4000);	
};
autoPlay();
/****************�������л�**************/
$(".flash-right").click(function(){
   _index++;
   if(_index>6){_index=0;}
   tplf();
});
//********����ұ��л�**********/
$(".flash-left").click(function(){
   _index--;
   if(_index<0){_index=6;}
   tplf();
});
/***********ͼƬ�ַ��ķ�װ����**********/
function tplf(){
	$(".button2 li").eq(_index).addClass("hover").siblings().removeClass("hover");
	$(".flash").eq(_index).fadeIn().siblings("div").fadeOut();
}
/*****************��߲˵�����Ч��***********/
$(".nav-main li").hover(function(){
	$(this).find(".main-list").fadeIn("slow");
	$(this).find(".main-list").animate({top:'0'},200);
},function(){
	$(this).find(".main-list").fadeOut("slow");
	$(this).find(".main-list").animate({top:'0'},200);   
});
/**********ͼƬ�ַ��ұ�Ч����*******************/
$(".iphone3").hover(function(){
	$(this).find(".downLoad").stop().animate({'left':'-816px'},300);
	$(this).css({'webkitAnimation':false});
},function(){
	$(this).find(".downLoad").stop().animate({'left':'0px'},300);
	$(this).css({'webkitAnimation':'scro 2s infinite'});
});
/*******************�γ̷���************/
$(".wrap-box-tit2").click(function(){
   	_index++;
	if(_index>4){_index=0;}
	$(".wrap-box-main2").eq(_index).css({'display':'block'}).siblings().css({'display':'none'});
});
/*********************���ſγ̷���************/
$(".hot-tit2 span").mouseover(function(){
   _index=$(this).index();
   $(".hot-main2").eq(_index).fadeIn().siblings().fadeOut();
   $(this).addClass("hover3").siblings().removeClass("hover3");	
})
/******************IT��ѵ�γ�************/
$(".mod-tit2 span").mouseover(function(){
    _index=$(this).index();
	$(this).addClass("hover3").siblings().removeClass("hover3");
	$(".course-card-list2").eq(_index).css({'display':'block'}).siblings().css({'display':'none'});
	//document.title=_index;	
});
$(".mod-rank2 a").mouseover(function(){
    _index=$(this).index();
	$(this).addClass("free").siblings().removeClass("free");
	//document.title=_index;	
});
/******************���ķ���************/
$(".li-list li").hover(function(){
   	_index2=$(this).index();
	//alert(_index2);
	$(this).addClass("hover2").siblings().removeClass("hover2");
	$(".lishao-ul").eq(_index2).css({"display":"block"}).siblings().css({"display":"none"});
});
/********************���ķ���************/
$(".next").click(function(){
   	_index4++;
	if(_index4>3){_index4=0;}
	//document.title=_index4;
	$(".jg-big-list li").eq(_index4).fadeIn().siblings().fadeOut();
});
$(".prev").click(function(){
   	_index4--;
	if(_index4<0){_index4=3;}
	//document.title=_index4;
	$(".jg-big-list li").eq(_index4).fadeIn().siblings().fadeOut();
});
/************************���ķ���************/
$("#xf .xf1").hover(function(){
    //alert("sss");
	$("#xf .xf1 .xf-list").css("display","block")	
},function(){
	$("#xf .xf1 .xf-list").css("display","none")
});
$("#xf .xf2").hover(function(){
    //alert("sss");
	$("#xf .xf2 .xf-list").css("display","block")	
},function(){
	$("#xf .xf2 .xf-list").css("display","none")
});
$("#xf .xf3").hover(function(){
    //alert("sss");
	$("#xf .xf3 .xf-list").css("display","block")	
},function(){
	$("#xf .xf3 .xf-list").css("display","none")
});
$(".xf1 .xf-list").hover(function(){
  $(".feiji").animate({top:"-5px"},300);	
},function(){
  $(".feiji").animate({top:"40px"},0);
});
/***********ҳ���ö�Ч��****************/
$(window).scroll(function(){
   st=$(window).scrollTop();
   //document.title=st;
   if(st>500){
	  $(".xf1").css("display","block"); 
   }else{
	  $(".xf1").css("display","none"); 
   }	
});
$(".xf1 .xf-list .feiji").click(function(){
    //alert("sss");	
	//$(this).animate({top:"-500px"},200);
	/*timer2=setInterval(function(){
		  if(st==0){
			  clearInterval(timer2);  
		  }
	     $(window).scrollTop($(window).scrollTop-st);
	  },200);
	*/
	$(window).scrollTop($(window).scrollTop()-st);
});