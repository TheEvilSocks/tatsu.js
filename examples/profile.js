const Tatsu = require("../");

var tatsu = new Tatsu("API_KEY");

tatsu.getUser("132842210231189504").then(user => {
    console.log("User:   " + user.name);
    console.log("Level:  " + user.level);
    console.log(`XP:     ${user.total_xp} (${user.next_level_xp - user.level_xp} until next level)`);
}, err => {
	console.error(err);
});

/* 
	Output: 

		User:   TheEvilSocks
		Level:  58
		XP:     237046 (4690 until next level)

 */