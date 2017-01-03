var request = require("request");


var plugin = {
	name: "YoutubeInfo",
	load: function() {
		this.commands = {youtubeInfo: this.cmdHandler};
	},
	userJoin: function(who) {
		//No OP
	},
	cmdHandler: function(from, args) {
		if (args.length == 0) {
			this.bot.say(this.channel, from+", usage: youtubeInfo <id>");
			return;
		}
		var id = args[0];
		request("https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v="+id+"&format=json", function (error, response, body) {
		  var json = JSON.parse(body);
		  if (!error && response.statusCode == 200) {
		    this.bot.say(this.channel, "---[YouTube Info]---"); 
		    this.bot.say(this.channel, "Title: "+json.title); 
		    this.bot.say(this.channel, "Author: "+json.author_url); 
		  } else {
		  	this.bot.say(this.channel, "Failed to load data!");
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