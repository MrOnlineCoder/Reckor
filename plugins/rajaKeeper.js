var bot;
var channel;


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var plugin = {
	name: "RajaKeeper",
	load: function(botInstance, chan, cfg, regCmd) {
		bot = botInstance;
		channel = chan;
		setInterval(this.keeper, 1.5*60*1000);
	},
	userJoin: function(who) {
		//No OP
	},
	keeper: function() {
		bot.say(channel, "Raja, stay here");
	},
	message: function (from, msg) {
		
	},
	userLeft: function (who) {
		//No OP
	}
};

module.exports = plugin;