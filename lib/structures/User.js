'use strict';

/**
 * The user class. 
 * @prop {String} user_id The user ID of the user.
 * @prop {String} name The username of the user.
 * @prop {String} background The name of the set profile background
 * @prop {String} background_url The image url of the profile background
 * @prop {String} title The title of the user
 * @prop {String} info_box The information box text.
 * @prop {Array} badgeSlots An array of the equipped badges. If nothing is equipped in a slot it is null.
 * @prop {Number} rank The global rank of the user.
 * @prop {Number} level The level of the user.
 * @prop {Number} total_xp The total amount of experience the user has accumulated.
 * @prop {Number} level_xp The amount of experience the user has accumulated for their current level.
 * @prop {Number} next_level_xp The amount of XP at which the user will reach the next level.
 * @prop {Number} credits The total amount of credits the user currently has.
 * @prop {Number} reputation The amount of reputation the user has received from other users.
 */
class User {

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
		return this._user.id;
	}


	get name() {
		return this._user.name;
	}

	get background() {
		return this._user.background || "default_prof_bg";
	}

	get background_url() {
		return `https://tatsumaki.xyz/images/backgrounds/profile/${this.background}.png`;
	}


	get title() {
		return this._user.title || "";
	}

	get info_box() {
		return this._user.info_box || "";
	}



	get badgeSlots() {
		return this._user.badgeSlots;
	}



	get rank() {
		return this._user.rank || 0;
	}

	get level() {
		return this._user.level || 0;
	}

	get total_xp() {
		return this._user.total_xp || 0;
	}

	get level_xp() {
		return this._user.xp[0] || 0;
	}

	get next_level_xp() {
		return this._user.xp[1] || 0;
	}

	get credits() {
		return this._user.credits || 0;
	}

	get reputation() {
		return this._user.reputation || 0;
	}

	/**
	 * Get the guild stats of the user.
	 * @arg {String} guild_id The ID of the guild for which to get the user stats.
	 * @return {Promise<GuildUser>}
	 */
	getGuildStats(guild_id) {
 		return this._client.getGuildUser(guild_id, this.user_id);
	}


	inspect(){
		return this.toString();
	}

	toJSON(){
		let ret = {};

		for(let prop of ["user_id", "name", "background", "background_url", "title", "info_box", "badgeSlots", "rank", "level", "total_xp", "level_xp", "next_level_up", "credits", "reputation"]){
			ret[prop] = this[prop];
		}
		return ret;
	}

	toString(){
		return JSON.stringify(this.toJSON());
	}
}

module.exports = User;