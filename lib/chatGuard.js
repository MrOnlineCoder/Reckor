var bannedWords = [];
var kickReason = "Stop swearing!";
var channel = "#reckor";


function setup(cfg) {
	bannedWords = cfg.chatGuard.bannedWords;
	kickReason = cfg.chatGuard.kickReason;
	channel = cfg.channel;
}

function handle(bot, who, msg) {
	for (var i=0;i<bannedWords.length;i++) {
		if (msg.indexOf(bannedWords[i]) !== -1) {
			bot.send("KICK", channel, who, kickReason);
			return;
		}
	}
}

module.exports.setup = setup;
module.exports.handle = handle;