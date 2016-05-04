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
	}
}
