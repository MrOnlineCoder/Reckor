var kickReason;
var bannedWords;
var bot;
var channel;

var plugin = {
	name: "ChatGuard",
	load: function(botInstance, chan, cfg, regCmd) {
		bot = botInstance;
		kickReason = cfg.chatGuard.kickReason;
		bannedWords = cfg.chatGuard.bannedWords;
		channel = chan;
	},
	userJoin: function(who) {
		//No OP
	},
	message: function (from, msg) {
		for (var i=0;i<bannedWords.length;i++) {
			if (msg.indexOf(bannedWords[i]) !== -1) {
				bot.send("KICK", channel, from, kickReason);
				return;
			}
		}
	},
	userLeft: function (who) {
		//No OP
	}
};

module.exports = plugin;