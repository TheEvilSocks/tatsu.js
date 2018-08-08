'use strict';

/**
 * The user class. 
 *
 *
 *
 *
 *
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