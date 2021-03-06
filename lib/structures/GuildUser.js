'use strict';

/**
 * The guild user class. 
 * @prop {String} user_id The user ID of the user.
 * @prop {String} guild_id The guild ID of the guild.
 * @prop {Number} score The current guild score of the user.
 * @prop {Number} points The current guild points of the user.
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


	/**
	 * Set the guild points of the user.
	 * @arg {Number} amount The amount of points.
	 * @returns {Promise<Object>} Returns with the new points amount.
	 */

	setPoints(amount) {
 		return this._client.setPoints(this.guild_id, this.user_id, amount);
	}

	/**
	 * Add points to the current amount of points the user has.
	 * @arg {Number} amount The amount of points.
	 * @returns {Promise<Object>} Returns with the new points amount.
	 */
	addPoints(amount) {
 		return this._client.addPoints(this.guild_id, this.user_id, amount);
	}

	/**
	 * Remove points from the current amount of points the user has.
	 * @arg {Number} amount The amount of points.
	 * @returns {Promise<Object>} Returns with the new points amount.
	 */
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