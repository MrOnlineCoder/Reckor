var kickReason;
var bannedWords;

var plugin = {
	name: "ChatGuard",
	load: function() {
		kickReason = this.config.chatGuard.kickReason;
		bannedWords = this.config.chatGuard.bannedWords;
	},
	userJoin: function(who) {
		//No OP
	},
	message: function (from, msg) {
		for (var i=0;i<bannedWords.length;i++) {
			if (msg.indexOf(bannedWords[i]) !== -1) {
				this.bot.send("KICK", this.channel, from, kickReason);
				return;
			}
		}
	},
	userLeft: function (who) {
		//No OP
	}
};

module.exports = plugin;