'use strict';
module.exports = {
	isLoggedIn: function(req, res, next) {
		console.log('Calling: isLoggedIn...');
		if (req.isAuthenticated()) {
			return next();
		} else {
			return res.sendStatus(401);
		}
	},

	removeFromArray: function(arr, item) {
		var index = arr.indexOf(item);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	},

	ArrContains: function(needle) {
		// Per spec, the way to identify NaN is that it is not equal to itself
		var findNaN = needle !== needle;
		var indexOf;

		if(!findNaN && typeof Array.prototype.indexOf === 'function') {
			indexOf = Array.prototype.indexOf;
		} else {
			indexOf = function(needle) {
				var i = -1, index = -1;

				for(i = 0; i < this.length; i++) {
					var item = this[i];

					if((findNaN && item !== item) || item === needle) {
						index = i;
						break;
					}
				}

				return index;
			};
		}

		return indexOf.call(this, needle) > -1;
	},

	extractUsername: function(email) {
		var emailArr = email.split('@');
		return emailArr[0];
	}

}
