module.exports = {
	strip: function(html) {
		var tmp = document.implementation.createHTMLDocument("New").body;
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || "";
	}
}
