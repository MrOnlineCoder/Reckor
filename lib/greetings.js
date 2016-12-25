var autoVoice = false;
var greetJoined = false;
var greeting = "Hello!";
var channel = "#reckor";

function setup(cfg) {
	autoVote = cfg.greetings.autoVoiceJoined;
	greetJoined = cfg.greetings.greetJoined;
	greeting = cfg.greetings.greeting;
	channel = cfg.channel;
}

function handle(bot, who) {
	if (autoVoice) {
		bot.send("MODE", channel, "+v", who);
	}

	if (greetJoined) {
		bot.say(channel, greeting.replace("%name%", who));
	}
}

module.exports.setup = setup;
module.exports.handle = handle;