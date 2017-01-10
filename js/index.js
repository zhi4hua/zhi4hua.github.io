window.onload = init;
window.onresize = autoDivHeight;

// 定义最小浏览器宽度
var MIN_WIDTH = 1000;

function init() {
	// 设置MIN_WIDTH的值
	var linkDivs = document.getElementsByTagName('link');
	var linkDiv = '';

	for (var i = 0; i < linkDivs.length; ++i) {
		if (linkDivs[i].media != '') {
			linkDiv = linkDivs[i];
		}
	}
	var txt = linkDiv.media;
	var reg = new RegExp("\d");
	txt = txt.match(reg);
	// alert('txt = ' + txt);

	// 设置菜单，添加动画效果
	var liDivs = document.getElementsByTagName('li');
	for (var i = 0; i < liDivs.length; ++i) {
		var lengths = liDivs[i].getElementsByTagName('ul').length;
		if (lengths > 0) {
			var ulLiUl = liDivs[i].getElementsByTagName('ul')[0];
			ulLiUl.parentNode.onmouseover = function() {
				ulLiUl.style = 'height:' + ulLiUl.getElementsByTagName('li').length * 100 + '%';
			}
			ulLiUl.parentNode.onmouseout = function() {
				ulLiUl.style.height = 0;
			}
		}
	}

	autoDivHeight();

	// 内容区, id = content
	var contentDiv = document.getElementById('content');
	if (document.body.offsetWidth > MIN_WIDTH) {
		setContentDiv(contentDiv);
	} else {
		smallSetContentDiv(contentDiv);
		autoMenu();
	}

	// 展览器
	autoDivViewHashtag();

}

function autoDivViewHashtag() {
	var viewHashtag = document.getElementById('view_hashtag');
	var imgCellDivs = getDivsIsName('imgCell', viewHashtag);
	for (var i = 0; i < imgCellDivs.length; ++i) {
		imgCellDivs[i].style = 'height:' + imgCellDivs[0].offsetWidth + 'px; ';
	}
	// viewHashtag.style.height = imgCellDivs[0]

	var h1Label = viewHashtag.getElementsByTagName('h1')[0];
	// || h1Label.offsetHeight >= viewHashtag.offsetHeight

	/*　这，上次制作到　*/
	// if (h1Label.offsetWidth < viewHashtag.offsetWidth)
		// h1Label.style.display = 'none';
	h1Label.style.top = viewHashtag.offsetHeight / 2.0 - h1Label.offsetHeight + 'px';
}

function autoDivHeight() {
	// 设计高度，将标签div id = header 的height = width * 0.618
	var headerDiv = document.getElementById('header');
	var textDiv = document.getElementById('text');

	var contentDiv = document.getElementById('content');
	if (document.body.offsetWidth <= MIN_WIDTH) {
		headerDiv.style = 'height:' + headerDiv.offsetWidth * 0.618 + 'px';
		smallSetContentDiv(contentDiv);
		autoMenu();
		textDiv.style.display = 'none';
	}
	else {
		setContentDiv(contentDiv);
		unmenu();
		testDiv.className = null;
		textDiv.style.display = 'block';
	}

	autoDivViewHashtag();
}

// 响应式菜单,手机使用
function autoMenu() {
	var menuButton = document.getElementById('menu_button').getElementsByTagName('i')[0];
	var menuDiv = document.getElementById('menu');
	var menuDivUls = menuDiv.getElementsByTagName('ul');
	var logoDiv = document.getElementById('logo');

	menuDivUls[1].style.display = 'none';
	// alert('menu width = ' + menuDivUls[1].offsetWidth);
	menuButton.onclick = function() {
		if (this.className == 'icon-align-justify') {
			this.className = 'icon-remove';			
			menuDivUls[1].style.display = 'block';
		}
		else {
			this.className = 'icon-align-justify';
			menuDivUls[1].style.display = 'none';
		}
	}
}

// 取消响应式菜单
function unmenu() {
	document.getElementById('menu').getElementsByTagName('ul')[1].style.display = 'block';
}

// 设置div id = rack1 的height
function setContentDiv(contentDiv) {
	var rack1Div = document.getElementById('rack1');
	var rack2Div = document.getElementById('rack2');

	rack1Div.style.height = rack1Div.getElementsByTagName('img')[0].offsetHeight + 'px';
	// rack1Div.style.outline = '1px red dashed';
	// rack2Div.style.height = rack2Div.getElementsByTagName('img')[0].offsetHeight + 'px';
	var cellDivs = getDivsIsName('cell', 'rack2');
	var rack2DivOffsetWidth = document.getElementById('rack2').offsetWidth;
	var cellDivsOffsetWidth = cellDivs[0].offsetWidth;
	var marginLeftValue = (rack2DivOffsetWidth - cellDivsOffsetWidth * cellDivs.length)  / (cellDivs.length - 1);
	for (var i = 0; i < cellDivs.length; ++i) {
		if (i == cellDivs.length - 1)
			return;
		var marginLeftValue2 = i * marginLeftValue + 'px';
		cellDivs[i].style.marginLeft = marginLeftValue2;
	}
}

function smallSetContentDiv(contentDiv) {
	var rack1Div = document.getElementById('rack1');
	var rack2Div = document.getElementById('rack2');
	var links = rack1Div.getElementsByTagName('a');
	var countImageHeights = 0;

	for (var i = 0; i < links.length; ++ i) {
		countImageHeights += links[i].getElementsByTagName('img')[0].offsetHeight;
	}
	rack1Div.style.height = countImageHeights + 'px';
	rack2Div.style.height = null;
	var cellDivs = getDivsIsName('cell', 'rack2');
	for (var i = 0; i < cellDivs.length; ++i) {
		cellDivs[i].style.marginLeft = null;
	}
}

// 获取DIV 的集合，要求以指定 className　名称
function getDivsIsName(className, parentDivName = 'document') {
	if (arguments.length > 1 && typeof parentDivName != 'object')
		parentDivName = document.getElementById(parentDivName);
	var divs = parentDivName.getElementsByTagName('div');
	var returnDivs = new Array() ;
	for (var i = total = 0; i < divs.length; ++i) {
		if (divs[i].className.indexOf(className) != -1) {
			returnDivs.push(divs[i]);
		}
	}
	return returnDivs;
}