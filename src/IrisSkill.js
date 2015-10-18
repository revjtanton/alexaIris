/**
 * This is the meat of what connects to IrisConnect
 */
 
/**
 * Set your username and password
 */
var USERNAME = '';
var PASSWORD = '';

var https = require('https');
var querystring = require('querystring');

function IrisConnect() {
	
};

// Setting HOME mode.
IrisConnect.prototype.HomeMode = function(response) {
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
					  'cookie': 'ApiSession=' + de.ApiSession
				  }
				};
				
				var req = https.request(options, function(res) {
					res.setEncoding('utf8');
					console.log(res.statusCode);
					res.on('data', function(d) {
						//response.tell("Success.","Success.");
						console.log(response);
					});
				});
				req.write(post_data);
				req.end();
			});
		});
		req.write(post_data);
		req.end();

		req.on('error', function(e) {
		  console.error(e);
		});
};

module.exports = IrisConnect;