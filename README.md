# tatsu.js

tatsu.js is a Javascript library for Tatsumaki's API.

# Installing

You will need NodeJS 8+ to use tatsu.js
```
npm install tatsu.js --save
```
# API Key
You can get an API key for Tatsumaki by using `t!apikey` in any Discord server with Tatsumaki in it.

# Documentation
The full documentation can be found [over here](https://docs.theevilsocks.com/tatsu.js/ "Tatsu.js Documentation").


# Example

```javascript
const Tatsu = require("tatsu.js");

var tatsu = new Tatsu("API_KEY");

tatsu.getUser("132842210231189504").then(user => {
    console.log("User:   " + user.name);
    console.log("Level:  " + user.level);
    console.log(`XP:     ${user.total_xp} (${user.next_level_xp - user.level_xp} until next level)`);
}, err => {
	console.error(err);
});

/*
	User:   TheEvilSocks
	Level:  58
	XP:     237046 (4690 until next level)
 */

```

# Current API State
Please note that due to the current state of the API there might be endpoints that do not work properly.  
Sadly this is a server side issue, not fixable by this library.


# License
Read the [LICENSE](https://github.com/TheEvilSocks/tatsu.js/blob/master/LICENSE) file
