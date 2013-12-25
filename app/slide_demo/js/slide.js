
function Slide(){};
Slide.prototype.slideObj = null;//滚动对象
Slide.prototype.leftID = null;//左箭头对象
Slide.prototype.rightID = null;//右箭头对象
Slide.prototype.pageWidth = null;//翻页宽度
Slide.prototype.speed = 300;//翻页速度
Slide.prototype.autoPlayTime = 5000;//自动播放间距
Slide.prototype.indexBtnWrap = null;
Slide.prototype.init = function() {
		this.RLBtn();
		this.autoPlay();
		this.indexBtn();
	};

Slide.prototype.RLBtn = function() {
		this.rightID.click(jQuery.proxy( function(e){
			this.nextFun();
		}, this ) );

		this.leftID.click(jQuery.proxy( function(e){
			this.prevFun();
		}, this ) );
	};

Slide.prototype.nextFun = function() {
			var thisObj = this;
			var objCurrLeft = parseInt(this.slideObj.css("left"));
			var liIndex = (-objCurrLeft)/this.pageWidth;
			var liLength = this.slideObj.children("li").length;
		 if (this.slideObj.is(":animated") == false) {
			if (liIndex != liLength - 1) {
		 		this.slideObj.animate({
					"left": (objCurrLeft - this.pageWidth) + "px"
				}, this.speed,function(){
					thisObj.currIndex();
				});
			} else {
		 		this.slideObj.children("li:first").css({
				"position": "relative",
		 			"left": (liLength * this.pageWidth) + "px"
				});
				this.slideObj.animate({
					"left": (objCurrLeft - this.pageWidth) + "px"
		 		}, this.speed, function() {
					thisObj.slideObj.css("left","0px");
		 			thisObj.slideObj.children("li:first").removeAttr("style");
		 			thisObj.currIndex();
				});
			};
			
		 };
	};

Slide.prototype.prevFun = function() {
		var thisObj = this;
		var objCurrLeft = parseInt(this.slideObj.css("left"));
		var liIndex = (-objCurrLeft)/this.pageWidth;
		var liLength = this.slideObj.children("li").length;
		if (this.slideObj.is(":animated") == false) {
			if (liIndex != "0") {
				this.slideObj.animate({
					"left": (objCurrLeft + this.pageWidth) + "px"
				}, this.speed,function(){
					thisObj.currIndex();
				});

			} else {
				this.slideObj.children("li:last").css({
					"position": "relative",
					"left": -(liLength * this.pageWidth) + "px"
				});
				this.slideObj.animate({
					"left": (this.pageWidth) + "px"
				}, this.speed, function() {
					thisObj.slideObj.css("left", -(liLength * thisObj.pageWidth - thisObj.pageWidth));
					thisObj.slideObj.children("li:last").removeAttr("style");
					thisObj.currIndex();
				});
			};
		};
	};

Slide.prototype.autoPlay = function() {
	if(this.autoPlayTime != null){
		var thisObj = this
		var autoTimer = setInterval(function() {
			thisObj.nextFun();
		}, this.autoPlayTime);

		this.slideObj.parent().parent().hover(function() {//解除定时
			clearInterval(autoTimer);
		}, function() {
			thisObj.slideObj.parent().parent().unbind("hover");
			thisObj.autoPlay();
		});

		};

	};
Slide.prototype.indexBtn = function(){
	var thisObj = this
	var lenth =  this.slideObj.children("li").length;
	for (var i = 0; i < lenth; i++) {
		this.indexBtnWrap.append("<li></li>");
	};
	this.indexBtnWrap.children("li:first").addClass("curr");
	this.indexBtnWrap.children("li").each(function(i){
		$(this).click(function(){
			thisObj.slideObj.animate({"left":-(i*thisObj.pageWidth)},this.speed,function(){
				thisObj.currIndex();
			});
		});
	});
};

Slide.prototype.currIndex = function(){
	var currIndex = -parseInt(this.slideObj.css("left"))/this.pageWidth;
	this.indexBtnWrap.children("li").removeClass("curr");
	this.indexBtnWrap.children("li").eq(currIndex).addClass("curr");
};