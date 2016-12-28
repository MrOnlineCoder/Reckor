var bot;
var channel;
var players = {};
var punishments = [];
var guessMsg;
var errorMsg;
var failMsg;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var plugin = {
	name: "GuessNumber",
	load: function(botInstance, chan, cfg, regCmd) {
		bot = botInstance;
		channel = chan;
		punishments = cfg.guessNum.punishments;
		guessMsg = cfg.guessNum.guessMessage;
		errorMsg = cfg.guessNum.errorMessage;
		failMsg = cfg.guessNum.failMessage;
		regCmd("guessNum", this.cmdHandler);
	},
	userJoin: function(who) {
		//No OP
	},
	cmdHandler: function(from, args) {
		var punishment = punishments[getRandomInt(0, punishments.length-1)];
		bot.say(channel, "Okay, "+from+", I guessed random a random number in range 1-3 including. Try to guess it or you are "+punishment);
		players[from] = {punishment: punishment, number: getRandomInt(1,3)};
	},
	message: function (from, msg) {
		if (players[from] == null) return;
		var guess = parseInt(msg);
		if (isNaN(guess)) {
			bot.say(channel, from+", "+errorMsg);
			return;
		}

		if (guess == players[from].number) {
			bot.say(channel, from+", "+guessMsg);
			bot.say(channel, "Ok, I am "+players[from].punishment);
			players[from] = null;
			return;
		} else {
			bot.say(channel, from+", "+failMsg.replace("%punishment%", players[from].punishment).replace("%answer%", players[from].number));
			players[from] = null;
			return;
		}
	},
	userLeft: function (who) {
		//No OP
	}
};

module.exports = plugin;