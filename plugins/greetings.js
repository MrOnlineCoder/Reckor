var autoVoice = false;
var greetJoined = false;
var greeting = "Hello!";

var plugin = {
	name: "Greetings",
	load: function() {
		autoVote = this.config.greetings.autoVoiceJoined;
		greetJoined = this.config.greetings.greetJoined;
		greeting = this.config.greetings.greeting;
	},
	userJoin: function(who) {
		if (autoVoice) {
			this.bot.send("MODE", this.channel, "+v", who);
		}

		if (greetJoined) {
			this.bot.say(this.channel, greeting.replace("%name%", who));
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