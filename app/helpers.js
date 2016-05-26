'use strict';
module.exports = {
	strip: function(html) {
		var tmp = document.implementation.createHTMLDocument("New").body;
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || "";
	},
	trim_words: function(text, length, more ){
		length = typeof length !== 'undefined' ? length : 25;
		more = typeof more !== 'undefined' ? more : '..';
		var _text = text.split( ' ' );
		var _trimmed = _text.slice( 0, length );
		var trimmed = _trimmed.join( ' ' );
		trimmed = trimmed.concat( more );
		return trimmed;
	},
	fb_avatar: function(id, width, height) {
		return 'http://graph.facebook.com/v2.5/' + id + '/picture?height='+height+'&width='+width;
	},
	img_url: function(imgId) {
		if( imgId == null ) {
			return '/images/df-img-sm.jpg';
		}
		return '/file/' + imgId;
	},
	nl2br: function(text) {
		return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
	},
	facebookLogin: function() {
		var url = '/auth/facebook',
			width = 540,
			height = 600,
			top = (window.outerHeight - height) / 2,
			left = (window.outerWidth - width) / 2;
		window.open(url, 'facebook_login', 'width=' + width + ',height=' + height + ',scrollbars=0,top=' + top + ',left=' + left);
	},
	masterMasonry: function() {
		$('.grid').masonry({
			columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer',
			itemSelector: '.grid-item',
			fitWidth: true
		});
	}
}
