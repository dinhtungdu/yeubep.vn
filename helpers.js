module.exports = {
	isLoggedIn: function(req, res, next) {
		console.log('Calling: isLoggedIn...');
		if (req.isAuthenticated()) {
			return next();
		} else {
			return res.send(401);
		}
	}
}
