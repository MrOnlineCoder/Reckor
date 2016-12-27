/*

	This is testing plugin for #V on irc.esper.net
	xD

*/

var bot;
var channel;
var rajaSaid = false;
var utils = require("../lib/utils.js");
var helping = false;

var votes = 0;

var plugin = {
	name: "ScamPolice",
	load: function(botInstance, chan, cfg, regCmd) {
		bot = botInstance;
		channel = chan;
	},
	userJoin: function(who) {
	},
	message: function (from, msg) {
		if (msg == "Scam police, help!") {
			helping = true;
			bot.say(channel, "Hello, guys, I am from Scam Police, we had a report that Raja is scamming. Any suggestions? Please, tag them with scam: on the beginning");
		}

		if (!helping) return;


		if (from == "Raja" && !rajaSaid) {
			bot.say(channel, "Raja, please, stfu or you will have 1 MHz CPU");
			rajaSaid = true;
			return;
		}

		if (utils.beginsWith("scam:", msg)) {
			votes++;
			bot.say(channel, from+", thanks for your reply! We registered that!");
			if (votes == 3) {
				bot.say(channel, "--------------------------------------------------------------------");
				bot.say(channel, "We have enough proofs that Raja is scammer, it is very heavy crime.");
				bot.say(channel, "Sentence: death");
				bot.say(channel, "--------------------------------------------------------------------");
				setTimeout(function(){bot.say(channel, "Raja: die");}, 3000);
				bot.say(channel, "Ok, bye kids!");
			}
		}
	},
	userLeft: function (who) {
		//No OP
	}
};

module.exports = plugin;