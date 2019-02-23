/*功能一：鼠标滑过父菜单，弹出子菜单*/
function hoverSub(li,display){
	//step1:找到li下的div
	var div=li.querySelector("div");
	//step2:定义样式
	div.style.display=display;
}
/*功能一问题：如何保持label的hover状态
  css中：定义一个和：hover效果完全相同的样式类
*/
function keepHover(div,isHover){
	var label=div.parentNode.querySelector("label");
	label.className=isHover?label.className+" hover":"rt";
	var a=label.querySelector("a");
	a.className=isHover?"hover":"";
}

/*功能二：弹出商品类别菜单*/
function hoverCate(display){
	var allCate=document.querySelector("#all_cate");
	allCate.style.display=display;
}
function hoverSubCate(div,display){
	var subDiv=div.querySelector(".sub_cate_box");
	subDiv.style.display=display;
}
function keepH3Hover(subDiv,isHover){
	var h3=subDiv.parentNode.querySelector("h3");
	h3.className=isHover?"hover":"";
}

/*功能三：放大图*/
/*需求3.1：左/右移小图标*/
const LIWIDTH=62;//每个li的宽度，每次移动的位移
//不移动：li的总长度-移动的次数=5(露在外面的li有5个)
var times=0;//移动的次数
var iconList=document.querySelector("#icon_list");
var count=iconList.querySelectorAll("li").length;//li的总长度
function move(btn){
	//如果点左按钮，且移动次数不是0，则右移一次
	if(btn.id=="btnLeft"){
		if(times!=0){
			times-=1;
		}
	}else{//如果点右按钮，且li总数-移动次数>5，则左移一次
		if((count-times)>5){
			times+=1;
		}
	}
	//ul左移的距离=(-1)*li的宽度*移动次数times
	iconList.style.left=(-1)*LIWIDTH*times+"px";
	btnEnabled();
}
/*检查左右两按钮的可用状态*/
var btnLeft=document.querySelector("#btnLeft");
var btnRight=document.querySelector("#btnRight");
function btnEnabled(){
	if(times==0){//如果移动次数是0，则不允许左移
		btnLeft.className="left_disabled";
	}else if(count-times==5){//剩余5个li时，不允许右移
		btnRight.className="right_disabled";
	}else{//其他情况，则左右都可以移动
		btnLeft.className="left";
		btnRight.className="right";
	}
}
/*需求3.2：鼠标滑过小图片，显示中图片*/
var imgs=iconList.querySelectorAll("img");
var mImg=document.querySelector("#mImg");
//批量事件--动态绑定 ---每张图片都绑定一个onmouseover
for(var i=0;i<imgs.length;i++){
	imgs[i].onmouseover=function(){
		//product-s1.jpg 小
		//product-s1-m.jpg 中
		var src=this.src;
		var d=src.indexOf(".");//获取点的位置
		mImg.src=src.substring(0,d)+"-m"+src.substring(d);
	}
}
/*需求3.3：放大图*/
var mask=document.querySelector("#mask");
var largeDiv=document.querySelector("#largeDiv");
function showMask(display){
	mask.style.display=display;
	largeDiv.style.display=display;
}
//中图片350*350
//mask:175*175
function zoom(evt){
	var top=evt.offsetY-175/2;
	top=top<0?0:top>(350-175)?(350-175):top;
	var left=evt.offsetX-175/2;
	left=left<0?0:left>(350-175)?(350-175):left;
	mask.style.top=top+"px";
	mask.style.left=left+"px";
	//中:product-s1-m.jpg
	//大:product-s1-l.jpg
	var src=mImg.src;
	var d=src.indexOf(".");
	src=src.substring(0,d-1)+"l"+src.substring(d);
	largeDiv.style.backgroundImage="url("+src+")";
	//移动
	largeDiv.style.backgroundPositionX=left*-2+"px";
	largeDiv.style.backgroundPositionY=top *-2+"px";
}

/*功能四：分享到*/
function shareMore(aMore){
	//step4:判断aMore的className是否包含back
	var isBack=aMore.className.indexOf("back")!=-1;
	
	var div=aMore.parentNode;
	//step1:将div变宽
	div.style.width=isBack?"150px":"200px";
	//step2:找到除了前3个、最后一个的其他a,即找到第4个a到倒数第2个a,显示出来
	var as=div.querySelectorAll("a");
	for(var i=3;i<as.length-1;i++){
		as[i].style.display=isBack?"none":"block";
	}
	//step3:为当前超链接添加back类
	aMore.className=isBack?"share_more":aMore.className+" back";
}

/*功能五：送货地址选择*/
function storeHover(display){
	var content=document.querySelector("#store_content");
	content.style.display=display;
}
function storeTabChange(index){
	//step1:获取ul下3个li
	var lis=document.querySelectorAll("#store_tabs li");
	//step2:移除所有li上的class,仅为当前li设置class
	for(var i=0;i<lis.length;i++){
		lis[i].className=i==index?"hover":"";
	}
}

/*功能六：迷你购物车*/
function showMiniCart(divCart,display){
	divCart.querySelector("div").style.display=display;
}

/*功能七：商品详情页签切换*/
var tabs=["product_info","product_data",
		  "product_package","product_saleAfter"];
function showTab(li,index){
	//变换li上current样式类的位置
	var lis=li.parentNode.querySelectorAll("li");
	for(var i=0;i<lis.length;i++){
		lis[i].className="";
	}
	li.className="current";
	//显示指定li对应的div
	for(var i=0;i<tabs.length;i++){
		var div=document.querySelector("#"+tabs[i]);
		div.style.display=i==index?"block":"none";
	}
}

/*功能八:弹出回复表单*/
function showReply(aObj){
	//根据当前单击的a,定位对应的replay div
	var divComment=aObj.parentNode.parentNode;
	var divReply=null;
	if(divComment.nextSibling.nodeType==3){
		divReply=divComment.nextSibling.nextSibling;
	}else{
		divReply=divComment.nextSibling;
	}
	//获得replay div的display属性，反转
	var cssStyle=null;
	if(divReply.currentStyle){
		cssStyle=divReply.currentStyle;
	}else{
		cssStyle=getComputedStyle(divReply,null);
	}
	divReply.style.display=cssStyle.display=="none"?"block":"none";
}
