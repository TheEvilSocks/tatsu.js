'use strict';

/**
 * The guild user class. 
 *
 *
 *
 *
 *
 */
class GuildUser {

	/**
	 * Construct a user object.
	 * @param userObject Direct JSON from the API.
	 * @param client The Tatsu.js client, needed for access to the Dripper
	 */
	constructor(userObject, client) {
		this._user = userObject;
		this._client = client;
	}

	get user_id() {
		return this._user.user_id;
	}


	get guild_id() {
		return this._user.guild_id;
	}


	get score() {
		return this._user.score || 0;
	}

	get points() {
		return this._user.points || 0;
	}

	setScore(amount) {
 		return this._client.setScore(this.guild_id, this.user_id, amount);
	}

	addScore(amount) {
 		return this._client.addScore(this.guild_id, this.user_id, amount);
	}

	removeScore(amount) {
 		return this._client.removeScore(this.guild_id, this.user_id, amount);
	}


	setPoints(amount) {
 		return this._client.setPoints(this.guild_id, this.user_id, amount);
	}

	addPoints(amount) {
 		return this._client.addPoints(this.guild_id, this.user_id, amount);
	}

	removePoints(amount) {
 		return this._client.removePoints(this.guild_id, this.user_id, amount);
	}


	inspect(){
		return this.toString();
	}

	toJSON(){
		let ret = {};

		for(let prop of ["user_id", "guild_id", "score", "points"]){
			ret[prop] = this[prop];
		}
		return ret;
	}

	toString(){
		return JSON.stringify(this.toJSON());
	}



}

module.exports = GuildUser;