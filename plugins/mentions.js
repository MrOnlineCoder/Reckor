var matches = [];
var reactions = [];
var angryMsg;
var utils = require("../lib/utils.js");
var mentioned = {};
var angryMatches;

var plugin = {
	name: "Mentions",
	load: function() {
		matches = this.config.mentions.matches;
		reactions = this.config.mentions.reactions;
		angryMsg = this.config.mentions.angryMessage;
		angryMatches = ["shut up", "shut up!", "shut the fucking up!", "stfu", "fuck you"];
	},
	userJoin: function(who) {
		//No OP
	},
	message: function (from, msg) {
		if (utils.contains.call(matches, msg)) {
			mentioned[from] = true;
			this.bot.say(this.channel, utils.randomElement(reactions));
			return;
		}

		if (mentioned[from] != null) {
			mentioned[from] = null;
			if (utils.contains.call(angryMatches, msg.toLowerCase())) {
				this.bot.say(this.channel, angryMsg);
			}
		}
	},
	userLeft: function (who) {
		//No OP
	}
};

module.exports = plugin;