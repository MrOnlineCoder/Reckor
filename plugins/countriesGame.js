var countries = require('country-list')();
var list = countries.getNames();
var utils = require("../lib/utils.js");
var used = {};

var plugin = {
	name: "CountriesGame",
	load: function() {
		this.commands = {
			country: this.cmdHandler
		};
	},
	userJoin: function(who) {
		//No OP
	},
	cmdHandler: function(from, args) {
		if (args == 0) {
			this.bot.say(this.channel, from+", you should say the country name: country <name>");
			return;
		}
		var word = args[0];
		var lastLetter = word.charAt(word.length - 1);
		if (word == "reset") {
			this.bot.say(this.channel, "Countries Game reset!");
			used = {};
			return;
		}

		if (countries.getCode(word) == null) {
			this.bot.say(this.channel, from+", there is no country with that name!");
			return;
		}

		var result = "all countries were used. Do \"country reset\" command";
		for (var i = 0; i < list.length; i++) {
		  if (utils.beginsWith(lastLetter, list[i].toLowerCase())) {
		  		if (used[list[i]] == null) {
		  			result = list[i];
		  			used[list[i]] = true;
					break;
		  		}
			}
		}
		this.bot.say(this.channel, from+", "+result);
	},
	message: function (from, msg) {
		
	},
	userLeft: function (who) {
		//No OP
	}
};

module.exports = plugin;