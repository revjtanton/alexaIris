
var USERNAME = '';
var PASSWORD = '';

var https = require('https');
var querystring = require('querystring');

function IrisConnect() {
	
};

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

module.exports = IrisConnect;