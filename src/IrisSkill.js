/**
 * Here we're setting some values for use later.  These are your Iris credentials and some stuff we're pulling in from Node
 */
var USERNAME = '';
var PASSWORD = '';

var https = require('https');
var querystring = require('querystring');

/**
 * Declaring our IrisConnect
 */
function IrisConnect() {
	
};

//This is the login portion.  This will return the ApiSession value for use with other requests.  
IrisConnect.prototype.Login = function(callback) {
		var post_data = querystring.stringify({
			username: USERNAME,
			password: PASSWORD,
		});

		var options = {
		  host: 'www.irissmarthome.com',
		  port: 443,
		  path: '/v5/login',
		  method: 'POST',
		  headers: {
			  'Content-Type': 'application/x-www-form-urlencoded',
			  'Content-Length': Buffer.byteLength(post_data)
		  }
		};

		var req = https.request(options, function(res) {
			res.setEncoding('utf8');
			console.log(res.statusCode);
			res.on('data', function(d) {
				de = JSON.parse(d);
				callback(de.ApiSession);
			});
		});
		req.write(post_data);
		req.end();

		req.on('error', function(e) {
		  console.error(e);
		});
};

// This will set the HOME mode.  Change HOME to AWAY or NIGHT to set those.  
IrisConnect.prototype.SetHome = function(callback) {
	var a = IrisConnect.prototype.Login(function(result) {
		ApiSession = result;
		
		var post_data = querystring.stringify({
			profile: 'HOME'
		});
			
		var options = {
		  host: 'www.irissmarthome.com',
		  port: 443,
		  path: '/v5/users/' + USERNAME + '/hubs/only/profile',
		  method: 'PUT',
		  headers: {
			  'Content-Type': 'application/x-www-form-urlencoded',
			  'Content-Length': Buffer.byteLength(post_data),
			  'cookie': 'ApiSession=' + ApiSession
		  }
		};

		var req = https.request(options, function(res) {
			res.setEncoding('utf8');
			console.log(res.statusCode);
			res.on('data', function(d) {
				de = JSON.parse(d);
				callback(de);
			});
		});
		req.write(post_data);
		req.end();

		req.on('error', function(e) {
		  console.error(e);
		});
	});
};

// Exporting IrisConnect for use by index.js
module.exports = IrisConnect;