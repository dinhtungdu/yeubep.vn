require('babel-register');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var async = require('async');
var colors = require('colors');
var mongoose = require('mongoose');
var passport = require('passport');
var request = require('request');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var session = require('express-session');
var swig  = require('swig');
var xml2js = require('xml2js');
var _ = require('underscore');

// Configuration
var configDB = require('./config/db');
var reactRoutes = require('./app/routes');

var app = express();

mongoose.connect(configDB.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

require('./config/passport')(passport);
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'tungdeptraisieucapvodich',
	resave: true,
	saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// API Routes
require('./api/auth')(app, passport);
require('./api/recipe')(app, passport);
require('./api/file')(app, passport);
require('./api/love')(app, passport);
require('./api/category')(app);

// React Routes
app.use(function(req, res) {
	Router.match({ routes: reactRoutes.default, location: req.url }, function(err, redirectLocation, renderProps) {
		if (err) {
			res.status(500).send(err.message)
		} else if (redirectLocation) {
			res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
			var page = swig.renderFile('views/index.html', { html: html });
			res.status(200).send(page);
		} else {
			res.status(404).send('Page Not Found')
		}
	});
});

//app.use(function(err, req, res, next) {
//	//console.log(err.stack);
//	res.sendStatus(err.status || 500);
//	res.send({ message: err.message });
//});

// Socket.io stuffs
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
	onlineUsers++;

	io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

	socket.on('disconnect', function() {
		onlineUsers--;
		io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
	});
});

// Start Sever
server.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});