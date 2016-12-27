var autoVoice = false;
var greetJoined = false;
var greeting = "Hello!";
var channel = "#reckor";

var plugin = {
	name: "Greetings",
	load: function(botInstance, chan, cfg) {
		bot = botInstance;
		autoVote = cfg.greetings.autoVoiceJoined;
		greetJoined = cfg.greetings.greetJoined;
		greeting = cfg.greetings.greeting;
		channel = chan;
	},
	userJoin: function(who) {
		if (autoVoice) {
			bot.send("MODE", channel, "+v", who);
		}

		if (greetJoined) {
			bot.say(channel, greeting.replace("%name%", who));
		}
	},
	message: function (from, msg) {
		//No OP
	},
	userLeft: function (who) {
		//No OP
	}
};

module.exports = plugin;