20160621144449

function IndexPage(){
	this._init();
}

IndexPage.prototype = {
	_init : function(){
		var key = 'abc';
		var data = {'sss' : 'sssValue'};
		data[key] = 'abcValue';
		console.info(data)
		this._bindEvent();
	},
	_bindEvent : function(){
		var self = this;
		$("#alink").click(function(){
			self._handleClick();
		});
	},
	_handleClick : function(){
		alert('_handleClick');
		this.getData();
	},
	getData  : function(){

	}
}

$(function(){
	var indexPage = new IndexPage();
});