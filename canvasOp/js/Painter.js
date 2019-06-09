//画家对象，用于完成canvas 2d绘图,aimId -- 用于放置canvas的div元素
function Painter(aimId){
	//一系列初始化化操作
	var aimDiv = document.getElementById(aimId);
	if(!aimDiv){
		console.error("元素ID不存在！");
		return null;
	}
	var canvasHtml = APPCONFIG.canvasHtml();
	aimDiv.innerHTML = canvasHtml.html;
	var  canvas = document.getElementById(canvasHtml.id)
	if(!canvas){
		console.error("canvas 没有添加成功！");
		return null;
	}
	var ctx=canvas.getContext("2d");
	if(!ctx){
		console.error("上下文对象为空！");
		return null;
	}
	//私有变量
	this.width = canvas.clientWidth;
	this.height =canvas.clientHeight;
	this.ctx=ctx;
	
	
	//公共方法
	if(typeof Painter._initialized == "undefined"){  
		/**
		 * 设置填充效果
		 * color	指示绘图填充色的 CSS 颜色值。默认值是 #000000。
		 * gradient	用于填充绘图的渐变对象（线性或放射性）
		 * pattern	用于填充绘图的 pattern 对象
		*/
	 	Painter.prototype.setFillStyle = function(style){  
	 		style = style || APPCONFIG.colorStruct(2);
            this.ctx.fillStyle=style;
        } 
        /**
         * 获取填充效果
         */
        Painter.prototype.setFillStyle = function(){   
            return this.ctx.fillStyle;
        } 
        /**
		 * 设置填充效果
		 * color	指示绘图填充色的 CSS 颜色值。默认值是 #000000。
		 * gradient	用于填充绘图的渐变对象（线性或放射性）
		 * pattern	用于填充绘图的 pattern 对象
		*/
	 	Painter.prototype.setStrokeStyle = function(style){   
	 		style = style || APPCONFIG.colorStruct(2);
            this.ctx.strokeStyle=style;
        } 
        /**
         * 获取填充效果
         */
        Painter.prototype.getStrokeStyle = function(){   
            return this.ctx.strokeStyle;
        }
        /**
         * 设置阴影参数
         * @param {Object} color  阴影颜色
         * @param {Object} blur		阴影模糊级别
         * @param {Object} offsetx	阴影横向偏移
         * @param {Object} offsety	阴影纵向偏移
         */
        Painter.prototype.setShadowAttribute =function (color,blur,offsetx,offsety){
        	this.ctx.shadowColor = color || APPCONFIG.shadowDefault.color;
        	this.ctx.shadowBlur = blur || APPCONFIG.shadowDefault.blur;
        	this.ctx.shadowOffsetX = offsetx || APPCONFIG.shadowDefault.offsetx;
        	this.ctx.shadowOffsetY = offsety || APPCONFIG.shadowDefault.offsety;
        }
        /**
         * 返回用于阴影的颜色
         */
        Painter.prototype.getShadowAttribute =function (){
        	return {
        		color : this.ctx.shadowColor,
        		blur : this.ctx.shadowBlur,
        		offsetx : this.ctx.shadowOffsetX,
        		offsety : this.ctx.shadowOffsetY
        	}
        } 
        /**
         * 设置线条样式
         * @param {Object} cap   //边缘
         * @param {Object} join  //交接形式
         * @param {Object} width	//线条宽度
         * @param {Object} limit	//箭头宽度
         */
        Painter.prototype.setLineAttribute =function (cap,join,width,limit){
        	this.ctx.lineCap = cap || APPCONFIG.lineDefault.cap[0],
        	this.ctx.lineJoin = join || APPCONFIG.lineDefault.join[0];
        	this.ctx.lineWidth = width || APPCONFIG.lineDefault.width;
        	this.ctx.miterLimit = limit || APPCONFIG.lineDefault.limit;
        }
        /**
         * 返回用于线条样式
         */
        Painter.prototype.getLineAttribute =function (){
        	return {
        		cap : this.ctx.lineCap,
        		join : this.ctx.lineJoin,
        		width : this.ctx.lineWidth,
        		limit : this.ctx.miterLimit
        	}
        } 
        /**
         * 设置字体样式 ，对fillText() 或 strokeText() 方法有用
         * @param {Object} font  字体
         * @param {Object} size		大小
         * @param {Object} textAlign	对其方式
         * @param {Object} baseline		文本基线
         */
        Painter.prototype.setFont =function (font,textAlign,baseline){
        	this.ctx.font = font || APPCONFIG.fontDefault.font(),
        	this.ctx.textAlign = textAlign || APPCONFIG.fontDefault.align;
        	this.ctx.textBaseline = width || APPCONFIG.fontDefault.baseline;
        }
        /**
         * 返回用于字体样式
         */
        Painter.prototype.getFont =function (){
        	return {
        		font : this.ctx.font,
        		align : this.ctx.textAlign,
        		baseline : this.ctx.textBaseline
        	}
        } 
        /**
         * 设置全局属性
         * @param {Object} alpha
         * @param {Object} operation
         */
        Painter.prototype.setGlobal =function (alpha,operation){
        	this.ctx.globalAlpha = alpha?(alpha>1||alpha<0?1:alpha):APPCONFIG.globalDefault.alpha,
        	this.ctx.globalCompositeOperation = operation || APPCONFIG.globalDefault.operation[0];
        }
        /**
         * 获取全局属性
         * 返回用于字体样式
         */
        Painter.prototype.getGlobal =function (){
        	return {
        		alpha : this.ctx.globalAlpha,
        		operation : this.ctx.globalCompositeOperation 
        	}
        } 
        /**
         * 保存此时上下文状态
         */
        Painter.prototype.save = function(){
        	this.ctx.save();
        }
        /**
         * 还原之前保存的上下文状态
         */
        Painter.prototype.resotre = function(){
        	this.ctx.resotre();
        }
        
        
        
         /**
         * 获取渐变对对象
         * 渐变可用于填充矩形、圆形、线条、文本等等。
         * 提示：请使用该对象作为 strokeStyle 或 fillStyle 属性的值。
         * 提示：请使用 addColorStop() 方法规定不同的颜色，以及在 gradient 对象中的何处定位颜色。
         * param :  type 1--线性；2--放射性
         */
        Painter.prototype.getGradient = function(type,range,colorRate){   
        	var grd = null;
            if(type==2){  //放射性
            	if(!range||!range.length||range.length<6){
            		console.error("范围参数不对，将使用默认值！");
            		range = APPCONFIG.gradientRange(type);
            	}
            	var grd=this.ctx.createRadialGradient(range[0],range[1],range[2],range[3],range[4],range[5]);
            }else{   //线性
            	if(!range||!range.length||range.length<4){
            		console.error("范围参数不对，将使用默认值！");
            		range = APPCONFIG.gradientRange(type);
            	}
            	var grd=this.ctx.createLinearGradient(range[0],range[1],range[2],range[3]);
            }
            //颜色判断
            if(!colorRate||!colorRate.length||!colorRate[0].rate||!colorRate[0].color){
            	console.error("颜色参数不对，将使用默认值！");
            	colorRate = APPCONFIG.gradientColorRate();
            }
            //设置渐变颜色
            for(var i = 0; i<colorRate.length;i++){
            	grd.addColorStop(colorRate[i].rate,colorRate[i].color);
            }
            return grd;
        } 
        
        
	 	
		Painter._initialized = true;
	}
}

