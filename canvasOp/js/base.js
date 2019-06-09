APPCONFIG = {
	order : 0,
	colorStruct : function(type){		//随机颜色生成
		if(type == 1){
            return '#'+Math.floor(Math.random()*256).toString(10);
        }
        if(type == 2){
            return '#'+Math.floor(Math.random()*0xffffff).toString(16);
        }
        if(type == 3){
            var r=Math.floor(Math.random()*256);
            var g=Math.floor(Math.random()*256);
            var b=Math.floor(Math.random()*256);
            return "rgb("+r+','+g+','+b+")";//所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
        }
	},
	shadowDefault : {		//阴影默认属性
		color : '#000000',    //颜色
		blur  : 10,			//模糊度
		offsetx : 0,		//横向偏移
		offsety : 0			//纵向偏移
	},
	lineDefault : {		//线条默认属性
		cap : ["butt","round","square"],  //butt 默认。向线条的每个末端添加平直的边缘。round	向线条的每个末端添加圆形线帽。square	向线条的每个末端添加正方形线帽。
		join : ["bevel","round","miter"],			//边角的类型，当两条线交汇时。bevel	创建斜角。round	创建圆角。miter	默认。创建尖角。
		width  : 1,    //线条宽度
		limit : 5,	   //箭头连接宽度
	},
	fontDefault : {		//字体默认属性,
		style : ['normal','italic','oblique'],   //规定字体样式
		variant : ['normal','small-caps'],
		weight : ['normal','bold','bolder','lighter','100','200','300','400','500','600','700','800','900']
		size : 10,
		family : ['Arial','"Courier New"','Courier','monospace','"Times New Roman"','Times','serif','Helvetica','sans-serif','Verdana'],
		align : ['center','end','left','right','start'],
		baseline : ['alphabetic','top','hanging','middle','ideographic','bottom'],
		font : function(){
			return this.style[0]+' '+this.variant[0]+' '+this.weight[0]+' '+this.size+'px '+this.family[o];
		}
	},
	globalDefault : {		//全局样式配置
		alpha : 1.0,
		/**
			0. source-over	默认。在目标图像上显示源图像。
			1. source-atop	在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。
			2. source-in	在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。
			3. source-out	在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。
			4. destination-over	在源图像上方显示目标图像。
			5. destination-atop	在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。
			6. destination-in	在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。
			7. destination-out	在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。
			8. lighter	显示源图像 + 目标图像。
			9. copy	显示源图像。忽略目标图像。
			10. xor		使用异或操作对源图像与目标图像进行组合。
		 */
		operation ['source-over','source-atop','source-in','source-out','destination-over','destination-atop','destination-in','destination-out','lighter','copy','xor']: 
	}
	canvasHtml : function(){   //生成canvas的html
		var index = this.order++;
		return {
				html:'<canvas id="default-canvas-'+index+'" style="width:100%;height:100%;border:1px solid #000000;"></canvas>',
				id : 'default-canvas-'+index
			}
	},
	gradientRange : function(type,width,height){  //生成默认渐变对象的范围
		var range = [];
		if(type == 1){ //线性
			range[0]=range[1]=0;	//起始点坐标
			range[2]=width;range[3]=height;	//结束点坐标
		}else{
			range[0]=range[3]=width/2;    //内外圈横坐标
			range[1]=range[4]=height/2;		//内外圈纵坐标
			range[2]=10;	//内圈半径
			range[5]=Math.sqrt(width*width+height*height);	//	外圈半径
		}
		return range;
	},
	gradientColorRate : function(count){     //生成渐变对象的默认颜色比率
		count = (count||count>10||count<2)?4:count;
		var rate = 1/count;
		var colors = [];
		for(var i = 0; i < 1; i += rate ){
			colors.push({
				rate : i,
				color : this.colorStruct(2);
			});
		}
		colors.push({
				rate : 1,
				color : this.colorStruct(2);
			});
		return colors;
	},
}