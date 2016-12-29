/*

	This is testing plugin for #V on irc.esper.net
	xD

*/

var rajaSaid = false;
var utils = require("../lib/utils.js");
var helping = false;

var votes = 0;

var plugin = {
	name: "ScamPolice",
	load: function() {

	},
	userJoin: function(who) {
	},
	message: function (from, msg) {
		if (msg == "Scam police, help!") {
			helping = true;
			this.bot.say(this.channel, "Hello, guys, I am from Scam Police, we had a report that Raja is scamming. Any suggestions? Please, tag them with scam: on the beginning");
		}

		if (!helping) return;


		if (from == "Raja" && !rajaSaid) {
			this.bot.say(this.channel, "Raja, please, stfu or you will have 1 MHz CPU");
			rajaSaid = true;
			return;
		}

		if (utils.beginsWith("scam:", msg)) {
			votes++;
			this.bot.say(this.channel, from+", thanks for your reply! We registered that!");
			if (votes == 3) {
				this.bot.say(this.channel, "--------------------------------------------------------------------");
				this.bot.say(this.channel, "We have enough proofs that Raja is scammer, it is very heavy crime.");
				this.bot.say(this.channel, "Sentence: death");
				this.bot.say(this.channel, "--------------------------------------------------------------------");
				setTimeout(function(){this.bot.say(this.channel, "Raja: die");}, 3000);
				this.bot.say(this.channel, "Ok, bye kids!");
			}
		}
	},
	userLeft: function (who) {
		//No OP
	}
};

module.exports = plugin;