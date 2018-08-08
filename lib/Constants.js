
module.exports = {
	version: require("../package.json").version,
	API : {
		HOST: "api.tatsumaki.xyz",


		USER: {
			path:   "/users/{userID}",
			method: "GET",
			verify: {
				url: {
					userID: {
						type:  "String",
						match: new RegExp("^([0-9]{17,18})$")
					}
				}
			}
		},
	
		GUILD_LEADERBOARD: {
			path:   "/guilds/{guildID}/leaderboard?limit={limit}",
			method: "GET",
			verify: {
				url: {
					guildID: {
						type:  "String",
						match: new RegExp("^([0-9]{17,18})$")
					},
					limit: {
						type:  "Number",
						min: -1
					}
				}
			}
		},

		ADJUST_POINTS: {
			path:   "/guilds/{guildID}/members/{userID}/points",
			method: "PUT",
			verify: {

				url: {
					guildID: {
						type:  "String",
						match: new RegExp("^([0-9]{17,18})$")
					},

					userID: {
						type:  "String",
						match: new RegExp("^([0-9]{17,18})$")
					}

				},

				body: {
					amount: {
						type: "Number",
						min: 0,
						max: 50000
					},

					action: {
						type: "String",
						match: new RegExp("^(set|add|remove)$")
					}
				}
			}
		},


		ADJUST_SCORE: {
			path:   "/guilds/{guildID}/members/{userID}/score",
			method: "PUT",
			verify: {

				url: {
					guildID: {
						type:  "String",
						match: new RegExp("^([0-9]{17,18})$")
					},

					userID: {
						type:  "String",
						match: new RegExp("^([0-9]{17,18})$")
					}

				},

				body: {
					amount: {
						type: "Number",
						min: 0,
						max: 50000
					},

					action: {
						type: "String",
						match: new RegExp("^(set|add|remove)$")
					}
				}
			}
		},


		MEMBER_STATS: {
			path:   "/guilds/{guildID}/members/{userID}/stats",
			method: "GET",
			verify: {

				url: {
					guildID: {
						type:  "String",
						match: new RegExp("^([0-9]{17,18})$")
					},

					userID: {
						type:  "String",
						match: new RegExp("^([0-9]{17,18})$")
					}

				}
			}
		}


	}

};