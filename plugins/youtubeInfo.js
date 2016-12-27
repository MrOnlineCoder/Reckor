var bot;
var channel;
var request = require("request");


var plugin = {
	name: "YoutubeInfo",
	load: function(botInstance, chan, cfg, regCmd) {
		bot = botInstance;
		channel = chan;
		regCmd("youtubeInfo", this.cmdHandler);
	},
	userJoin: function(who) {
		//No OP
	},
	cmdHandler: function(from, args) {
		if (args.length == 0) {
			bot.say(channel, from+", usage: youtubeInfo <id>");
		}
		var id = args[0];
		request("https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v="+id+"&format=json", function (error, response, body) {
		  var json = JSON.parse(body);
		  if (!error && response.statusCode == 200) {
		    bot.say(channel, "---[YouTube Info]---"); 
		    bot.say(channel, "Title: "+json.title); 
		    bot.say(channel, "Author: "+json.author_url); 
		  } else {
		  	bot.say(channel, "Failed to load data!");
		  }
		});
	},
	message: function (from, msg) {

	},
	userLeft: function (who) {
		//No OP
	}
};

module.exports = plugin;