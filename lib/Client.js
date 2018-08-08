'use strict';


const Dripper = require('./Dripper.js');
const Constants = require('./Constants.js');

const User = require('./structures/User.js');
const GuildUser = require('./structures/GuildUser.js');


const https = require('https');

 class Client {
 	/**
 	 * Create a new API client
 	 * @arg {string} apiKey Your Tatsumaki API key.
 	 * @arg {Object} [dripperSettings] Optional settings for the Dripper.
 	 */

 	 constructor(apiKey, dripperSettings) {
 	 	dripperSettings = Object.assign({dripLimit: 1, dripInterval: 200, networkLatency: 300}, dripperSettings || {});


 	 	this.apiKey = apiKey;

 	 	this.dripper = new Dripper(dripperSettings.dripLimit, dripperSettings.dripInterval, dripperSettings.networkLatency);

 	 	this._options = {
 	 		hostname: Constants.API.HOST,
			port: 443,
			headers: {
				'User-Agent': `tatsu.js/tatsu.js v${Constants.version} - Tatsumaki API library by TheEvilSocks#0023`,
				'Authorization': this.apiKey
			}
		};

		this.Constants = Constants;
		this.User = User;
		this.GuildUser = GuildUser;


 	}




 	getUser(userID) {
 		return this.doReq(() => {
 			return new Promise((fulfill, reject) => {
	 			this.doApi(Constants.API.USER, {userID: userID}).then(user => {

	 				user.id = userID;
	 				fulfill(new User(user, this));

	 			}, reject);

	 		});
 		});

 	}

 	getGuildUser(guildID, userID) {
 		return this.doReq(() => {
 			return new Promise((fulfill, reject) => {
	 			this.doApi(Constants.API.MEMBER_STATS, {guildID: guildID, userID: userID}).then(user => {
	 				fulfill(new GuildUser(user, this));

	 			}, reject);

	 		});
 		});
 	}

 	getLeaderboard(guildID, limit) {
 		return this.doReq(() => {
 			return new Promise((fulfill, reject) => {
	 			this.doApi(Constants.API.GUILD_LEADERBOARD, {guildID: guildID, limit: limit || 10}).then(leaderboard => {

	 				fulfill(leaderboard.filter(l=>l !== null)); // Filter out any null variables.

	 			}, reject);

	 		});
 		});

 	}



	setScore(guildID, userID, amount) {
		console.trace("This endpoint is broken in the current version of the API.");
 		return this.doReq(() => {
 			return new Promise((fulfill, reject) => {
	 			this.doApi(this.Constants.API.ADJUST_SCORE, {guildID: guildID, userID: userID}, {amount: amount, action: "set"}).then(fulfill, reject);
	 		});
 		});
	}

	addScore(guildID, userID, amount) {
		console.trace("This endpoint is broken in the current version of the API.");
 		return this.doReq(() => {
 			return new Promise((fulfill, reject) => {
	 			this.doApi(this.Constants.API.ADJUST_SCORE, {guildID: guildID, userID: userID}, {amount: amount, action: "add"}).then(fulfill, reject);
	 		});
 		});
	}

	removeScore(guildID, userID, amount) {
		console.trace("This endpoint is broken in the current version of the API.");
 		return this.doReq(() => {
 			return new Promise((fulfill, reject) => {
	 			this.doApi(this.Constants.API.ADJUST_SCORE, {guildID: guildID, userID: userID}, {amount: amount, action: "remove"}).then(fulfill, reject);
	 		});
 		});
	}




	setPoints(guildID, userID, amount) {
		console.trace("This endpoint is broken in the current version of the API.");
 		return this.doReq(() => {
 			return new Promise((fulfill, reject) => {
	 			this.doApi(this.Constants.API.ADJUST_POINTS, {guildID: guildID, userID: userID}, {amount: amount, action: "set"}).then(fulfill, reject);
	 		});
 		});
	}

	addPoints(guildID, userID, amount) {
		console.trace("This endpoint is broken in the current version of the API.");
 		return this.doReq(() => {
 			return new Promise((fulfill, reject) => {
	 			this.doApi(this.Constants.API.ADJUST_POINTS, {guildID: guildID, userID: userID}, {amount: amount, action: "add"}).then(fulfill, reject);
	 		});
 		});
	}

	removePoints(guildID, userID, amount) {
		console.trace("This endpoint is broken in the current version of the API.");
 		return this.doReq(() => {
 			return new Promise((fulfill, reject) => {
	 			this.doApi(this.Constants.API.ADJUST_POINTS, {guildID: guildID, userID: userID}, {amount: amount, action: "remove"}).then(fulfill, reject);
	 		});
 		});
	}















 	doReq(promise) {
		return new Promise((fulfill, reject) => {
			this.dripper.queue(() => {
				promise().then(fulfill, reject);
			});
		});
	}



 	doApi(apiType, params, body) {

 		return new Promise((fulfill, reject) => {
 			// Verify integrity of object


 			
 			if(apiType.verify){


				var verify = (obj, verification) => {
					if(Object.keys(obj).length !== Object.keys(verification).length){
		 				reject({message: `Expected precisely ${Object.keys(verification).length} parameters.`});
 						return;
 					}

 					for(let _param = 0; _param < Object.keys(verification).length; _param++){
 						let param = verification[Object.keys(verification)[_param]];
 						let param_name = Object.keys(verification)[_param];

 						if(obj[param_name]){

 							if((typeof obj[param_name]).toLowerCase() !== param.type.toLowerCase()){
	 							reject({message: `Expected '${param.type}', got '${typeof obj[param_name]}' for parameter ${param_name}`});
	 							return;
 							}

							if(param.match){
								if(!obj[param_name].match(param.match)){
		 							reject({message: `${param_name} doesn't match the expected format`});
		 							return;
								}
							}

							if(param.min){
								if(obj[param_name] < param.min){
		 							reject({message: `Minimum amount for ${param_name} is ${param.min}`});
		 							return;
 								}
							}

							if(param.max){
								if(obj[param_name] > param.max){
		 							reject({message: `Maximum amount for ${param_name} is ${param.max}`});
		 							return;
 								}
							}

 						}else{
 							reject({message: "Missing parameter: " + param_name});
 							return;
 						}
 					}
				}

 				if(apiType.verify.url){
 					verify(params, apiType.verify.url);
 				}

 				if(apiType.verify.body){
 					verify(body, apiType.verify.body);
 				}

 			}


 			this.makeRequest(apiType.method, format(apiType.path, params), body || null).then(fulfill, reject);
 		});


 	}
 	
	makeRequest(method, path, body){
		return new Promise((fulfill, reject) => {

			let data = '';
			let req = https.request(Object.assign({path: path, method: method}, this._options), (res) => {

				res.on('data', function (chunk) {
					data += chunk;
				});

				res.on('end', function() {
					if(res.statusCode == 200){
						fulfill(JSON.parse(data));
					}else{
						reject(Object.assign({statusCode: res.statusCode}, JSON.parse(data)));
					}
				});

				res.on('error', (e) => {
					reject(e);
				});
			});

			if(typeof body == "object"){
				req.end(JSON.stringify(body));
			}else{
				req.end();
			}
			

		});
	}
}

module.exports = Client;

function format(string, formatObject) {
	if(typeof formatObject === "object" && !(formatObject instanceof Array)){
		for(let i = 0; i < Object.keys(formatObject).length; i++){
			string = string.replace(
				new RegExp("(([^\\\\])?{" + Object.keys(formatObject)[i] + "})"), function(match, p1, p2){
					return (p2 || "") + formatObject[Object.keys(formatObject)[i]]
				}
			);
		}
		return string;
	}

	if(typeof formatObject === "object" && formatObject instanceof Array){
		for(let i = 0; i < formatObject.length; i++)
			string = string.replace("%s", formatObject[i]);
		return string;
	}

	if(typeof arguments === "object"){
		for(let i = 0; i < Object.keys(arguments).length; i++)
			string = string.replace("%s",	arguments[i.toString()]);
		return string;
	}

	throw "Expected object, string or array, got " + typeof formatObject;

}