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
	load: function() {
		punishments = this.config.guessNum.punishments;
		guessMsg = this.config.guessNum.guessMessage;
		errorMsg = this.config.guessNum.errorMessage;
		failMsg = this.config.guessNum.failMessage;
		this.commands = {
			guessNum: this.cmdHandler
		};
	},
	userJoin: function(who) {
		//No OP
	},
	cmdHandler: function(from, args) {
		var punishment = punishments[Math.floor(Math.random()*punishments.length)];
		this.bot.say(this.channel, "Okay, "+from+", I guessed a random number in range 1-3 including. Try to guess it or you are "+punishment);
		players[from] = {punishment: punishment, number: getRandomInt(1,3)};
	},
	message: function (from, msg) {
		if (players[from] == null) return;
		var guess = parseInt(msg);
		if (isNaN(guess)) {
			this.bot.say(chan, from+", "+errorMsg);
			return;
		}

		if (guess == players[from].number) {
			this.bot.say(this.channel, from+", "+guessMsg);
			this.bot.say(this.channel, "Ok, I am "+players[from].punishment);
			players[from] = null;
			return;
		} else {
			this.bot.say(this.channel, from+", "+failMsg.replace("%punishment%", players[from].punishment).replace("%answer%", players[from].number));
			players[from] = null;
			return;
		}
	},
	userLeft: function (who) {
		//No OP
	}
};

module.exports = plugin;