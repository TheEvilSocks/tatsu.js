'use strict';

/**
 * The rank user class.
 * @prop {String} user_id The user ID of the user.
 * @prop {String} guild_id The guild ID of the guild.
 * @prop {Number} score The current guild score of the user.
 * @prop {Number} rank The current guild rank of the user.
 *
 */
class RankUser {

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

	get rank() {
		return this._user.rank || 0;
	}

	/**
	 * Set the guild score of the user.
	 * @arg {Number} amount The amount of score.
	 * @returns {Promise<Object>} Returns with the new score amount.
	 */
	setScore(amount) {
 		return this._client.setScore(this.guild_id, this.user_id, amount);
	}

	/**
	 * Add score to the current amount of score the user has.
	 * @arg {Number} amount The amount of score.
	 * @returns {Promise<Object>} Returns with the new score amount.
	 */
	addScore(amount) {
 		return this._client.addScore(this.guild_id, this.user_id, amount);
	}


	/**
	 * Remove score from the current amount of score the user has.
	 * @arg {Number} amount The amount of score.
	 * @returns {Promise<Object>} Returns with the new score amount.
	 */
	removeScore(amount) {
 		return this._client.removeScore(this.guild_id, this.user_id, amount);
	}

	inspect(){
		return this.toString();
	}

	toJSON(){
		let ret = {};

		for(let prop of ["user_id", "guild_id", "score", "rank"]){
			ret[prop] = this[prop];
		}
		return ret;
	}

	toString(){
		return JSON.stringify(this.toJSON());
	}



}

module.exports = RankUser;