var phrases = [];

var utils = require("../lib/utils.js");

var plugin = {
	name: "Porn",
	load: function() {
		this.commands = {porn: this.cmdHandler};
		phrases = this.config.porn.phrases;
		console.log("Phrases list: "+phrases.join("\n"));
	},
	userJoin: function(who) {
		//No OP
	},
	cmdHandler: function(from, args) {
		console.log("Cmd called!");
		if (args.length == 0) {
			this.bot.say(this.channel, "Porn Command Help");
			this.bot.say(this.channel, "porn say - says random phrase");
			this.bot.say(this.channel,"porn list - list of phrases");
			this.bot.say(this.channel,"porn secret - tells you a secret");
			return;
		}
		var cmd = args[0].toLowerCase();
		if (cmd == "say") {
			this.bot.say(this.channel, utils.randomElement(phrases));
			return;
		} 

		if (cmd == "list") {
			this.bot.say(this.channel, phrases.join("\n"));
			return;
		}

		if (cmd == "secret") {
			this.bot.say(this.channel, from+", you are gay");
			return;
		}

	},
	message: function (from, msg) {

	},
	userLeft: function (who) {
		//No OP
	}
};

module.exports = plugin;