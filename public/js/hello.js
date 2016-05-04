// Remove the ugly Facebook appended hash
// <https://github.com/jaredhanson/passport-facebook/issues/12>
if (window.location.hash && window.location.hash === "#_=_") {
	// If you are not using Modernizr, then the alternative is:
	if (window.history && history.replaceState) {
	//if (Modernizr.history) {
		window.history.replaceState("", document.title, window.location.pathname);
	} else {
		// Prevent scrolling by storing the page's current scroll offset
		var scroll = {
			top: document.body.scrollTop,
			left: document.body.scrollLeft
		};
		window.location.hash = "";
		// Restore the scroll offset, should be flicker free
		document.body.scrollTop = scroll.top;
		document.body.scrollLeft = scroll.left;
	}
}

function trim_words(text, length, more ) {
	length = typeof length !== 'undefined' ? length : 25;
	more = typeof more !== 'undefined' ? more : '..';
	var _text = text.split( ' ' );
	var _trimmed = _text.slice( 0, length );
	var trimmed = _trimmed.join( ' ' );
	trimmed = trimmed.concat( more );
	return trimmed;
}
