//各个类名，以空格相互隔开
const animatesStr = "bounce flash pulse rubberBand shake headShake swing tada wobble jello bounceIn bounceInDown bounceInLeft bounceInRight bounceInUp bounceOut bounceOutDown bounceOutLeft bounceOutRight bounceOutUp fadeIn fadeInDown fadeInDownBig fadeInLeft fadeInLeftBig fadeInRight fadeInRightBig fadeInUp fadeInUpBig fadeOut fadeOutDown fadeOutDownBig fadeOutLeft fadeOutLeftBig fadeOutRight fadeOutRightBig fadeOutUp fadeOutUpBig flipInX flipInY flipOutX flipOutY lightSpeedIn lightSpeedOut rotateIn rotateInDownLeft rotateInDownRight rotateInUpLeft rotateInUpRight rotateOut rotateOutDownLeft rotateOutDownRight rotateOutUpLeft rotateOutUpRight hinge jackInTheBox rollIn rollOut zoomIn zoomInDown zoomInLeft zoomInRight zoomInUp zoomOut zoomOutDown zoomOutLeft zoomOutRight zoomOutUp slideInDown slideInLeft slideInRight slideInUp slideOutDown slideOutLeft slideOutRight slideOutUp heartBeat";
let result = {
	description: "animates.css 类名集合",
	types: []
};
(function() {
	//主要的类别
  let type = ["bounce", "fade", "flip", "lightSpeed", "rotate", "roll", "zoom", "slide"];
	let as = animatesStr.split(" ");
	let temp = {};
	as.forEach(function(elem, index) {
		let t = '';
		for(let i = 0; i < type.length; i++) {
			if(elem.indexOf(type[i]) != -1) { //有对应的类型
				t = type[i];
			}
		}
		t = t == '' ? "special" : t;
		if(!temp[t]) temp[t] = [];
		temp[t].push(elem);
	});
	let count = 0;
	for(let key in temp) {
		let type = {
			name: key,
			description: "",
			classes: []
		}
		temp[key].forEach(function(elem, index) {
			type.classes.push({
				name: elem,
				description: ""
			});
		});
		result.types.push(type)
	}
})();